import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import BaseView from "../../components/Page/BaseView";
import { useAccountConsumer } from "../../contexts/Account";
import CreateForm from "./components/CreateForm";
import IconMetamask from "../../assets/img/icons/metamask_icon.png";
import cog from "../../assets/img/icons/cog.svg";
import ProfilePic from "./components/ProfilePic";
import ArtistNfts from "./components/ArtistNfts";
import default_pic from "../../assets/img/profile_page_assets/default_profile.png";
import Error404 from "../404/404";
import {
  errorIcon,
  questionIcon,
  imageWidth,
  imageHeight,
} from "../../utils/swalImages";
import swal from "sweetalert2";
import EditableProfile from "./components/EditableProfile";
import { ReactComponent as plus_icon } from "../../assets/img/icons/plus_icon.svg";
import { ReactComponent as IconTwitter } from "../../assets/img/icons/social_twitter.svg";
import Instagram from "../../assets/img/icons/social_instagram.png";
import Audius from "../../assets/img/icons/social_audius.png";
import Spotify from "../../assets/img/icons/social_spotify.png";

const Profile = () => {
  const { account, connect, user, setUser } = useAccountConsumer();
  const [edit, setEdit] = useState(false);
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [open, setOpen] = useState(false);
  const [reset, setReset] = useState(false);

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

  const openMintModal = async () => {
    try {
      if (user.username === "") {
        swal.fire('You ned to set a username first!')
        return
      }

      const hasDraft = await axios.get(`/api/nft-type/has-draft/${account}`);
      if (hasDraft.data.hasDraft) {
        swal
          .fire({
            title: "You have a old draft saved!",
            showDenyButton: true,
            showCloseButton: true,
            confirmButtonText: `Use Draft`,
            denyButtonText: `Delete Draft`,
            imageUrl: questionIcon,
            imageWidth,
            imageHeight,
          })
          .then(async (res) => {
            if (res.isConfirmed) {
              setOpen(!open);
            }
            if (res.isDenied) {
              swal
                .fire({
                  title: "Are you sure you want to delete the draft?",
                  text: "This action cannot be reverted",
                  showCloseButton: true,
                  showDenyButton: true,
                  confirmButtonText: `Yes! Delete it!`,
                  denyButtonText: "No! Go back!",
                  imageUrl: questionIcon,
                  imageWidth,
                  imageHeight,
                })
                .then(async (res2) => {
                  if (res2.isConfirmed) {
                    setReset(true);
                    setOpen(!open);
                  }
                  if (res2.isDenied) {
                    return openMintModal();
                  }
                });
            }
          });
      } else {
        swal
          .fire({
            title: "Mint a new NFT?",
            showCloseButton: true,
            confirmButtonText: `Yes, Create!`,
            imageUrl: questionIcon,
            imageWidth,
            imageHeight,
          })
          .then(async (result) => {
            if (result.isConfirmed) {
              await axios
                .post("/api/nft-type/get-NFT", { account })
                .then(() => setOpen(!open))
                .catch((err) =>
                  console.error("Failed to create new draft", err)
                );
            }
          });
      }
    } catch (error) {
      swal.fire({
        title: "Failed to get response from server",
        imageUrl: errorIcon,
        imageWidth,
        imageHeight,
      });
      console.log(error);
    }
  };

  if (!user || (user && !user.isArtist)) return <Error404 />; //this probably needs some work
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
      <Landing>
        <Banner />
        <EditableProfile />
      </Landing>
      <SocialsBar>
        {user.socials.map((social) => {
          // console.log(social);
          if (social.twitter) {
            return (
              <IconContainer
                href={social.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter />
              </IconContainer>
            );
          }
          if (social.insta) {
            return (
              <IconContainer
                href={social.insta}
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstaIcon src={Instagram} alt="instagram icon" />
              </IconContainer>
            );
          }
          if (social.spotify) {
            return (
              <IconContainer
                href={social.spotify}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SpotifyIcon src={Spotify} alt="instagram icon" />
              </IconContainer>
            );
          }
          if (social.audius) {
            return (
              <IconContainer
                href={social.audius}
                target="_blank"
                rel="noopener noreferrer"
              >
                <AudiusIcon src={Audius} alt="instagram icon" />
              </IconContainer>
            );
          }
        })}
      </SocialsBar>
      <CreatedNftHolder>
        <NftContainer>
          <NftContainerTitle>YOUR MUSIC</NftContainerTitle>
          <NftContainerRight onClick={() => openMintModal()}>
            <PlusIcon />
          </NftContainerRight>
          <NftContainerOutline />
          <ArtistNfts user={user} />
        </NftContainer>
      </CreatedNftHolder>
      <CreateForm
        reset={reset}
        setReset={setReset}
        open={open}
        hide={() => setOpen(false)}
      />
    </BaseView>
  );
};

const SpotifyIcon = styled.img`
  height: 17px;
  width: 17px;
  filter: invert(1);
`;

const InstaIcon = styled.img`
  height: 17px;
  width: 17px;
  filter: invert(1);
`;
const AudiusIcon = styled.img`
  height: 17px;
  width: 17px;
`;

const Twitter = styled(IconTwitter)`
  width: 17px;
  height: 17px;
  & path {
    transition: all 0.2s ease-in-out;
    fill: white;
  }
`;
const IconContainer = styled.a`
  cursor: pointer;
  margin: 0 8px;
  border: solid 1px ${(props) => props.theme.color.boxBorder};
  border-radius: 25px;
  background-color: ${(props) => props.theme.color.box};
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: ${(props) => props.theme.color.boxBorder};
    border: solid 1px #383838;
  }
`;
const SocialsBar = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: -10px;
  @media only screen and (max-width: 776px) {
    /* flex-direction: column; */
    width: 100%;
    justify-content: center;
    margin-top: 10px;
  }
`;

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

export default Profile;
