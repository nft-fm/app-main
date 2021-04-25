import React, { useCallback, useEffect, useState, useRef } from "react";
import { useWallet } from "use-wallet";
import BaseView from "../BaseView";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import default_pic from "../../assets/img/profile_page_assets/default_profile.png";
import Create from "./components/Create";
import { useAccountConsumer } from "../../contexts/Account";
import cog from "../../assets/img/icons/cog.svg";
import { ReactComponent as CopyIcon } from "../../assets/img/icons/copy_icon.svg";
import { ReactComponent as plus_icon } from "../../assets/img/icons/plus_icon.svg";
import { ReactComponent as lock_icon } from "../../assets/img/icons/lock.svg";
import IconMetamask from "../../assets/img/icons/metamask_icon.png";

import Library from "./components/Library";
import upload_icon from "../../assets/img/profile_page_assets/upload_icon.svg";
import ProfilePic from "./components/ProfilePic";

const Profile = () => {
  const [ownedNfts, setOwnedNfts] = useState([]);
  console.log("ownedNfts", ownedNfts);
  const { account, connect, user, setUser } = useAccountConsumer();
  const [edit, setEdit] = useState(false);
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [shake, setShake] = useState(false);

  const getUser = async () => {
    axios
      .post("api/user/get-account", { address: account })
      .then((res) => {
        setUser(res.data);
        if(res.data.profilePic) setProfilePic(res.data.profilePic);
      });
  };

  // // TODO switch back to get-user-nfts
  // const getUserNfts = async () => {
  //   console.log("here");
  //   axios
  //     .post("api/nft-type/get-user-nfts", user)
  //     .then((res) => setOwnedNfts(res.data));
  //   // axios.post("api/nft-type/featured").then((res) => setOwnedNfts(res.data));
  // };
  // useEffect(() => {
  //   getUserNfts();
  // }, [user]);
  useEffect(() => {
    getUser();
  }, [account]);

  const saveDetails = (e) => {
    e.preventDefault();
    setEdit(false);
    setUser({ ...user, username: username });
    axios
      .post("/api/user/update-account", {
        address: account,
        username: username,
        profilePic: profilePic
        // email: email,
      })
      .then((res) => setUser(res.data));
  };

  if (shake) {
    setTimeout(() => {
      setShake(!shake);
    }, 2000);
  }

  const hide = (e) => {
    setIsOpen(false);
    console.log("isOpen", isOpen);
  };

  // const showNfts = ownedNfts.map((nft) => {
  //   return (
  //     <NftCardWrapper>
  //       <NftCard nft={nft} />
  //       <PlayButton onClick={() => setSelectedNft(nft)}>
  //         Play!
  //       </PlayButton>
  //     </NftCardWrapper>
  //   )
  // });

  const [newNft, setNewNft] = useState(false)
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
        <ProfileHeading>
          <Side />
          <ProfileHolder>
            <Cog
              src={cog}
              alt="edit icon"
              onClick={account ? () => setEdit(!edit) : null}
            />
            <ProfilePic profilePic={profilePic && profilePic !== "" ? profilePic : default_pic}
                        setProfilePic={setProfilePic} edit={edit} setEdit={setEdit}/>
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

              <AddressSpan>
                {user
                  ? user.address.substring(0, 10) +
                    "..." +
                    user.address.substring(user.address.length - 4)
                  : " "}
                {user && (
                  <CopyButton
                    onClick={() => {
                      navigator.clipboard.writeText(user.address);
                    }}
                  />
                )}
              </AddressSpan>
            </ProfileInfoHolder>
          </ProfileHolder>
          <Side>
            <SideSpan>
              12 <BlueSpan>/NFTs</BlueSpan>
            </SideSpan>
            <SideSpan>
              8 <BlueSpan>Traded</BlueSpan>
            </SideSpan>
          </Side>
        </ProfileHeading>
        <MidSection>
          <BigButtonRight onClick={() => setIsOpen(!isOpen)}>
            <span>
              Create <br /> NFTs
            </span>
            <PlusButton />
          </BigButtonRight>
          <MidSectionMiddle
            creating={isCreating}
            onClick={
              user && user.isArtist
                ? () => setIsCreating(!isCreating)
                : () => setShake(!shake)
            }
          >
            <MidSectionTopRow>
              <ListenSlashCreate>
                <Highlight creating={isCreating}>Listen</Highlight>
                <Highlight creating={!isCreating}>Create</Highlight>
              </ListenSlashCreate>
              {user && user.isArtist ? (
                <ToggleHolder>
                  <ToggleLabel onClick={(e) => e.stopPropagation()}>
                    <ToggleInput
                      type="checkbox"
                      value={!isCreating}
                      checked={isCreating}
                      onClick={() => setIsCreating(!isCreating)}
                    />
                    <ToggleSlider active={isCreating} />
                  </ToggleLabel>
                </ToggleHolder>
              ) : (
                <LockHolder onClick={() => setShake(!shake)}>
                  {/* {shake && <ComingSoon>Feature Coming Soon!</ComingSoon>} */}

                  <LockIcon className={shake ? "shake" : null} />
                </LockHolder>
              )}
            </MidSectionTopRow>
          </MidSectionMiddle>
          <BigButtonLeft>
            <span>Listen</span>
            <span>
              View your <br />
              library below
            </span>
          </BigButtonLeft>
        </MidSection>
      </Landing>
      <Create open={isOpen} hide={hide} setNewNft={setNewNft} />
      <Library user={user} isCreating={isCreating} newNft={newNft} />
    </BaseView>
  );
};

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

