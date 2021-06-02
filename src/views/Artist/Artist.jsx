import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import BaseView from "../../components/Page/BaseView";
import CreateForm from "../Profile/components/CreateForm";
import PublicProfilePic from "./Components/PublicProfilePic";
import PublicArtistNfts from "./Components/PublicArtistNfts";
import default_pic from "../../assets/img/profile_page_assets/default_profile.png";

import { ReactComponent as IconTwitter } from "../../assets/img/icons/social_twitter.svg";
import Instagram from "../../assets/img/icons/social_instagram.png";
import Audius from "../../assets/img/icons/social_audius.png";
// import { ReactComponent as IconInstagram } from "../../assets/img/icons/social_instagram.svg";
const Artist = () => {
  const [edit, setEdit] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [userNfts, setUserNfts] = useState();
  console.log("userInfo", userInfo);
  useEffect(() => {
    if (userInfo?.profilePic) {
      setProfilePic(userInfo.profilePic);
    }
  }, [userInfo]);
  useEffect(() => {
    axios
      .post("/api/user/get-public-account", {
        suburl: window.location.pathname.substring(
          window.location.pathname.lastIndexOf("/") + 1
        ),
      })
      .then((res) => {
        setUserInfo(res.data[0]);
        setUserNfts(res.data[1]);
      })
      .catch(() => (window.location = "/"));
  }, []);

  return (
    <BaseView>
      <Landing>
        <Banner />
        <ProfileHeading>
          <Side />
          <ProfileHolder>
            <PublicProfilePic
              profilePic={
                profilePic && profilePic !== "" ? profilePic : default_pic
              }
              setProfilePic={setProfilePic}
              edit={edit}
              setEdit={setEdit}
            />
            <ProfileInfoHolder>
              <Username>{userInfo?.username}</Username>
              <Divider />

              <AddressSpan>
                {userInfo?.address.substring(0, 10) +
                  "..." +
                  userInfo?.address.substring(userInfo.address.length - 4)}
              </AddressSpan>
            </ProfileInfoHolder>
          </ProfileHolder>
          <Side></Side>
        </ProfileHeading>
      </Landing>

      <SocialsBar>
        {userInfo?.socials.map((social) => {
          console.log(social);
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
          <NftContainerTitle>AVAILABLE MUSIC</NftContainerTitle>
          <NftContainerOutline />
          <PublicArtistNfts nfts={userNfts} />
        </NftContainer>
      </CreatedNftHolder>
    </BaseView>
  );
};

const InstaIcon = styled.img`
  height: 17px;
  width: 17px;
  filter: invert(1);
`;
const AudiusIcon = styled.img`
  height: 17px;
  width: 17px;
  /* filter: invert(1); */
`;

const Twitter = styled(IconTwitter)`
  /* margin-top: 1px; */
  width: 17px;
  height: 17px;
  & path {
    transition: all 0.2s ease-in-out;
    fill: white;
  }
`;

const IconText = styled.span`
  margin: 1px 0 0 12px;
  font-weight: 600;
  letter-spacing: 1px;
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

const Side = styled.div`
  width: calc(100% / 3);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  & > span:nth-child(1) {
    margin-top: 40px;
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

// const Instagram = styled(IconInstagram)`
//   margin-top: 1px;
//   width: 17px;
//   height: 17px;
//     filter: invert(1);
//   & path {
//     transition: all 0.2s ease-in-out;
//     fill: ${(props) => props.theme.color.white};
//   }
// `;

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
const ProfileInfoHolder = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
export default Artist;
