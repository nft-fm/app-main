import React, { useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faAngleDoubleRight, faAngleDoubleLeft, faPause } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

import loading from '../../assets/img/loading.gif';

const MusicPlayer = (props) => {
  const { nft } = props;
  const [url, setUrl] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // window.AudioContext = window.AudioContext || window.webkitAudioContext;
  // var audioCtx = new window.AudioContext;
  // var source = audioCtx.createBufferSource();
  // console.log("foo:", nft.address + "/" + nft.audioUrl.split('/').slice(-1)[0]);
  // console.log("MusicPlayer props: ", props.nft);
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  var context = new AudioContext();

  var source;
  // var spinner = document.getElementById('spinner');

  // spinner.hide = function(){
  // 	this.style.display = 'none';
  // };

  // spinner.show = function(){
  // 	this.style.display = 'block';
  // }

  function stopTunes() {
    if (source.stop) {
      source.stop();
    }
  }

  function playTunes() {
    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost:5000/audio/", true);
    request.responseType = "arraybuffer";

    //   spinner.show();

    request.onload = function () {
      // spinner.hide();
      var Data = request.response;
      process(Data);
    };

    request.send();
  }

  function process(Data) {
    source = context.createBufferSource(); // Create Sound Source
    context.decodeAudioData(Data, function (buffer) {
      source.buffer = buffer;
      source.connect(context.destination);
      source.start(context.currentTime);
    });
  }
  useEffect(() => {
    getSong();
  }, []);

  const getSong = async () => {
    const _url = await axios.post("api/nft-type/getSong", { key: nft.address + "/" + nft.audioUrl.split('/').slice(-1)[0] });
    console.log("url: ", _url);
    setUrl(_url.data);
  }

  // const toArrayBuffer = (buf) => {
  //     var ab = new ArrayBuffer(buf.length);
  //     var view = new Uint8Array(ab);
  //     for (var i = 0; i < buf.length; ++i) {
  //         view[i] = buf[i];
  //     }
  //     return ab;
  // }

  // const getSong = async () => {
  //     const _url = await axios.post("api/nft-type/getSong", { key: nft.address + "/" + nft.audioUrl.split('/').slice(-1)[0] })
  //     console.log(_url);
  //     setUrl(_url.data);
  // axios.post("api/nft-type/getSong", { key: nft.address + "/" + nft.audioUrl.split('/').slice(-1)[0] })
  //     .then((_songFile) => {
  //         console.log(_songFile);
  //         const abSong = toArrayBuffer(_songFile.data.Body.data);
  //         audioCtx.decodeAudioData(abSong, (buffer) => {
  //             source.buffer = buffer;
  //             source.connect(audioCtx.destination);
  //             // source.loop = true;
  //             source.start(0);
  //         }, (e) => { console.log("Error: ", e.err); })
  //         setIsPlaying(true);
  //         setIsLoading(false);
  //     })
  // }

  // const playSong = () => {
  //     setIsPlaying(true);
  //     source.start(0);
  // }

  // const stopSong = () => {
  //     setIsPlaying(false);
  //     audioCtx.suspend();
  //     if (source.stop)
  //         source.stop();
  // }

  if (!url)
    return (
      <Wrapper>
        <Image src={loading} />
      </Wrapper>
    )

  return (
    <Wrapper>
      {/* <button onClick={() => playTunes()}>Play</button>
      <button onClick={() => stopTunes()}>Stop</button> */}
      <AudioPlayer
        src={url}
        onPlay={e => console.log("onPlay")}
      // other props here */}
      />
    </Wrapper>
    // <Wrapper>
    //     <Image src={nft.imageUrl} alt="image" />
    //     <TrackInfo>
    //         <TrackTitle>
    //             {nft.title}
    //         </TrackTitle>
    //         <TrackArtist>
    //             {nft.artist}
    //         </TrackArtist>
    //     </TrackInfo>
    //     <AudioControlSection>
    //         <FontAwesomeIcon onClick={() => console.log("Foo")} icon={faAngleDoubleLeft} />
    //         {!isPlaying ?
    //             <FontAwesomeIcon icon={faPlay} onClick={() => playSong()} />
    //             :
    //             <FontAwesomeIcon icon={faPause} onClick={() => stopSong()} />
    //         }
    //         <FontAwesomeIcon icon={faAngleDoubleRight} />
    //     </AudioControlSection>
    // </Wrapper>
  )
}

const AudioControlSection = styled.div`
    margin-left: auto;
    margin-right: 25px;
`;

const TrackArtist = styled.div`
    color: grey;
`;

const TrackTitle = styled.div`
    color: white;
`;

const TrackInfo = styled.div`
    margin-left: 14px;
    display: flex;
    flex-direction: column;
`;

const Image = styled.img`
    max-height: 45px;
    max-width: 45px;
    margin-left: 25px;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100vw;
    background-color: #262626;
    height: 50px;
    border-top: 1px solid white ;
`;

export default MusicPlayer;