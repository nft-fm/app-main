import React, { useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useWallet } from "use-wallet";
import isMobile from "../../utils/isMobile";
import BaseView from "../BaseView";
import axios from "axios";
import swal from "sweetalert2";
import { PutBucketAnalyticsConfigurationCommand } from "@aws-sdk/client-s3";

const Profile = () => {
  const { account, connect } = useWallet();

  const [songList, setSongList] = useState([]);

  const getSongList = async () => {
    console.log(account)
    if (account) {
      const _songList = await axios.post("api/nft-type/getSongList", { account: account.toString() });
      setSongList(_songList.data.Contents);
    }
  }

  useEffect(() => {
    getSongList();
  }, [account])
  const toArrayBuffer = (buf) => {
    var ab = new ArrayBuffer(buf.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buf.length; ++i) {
      view[i] = buf[i];
    }
    return ab;
  }
  const playSong = async (song) => {
    const _songFile = await axios.post("api/nft-type/getSong", { key: song.Key })
    console.log(_songFile);
    const abSong = toArrayBuffer(_songFile.data.Body.data);
    var audioCtx = new window.AudioContext;
    var source = audioCtx.createBufferSource();
    audioCtx.decodeAudioData(abSong, (buffer) => {
      source.buffer = buffer;
      source.connect(audioCtx.destination);
      source.loop = true;
    },
      (e) => { console.log("Error: ", e.err); })
    source.start(0);
  }

  const handleClick = () => {
    console.log(songList);
  }

  return (
    <BaseView >
      <h1>Profile :D</h1>
      <div key={songList}>
        {songList.length > 0 ?
          songList.map(song => {
            if (song.Key)
              return (
                <div>
                  {song.Key.split('/')[1]}
                  <button onClick={() => { playSong(song) }}>
                    Download and play!
                  </button>
                </div>
              )
          })
          :
          <h1>Buy some songs, doofus!</h1>
        }
      </div>
      <button onClick={() => { handleClick() }}>
        Hi
    </button>
    </BaseView>
  );
};

export default Profile;
