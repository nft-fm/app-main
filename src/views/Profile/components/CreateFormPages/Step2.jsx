import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from "styled-components";
// import UploadAudio from "../UploadAudio";
import axios from "axios";
import { useAccountConsumer } from "../../../../contexts/Account";
import { errorIcon, imageWidth, imageHeight } from "../../../../utils/swalImages";
import swal from "sweetalert2";
import loading_gif from "../../../../assets/img/loading.gif";
import audioBufferToMp3 from "../../../../utils/audioBufferToMp3";

const Step2 = ({ 
  nftData, 
  setNftData,
  isLoadingAudio, 
  setIsLoadingAudio,
  isLoadingImage,
  setIsLoadingImage
}) => {
  const { account } = useAccountConsumer();
  const imageUrlLength = 49 + account.length
  const [imageFile, setImageFile] = useState(null);
  const [imageName, setImageName] = useState("");
  const [tempImageUrl, setTempImageUrl] = useState(null)

  const audioUrlLength = 48 + account.length
  const hiddenAudioInput = useRef(null);
  const [audioFile, setAudioFile] = useState(null);
  const [audioName, setAudioName] = useState("");
  const [tempAudioData, setTempAudioData] = useState(null)

  const hiddenImageInput = useRef(null);
  const handleImage = () => {
    setImageFile(null);
    hiddenImageInput.current.click();
  };

  const handleImageChange = (e) => {
    if (e.target.files[0] && !isLoadingImage) {
      setImageFile(e.target.files[0]);
      setImageName(e.target.files[0].name);
    }
  };

  useEffect(() => {
    if (tempImageUrl) {
      setNftData({
        ...nftData,
        imageUrl: tempImageUrl
      })
      setIsLoadingImage(false);
      setTempImageUrl(null)
    }
    if (tempAudioData) {
      let { audioUrl, snnipet, dur } = tempAudioData
      setNftData({
        ...nftData,
        audioUrl,
        snnipet,
        dur
      });
      setIsLoadingAudio(false);
      setTempAudioData(null)
    }
  }, [tempImageUrl, tempAudioData, setNftData, nftData])

  useEffect(() => {
    if (imageFile && imageName !== "" && !isLoadingImage) {
      const imageFormData = new FormData();
      imageFormData.append("artist", account);
      imageFormData.append("imageFile", imageFile);
      imageFormData.append(
        "imageURL",
        "https://nftfm-images.s3-us-west-1.amazonaws.com/" +
        account +
        "/" +
        imageName
      );

      setIsLoadingImage(true);
      axios
        .post("/api/nft-type/uploadImageS3", imageFormData)
        .then((res) => {
          if (res.status === 200) {
            setImageFile(null);
            setTempImageUrl(
              "https://nftfm-images.s3-us-west-1.amazonaws.com/" +
              account +
              "/" +
              imageName
            )
            setImageName("");
          }
          console.log(res);
        })
        .catch((err) => {
          setIsLoadingImage(false);
          setImageFile(null);
          console.log(err);
          swal.fire({
            imageUrl: errorIcon,
            imageWidth,
            imageHeight,
            timer: 5000,
            title: "Error",
            text: "Image upload failed on the server, please try again.",
          });
        });
    }
  }, [imageFile, account, imageName, nftData, setNftData, isLoadingImage, setIsLoadingImage]);


  const sliceBuffer = (audioContext, buffer, begin, end, callback) => {
    var error = null;

    var duration = buffer.duration;
    var channels = buffer.numberOfChannels;
    var rate = buffer.sampleRate;

    console.log("channels", channels);
    if (typeof end === "function") {
      callback = end;
      end = duration;
    }

    if (begin < 0) {
      begin = 0;
    }

    if (end > duration) {
      end = duration;
    }

    if (typeof callback !== "function") {
      error = new TypeError("callback must be a function");
    }

    var startOffset = rate * begin;
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

  const uploadFile = (
    audioFormData,
    duration,
    buffer,
    audioContext,
    audioFile
  ) => {
    console.log("uploading file");
    setIsLoadingAudio(true);
    axios
      .post("api/nft-type/uploadAudioS3", audioFormData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log("originalBUFFER", buffer);
          sliceBuffer(audioContext, buffer, 0, 15, (error, newBuffer) => {
            if (error) {
              console.log(error);
            } else {
              console.log("NEW BUFFER", newBuffer);
              const snnipetMp3Buffer = audioBufferToMp3(newBuffer);

              const snnipetFile = new File(snnipetMp3Buffer, audioFile.name, {
                type: "audio/mpeg",
              });

              const snnipetFormData = new FormData();
              snnipetFormData.append("artist", account);
              snnipetFormData.append("audioFile", snnipetFile);
              snnipetFormData.append(
                "audioURL", 
                "https://nftfm-music.s3-us-west-1.amazonaws.com/" +
                account +
                "/" +
                audioFile.name
              );
              snnipetFormData.append(
                "snnipetURL", 
                "https://nftfm-music.s3-us-west-1.amazonaws.com/" +
                account +
                "/snnipets/snnipet_" +
                audioFile.name,
              );
              axios
                .post("api/nft-type/uploadSnnipetS3", snnipetFormData, {
                  headers: {
                    "content-type": "multipart/form-data",
                  },
                })
                .then((response) => {
                  console.log(response);
                  setTempAudioData({
                    audioUrl:
                      "https://nftfm-music.s3-us-west-1.amazonaws.com/" +
                      account +
                      "/" +
                      audioName,
                    snnipet:
                      "https://nftfm-music.s3-us-west-1.amazonaws.com/" +
                      account +
                      "/snnipets/snnipet_" +
                      audioName,
                    dur: duration
                  })
                  setAudioName("")
                })
                .catch((error) => {
                  swal.fire({
                    imageUrl: errorIcon,
                    imageWidth,
                    imageHeight,
                    timer: 5000,
                    title: "Error",
                    text: "Audio upload failed on the server, please try again.",
                  });
                  console.log("snnipets upload failed", error);
                  setIsLoadingAudio(false);
                  setAudioName("")
                });
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoadingAudio(false);
        setAudioName("")
        swal.fire({
          imageUrl: errorIcon,
          imageWidth,
          imageHeight,
          timer: 5000,
          title: "Error",
          text: "Audio upload failed on the server, please try again.",
        });
      });
  };

  

  const getFileDurAndSnnipet = () => {
    if (!audioFile) return ;
    // Obtain the uploaded file, you can change the logic if you are working with multiupload
    let file = audioFile;
    // Create instance of FileReader
    let reader = new FileReader();

    // When the file has been succesfully read
    reader.onload = function (event) {
      // Create an instance of AudioContext
      let audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();

      // Asynchronously decode audio file data contained in an ArrayBuffer.
      audioContext.decodeAudioData(event.target.result, function (buffer) {
        // Obtain the duration in seconds of the audio file (with milliseconds as well, a float value)
        let duration = buffer.duration;
        // setNftData({ ...nftData, dur: duration });

        const audioFormData = new FormData();
        audioFormData.append("artist", account);
        audioFormData.append("audioFile", audioFile);
        uploadFile(audioFormData, duration, buffer, audioContext, audioFile);
      });
    };

    reader.readAsArrayBuffer(file);
  };

  const handleAudio = (e) => {
    // setIsAudioUploaded(null);
    setAudioFile(null);
    hiddenAudioInput.current.click();
  };
  const handleAudioChange = (e) => {
    if (e.target.files[0] && !isLoadingAudio) {
      setAudioFile(e.target.files[0]);
      setAudioName(e.target.files[0].name);    
    }
  };

  useEffect(() => {
    if (audioFile && !isLoadingAudio && audioName !== "") {
      getFileDurAndSnnipet();
    }
  }, [audioFile, audioName]);


  return (
    <Outer>
      <HeaderContainer>
        <Header>Visual</Header>
      </HeaderContainer>
      <UploadContainer>
        <p>PNG, JPG, GIF, MP4</p>
        <small>
          {nftData && nftData.imageUrl && nftData.imageUrl !== "" ? nftData.imageUrl.slice(imageUrlLength, nftData.imageUrl.length) : ""}
        </small>
        <ChooseFile onClick={() => !isLoadingImage ? handleImage() : null} type="button">
          {!isLoadingImage ? "Choose Image" : <img style={{width: "25px", height: "25px"}} src={loading_gif} alt="loading" />}
        </ChooseFile>
        <StyledInput
          type="file"
          accept=".jpg,.jpeg,.png,.gif"
          ref={hiddenImageInput}
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
      </UploadContainer>

      <HeaderContainer>
        <Header bottomHeader>Audio</Header>
      </HeaderContainer>
      <UploadContainer>
        <p>MP3, FLAC</p>
        <small>
          {nftData && nftData.audioUrl !== "" ? nftData.audioUrl.slice(audioUrlLength, nftData.audioUrl.length) : ""}
        </small>

      <ChooseFile onClick={() => !isLoadingAudio ? handleAudio() : null} type="button">
        {!isLoadingAudio ? "Choose Audio" : <img style={{width: "25px", height: "25px"}} src={loading_gif} alt="loading" />}
      </ChooseFile>
      <StyledInput
        type="file"
        accept=".mp3,.flac,.wav"
        ref={hiddenAudioInput}
        onChange={handleAudioChange}
        style={{ display: "none" }}
      />
      </UploadContainer>
    </Outer>
  )
}

const Outer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media only screen and (max-width: 776px) {
    height: 600px;
  }
`;

const HeaderContainer = styled.div`
  width: 100%;
  /* padding-left: 60px; */
  @media only screen and (max-width: 776px) {
    text-align: center;
    padding-left: 0;
    margin-bottom: -8px;
  }
`

const Header = styled.h1`
  text-align: left;
  color: white;
  padding: 0;
  margin: 0;
  @media only screen and (max-width: 776px) {
    text-align: center;
    font-size: 24px;
  }

  ${props => props.bottomHeader ? `padding-top: 20px` : ``}
`


const StyledInput = styled.input`
  color: white;
  background-color: #090909;
  border: none;
  outline: none;
  height: 30px;
  font-size: 16px;
  border-bottom: 1px solid ${(props) => props.theme.color.boxBorder};
  ${props => props.noborder && css`
    border: none;
  `}
  @media only screen and (max-width: 776px) {
    background-color: transparent;
    height: 30px;
  }
`;

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  background-image: linear-gradient(to right, #262626, #383838);
  /* width: 280px; */
  width: 100%;
  height: 120px;
  border-radius: 16px;
  margin: 12px;
  color: white;
  p {
    padding: 0;
    margin: 0;
    color: white;
  }
  @media only screen and (max-width: 776px) {
    width: 80%;
  }
`

const ChooseFile = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 8px;
  width: 140px;
  height: 40px;
  font-family: Compita;
  font-size: 18px;
  text-align: center;
  color: #ffffff;
  font-size: 16px;
  transition: background-image 0.5s ease;
  background-image: linear-gradient(to right, #262626, #383838);
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.15);
  border: none;
  &:hover {
    cursor: pointer;
    background-image: linear-gradient(to right, #333333, #8b8b8b);
  }
`
  /* border: solid 1.5px #181818; */

export default Step2;