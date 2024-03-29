import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import loading from "../../assets/img/loading.gif";
import ProgressBar from "./components/ProgressBar";
import ProgressBarMobile from "./components/ProgressBarMobile";
import TrackInfo from "./components/TrackInfo";
import AudioControl from "./components/AudioControl";
import VolumeAndLoopControl from "./components/VolumeAndLoopControl";
import Swal from "sweetalert2";
import { ReactComponent as XIcon } from "../../assets/img/icons/x.svg";
import isMobile from "../../utils/isMobile";
import { errorIcon, imageWidth, imageHeight } from "../../utils/swalImages";

const MusicPlayer = (props) => {
  const { nft, setNextNft, setPrevNft } = props;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [startTime, setStartTime] = useState(0);
  // const [gainNode, setGainNode] = useState();
  const [volume, setVolume] = useState(0.7);
  const [dur, setDur] = useState(0);
  const [second, setSecond] = useState("00");
  const [minute, setMinute] = useState("00");
  const [counter, setCounter] = useState(0);
  const [filled, setFilled] = useState(0);
  const [songFullyLoaded, setSongFullyLoaded] = useState(false);
  const [isLoop, setIsLoop] = useState(false);

  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  /* Why so many refs you wonder? 
    Well, those refs are necessary 'cause we're working with a lot of time sensitive information.
    When we have a callback the information we can access from the hooks state is the one from the time
    the function that calls It starts. Since we have many asyncronous opperations happening at the same time
    we need to make sure we have the most accurate reference to the information.
    Thats is another way to achive the same goal by updating the state with the currentState
    this way can be found in the funtion prepareRemainingSong (currently in line 180 with the counter)
  */
  const audioContextRef = useRef();
  const volumeRef = useRef();
  const bufferSrcRef = useRef();
  const fullBufferSrc = useRef();
  const partialBufferSrc = useRef();

  const toArrayBuffer = (buf) => {
    let ab = new ArrayBuffer(buf.length);
    let view = new Uint8Array(ab);
    for (let i = 0; i < buf.length; i++) {
      view[i] = buf[i];
    }
    return ab;
  };

  // const getPartialSong = async () => {
  //   if (bufferSrcRef.current) {
  //     setIsLoading(true);
  //     setIsPlaying(false);
  //     bufferSrcRef.current.stop();
  //     bufferSrcRef.current.disconnect();
  //   }
  //   axios
  //     .post("api/nft-type/getPartialSong", {
  //       key: nft.address + "/" + nft.audioUrl.split("/").slice(-1)[0],
  //     })
  //     .then(
  //       (songFile) => {
  //         startPartialSong(songFile);
  //       },
  //       (e) => {
  //         console.log("Error: ", e.err);
  //       }
  //     );
  // };

  const startNewContext = async (songFile, startTime) => {
    if (bufferSrcRef.current) {
      bufferSrcRef.current.stop();
      bufferSrcRef.current.disconnect();
    }

    if (!startTime) startTime = 0;

    const _gainNode = volumeRef.current
      ? volumeRef.current
      : audioContextRef.current.createGain();
    _gainNode.gain.value = volume;
    _gainNode.connect(audioContextRef.current.destination);

    const abSong = toArrayBuffer(songFile.data.Body.data);
    const _bufferSrc = audioContextRef.current.createBufferSource();

    audioContextRef.current.decodeAudioData(abSong, async (_buffer) => {
      _bufferSrc.buffer = _buffer;
      _bufferSrc.connect(_gainNode);
      _bufferSrc.start(0, startTime);

      volumeRef.current = _gainNode;
      bufferSrcRef.current = _bufferSrc;
      partialBufferSrc.current = _bufferSrc;

      setStartTime(_bufferSrc.context.currentTime);
      /*props.setCurrentBuffer(songFile);*/
    });

    return _bufferSrc;
  };

  const startPartialSong = async (songFile) => {
    const _bufferSrc = await startNewContext(songFile);
    setDur(nft.dur ? nft.dur : 80000);
    setIsLoading(false);
    setIsPlaying(true);
    if (
      audioContextRef.current.state === "suspended" &&
      audioContextRef.current
    )
      audioContextRef.current.resume();
    /*Prepare callback for when buffer finishes and checks if full song is loaded
    If not, the old buffer will be paused*/
    _bufferSrc.onended = (e) => {
      if (fullBufferSrc && fullBufferSrc.current) {
        startRemainingSong(e);
        setSongFullyLoaded(true);
        _bufferSrc.disconnect();
      } else {
        setIsLoading(true);
        setIsPlaying(false);
      }
    };

    bufferSrcRef.current = _bufferSrc;
    partialBufferSrc.current = _bufferSrc;

    /*As It starts playing, fetch full song*/
    await axios
      .post("api/nft-type/getSong", {
        key: nft.address + "/" + nft.audioUrl.split("/").slice(-1)[0],
      }, { responseType: "arraybuffer" })
      // .then(res => {
      //   return (download(res.data))
      // })
      .then(
        (fullFile) => {
          console.log("Full song loaded", fullFile);
          prepareRemainingSong(fullFile, _bufferSrc);
          /*props.setCurrentBuffer(fullFile);*/
        },
        (e) => {
          Swal.fire({
            title: "Sorry, something went wrong loading the music",
            text: "Please reload the page",
            imageUrl: errorIcon,
            imageWidth,
            imageHeight,
          });
        }
      );
    /*props.fetchPrevNext();*/
  };

  const startRemainingSong = (data) => {
    if (fullBufferSrc && fullBufferSrc.current) {
      let fullBuffer = fullBufferSrc.current;
      fullBuffer.connect(volumeRef.current);
      fullBuffer.start(0, data.currentTarget.buffer.duration);
      setIsPlaying(true);
      setIsLoading(false);
    } else {
      stopSong();
      setIsLoading(true);
    }
  };

  const prepareRemainingSong = async (songFile, partial) => {
    console.log(partial)
    const fullTime = partial.buffer ? partial.buffer.duration : 300;
    // const abSong = toArrayBuffer(songFile.data.Body.data);
    const abSong = songFile.data;
    const _bufferSrc = audioContextRef.current.createBufferSource();
    audioContextRef.current.decodeAudioData(abSong, async (_buffer) => {
      _bufferSrc.buffer = _buffer;

      fullBufferSrc.current = _bufferSrc;
      bufferSrcRef.current = _bufferSrc;

      /* Do not change the state but get the updated state
       More is explained on the definitions of the refs.*/
      let _counter;
      setCounter((currentState) => {
        _counter = currentState;
        return currentState;
      });

      let _isLoading;
      setIsLoading((currentState) => {
        _isLoading = currentState;
        return currentState;
      });

      /*Verify If audio already reached end of preloaded buffer
      Else the new buffer will only start by the event set in the partialBuffer*/
      if (_isLoading || _counter > fullTime) {
        /*If we got buffer right when the buffer stopped we need to protect It against trying to restart buffer*/
        partialBufferSrc.current.onended = () => { };
        setSongFullyLoaded(true);
        _bufferSrc.connect(volumeRef.current);
        _bufferSrc.start(0, _counter);
        playSong();
        setDur(_bufferSrc.buffer.duration);
        setIsLoading(false);
      }
      /*props.fetchPrevNext();
      props.setCurrentBuffer(songFile);*/
    });
  };

  const startSong = async (songFile) => {
    const _bufferSrc = await startNewContext(songFile);
    playSong();

    setSongFullyLoaded(true);
    setDur(_bufferSrc.buffer.duration);

    fullBufferSrc.current = _bufferSrc;
    partialBufferSrc.current = false;
    /*props.fetchPrevNext();*/
  };

  const playSong = () => {
    if (
      audioContextRef.current.state === "suspended" &&
      audioContextRef.current
    )
      audioContextRef.current.resume();
    setIsPlaying(true);
  };

  const stopSong = () => {
    setIsPlaying(false);
    if (audioContextRef.current.suspend) {
      audioContextRef.current.suspend();
    }
  };

  const skipToFullBuffer = async (time) => {
    const currentTime = partialBufferSrc.current.context.currentTime;
    /*Bellow, when we stop the buffer, we start the full buffer,
    because of that is necessary to stop and disconnect also the new one*/
    partialBufferSrc.current.stop();
    partialBufferSrc.current.disconnect();

    if (fullBufferSrc && fullBufferSrc.current) {
      const _bufferSrc = audioContextRef.current.createBufferSource();
      _bufferSrc.buffer = fullBufferSrc.current.buffer;
      setSongFullyLoaded(true);
      _bufferSrc.connect(volumeRef.current);
      _bufferSrc.start(0, time);

      setIsPlaying(true);
      setIsLoading(false);

      const { computedSecond, computedMinute } = timeStr(time);
      setMinute(computedMinute);
      setSecond(computedSecond);
      setFilled((time * 100) / dur);
      setCounter(time);
      bufferSrcRef.current = _bufferSrc;
      setStartTime(currentTime - time);
    } else {
      stopSong();
    }
  };

  const skipTo = (time) => {
    const originalBuffer = bufferSrcRef.current;
    const currentTime = originalBuffer.context.currentTime;
    time = time < 0 ? 0 : time;
    time = time > dur ? dur : time;

    /*Verify if already has full buffer not loaded yet*/
    if (fullBufferSrc && fullBufferSrc.current && !songFullyLoaded) {
      partialBufferSrc.current.onended = () => { };
      skipToFullBuffer(time);
    } else if (
      !fullBufferSrc.current &&
      !songFullyLoaded &&
      time >= bufferSrcRef.current.buffer.duration
    ) {
      partialBufferSrc.current.stop();
      partialBufferSrc.current.disconnect();
      stopSong();

      const { computedSecond, computedMinute } = timeStr(time);
      setMinute(computedMinute);
      setSecond(computedSecond);
      setFilled((time * 100) / dur);
      setCounter(time);
      setStartTime(currentTime - time);
      setIsLoading(true);
    } else if (bufferSrcRef.current) {
      /*If doesnt have full song yet, will skip to the end of the song (what will run the onEnd event callback from the partialBuffer)*/
      bufferSrcRef.current.stop();
      bufferSrcRef.current.disconnect();

      let newBufferSrc = audioContextRef.current.createBufferSource();
      newBufferSrc.buffer = originalBuffer.buffer;
      newBufferSrc.connect(volumeRef.current);
      newBufferSrc.start(currentTime, time);
      if (
        audioContextRef.current.state === "suspended" &&
        audioContextRef.current
      ) {
        audioContextRef.current.resume();
      }

      const { computedSecond, computedMinute } = timeStr(time);
      setMinute(computedMinute);
      setSecond(computedSecond);
      setFilled((time * 100) / dur);
      setCounter(time);
      bufferSrcRef.current = newBufferSrc;
      setStartTime(currentTime - time);
      setIsPlaying(true);
    }
  };

  const skipTime = (howMuch, forward) => {
    howMuch = forward ? howMuch : -howMuch;
    const currentTime = bufferSrcRef.current.context.currentTime;
    skipTo(currentTime - startTime + howMuch);
  };

  const changeVol = (howMuch) => {
    howMuch = howMuch < 0.1 ? 0 : howMuch > 1 ? 1 : howMuch;
    volumeRef.current.gain.value = howMuch;
    setVolume(howMuch);
  };

  const timeStr = (time) => {
    time = Math.floor(time);
    const secondCounter = time % 60;
    const minuteCounter = Math.floor(time / 60);

    const computedSecond =
      String(secondCounter).length === 1 ? `0${secondCounter}` : secondCounter;
    const computedMinute =
      String(minuteCounter).length === 1 ? `0${minuteCounter}` : minuteCounter;
    return { computedMinute, computedSecond };
  };

  useEffect(() => {
    const getPartialSong = async () => {
      if (bufferSrcRef.current) {
        setIsLoading(true);
        setIsPlaying(false);
        bufferSrcRef.current.stop();
        bufferSrcRef.current.disconnect();
      }
      axios
        .post("api/nft-type/getPartialSong", {
          key: nft.address + "/" + nft.audioUrl.split("/").slice(-1)[0],
        })
        .then(
          (songFile) => {
            console.log("songfile", songFile)
            startPartialSong(songFile);
          },
          (e) => {
            console.log("Error: ", e.err);
          }
        );
    };
    setCounter(0);
    if (!nft.buffer) {
      getPartialSong();
    } else {
      /*Song Fully Preloaded*/
      startSong(nft.buffer);
    }
  }, [nft]);

  useEffect(() => {
    let intervalId;
    if (
      isPlaying &&
      bufferSrcRef.current &&
      bufferSrcRef.current.context &&
      bufferSrcRef.current.context.currentTime
    ) {
      intervalId = setInterval(() => {
        let time = bufferSrcRef.current.context.currentTime - startTime;
        if (time >= dur) {
          time = dur;

          stopSong();

          /*If song reached end of loaded buffer*/
          if (!songFullyLoaded) setIsLoading(true);
          else if (isLoop) {
            skipTo(0);
            playSong();
          } else {
            clearInterval(intervalId);
            /*Go to next song*/
            /*setNextNft();*/
          }
        } else {
          const { computedSecond, computedMinute } = timeStr(time);
          setSecond(computedSecond);
          setMinute(computedMinute);
          setFilled((time * 100) / dur);
          setCounter(time);
        }
      }, 1000 / 30);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPlaying, counter]);

  useEffect(() => {
    const audioCtx = new AudioContext();
    /* Store context and start suspended */
    audioContextRef.current = audioCtx;

    /* When song ends by another one starting, we clean the audioCtx */
    return async () => {
      await audioCtx.close();
    };
  }, []);

  const Duration = () => {
    const { computedSecond, computedMinute } = timeStr(dur);
    return (
      <Counter>
        {computedMinute}:{computedSecond}
      </Counter>
    );
  };

  return (
    <Wrapper>
      <AudioControl
        skipTime={skipTime}
        playSong={playSong}
        stopSong={stopSong}
        setNext={setNextNft}
        setPrev={setPrevNft}
        isPlaying={isPlaying}
        isLoading={isLoading}
      />
      {!isMobile() ? (
        <AudioProgressionSection>
          <Counter>
            {minute}:{second}
          </Counter>
          <ProgressBar
            filled={filled}
            skipTo={skipTo}
            dur={dur}
            isLoading={isLoading}
          />
          {Duration()}
        </AudioProgressionSection>
      ) : (
        <MobileWrapper>
          <AudioProgressionSection>
            <Counter>
              {minute}:{second}
            </Counter>
            <ProgressBarMobile
              filled={filled}
              skipTo={skipTo}
              dur={dur}
              isLoading={isLoading}
            />
            {Duration()}
          </AudioProgressionSection>
        </MobileWrapper>
      )}
      {isLoading && !isMobile() ? (
        <LoadingContainer>
          <Loading src={loading} />
        </LoadingContainer>
      ) : (
        <VolumeAndLoopControl
          filled={volume * 100}
          setLoop={setIsLoop}
          isLoop={isLoop}
          changeVol={changeVol}
        />
      )}
      <TrackInfoWrapper>{nft && <TrackInfo nft={nft} />}</TrackInfoWrapper>
      {/* {!isMobile() ? (
        <TrackInfoWrapper>{nft && <TrackInfo nft={nft} />}</TrackInfoWrapper>
      ) : isLoading ? (
        <LoadingContainer>
          <Loading src={loading} />
        </LoadingContainer>
      ) : (
        <TrackInfoWrapper>{nft && <TrackInfo nft={nft} />}</TrackInfoWrapper>
      )} */}

      <Exit onClick={props.exitPlayer} />
    </Wrapper>
  );
};
const MobileWrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 59px;
  width: 100%;
  height: 30px;
  border-top: 1px solid ${(props) => props.theme.color.boxBorder};
  /* height: 59px; */
  background-color: ${(props) => props.theme.color.darkBlack};
  padding-top: 15px;
`;

const LoadingContainer = styled.div`
  width: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Exit = styled(XIcon)`
  cursor: pointer;
  width: 36px;
  height: 36px;
  margin-left: 24px;
  & path {
    fill: ${(props) => props.theme.color.lightgray} !important;
  }
`;

const Counter = styled.div`
  width: 60px;
  font-size: ${(props) => props.theme.fontSizes.xs};
  color: ${(props) => props.theme.color.lightgray};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const AudioProgressionSection = !isMobile()
  ? styled.div`
      width: calc(50vw);
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      flex: 1;
      /* @media only screen and (max-width: 776px) {
    display: none;
  } */
    `
  : styled.div`
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      flex: 1;
      /* @media only screen and (max-width: 776px) {
  display: none;
} */
    `;

const Loading = styled.img`
  width: 20px;
  height: 20px;
  & path {
    stroke: ${(props) => props.theme.color.lightgray};
  }
`;

const TrackInfoWrapper = styled.div`
  align-items: center;
  justify-content: center;
  margin-left: 14px;
  display: flex;
  flex-direction: Row;
  color: white;
  @media only screen and (max-width: 776px) {
    position: absolute;
    left: 25vw;
    bottom: 10px;
    /* margin-right: calc(-20% - 20px); */
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: calc(100vw - 40px);
  padding: 0 20px;
  border-top: 1px solid ${(props) => props.theme.color.boxBorder};
  height: 59px;
  background-color: ${(props) => props.theme.color.darkBlack};
  @media only screen and (max-width: 776px) {
    padding: 0;
    width: 100vw;
    /* margin-right: calc(-20% - 20px); */
  }
`;
export default MusicPlayer;
