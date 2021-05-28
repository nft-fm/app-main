import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import axios from "axios";

import { useAccountConsumer } from "../../../contexts/Account";

import upload_icon from "../../../assets/img/profile_page_assets/upload_icon.svg";
import loading_gif from "../../../assets/img/loading.gif";

const UploadAudio = ({
  audioFile, setAudioFile,
  nftData, setNftData,
  isAudioUploaded, setIsAudioUploaded,
  setAudioUploadError, audioUploadError}) => {
  const { account } = useAccountConsumer();
  const hiddenAudioInput = useRef(null);

  const prepareMediaRecorder = (mediaRecorder) => {
    let chunks = [];

    mediaRecorder.ondataavailable = (e) => {
      console.log(e.data);
      chunks.push(e.data);
    }

    mediaRecorder.onstop = (e) => {
      console.log("data available after MediaRecorder.stop() called.");
      let blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
      let audioURL = URL.createObjectURL(blob);
     
      console.log("recorder stopped", audioURL);
    }

    return mediaRecorder;
  }

  const getFileDurAndSnnipet = () => {
        // Obtain the uploaded file, you can change the logic if you are working with multiupload
        let file = audioFile;
        // Create instance of FileReader
        let reader = new FileReader();
    
        // When the file has been succesfully read
        reader.onload = function (event) {
          // Create an instance of AudioContext
          let audioContext = new (window.AudioContext || window.webkitAudioContext)();
          let source = audioContext.createBufferSource();
          let dest = audioContext.createMediaStreamDestination();
          let mediaRecorder = new MediaRecorder(dest.stream);
          mediaRecorder = prepareMediaRecorder(mediaRecorder);
          
          // Asynchronously decode audio file data contained in an ArrayBuffer.
          audioContext.decodeAudioData(event.target.result, function(buffer) {
              // Obtain the duration in seconds of the audio file (with milliseconds as well, a float value)
              let duration = buffer.duration;
              setNftData({...nftData, dur: duration});
    
              const audioFormData = new FormData();
              audioFormData.append("artist", account);
              audioFormData.append("audioFile", audioFile);
              audioFormData.append("dur", duration);

              // Prepare buffer to run and save 15sec snnipet
              source.buffer = buffer;
              source.connect(dest);
              source.onended = (e) => {
                console.log("HERE");
                mediaRecorder.stop();
              }

              mediaRecorder.start();
              
              source.start(0, 5);
              console.log(mediaRecorder)
              axios
              .post("api/nft-type/uploadAudioS3", audioFormData, {
                headers: {
                  "content-type": "multipart/form-data",
                },
              })
              .then((res) => {
                if (res.status === 200) {
                  let _nftData;
                  setNftData(currentState=>{
                    _nftData=currentState
                    return currentState
                  })
                  setNftData({..._nftData, dur: duration})
                  setIsAudioUploaded(true);
                }
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
                setAudioUploadError(true);
              });
          });
        };

        reader.readAsArrayBuffer(file);
  }

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
        <span>Upload audio</span>
        <span>.mp3, .flac</span>
        {audioFile && !isAudioUploaded ? (
          <img src={loading_gif} alt="loading" />
        ) : (
          <img src={upload_icon} alt="upload-file-icon" />
        )}
      </MediaButton>
      <StyledInput
        type="file"
        accept=".mp3,.flac,.wav"
        ref={hiddenAudioInput}
        onChange={handleAudioChange}
        style={{ display: "none" }}
        defaultValue={audioFile}
        // required
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
  background-color: ${(props) => props.theme.color.box};
  border-radius: ${props => props.theme.borderRadius}px;
  color: ${(props) => props.theme.fontColor.gray};
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid ${(props) => props.theme.fontColor.boxBorderColor};
  padding: 5px;
  cursor: pointer;
  /* margin-top: 30px; */
  /* position: relative; */
  /* height: 50px; */
  width: 40%;
  & > img {
    margin-top: 5px;
    height: 20px;
    opacity: 0.5;
  }

  @media only screen and (max-width: 776px) {
    width: 45%;
  }
`;

export default UploadAudio;

// @media only screen and (max-width: 776px) {
//   margin-top: 6px;
//   }
