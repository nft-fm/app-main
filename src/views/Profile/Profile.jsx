import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import BaseView from "../../components/Page/BaseView";
import { useAccountConsumer } from "../../contexts/Account";
import CreateForm from "./components/CreateForm";
import IconMetamask from "../../assets/img/icons/metamask_icon.png";
import ArtistNfts from "./components/ArtistNfts";
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
import { providers } from "ethers";
import { usePlaylistConsumer } from "../../contexts/Playlist";
import ArtistCard from "../../components/NftCards/ArtistCard";
import Stakers from "./components/Stakers";
import { ReactComponent as CheckIcon } from "../../assets/img/icons/check_circle.svg";
import isMobile from "../../utils/isMobile";

const Profile = () => {
  const { account, connect, user } = useAccountConsumer();
  const [open, setOpen] = useState(false);
  const [reset, setReset] = useState(false);
  const [userSigned, setUserSigned] = useState(false);
  const [whichView, setWhichView] = useState(true);
  const [stakers, setStakers] = useState([]);
  const [nfts, setNfts] = useState([]);
  const { setNftsCallback } = usePlaylistConsumer();
  const [username, setUsername] = useState("");
  const [copySuccess, setCopySuccess] = useState('');
  const [buttontext, setButtonText] = useState('Embed Profile');

  useEffect(() => {
    if (user) {
    user.suburl && setUsername(user.suburl);
    }
  }, [user]);

  const copyToClipBoard = async () => {
    try {
      await navigator.clipboard.writeText(`<iframe src= "https://beta.fanfare.fm/artist/${username}" title="Fanfare" width="100%" height="650px"></iframe>`);
      setCopySuccess('Copied!');
      setButtonText('iFrame Copied!');
    } catch (err) {
      setCopySuccess('Failed to copy!');
      setButtonText('Failed to copy!');
    }
  };


  const formatNfts = (nftsData) => {
    const formattedNfts = nftsData.map((nft, index) => (
      <ArtistCard nft={nft} key={index} index={index} />
    ));
    for (let i = 0; i < 5; i++) {
      formattedNfts.push(<FillerCard />);
    }
    return formattedNfts;
  };
  const getArtistNfts = async () => {
    setNfts([]);
    axios.post("api/nft-type/artist-nfts", user).then((res) => {
      setNfts(formatNfts(res.data));
      setNftsCallback(res.data);
    });
  };
  const getStakers = async () => {
    axios.post("api/nft-type/artist-stakers", user).then((res) => {
      if (res.data.length > 0) {
        console.log(res.data)
        setStakers(res.data);
      }
    });
  };

  useEffect(() => {
    if (user) {
      getArtistNfts();
      getStakers();
    }
  }, [user]);

  const openMintModal = async () => {
    try {
      if (user.username === "") {
        swal.fire("You need to set a username first!");
        return;
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

  const openCreateForm = async () => {
    if (!user.confirmedFeeIncrease && !userSigned) {
      swal
        .fire({
          title: `Fanfare's terms have changed.`,
          html: `<span>In order to mint new NFTs you need to agree to the new fee on initial sales, which is now 10%.
          Your previously minted NFTs will not be affected, this only applies to new NFTs.
          Read more about this <a href="https://nft-fm.medium.com/whats-coming-up-for-nft-fm-eddbfc5587eb" target="_blank" rel="noopener noreferrer">here</a>.</span>`,
          showDenyButton: true,
          showCloseButton: true,
          confirmButtonText: `Agree to Terms`,
        })
        .then(async (res) => {
          if (res.isConfirmed) {
            const provider = new providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            signer
              .signMessage(JSON.stringify({ account }))
              .then((authorization) => {
                axios
                  .post("/api/user/signNewFee", {
                    account,
                    auth: authorization,
                  })
                  .then(() => {
                    swal
                      .fire({
                        title:
                          "Thank you, you may now proceed to minting new NFTs.",
                        timer: 3000,
                      })
                      .then(() => {
                        setUserSigned(true);
                        openMintModal();
                      });
                  })
                  .catch((err) => {
                    console.log("err", err.response);
                    swal.fire({
                      title: `Error: ${
                        err.response ? err.response.status : 404
                      }`,
                      text: `${
                        err.response ? err.response.data : "server error"
                      }`,
                      imageUrl: errorIcon,
                      imageWidth,
                      imageHeight,
                    });
                  });
              });
          }
        });
    } else {
      openMintModal();
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
      <EmbedSection>
      <EmbedButton 
      onClick={copyToClipBoard}
      >
      {buttontext}
      </EmbedButton>
      </EmbedSection>
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
          <NftContainerTitle>
            {whichView ? "YOUR MUSIC" : "YOUR STAKERS"}
          </NftContainerTitle>
          <NftContainerLeft>
            <NftContainerLeftSpan
              selected={whichView}
              onClick={() => stakers && setWhichView(!whichView)}
            >
              NFTs
            </NftContainerLeftSpan>
            &nbsp;|&nbsp;
            <NftContainerLeftSpan
              selected={!whichView}
              onClick={() =>  stakers && setWhichView(!whichView)}
            >
              Staking
            </NftContainerLeftSpan>
          </NftContainerLeft>
          <NftContainerRight onClick={() => openCreateForm()}>
            <span>Create&nbsp;&nbsp;</span>
            <PlusIcon />
          </NftContainerRight>
          <NftContainerOutline />
          {whichView ? (
            <ArtistNfts nfts={nfts} />
          ) : (
            <Stakers stakers={stakers} />
          )}
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
const FillerCard = styled.div`
  width: 377px;
  height: 0px;
`;

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

const CreatedNftHolder = !isMobile 
? styled.div`
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
`:
styled.div`  
display: flex;
flex-direction: column;
width: 100%;
align-items: center;
/* width: ${(props) => props.theme.homeWidth}px; */
/* max-width: 80vw; */
padding-top: 40px;
color: white;
font-size: ${(props) => props.theme.fontSizes.xs};
padding-right: 4px`;

const NftContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`;

const NftContainerTitle = styled.span`
  width: 105px;
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

const NftContainerLeft = styled.div`
  cursor: pointer;
  position: absolute;
  font-weight: 600;
  margin-left: 20%;
  margin-right: 80%;
  height: 17px;
  /* width: 17px; */
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
  color: ${(props) => props.theme.color.gray};
`;

const NftContainerLeftSpan = styled.span`
  color: ${(props) => (props.selected ? "white" : props.theme.color.gray)};
  cursor: pointer;
`;

const NftContainerRight = !isMobile()
? styled.div`
  cursor: pointer;
  position: absolute;
  font-weight: 600;
  margin-left: 80%;
  margin-right: 20%;
  height: 17px;
  /* width: 17px; */
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
`:
styled.div`
cursor: pointer;
position: absolute;
font-weight: 600;
margin-left: 40%;
margin-right: 20%;
height: 17px;
/* width: 17px; */
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
  /* border-top: 6px solid #383838;
  height: 40px;
  width: 80%;
  display: flex;
  flex-direction: row;

  @media only screen and (max-width: 776px) {
    width: 100%;
  } */

  border-radius: 24px 24px 0 0;
  border: 6px solid #383838;
  border-bottom: none;
  height: 40px;
  width: 80%;
  /* display: flex;
  flex-direction: row; */
  @media only screen and (max-width: 776px) {
    border-radius: 0;
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

const Check = styled(CheckIcon)`
  cursor: pointer;
  width: 24px;
  height: 24px;
  transition: all 0.1s ease-in-out;
  & path {
    fill: ${(props) => props.theme.color.white};
  }
`;

const Confirm = styled.div`
display: flex;
flex-direction: row;
align-items: center;
margin: 5px;
`

const EmbedSection = styled.div`

`;

const EmbedButton = styled.button`
width: 100px;
height: 34px;
cursor: pointer;
transition: all 0.1s ease-in-out;
display: flex;
flex-direction: column;
font-size: 10px;
font-weight: 600;
color: white;
align-items: center;
justify-content: center;
border: 1px solid ${(props) => props.theme.color.boxBorder};
border-radius: 2px;
background-color: ${(props) => props.theme.color.box};
/* margin-bottom: 20px; */
&:hover {
  background-color: ${(props) => props.theme.color.boxBorder};
  border: 1px solid #383838;
}
`;


export default Profile;
