import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from '../../assets/img/loading.gif';
import audioBufferToMp3 from "../../utils/audioBufferToMp3";

const UpdateSnnipets = (
  {nft, 
  audioUrl,
}) => {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(30);
  //const [allSnnipets, setAllSnnipets] = useState();
  const [snnipets, setSnnipets] = useState([]);
  const [selected, setSelected] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState();
  const [size, setSize] = useState(30);

  window.AudioContext = window.AudioContext || window.webkitAudioContext;

  const toArrayBuffer = (buf) => {
    let ab = new ArrayBuffer(buf.length);
    let view = new Uint8Array(ab);
    for (let i = 0; i < buf.length; i++) {
      view[i] = buf[i];
    }
    return ab;
  };

  const getAllSnnipets = async () => {
    await axios
      .get("/api/admin-music/getAllMintedNfts")
      .then((res) => {
        if (res.data && res.data[0]) {
        
          console.log(res.data);
          selected(res.data);
        } else {
          Swal.fire("No NFTs");
        }
      }).catch(err => {
        Swal.fire("Error getting nfts", err);
      });
  }

  const sliceBuffer = (audioContext, buffer, callback) => {
    var error = null;

    var duration = buffer.duration;
    var channels = buffer.numberOfChannels;
    var rate = buffer.sampleRate;
   
    if (start < 0) {
      setStart(0);
    }

    if (end > duration) {
      setEnd(duration);
    }

    if (typeof callback !== "function") {
      error = new TypeError("callback must be a function");
    }

    var startOffset = rate * start;
    var endOffset = rate * end;
    var frameCount = endOffset - startOffset;
    var newArrayBuffer;

    try {
      newArrayBuffer = audioContext.createBuffer(
        channels,
        endOffset - startOffset,
        rate
      );
      var anotherArray = new Float32Array(frameCount);
      var offset = 0;

      for (var channel = 0; channel < channels; channel++) {
        buffer.copyFromChannel(anotherArray, channel, startOffset);
        newArrayBuffer.copyToChannel(anotherArray, channel, offset);
      }
    } catch (e) {
      error = e;
    }

    callback(error, newArrayBuffer);
  };

  const uploadToAWS = (snnipetFormData, name, isLastOne, changedStart) => {
    axios
    .post("api/admin-music/updateSnnipetAWS", snnipetFormData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
    .then((res) => {
      if (res.data.success) {
        setProgress("snnipet for " + name + " has been updated in AWS");
        if (changedStart) {
          setProgress("Updating start time for " + name);
          axios
          .post("/api/nft-type/updateStartTime", {nft: {_id: changedStart._id, startTime: start}})
          .then((res) => {
            if (res.data && res.data.success) {
              setProgress("Start time for " + name + " has been updated");
              if (isLastOne) {
                setIsLoading(false);
                Swal.fire("Updated all nfts");
              }
            } else {
              setProgress("ERR updating db startTime for " + name);
            }
          }).catch(err => {
            setProgress("ERR updating db startTime for " + name);
          });
        }
        else if (isLastOne) {
          setIsLoading(false);
          Swal.fire("Updated all nfts");
        }
    }
    })
    .catch((error) => {
      Swal.fire({
        title: "Error",
        text: "Audio upload failed on the server, please try again.",
      });
      setIsLoading(false);
    });
  }

  const update = async (audioCtx, nft, isLastOne) => {
    setProgress("\nGetting data for: " + nft.title);
      
    await axios
    .post("api/nft-type/getSong", {
      key: nft.address + "/" + nft.audioUrl.split("/").slice(-1)[0],
    })
    .then(
      (fullFile) => {
        setProgress("\nWorking on song: " + nft.title);
        const abSong = toArrayBuffer(fullFile.data.Body.data);
        const bufferSrc = audioCtx.createBufferSource();
        audioCtx.decodeAudioData(abSong, async (buffer) => {
          bufferSrc.buffer = buffer;
          sliceBuffer(audioCtx, buffer, (error, newBuffer) => {
            if (error) {
              console.log(error);
            } else {
              setProgress("\nJust sliced buffer for: " + nft.title);

              const snnipetMp3Buffer = audioBufferToMp3(newBuffer);

              const snnipetFile = new File(snnipetMp3Buffer, nft.audioUrl.split("/").slice(-1)[0], {
                type: "audio/mpeg",
              });

              const snnipetFormData = new FormData();
              snnipetFormData.append("artist", nft.address);
              snnipetFormData.append("audioFile", snnipetFile);
              console.log("success", snnipetFormData);
              setProgress("\nCreated .mp3 file for: " + nft.title);

              let hasChanged = nft.startTime !== start ? nft : false;
              uploadToAWS(snnipetFormData, nft.title, isLastOne, hasChanged);
            }});
          console.log(buffer);
        })
      },
      (e) => {
        setProgress("Error getting song: " + nft.title);
        Swal.fire({
          title: "Sorry, something went wrong loading the music",
          text: "Please reload the page",
        });
    })
    .catch(err => {
      setIsLoading(false);
      console.log(err);
      Swal.fire("Error getting song");
      audioCtx.close();
    })
  }


  const updateSelectedSnnipet = async () => {
    const audioCtx = new AudioContext();
    setIsLoading(true);
    await update(audioCtx, selected, true);
  }

  /*const verifySnnipets = async () => {
    setIsLoading(true);
    setProgress("Veryfing All Snnipets...");
    await axios
    .get("api/admin-music/verifyForEmpty")
    .then(res => {
      if (res.data && res.data[0]) {
        Swal.fire("ALERT! FOUND SONGS WITH NO SNNIPETS, VERIFY LOGS");
        setProgress("Found Songs With No Snnipets:" + res.data.map(snnipet => {
          return "\n" + snnipet.title
        }))
      } else {
        setProgress("");
        Swal.fire("All good! All songs minted have snnipets");
      }
      setIsLoading(false);
    })
    .catch(err => {
      console.log(err);
      setIsLoading(false);
      Swal.fire("Error, run again!")
    })
  }

  const showNotMinted = (checked) => {
    if (checked) {
      setSnnipets(allSnnipets.filter(snnipet => {return snnipet.isMinted}));
    } else {
      setSnnipets(allSnnipets);
    }
  }*/

  useEffect(() => {
    setEnd(Number(start) + Number(size));
  }, [start, size])
  /*useEffect(() => {
    getAllSnnipets();
  }, []);*/



  return (
    <Section>

      {/*&<h3>Size in Seconds:</h3>
      <input type="number" value={size} onChange={e => {setSize(e.target.value)}}/>*/}
      <Rows>
      <div>
      <h3>Start Time:</h3>
      <input type="number" value={start} onChange={e => {setStart(e.target.value)}}/>
      </div>
      <div>
      <h3>End Time:</h3>
      <h4>{end}</h4>
      </div>
      </Rows>
      {selected && !isLoading? 
        <Button onClick={updateSelectedSnnipet}>
          Update {selected.title}
        </Button> : isLoading ?
        <Button>
          Loading <LoadingIcon src={Loading}/>
        </Button> : <Button>Update Snippet</Button>
      }
      
    </Section>
  );
};

const Select = styled.select`
  width: 100%;
`;

const Logs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 70%;
  border: 1px solid white;
  padding: 10px;
  margin-top: 30px;
  h4 {
    margin-bottom: 5px;
    margin-top: 0px;
  }
`;
const LoadingIcon = styled.img`
  width: 20px;
`;

const Section = styled.div`
  color: white;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 20px;
`;

const Rows = styled.div`
  display: flex;
  flex-direction: row;
  align-items: space-between;
  justify-content: space-between;
  width: 100%;
  input {
    width: 40px;
  }
  div {
    align-items: center;
    margin-right: 10%;
  }
`;

const Button = styled.a`
  margin-left: auto;
  margin-right: auto;
  text-decoration: none;
  margin-top: 20px;
  width: 70%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  display: flex;
  justify-content: center;
  border: 1px solid ${(props) => props.theme.color.red};
  height: 32px;
  border-radius: 20px;
  font-family: "Compita";
  background-color: #181818;
  /* margin-left: ${(props) => props.theme.spacing[3]}px; */
  &:hover {
    background-color: rgba(256, 256, 256, 0.2);
  }
  /* @media only screen and (max-width: 767px) {
    background-size: 100% 100%;
    width: 100px;
    margin-left: -15px;
  } */
`;

export default UpdateSnnipets;