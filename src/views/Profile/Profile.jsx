import React, { useCallback, useEffect, useState, useRef } from "react";
import { useWallet } from "use-wallet";
import BaseView from "../BaseView";
import axios from "axios";

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

  if (account && songList.length > 0)
    return (
      <BaseView >
        <h1>Profile</h1>
        <div key={songList}>
          {songList.map(song => {
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
          }
        </div>
      </BaseView>
    );
  else if (account)
    return (
      <BaseView>
        <h1>No songs owned :(. Go to the 'listen' page to build your collection!</h1>
      </BaseView>
    )
  else
    return (
      <BaseView>
        <h1> Connect your wallet to view your collection!</h1>
      </BaseView>
    )
};

export default Profile;
