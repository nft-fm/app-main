import React, { useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useWallet } from "use-wallet";
import axios from "axios";
import swal from "sweetalert2";

import { NavLink } from "react-router-dom";
import BaseView from "../BaseView";
import { useAccountConsumer } from "../../contexts/Account";

import CreateForm from "./components/CreateForm";
import IconMetamask from "../../assets/img/icons/metamask_icon.png";
import cog from "../../assets/img/icons/cog.svg";
import ProfilePic from "./components/ProfilePic";
import ArtistNfts from "./components/ArtistNfts";
import default_pic from "../../assets/img/profile_page_assets/default_profile.png";
import Error404 from "../404/404";

import { ReactComponent as plus_icon } from "../../assets/img/icons/plus_icon.svg";
const Profile = () => {
  const { account, connect, user, setUser, usdPerEth } = useAccountConsumer();
  const [edit, setEdit] = useState(false);
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user?.profilePic) {
      setProfilePic(user.profilePic);
    }
  }, [user]);

  const saveDetails = (e) => {
    e.preventDefault();
    setEdit(false);
    setUser({ ...user, username: username });
    axios
      .post("/api/user/update-account", {
        address: account,
        username: username,
        profilePic: profilePic,
        // email: email,
      })
      .then((res) => setUser(res.data));
  };

  //this probably needs some work
  if (!user || (user && !user.isArtist)) return <Error404 />;

  return (
    <BaseView>
      {!account && (
        <IsConnected>
          <GetConnected>
            <ConnectButton onClick={() => connect("injected")}>
              <MetaMask src={IconMetamask} />
              <ButtonText>Connect Wallet</ButtonText>
            </ConnectButton>
          </GetConnected>
        </IsConnected>
      )}
      {/* {user && !user?.username && (
      <IsConnected>
        <GetConnectedNav>
          <span>Head to the Library page and set a username. Then you can start making NFT's!</span>
          <ConnectNavLink to="/library">
            <ButtonTextNav>Library</ButtonTextNav>
          </ConnectNavLink>
        </GetConnectedNav>
      </IsConnected>
    )} */}
      <Landing>
        <Banner />
        <ProfileHeading>
          <Side />
          <ProfileHolder>
            <Cog
              src={cog}
              alt="edit icon"
              onClick={account ? () => setEdit(!edit) : null}
            />
            <ProfilePic
              profilePic={
                profilePic && profilePic !== "" ? profilePic : default_pic
              }
              setProfilePic={setProfilePic}
              edit={edit}
              setEdit={setEdit}
            />
            <ProfileInfoHolder>
              {edit ? (
                <form onSubmit={(e) => saveDetails(e)}>
                  <StyledInput
                    type="text"
                    placeholder="Enter Username"
                    defaultValue={user?.username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </form>
              ) : (
                <Username>
                  {user && user.username != "" ? user.username : "No username"}
                </Username>
              )}
              <Divider />

              <AddressSpan>
                {user
                  ? user.address.substring(0, 10) +
                    "..." +
                    user.address.substring(user.address.length - 4)
                  : " "}
                {/* {user && (
                <CopyButton
                  onClick={() => {
                    navigator.clipboard.writeText(user.address);
                  }}
                />
              )} */}
              </AddressSpan>
            </ProfileInfoHolder>
          </ProfileHolder>
          <Side>
            {/* <SideSpan>
            12 <BlueSpan>/NFTs</BlueSpan>
          </SideSpan>
          <SideSpan>
            8 <BlueSpan>Traded</BlueSpan>
          </SideSpan> */}
          </Side>
        </ProfileHeading>
      </Landing>

      <CreatedNftHolder>
        <NftContainer>
          <NftContainerTitle>YOUR MUSIC</NftContainerTitle>
          <NftContainerRight onClick={() => setOpen(!open)}>
             
            <PlusIcon />
          </NftContainerRight>
          <NftContainerOutline />
          <ArtistNfts user={user}/>
        </NftContainer>
      </CreatedNftHolder>
      <CreateForm open={open} hide={() => setOpen(false)}/>
    </BaseView>
  );
};

const PlusIcon = styled(plus_icon)`
  width: 17px;
  height: 17px;
  cursor: pointer;
  right: -15px;
  margin-bottom: 2px;
`;

const CreatedNftHolder = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: space-around;
  /* width: ${(props) => props.theme.homeWidth}px; */
  /* max-width: 80vw; */
  padding-top: 40px;
  color: white;
  font-size: ${(props) => props.theme.fontSizes.xs};
  padding-right: 4px;
`;

const NftScroll = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;

  @media only screen and (max-width: 776px) {
    flex-direction: column;
    align-items: center;
  }
`;

const NftContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`;

const NftContainerTitle = styled.span`
  position: absolute;
  font-weight: 600;
  margin-left: auto;
  margin-right: auto;
  top: -13px;
  padding: 5px 12px 3px;
  font: "Compita";
  background-color: ${(props) => props.theme.bgColor};
  font-size: ${(props) => props.theme.fontSizes.xs};
  color: ${(props) => props.theme.color.gray};
  display: flex;
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid #383838;
  border-radius: 20px;
  transition: 0.2s;
  ${({ active }) =>
    !active &&
    `
  color:  white;
  `}
  &:hover {
    color: white;
  }
