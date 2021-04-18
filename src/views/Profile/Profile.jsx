import React, { useCallback, useEffect, useState, useRef } from "react";
import { useWallet } from "use-wallet";
import BaseView from "../BaseView";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import default_pic from "../../assets/img/profile_page_assets/default_profile.png";
import Create from "./components/Create";
import { useAccountConsumer } from "../../contexts/Account";
import { ReactComponent as CopyIcon } from "../../assets/img/Icons/copy_icon.svg";
import cog from "../../assets/img/Icons/cog.svg";
import { ReactComponent as plus_icon } from "../../assets/img/Icons/plus_icon.svg";
import NftCard from "../Home/NftCard";
import Slide from 'react-reveal/Slide';
import MusicPlayer from '../../components/MusicPlayer/MusicPlayer'

const Profile = () => {
  const [selectedNft, setSelectedNft] = useState();
  const [ownedNfts, setOwnedNfts] = useState([]);
  console.log("ownedNfts", ownedNfts);
  const { account, user, setUser } = useAccountConsumer();
  const getUser = async () => {
    axios
      .post("api/user/get-account", { address: account })
      .then((res) => setUser(res.data));
  };


  // TODO switch back to get-user-nfts
  const getUserNfts = async () => {
    console.log("here");
    axios
      .post("api/nft-type/get-user-nfts", user)
      .then((res) => setOwnedNfts(res.data));
    // axios.get("api/nft-type/featured").then((res) => setOwnedNfts(res.data));
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

  const saveDetails = (e) => {
    e.preventDefault();
    setEdit(false);
    setUser({ ...user, username: username });
    axios
      .post("/api/user/update-account", {
        address: account,
        username: username,
        // email: email,
      })
      .then((res) => setUser(res.data));
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const hide = (e) => {
    setIsOpen(false);
    console.log("isOpen", isOpen);
  };

  const showNfts = ownedNfts.map((nft) => {
    return (
      <NftCardWrapper>
        <NftCard nft={nft} />
        <button onClick={() => setSelectedNft(nft)}>
          Play!
        </button>
      </NftCardWrapper>
    )
  });

  return (
    <BaseView>
      <Banner />
      <ProfileHeading>
        <Side />
        <ProfileHolder>
          <ProfilePicHolder>
            <ProfilePic src={default_pic} alt="default-profile-pic" />
            <Cog
              src={cog}
              alt="edit icon"
              onClick={account ? () => setEdit(!edit) : null}
            />
          </ProfilePicHolder>
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
        <BigButton>
          <span>Listen</span>
        </BigButton>
        <MidSectionMiddle creating={isCreating}>
          <MidSectionTopRow>
            <ListenSlashCreate>
              <Highlight
                onClick={() => setIsCreating(!isCreating)}
                creating={isCreating}
              >
                Listen
              </Highlight>
              {/* <span> / </span> */}
              <Highlight
                onClick={() => setIsCreating(!isCreating)}
                creating={!isCreating}
              >
                Create
              </Highlight>
            </ListenSlashCreate>
            <ToggleHolder>
              <ToggleLabel>
                <ToggleInput
                  type="checkbox"
                  value={isCreating}
                  checked={isCreating}
                  onClick={() => setIsCreating(!isCreating)}
                />
                <ToggleSlider active={isCreating} />
              </ToggleLabel>
            </ToggleHolder>
          </MidSectionTopRow>
        </MidSectionMiddle>
        <BigButton onClick={() => setIsOpen(!isOpen)}>
          <span>
            Create <br /> NFTs
          </span>
          <PlusButton
            onClick={() => {
              navigator.clipboard.writeText(user.address);
            }} />
        </BigButton>
      </MidSection>
      <NftScroll>
        {showNfts}
      </NftScroll>
      {selectedNft ?
        <Slide bottom duration={1000}>
          <MusicPlayer nft={selectedNft} />
        </Slide>
        :
        <div />
      }
      <Create open={isOpen} hide={hide} />
    </BaseView>
  );
};

const NftCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const NftScroll = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  &::-webkit-scrollbar {
    height: 12px;
    background-color: rgba(256, 256, 256, 0.1);
  }
  margin-bottom: 20px;
  &::-webkit-scrollbar-thumb {
    background-color: rgba(240, 31, 103, 0.4);
    border-radius: 15px;
  }`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  /* ${({ active }) => active && `background-color: #383838`} */
  background-color: ${(props) => props.theme.boxBorderColor};
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 17px;

  &::before {
    position: absolute;
    border-radius: 50%;
    content: "";
    height: 28px;
    width: 28px;
    left: 2px;
    top: 1px;
    background-color: ${(props) => props.theme.color.lightgray};
    ${({ active }) => active && `background-color: #383838`};
    -webkit-transition: 0.4s;
    transition: 0.4s;
    z-index: 1;
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

const PlusButton = styled(plus_icon)`
  width: 40px;
  height: 40px;
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

const BigButton = styled.div`
  width: 35%;
  color: white;
  border-width: 1px;
  background-color: ${(props) => props.theme.boxColor};
  border-color: ${(props) => props.theme.boxBorderColor};
  border-radius: ${(props) => props.theme.borderRadius}px;
  /* padding: 20px; */
  text-align: left;
  font-size: ${(props) => props.theme.fontSizes.md};
  display: flex;
  /* justify-content: center; */
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
  background-color: ${(props) => props.theme.boxColor};
  border-width: 1px;
  border-color: ${(props) => props.theme.boxBorderColor};
  border-radius: ${(props) => props.theme.borderRadius}px;
  padding: 20px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  position: absolute;
  right: 0;
  transition: transform 1s ease-in-out;
  ${({ creating }) => creating && `transform: translateX(-73%);`}
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

const ProfilePicHolder = styled.div`
  background-color: ${(props) => props.theme.color.lightgray};
  border-width: 4px;
  border-color: ${(props) => props.theme.color.lightgray};
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
  justify-content: space-between;
`;

const ProfileHeading = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  height: 200px;
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
