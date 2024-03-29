import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ReactToolTip from "react-tooltip";
import styled from "styled-components";
import { ReactComponent as Exclusive } from "../../assets/img/Badges/exclusive.svg";
import { ReactComponent as Founder } from "../../assets/img/Badges/founder.svg";
import { ReactComponent as Premium } from "../../assets/img/Badges/premium.svg";
import { ReactComponent as Prerelease } from "../../assets/img/Badges/prerelease.svg";
import { ReactComponent as IconBinance } from "../../assets/img/icons/binance-logo.svg";
import { ReactComponent as IconEth } from "../../assets/img/icons/ethereum.svg";
import { ReactComponent as GiftIcon } from "../../assets/img/icons/rewards-gift.svg";
import loading from "../../assets/img/loading.gif";
import { useAccountConsumer } from "../../contexts/Account";
import NftModalHook from "../NftModalHook/NftModalHook";
import LikeShare from "./LikeShare";
import PlaySongSnippet from "../NftModalHook/Components/SimplifiedPlay";
import { useHistory } from "react-router-dom";

const NftCard = (props) => {
  const { user, account } = useAccountConsumer();
  const [nft, setNft] = useState(null);

  const [imageLoaded, setImageLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [partialSong, setPartialSong] = useState(false);
  const [shareCount, setShareCount] = useState({ count: 0 });
  const [basicLoaded, setBasicLoaded] = useState(false);
  const [likesLoading, setLikesLoading] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [userInfo, setUserInfo] = useState();
  const history = useHistory();

  console.log("history",);

  const hide = () => {
    if (history.location.pathname.slice(0, 7) !== "/artist") {
      history.replace(`/market/${""}`);
    }
    setIsModalOpen(false);
  };

  const getSnnipetAWS = async (completeNft) => {
    axios
      .post("/api/nft-type/getSnnipetAWS", {
        key:
          completeNft.address +
          "/30_sec_snnipets/" +
          completeNft.audioUrl.split("/").slice(-1)[0],
      })
      .then((res) => {
        if (!res.data) {
          getNSeconds(props.nft);
        } else {
          setPartialSong(res.data);
        }
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  };

  const getNSeconds = async (completeNft) => {
    await axios
      .post("/api/nft-type/getNSecondsOfSong", {
        key:
          completeNft?.address +
          "/" +
          completeNft?.audioUrl.split("/").slice(-1)[0],
        nft: completeNft,
        startTime: 30,
      })
      .then((res) => {
        const songFile = res.data.Body.data;

        setPartialSong(songFile);
      });
  };

  useEffect(() => {
    if (nft?.artist) {
      axios
        .post("/api/user/get-public-account", {
          suburl: nft.artist.replace(/ /g, "").toLowerCase(),
        })
        .then((res) => {
          setUserInfo(res.data[0]);
          if (res.data[0]?.profilePic) {
            setProfilePic(res.data[0].profilePic);
          }
        })
        .catch(() => (window.location = "/"));
    }
  }, [nft]);

  useEffect(() => {
    if (!props.nft) {
      return;
    }
    getSnnipetAWS(props.nft);
  }, [props.nft]);

  useEffect(() => {
    if (basicLoaded) {
      setLikesLoading(true);
    }
  }, [account]);

  useEffect(() => {
    if (props.nft) {
      setNft({
        ...props.nft,
      });
      setShareCount({ count: props.nft.shareCount });
      setLikeCount(props.nft.likeCount);
      setLiked(props.nft.liked);
      setBasicLoaded(true);
      setLikesLoading(false);
    }
  }, [props.nft, user]);

  if (!nft) {
    return null;
  }


  return (
    <>
      {/* {isModalOpen && */}
      <NftModalHook
        open={isModalOpen}
        hide={hide}
        nft={nft}
        profilePic={profilePic}
        partialSong={partialSong}
        liked={liked}
        setLiked={setLiked}
        likeCount={likeCount}
        setLikeCount={setLikeCount}
        setShareCount={() => setShareCount({ count: shareCount.count + 1 })}
        shareCount={shareCount}
        likesLoading={likesLoading}
      />
      {/* } */}
      <Container
        onClick={() => setIsModalOpen(true)}
        role="button"
        aria-pressed="false"
        tabindex="0"
        open={isModalOpen || isShareOpen}
      >

        <CardTop>
          <Artist to={`/artist/${nft.artist.replace(/ /g, "").toLowerCase()}`}>
            <ProfilePicture img={profilePic} />
            <Text>
              <Caption>Created By</Caption>
              <Name>{nft.artist.length > 25 ? nft.artist.slice(0, 25) + "..." : nft.artist}</Name>
            </Text>
          </Artist>
          <Side>
            <IconArea>
              {nft.numMinted - nft.numSold}
              <span style={{ margin: "0 1px" }}>&nbsp;of&nbsp;</span>
              {nft.numMinted}
              <span style={{ margin: "0 1px" }}>&nbsp;Available</span>
            </IconArea>
          </Side>
        </CardTop>
        <ImageContainer>
          {imageLoaded ? null : <Loading img={loading} alt="image" />}
          <Image
            src={nft.imageUrl}
            style={imageLoaded ? {} : { display: "none" }}
            alt="image"
            onLoad={() => setImageLoaded(true)}
          />
          {
            nft.numMinted === nft.numSold && (<SoldOut>
              <SoldOutText>
                SOLD OUT
              </SoldOutText>
            </SoldOut>
            )
          }
        </ImageContainer>
        <PreviewButton
          onClick={(e) => { e.stopPropagation() }}
        // onClick={(e) => fetchSong(e)}
        >
          {partialSong && <PlaySongSnippet partialSong={partialSong} pauseSong={props.pauseSong} setPauseSong={props.setPauseSong} />}
        </PreviewButton>
        {nft.isRedeemable && (
          <RedeemButtonBackground >
            <RedeemButton>
              {/* Merch */}
              <MerchIcon />
            </RedeemButton>
          </RedeemButtonBackground>
        )}

        <MidSection>
          <TrackName >
            {nft.title.length > 25 ? nft.title.slice(0, 25) + "..." : nft.title}
          </TrackName>
          <BadgeHolder>
            {nft.badges?.map((badge) => {
              if (badge.founder) {
                return (
                  <>
                    <FounderBadge
                      className="founderBadge"
                      data-tip
                      data-for="founderTip"
                    />
                    <ReactToolTip id="founderTip" place="top" effect="solid">
                      Founder
                    </ReactToolTip>
                  </>
                );
              }
              if (badge.premium) {
                return (
                  <>
                    <PremiumBadge
                      className="premiumBadge"
                      data-tip
                      data-for="premiumTip"
                    />
                    <ReactToolTip id="premiumTip" place="top" effect="solid">
                      Premium
                    </ReactToolTip>
                  </>
                );
              }
              if (badge.prerelease) {
                return (
                  <>
                    <PrereleaseBadge
                      className="prereleaseBadge"
                      data-tip
                      data-for="prereleaseTip"
                    />
                    <ReactToolTip id="prereleaseTip" place="top" effect="solid">
                      Prerelease
                    </ReactToolTip>
                  </>
                );
              }
              if (badge.exclusive) {
                return (
                  <>
                    <ExclusiveBadge
                      className="exclusiveBadge"
                      data-tip
                      data-for="exclusiveTip"
                    />
                    <ReactToolTip id="exclusiveTip" place="top" effect="solid">
                      Exclusive
                    </ReactToolTip>
                  </>
                );
              }
              if (badge.redeem) {
                return (
                  <>
                    <MerchBadge
                      className="merchBadge"
                      data-tip
                      data-for="merchTip"
                    />
                    <ReactToolTip id="merchTip" place="top" effect="solid">
                      Merch
                    </ReactToolTip>
                  </>
                );
              }
            })}
          </BadgeHolder>
        </MidSection>
        <BottomSection>
          <CostEth>
            {nft.price !== "..."
              ? parseFloat(nft.price).toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 6,
              })
              : nft.price}

            <Price>
              {nft.chain === "ETH" ? <Eth /> : <Bsc />}
              {nft.chain === "ETH" ? " ETH" : " BNB"}
            </Price>
          </CostEth>
          <LikeShare
            nft={nft}
            liked={liked}
            setLiked={setLiked}
            likeCount={likeCount}
            setLikeCount={setLikeCount}
            updateShareCount={() => setShareCount({ count: shareCount.count + 1 })}
            shareCount={shareCount}
            isLoading={likesLoading}
          />
        </BottomSection>
      </Container>
    </>
  );
};

const Price = styled.div`
color: white;
display: flex;
flex-direction: row;
justify-content: space-between;
`

const SoldOutText = styled.span`
font-family: Compita;
  font-size: 20px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.1;
  letter-spacing: normal;
  color: #fff;
  margin: 18px;
  letter-spacing: 0.5px;
  `

const SoldOut = styled.div`
width: 100%;
height: 100%;
position: absolute;
background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5),#000);
display: flex;
align-items: flex-end;
`;

const PreviewButton = styled.div`
position: absolute;
top: 380px;
right: 10px;
display: flex;
justify-content: flex-end;
/* width: 100%; */
/* height: 100%; */
/* background-color: blue; */
`

const Text = styled.div`
display: flex;
flex-direction: column;
align-items: start;
margin-left: 10px;
`

const ProfilePicture = styled.div`
width: 40px;
height: 40px;
border-radius: 20px;
background-image: url(${props => props.img});
background-size: cover;
`

const Caption = styled.div`
font-size: 12px;
`

const Name = styled.div`
font-size: 16px;
margin-top: 5px;
`

const RedeemButton = styled.div`
  text-decoration: none;
  color: ${(props) => props.theme.color.white};
  background-color: ${(props) => props.theme.color.box};
  border-radius: 7px;
  padding: 3px 8px;
`;

const RedeemButtonBackground = styled.div`
  position: absolute;
  padding: 2px;
  top: 205px;
  left: 20px;
  background-image: linear-gradient(to right, #fde404, #fa423e);

  cursor: pointer;
  text-decoration: none;
  border-radius: 7px;
  :hover {
    animation: wiggle 100ms;
  }
  @keyframes wiggle {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(-5deg);
    }
    50% {
      transform: rotate(0deg);
    }
    75% {
      transform: rotate(5deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
`;

const MerchIcon = styled(GiftIcon)`
  width: 15px;
  height: 15px;
  margin-top: 3px;
  & path {
    fill: ${(props) => props.theme.color.red};
  }
`;

const MerchBadge = styled(GiftIcon)`
  width: 12px;
  height: 12px;
  padding: 1px;
  border: 1px solid ${(props) => props.theme.color.blue};
  border-radius: 50%;
  & path {
    fill: ${(props) => props.theme.color.red};
  }
`;

const ExclusiveBadge = styled(Exclusive)`
  width: 15px;
  height: 15px;
  padding: 0 5px;
`;

const BadgeHolder = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;
`;

const FounderBadge = styled(Founder)`
  width: 15px;
  height: 15px;
  padding: 0 5px;
`;
const PremiumBadge = styled(Premium)`
  width: 15px;
  height: 15px;
  padding: 0 5px;
`;
const PrereleaseBadge = styled(Prerelease)`
  width: 15px;
  height: 15px;
  padding: 0 5px;
`;

const Bsc = styled(IconBinance)`
  width: 18px;
  height: 18px;
  margin: -2px 0 0 4px;
  margin-right: 4px;
`;

const Eth = styled(IconEth)`
  width: 18px;
  height: 18px;
  margin: -2px 0 0 4px;
  margin-right: 4px;
  & path {
    fill: ${(props) => props.theme.color.white};
  }
`;

const CostEth = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 85px;
  color: white;
`;

const MidSection = styled.div`
width: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

`;

const BottomSection = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-between;
  align-items: center;

`;

const Side = styled.div`
  display: flex;
  align-items: center;
  margin-right: 5px;
`;

const IconArea = styled.div`
  /* margin: 0 8px; */
  display: flex;
  font-size: 14px;
  height: 100%;
  align-items: center;
`;

const CardTop = styled.div`
  width: calc(100% - 8px);
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-family: "Compita";
`;

const Container = styled.div`
  color: ${(props) => props.theme.color.gray};
  padding: 12px 0 4px 0;
  background-color: ${(props) => props.theme.color.box};
  border: 1px solid ${(props) => props.theme.color.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius}px;
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 375px;
  height: 500px;
  margin-bottom: 40px;
  position: relative;
  transition: all 0.05s ease-in-out;
  cursor: pointer;
  // box-shadow: rgba(255, 255, 255, .1) 0px 3px 10px 0px;
  opacity: .9;
  animation: fadein .3s linear 0s 1;
  &:hover {
    transform: translateY(-2px) scale(1.01);
    box-shadow: rgba(255, 255, 255, .2) 0px 3px 10px 0px;
    opacity: 1;
  }
  @media only screen and (max-width: 330px) {
    width: 300px;
  }

`;

// const Container = styled.div`
//   color: ${(props) => props.theme.color.gray};
//   padding: 12px;
//   background-color: ${(props) => props.theme.color.box};
//   border: 1px solid ${(props) => props.theme.color.boxBorder};
//   border-radius: ${(props) => props.theme.borderRadius}px;
//   align-items: center;
//   display: flex;
//   flex-direction: column;
//   width: 200px;
//   margin-bottom: 20px;
//   position: relative;
//   transition: all 0.1s ease-in-out;
//   cursor: pointer;
//   :focus {
//     border: 1px solid white;
//   }
// `;

const ImageContainer = styled.div`
  cursor: pointer;
  position: relative;
  width: 375px;
  height: 375px;
  /* border-radius: 12px; */
  margin-bottom: 12px;
  border: 1px solid ${(props) => props.theme.color.boxBorder};
  background-color: #1e1e1e;
  @media only screen and (max-width: 330px) {
    width: 300px;
    height: 300px;
  }
`;

const Image = styled.img`
  cursor: pointer;
  position: absolute;
  width: 100%;
  height: 100%;
  /* border-radius: 12px; */
  object-fit: cover;
`;


const Loading = styled.div`
  cursor: pointer;
  width: 375px;
  height: 375px;
  /* border-radius: 12px; */
  object-fit: cover;
  margin-bottom: 12px;
  border: 1px solid ${(props) => props.theme.color.boxBorder};
  background-image: url(${props => props.img});
  background-size: 100px 100px;
  background-repeat: no-repeat;
  background-position: center;
  backdrop-filter: blur(10px);
  @media only screen and (max-width: 330px) {
    width: 300px;
    height: 300px;
  }
`;

const TrackName = styled.span`
  cursor: pointer;
  color: white;
  font-weight: 500;
  text-align: left;
  font-size: ${(props) => props.theme.fontSizes.sm};
`;

const Artist = styled(NavLink)`
  font-size: ${(props) => props.theme.fontSizes.sm};
  text-align: center;
  color: ${(props) => props.theme.gray};
  margin-bottom: 5px;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  margin-left: 5px;
  /* cursor: pointer; */
  align-items: end;
  &:hover {
    text-decoration: underline;
  }
`;

export default NftCard;
