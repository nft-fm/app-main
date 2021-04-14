import React, { useCallback, useEffect, useState, useRef } from "react";
import { useWallet } from "use-wallet";
import BaseView from "../BaseView";
import axios from "axios";
import styled from "styled-components";
import default_pic from "../../assets/img/profile_page_assets/default_profile.png";
import Create from "./components/Create"



const Profile = () => {
  const { account, connect } = useWallet();
  const [user, setUser] = useState();
  const [songList, setSongList] = useState([]);

  const getUser = async () => {
    axios
      .post("api/user/get-account", { address: account })
      .then((res) => setUser(res.data));
  };

  const getSongList = async () => {
    console.log(account);
    if (account) {
      const _songList = await axios.post("api/nft-type/getSongList", {
        account: account.toString(),
      });
      setSongList(_songList.data.Contents);
    }
  };

  useEffect(() => {
    getSongList();
    getUser();
  }, [account]);
  const toArrayBuffer = (buf) => {
    var ab = new ArrayBuffer(buf.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buf.length; ++i) {
      view[i] = buf[i];
    }
    return ab;
  };
  const playSong = async (song) => {
    const _songFile = await axios.post("api/nft-type/getSong", {
      key: song.Key,
    });
    console.log(_songFile);
    const abSong = toArrayBuffer(_songFile.data.Body.data);
    var audioCtx = new window.AudioContext();
    var source = audioCtx.createBufferSource();
    audioCtx.decodeAudioData(
      abSong,
      (buffer) => {
        source.buffer = buffer;
        source.connect(audioCtx.destination);
        source.loop = true;
      },
      (e) => {
        console.log("Error: ", e.err);
      }
    );
    source.start(0);
  };

  const handleClick = () => {
    console.log(songList);
  };

  const [edit, setEdit] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const saveDetails = () => {
    setEdit(false);
    axios
      .post("/api/user/update-account", {
        address: account,
        username: username,
        email: email,
      })
      .then((res) => setUser(res.data));
  };
  if (account) {
    return (
      <BaseView>
        <LandingSection>
          <Banner>
            <ProfilePic src={default_pic} alt="profile picture" />
          </Banner>
        </LandingSection>
        <AccountDetails>
          {/* {!user?.username && <span>no username, click to add</span>}
          {!user?.username ? <StyledInput type="text" /> : <span>{user.username}</span>}
          {!user?.email ? <StyledInput type="email" /> : <span>{user.email}</span>} */}
          <span>
            Username:{" "}
            {edit ? (
              <StyledInput
                type="text"
                defaultValue={user?.username}
                onChange={(e) => setUsername(e.target.value)}
              />
            ) : (
              user?.username
            )}
          </span>
          <span>
            Email:{" "}
            {edit ? (
              <StyledInput
                type="email"
                defaultValue={user?.email}
                onChange={(e) => setEmail(e.target.value)}
              />
            ) : (
              user?.email
            )}
          </span>
          {edit ? (
            <button onClick={() => saveDetails()}>Save</button>
          ) : (
            <button onClick={() => setEdit(true)}>Edit</button>
          )}
        </AccountDetails>
        <Create />
        {songList.length <= 0 ?
          <h1>
            No songs owned. Go to the 'listen' page to build your collection!
        </h1>
          :
          <div key={songList}>
            {songList.map((song) => {
              if (song.Key)
                return (
                  <div>
                    {song.Key.split("/")[1]}
                    <button
                      onClick={() => {
                        playSong(song);
                      }}
                    >
                      Download and play!
              </button>
                  </div>
                );
            })}
          </div>

        }
      </BaseView>
    );
  }
  return (
    <BaseView>
      <LandingSection>
        <Banner>
          <ProfilePic src={default_pic} alt="profile picture" />
        </Banner>
      </LandingSection>
      <AccountDetails></AccountDetails>
      <h1> Connect your wallet to view your collection!</h1>
    </BaseView>
  );
};

const StyledInput = styled.input`
  background-color: #eaeaea;
  border: none;
  border-bottom: 1px solid #bababa;
  outline: none;
`;

const AccountDetails = styled.div`
  width: 100%;
  margin-top: 75px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfilePic = styled.img`
  width: 150px;
  position: absolute;
  bottom: -75px;
  border: 4px solid#7e2ce3;
  border-radius: 75px;
  background-color: #7e2ce3;
`;

const LandingSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`;

const HeaderContents = styled.span`
  color: white;
  width: 80%;
  font-family: "Compita";
  font-weight: bold;
  letter-spacing: 2px;
  font-size: 40px;
  /* margin-top: -40px; */
  /* margin-top: 50px; */
`;

const Banner = styled.div`
  margin-top: -65px;
  width: 100%;
  height: 365px;
  background-color: black;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-bottom: 4px solid#7e2ce3;
  z-index: 0;
  position: relative;
`;
export default Profile;
