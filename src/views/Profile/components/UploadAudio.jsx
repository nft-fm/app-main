import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import axios from "axios";
import lamejs from "lamejs";
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
  
  function wavToMp3(channels, sampleRate, left, right) {
    console.log("channels", channels);
    console.log("sampleRate", sampleRate);
    console.log("left", left);
    console.log("right", right);

    var buffer = [];
    var mp3enc = new lamejs.Mp3Encoder(channels, sampleRate, 128);
    var remaining = left.length;
    var samplesPerFrame = 1152;

    for (var i = 0; remaining >= samplesPerFrame; i += samplesPerFrame) {
      if (!right)
      {
        var mono = left.subarray(i, i + samplesPerFrame);
        var mp3buf = mp3enc.encodeBuffer(mono);
      }
      else {
        var leftChunk = left.subarray(i, i + samplesPerFrame);
        var rightChunk = right.subarray(i, i + samplesPerFrame);
        var mp3buf = mp3enc.encodeBuffer(leftChunk,rightChunk);
      }
      if (mp3buf.length > 0) {
        buffer.push(mp3buf);//new Int8Array(mp3buf));
      }
      remaining -= samplesPerFrame;
    }
    var d = mp3enc.flush();
    if(d.length > 0){
            buffer.push(new Int8Array(d));
    }
   
    var mp3Blob = new Blob(buffer, {type: 'audio/mp3'});
    var bUrl = window.URL.createObjectURL(mp3Blob);
   
    // send the download link to the console
    console.log('mp3 download:', bUrl);
    return buffer;
}

  function audioBufferToWav(aBuffer) {
    let numOfChan = aBuffer.numberOfChannels,
        btwLength = aBuffer.length * numOfChan * 2 + 44,
        btwArrBuff = new ArrayBuffer(btwLength),
        btwView = new DataView(btwArrBuff),
        btwChnls = [],
        btwIndex,
        btwSample,
        btwOffset = 0,
        btwPos = 0;

    setUint32(0x46464952); // "RIFF"
    setUint32(btwLength - 8); // file length - 8
    setUint32(0x45564157); // "WAVE"
    setUint32(0x20746d66); // "fmt " chunk
    setUint32(16); // length = 16
    setUint16(1); // PCM (uncompressed)
    setUint16(numOfChan);
    setUint32(aBuffer.sampleRate);
    setUint32(aBuffer.sampleRate * 2 * numOfChan); // avg. bytes/sec
    setUint16(numOfChan * 2); // block-align
    setUint16(16); // 16-bit
    setUint32(0x61746164); // "data" - chunk
    setUint32(btwLength - btwPos - 4); // chunk length

    for (btwIndex = 0; btwIndex < aBuffer.numberOfChannels; btwIndex++)
        btwChnls.push(aBuffer.getChannelData(btwIndex));

    while (btwPos < btwLength) {
        for (btwIndex = 0; btwIndex < numOfChan; btwIndex++) {
            // interleave btwChnls
            btwSample = Math.max(-1, Math.min(1, btwChnls[btwIndex][btwOffset])); // clamp
            btwSample = (0.5 + btwSample < 0 ? btwSample * 32768 : btwSample * 32767) | 0; // scale to 16-bit signed int
            btwView.setInt16(btwPos, btwSample, true); // write 16-bit sample
            btwPos += 2;
        }
        btwOffset++; // next source sample
    }

    let wavHdr = lamejs.WavHeader.readHeader(new DataView(btwArrBuff));

    //Stereo
    let data = new Int16Array(btwArrBuff, wavHdr.dataOffset, wavHdr.dataLen / 2);
    let leftData = [];
    let rightData = [];
    for (let i = 0; i < data.length; i += 2) {
                 leftData.push(data[i]);
                 rightData.push(data[i + 1]);
    }
    var left = new Int16Array(leftData);
    var right = new Int16Array(rightData);

    
    //STEREO
    if (wavHdr.channels===2)
        return wavToMp3(wavHdr.channels, wavHdr.sampleRate,left,right);
    //MONO
    else if (wavHdr.channels===1)
        return wavToMp3(wavHdr.channels, wavHdr.sampleRate, data, null);
    else
        return btwArrBuff;

    function setUint16(data) {
        btwView.setUint16(btwPos, data, true);
        btwPos += 2;
    }

    function setUint32(data) {
        btwView.setUint32(btwPos, data, true);
        btwPos += 4;
    }
}

  const sliceBuffer = (audioContext, buffer, begin, end, callback) => {
    var error = null;
  
    var duration = buffer.duration;
    var channels = buffer.numberOfChannels;
    var rate = buffer.sampleRate;
  
    console.log("channels", channels);
    if (typeof end === 'function') {
      callback = end;
      end = duration;
    }
  
    // milliseconds to seconds
    begin = begin;
    end = end;
  
    if (begin < 0) {
      begin = 0;
    }
  
    if (end > duration) {
      end = duration;
    }
  
    if (typeof callback !== 'function') {
      error = new TypeError('callback must be a function');
    }
  
    var startOffset = rate * begin;
    var endOffset = rate * end;
    var frameCount = endOffset - startOffset;
    var newArrayBuffer;
  
    try {
      newArrayBuffer = audioContext.createBuffer(channels, endOffset - startOffset, rate);
      var anotherArray = new Float32Array(frameCount);
      var offset = 0;
  
      for (var channel = 0; channel < channels; channel++) {
        buffer.copyFromChannel(anotherArray, channel, startOffset);
        newArrayBuffer.copyToChannel(anotherArray, channel, offset);
      }
    } catch(e) {
      error = e;
    }
  
    callback(error, newArrayBuffer);
  }

  const uploadFile = (audioFormData, arrayBuffer, duration, buffer, audioContext, audioFile) => {
    console.log("uploading file")
    axios
    .post("api/nft-type/uploadAudioS3",
    audioFormData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        let _nftData;

        console.log("originalBUFFER", buffer);
        sliceBuffer(audioContext, buffer, 0, 50, (error, newBuffer) => {
          if (error) {
            console.log(error);
          }
          else {
            console.log("NEW BUFFER", newBuffer);
            const snnipetMp3Buffer = audioBufferToWav(newBuffer);
            console.log("TYPE", snnipetMp3Buffer)

            let snnipetFile = new File(snnipetMp3Buffer, audioFile.name, {type: "audio/mpeg"});
            console.log("FILE", snnipetFile);
            console.log("ORIGINAL FILE", audioFile);

            const snnipetFormData = new FormData();
            snnipetFormData.append("artist", account);
            snnipetFormData.append("audioFile", snnipetFile);
             axios
            .post("api/nft-type/uploadSnnipetS3",
            snnipetFormData, {
              headers: {
                "content-type": "multipart/form-data",
              },
            })
            .then(response => {
              console.log(response);
              setNftData(currentState=>{
                _nftData=currentState
                return currentState
              })
              setNftData({..._nftData, dur: duration})
              setIsAudioUploaded(true);
            })
            .catch(error => {
              console.log("snnipets upload failed", error);
            })
          } 
        });
      }
    })
    .catch((err) => {
      console.log(err);
      setAudioUploadError(true);
    });
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

          // Asynchronously decode audio file data contained in an ArrayBuffer.
          audioContext.decodeAudioData(event.target.result, function(buffer) {
              // Obtain the duration in seconds of the audio file (with milliseconds as well, a float value)
              let duration = buffer.duration;
              setNftData({...nftData, dur: duration});

              const audioFormData = new FormData();
              audioFormData.append("artist", account);
              audioFormData.append("audioFile", audioFile);
              uploadFile(audioFormData, event.target.result, duration, buffer, audioContext, audioFile);
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
      snnipet: "https://nftfm-music.s3-us-west-1.amazonaws.com/" +
      account +
      "/snnipets/snnipet_" +
      e.target.files[0].name
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
