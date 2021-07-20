import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import axios from "axios";
import lamejs from "lamejs";
import { useAccountConsumer } from "../../../contexts/Account";
import audioBufferToMp3 from "../../../utils/audioBufferToMp3";

import upload_icon from "../../../assets/img/profile_page_assets/upload_icon.svg";
import loading_gif from "../../../assets/img/loading.gif";
const UploadAudio = ({
  audioFile,
  setAudioFile,
  nftData,
  setNftData,
  isAudioUploaded,
  setIsAudioUploaded,
  setAudioUploadError,
  audioUploadError,
}) => {
  const { account } = useAccountConsumer();
  const hiddenAudioInput = useRef(null);

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
    axios
      .post("api/nft-type/uploadAudioS3", audioFormData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          let _nftData;

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

              axios
                .post("api/nft-type/uploadSnnipetS3", snnipetFormData, {
                  headers: {
                    "content-type": "multipart/form-data",
                  },
                })
                .then((response) => {
                  console.log(response);
                  setNftData((currentState) => {
                    _nftData = currentState;
                    return currentState;
                  });
                  setNftData({ ..._nftData, dur: duration });
                  setIsAudioUploaded(true);
                })
                .catch((error) => {
                  setAudioUploadError(true);
                  console.log("snnipets upload failed", error);
                });
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setAudioUploadError(true);
      });
  };

  const getFileDurAndSnnipet = () => {
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
        setNftData({ ...nftData, dur: duration });

        const audioFormData = new FormData();
        audioFormData.append("artist", account);
        audioFormData.append("audioFile", audioFile);
        uploadFile(audioFormData, duration, buffer, audioContext, audioFile);
      });
    };

    reader.readAsArrayBuffer(file);
  };

  const handleAudio = (e) => {
    setIsAudioUploaded(null);
    setAudioFile(null);
    hiddenAudioInput.current.click();
  };
  const handleAudioChange = (e) => {
    if (!e.target.files[0]) {
      return;
    }
    setAudioFile(e.target.files[0]);
    setNftData({
      ...nftData,
      audioUrl:
        "https://nftfm-music.s3-us-west-1.amazonaws.com/" +
        account +
        "/" +
        e.target.files[0].name,
      snnipet:
        "https://nftfm-music.s3-us-west-1.amazonaws.com/" +
        account +
        "/snnipets/snnipet_" +
        e.target.files[0].name,
    });
  };

  useEffect(() => {
    if (audioFile) {
      getFileDurAndSnnipet();
    }
  }, [audioFile]);

  return (
    <>
      <MediaButton onClick={() => handleAudio()} type="button">
        Choose File
      </MediaButton>
      <StyledInput
        type="file"
        accept=".mp3,.flac,.wav"
        ref={hiddenAudioInput}
        onChange={handleAudioChange}
        style={{ display: "none" }}
      />
    </>
  );
};

const StyledInput = styled.input`
  color: white;
  background-color: ${(props) => props.theme.color.box};
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.color.boxBorder};
  outline: none;
  margin-bottom: 5px;

  @media only screen and (max-width: 776px) {
    background-color: transparent;
    height: 20px;
  }
`;

const MediaButton = styled.button`
  display: flex;
  justify-content: center;
  border: solid 1.5px #181818;
  align-items: center;
  text-align: center;
  border-radius: 8px;
  width: 120px;
  height: 40px;
  font-family: Compita;
  font-size: 18px;
  text-align: center;
  color: #ffffff;
  background-image: linear-gradient(to right, #262626, #383838);
  &:hover {
    cursor: pointer;
    background-image: linear-gradient(to right, #333333, #8b8b8b);
  }
`;

export default UploadAudio;