const Landing = styled.div`
  height: 450px;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) => props.theme.color.boxBorder};
  -webkit-transition: 1s;
  transition: 1s;
  border-radius: 17px;

  &::before {
    position: absolute;
    border-radius: 50%;
    content: "";
    height: 28px;
    width: 28px;
    left: 2.5px;
    top: 1px;
    background-color: ${(props) => props.theme.color.lightgray};
    ${({ active }) => active && `background-color: #383838`};
    -webkit-transition: 1s;
    transition: 1s;
  }
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  &:checked + ${ToggleSlider} {
    background-color: ${(props) => props.theme.color.blue};
    &::before {
      transform: translateX(28px);
    }
  }
`;

const ToggleLabel = styled.label`
  float: right;
  position: relative;
  width: 60px;
  height: 30px;
  top: 80%;
  left: 90%;
`;

const ToggleHolder = styled.div`
  /* position: absolute; */
  bottom: 10px;
  right: 10px;
  height: 100%;
`;

const MidSectionTopRow = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LockHolder = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  /* height: 100%; */
`;

const ComingSoon = styled.span`
  font-size: ${(props) => props.theme.fontSizes.xxs};
  position: absolute;
  white-space: nowrap;
  width: 90px;
  right: 40px;
  bottom: -10px;
`;

const LockIcon = styled(lock_icon)`
  float: right;
  /* top: 80%;
left: 90%; */
  width: 35px;
  height: 35px;
  cursor: pointer;
  transition: all 0.2s linear;
  & path {
    fill: ${(props) => props.theme.color.gray};
  }

  &:hover {
    & path {
      fill: ${(props) => props.theme.color.lightgray};
    }
  }

  &.shake {
    animation: shake 0.5s;
  }

  @keyframes shake {
    0% {
      transform: translate(2px, 0px) rotate(0deg);
    }
    10% {
      transform: translate(-2px, 0px) rotate(0deg);
    }
    20% {
      transform: translate(2px, 0px) rotate(0deg);
    }
    30% {
      transform: translate(-2px, 0px) rotate(0deg);
    }
    40% {
      transform: translate(2px, 0px) rotate(0deg);
    }
    50% {
      transform: translate(-2px, 0px) rotate(0deg);
    }
    60% {
      transform: translate(2px, 0px) rotate(0deg);
    }
    70% {
      transform: translate(-2px, 0px) rotate(0deg);
    }
    80% {
      transform: translate(2px, 0px) rotate(0deg);
    }
    90% {
      transform: translate(-2px, 0px) rotate(0deg);
    }
    100% {
      transform: translate(2px, 0px) rotate(0deg);
    }
  }
`;