`;

const NftContainerRight = styled.span`
  position: absolute;
  font-weight: 600;
  margin-left: 85%;
  margin-right: 15%;
  height: 17px;
  width: 17px;
  top: -13px;
  padding: 5px 5px 3px 5px;
  font: "Compita";
  background-color: ${(props) => props.theme.bgColor};
  font-size: ${(props) => props.theme.fontSizes.xs};
  color: ${(props) => props.theme.color.gray};
  display: flex;
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid #383838;
  border-radius: 20px;
  transition: 0.2s;
  ${({ active }) =>
    !active &&
    `
  color:  white;
  `}
  &:hover {
    color: white;
  }
`;

const NftContainerOutline = styled.div`
  /* border-radius: 24px 24px 0 0; */
  border-top: 6px solid #383838;
  /* border-bottom: none; */
  height: 40px;
  width: 80%;
  display: flex;
  flex-direction: row;

  @media only screen and (max-width: 776px) {
    width: 100%;
  }
`;
// const CreateHolder = styled.div`
// display: flex;
// justify-content: center;
// align-items: center;
// height: calc(100vh - 250px);
// min-height: 500px;

// @media only screen and (max-width: 776px) {
//   height: auto;
//   min-height: auto;
//    }
// `

const ButtonTextNav = styled.span`
  font-family: "Compita";
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-weight: 600;
  color: white;
  padding: 5px;
`;
const GetConnectedNav = styled.div`
  width: 400px;
  height: 200px;
  color: white;
  border: 1px solid ${(props) => props.theme.color.boxBorder};
  background-color: ${(props) => props.theme.color.box};
  border-radius: ${(props) => props.theme.borderRadius}px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 300px;
  font-size: ${(props) => props.theme.fontSizes.md};
  text-align: center;
  padding: 20px;
`;

const ConnectNavLink = styled(NavLink)`
  text-decoration: none;
  width: 140px;
  /* height: 64px; */
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border: 1px solid ${(props) => props.theme.color.boxBorder};
  border-radius: 2px;
  background-color: ${(props) => props.theme.color.box};
  /* margin-bottom: 20px; */
  &:hover {
    background-color: ${(props) => props.theme.color.boxBorder};
    border: 1px solid #383838;
  }
`;

const ButtonText = styled.span`
  font-family: "Compita";
  font-size: ${(props) => props.theme.fontSizes.xs};
  font-weight: 600;
  color: white;
`;

const MetaMask = styled.img`
  width: 32px;
  height: auto;
`;

const ConnectButton = styled.button`
  width: 140px;
  height: 64px;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border: 1px solid ${(props) => props.theme.color.boxBorder};
  border-radius: 2px;
  background-color: ${(props) => props.theme.color.box};
  /* margin-bottom: 20px; */
  &:hover {
    background-color: ${(props) => props.theme.color.boxBorder};
    border: 1px solid #383838;
  }
`;

const GetConnected = styled.div`
  width: 300px;
  height: 150px;
  color: white;
  border: 1px solid ${(props) => props.theme.color.boxBorder};
  background-color: ${(props) => props.theme.color.box};
  border-radius: ${(props) => props.theme.borderRadius}px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 300px;
`;

const IsConnected = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  z-index: 11;
`;

//Profile Stuff below here

const Cog = styled.img`
  width: 15px;
  right: 45px;
  position: absolute;
  cursor: pointer;
  :hover {
    animation: rotation 4s infinite linear;
  }
  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
  @media only screen and (max-width: 776px) {
    top: 0px;
    right: -25px;
  }
`;

const ProfileInfoHolder = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Side = styled.div`
  width: calc(100% / 3);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  & > span:nth-child(1) {
    margin-top: 40px;
  }
`;

const ProfileHolder = styled.div`
  position: relative;
  width: calc(100% / 3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const ProfileHeading = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  height: 200px;
  /* margin-top: 80px; */
  color: ${(props) => props.theme.fontColor.white};
  width: 100%;
  justify-content: space-between;
  @media only screen and (max-width: 776px) {
    width: 90%;
  }
`;

const StyledInput = styled.input`
  background-color: ${(props) => props.theme.bgColor};
  font-size: ${(props) => props.theme.fontSizes.sm};
  border: none;
  outline: none;
  color: white;
  opacity: 0.6;
  text-align: center;
`;

const Username = styled.span`
  font-size: ${(props) => props.theme.fontSizes.md};
  white-space: nowrap;
`;

const AddressSpan = styled.span`
  color: ${(props) => props.theme.color.gray};
  display: flex;
  /* align-items: center;s */
  position: relative;
  height: 20px;
`;
const Landing = styled.div`
  /* height: 450px; */
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Banner = styled.div`
  height: 50px;
`;

const Divider = styled.div`
  width: 200px;
  height: 1px;
  background-color: ${(props) => props.theme.fontColor.gray};
  margin-bottom: 6px;
`;
export default Profile;
