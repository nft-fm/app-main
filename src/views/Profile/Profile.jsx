import React, { useCallback, useEffect, useState, useRef } from "react";
import { useWallet } from "use-wallet";
import BaseView from "../BaseView";
import axios from "axios";
import styled from "styled-components";
import default_pic from "../../assets/img/profile_page_assets/default_profile.png";
import Create from "./components/Create";
import {useAccountConsumer} from "../../contexts/Account";

const Profile = () => {
<<<<<<< HEAD
  const { account, connect } = useWallet();
  const [user, setUser] = useState();
  const [ownedNfts, setOwnedNfts] = useState([]);
  console.log("ownedNfts", ownedNfts);
=======
  const [ownedNfts, setOwnedNfts] = useState([]);
  console.log("ownedNfts", ownedNfts);
  const { account, user, setUser } = useAccountConsumer();

  // const [songList, setSongList] = useState([]);

>>>>>>> 5d5e9a7d9863ac20fb9460fa8c582a7eddb7b734
  const getUser = async () => {
    axios
      .post("api/user/get-account", { address: account })
      .then((res) => setUser(res.data));
  };

  const getUserNfts = async () => {
    console.log("here");
    axios
      .post("api/nft-type/get-user-nfts", user)
      .then((res) => setOwnedNfts(res.data));
  };
  useEffect(() => {
    getUserNfts();
  }, [user]);
  useEffect(() => {
    getUser();
  }, [account]);

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

  const [isCreating, setIsCreating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const hide = (e) => {
    setIsOpen(false);
    console.log("isOpen", isOpen);
  };
  return (
    <BaseView>
      <Banner />
      <ProfileHeading>
        <Side />
        <ProfileHolder>
          <ProfilePicHolder>
            <ProfilePic src={default_pic} alt="default-profile-pic" />
          </ProfilePicHolder>
          <span>{user?.username}</span>
          <span>{user?.address}</span>
        </ProfileHolder>
        <Side>
          <span>12 /NFTs</span>
          <span>8 Traded</span>
        </Side>
      </ProfileHeading>
      {/* {user?.isArtist && (
          <button onClick={() => setIsOpen(!isOpen)}>Create NFT!</button>
        )}
        <Create open={isOpen} hide={hide} /> */}
    </BaseView>
  );
};

const ProfilePicHolder = styled.div`
background-color: ${props => props.theme.boxBorderColor};
  border-width: 4px;
  border-color: ${props => props.theme.boxBorderColor};
  border-style: solid;
  border-radius: 75px;
  width: 100px;
  height: 100px;
  overflow: hidden;
`;

const ProfilePic = styled.img`
width: 100%;
`;

const Side = styled.div`
  width: calc(100% / 3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;

const ProfileHolder = styled.div`
  width: calc(100% / 3);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileHeading = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  width: 50%;
  color: ${props => props.theme.fontColor.white}
`;

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
  color: white;
`;

const LandingSection = styled.div``;

const Banner = styled.div`
  height: 100px;
`;
export default Profile;

{
  /* <AccountDetails>
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
</AccountDetails> */
}