const PlusButton = styled(plus_icon)`
  width: 35px;
  height: 35px;
  cursor: pointer;
  transition: all 0.2s linear;
  & path {
    fill: ${(props) => props.theme.color.gray};
  }

  &:hover {
    & path {
      fill: ${(props) => props.theme.color.lightgray};
    }
  }
`;

const BigButtonLeft = styled.div`
  width: 35%;
  color: white;
  background-color: ${(props) => props.theme.color.box};
  border: 1px solid ${(props) => props.theme.color.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius}px;
  text-align: left;
  font-size: ${(props) => props.theme.fontSizes.md};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* cursor: pointer; */
  & > span {
    padding: 20px 0 0 20px;
  }
  & span:nth-child(2) {
    font-size: ${(props) => props.theme.fontSizes.sm};
    color: ${(props) => props.theme.fontColor.gray};
  }
  & ${PlusButton} {
    margin-top: 55%;
  }
`;
const BigButtonRight = styled.div`
  width: 35%;
  color: white;
  background-color: ${(props) => props.theme.color.box};
  border: 1px solid ${(props) => props.theme.color.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius}px;
  text-align: left;
  font-size: ${(props) => props.theme.fontSizes.md};
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  & > span {
    padding: 20px;
  }
  & ${PlusButton} {
    margin-top: 55%;
  }
`;
const MidSectionMiddle = styled.div`
  width: 50%;
  height: 110px;
  background-color: ${(props) => props.theme.color.box};
  border: 1px solid ${(props) => props.theme.color.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius}px;
  padding: 20px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  position: absolute;
  left: 0;
  transition: transform 1s ease-in-out;
  ${({ creating }) => creating && `transform: translateX(71%);`}
`;

const MidSection = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 500px;
  height: 150px;
  margin-top: 20px;
`;

const Highlight = styled.span`
  color: white;
  cursor: pointer;
  ${({ creating }) => creating && `color: #5c5c5c`};
`;

const MidSectionMessage = styled.span``;
const ListenSlashCreate = styled.span`
  font-size: ${(props) => props.theme.fontSizes.xl};
  display: flex;
  flex-direction: column;
`;

const CopyButton = styled(CopyIcon)`
  width: 15px;
  height: 15px;
  cursor: pointer;
  transition: all 0.2s linear;
  position: absolute;
  margin-left: 150px;
  & path {
    fill: ${(props) => props.theme.color.gray};
  }

  &:hover {
    & path {
      fill: ${(props) => props.theme.color.lightgray};
    }
  }
`;

const Username = styled.span`
  font-size: ${(props) => props.theme.fontSizes.md};
`;

const AddressSpan = styled.span`
  color: ${(props) => props.theme.color.gray};
  display: flex;
  /* align-items: center;s */
  position: relative;
`;
const SideSpan = styled.span`
  font-size: ${(props) => props.theme.fontSizes.sm};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BlueSpan = styled.span`
  padding-left: ${(props) => props.theme.spacing[1]}px;
  color: ${(props) => props.theme.color.blue};
  font-size: ${(props) => props.theme.fontSizes.xs};
`;

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
  width: 800px;
  @media only screen and (max-width: 800px) {
    width: 90%;
  }
`;

const StyledInput = styled.input`
  background-color: ${(props) => props.theme.bgColor};
  border-top: none;
  border-left: none;
  border-right: none;
  border-width: 1px;
  border-bottom-color: ${(props) => props.theme.color.gray};
  outline: none;
  color: white;
  text-align: center;
`;

const AccountDetails = styled.div`
  width: 100%;
  margin-top: 75px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const Banner = styled.div`
  height: 50px;
`;
export default Profile;
