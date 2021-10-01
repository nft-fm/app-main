import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import styled from "styled-components";
import swal from "sweetalert2";
import { ReactComponent as IconX } from "../../assets/img/icons/x.svg";
import { useAccountConsumer } from "../../contexts/Account";
import {
  stakeVinyl,
  claimVinyl,
  unstakeVinyl,
  getBalanceOfVinyl,
  getTotalStakedToArtist,
  getUserStakedToArtist,
} from "../../web3/utils";
import loading from "../../assets/img/loading.gif";

const StakingModal = (props) => {
  const { open, hide, artist } = props;
  // console.log('artist', artist)
  const { account, connect, getUser, currChainId } = useAccountConsumer();
  const [isStakeLoading, setIsStakeLoading] = useState(false);
  const [isStakeMaxLoading, setIsStakeMaxLoading] = useState(false);
  const [isUnstakeLoading, setIsUnstakeLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const [totalStakedToArtist, setTotalStakedToArtist] = useState(0);
  const [userStakedToArtist, setUserStakedToArtist] = useState(0);

  const getBalances = () => {
    getBalanceOfVinyl((res) => {
      setBalance(res.balance);
    });
    getTotalStakedToArtist(artist.address, (res) => {
      setTotalStakedToArtist(res.totalStaked);
    });
    getUserStakedToArtist(account, artist.address, (res) => {
      setUserStakedToArtist(res.userStaked);
    });
  };

  useEffect(() => {
    open &&
      getTotalStakedToArtist(artist.address, (res) => {
        setTotalStakedToArtist(res.totalStaked);
      });
    if (account && open) {
      console.log("getting info for", artist.username, artist.address);
      getBalances();
    }
  }, [open]);

  const stopProp = (e) => {
    e.stopPropagation();
  };

  const [stakeInput, setStakeInput] = useState(0);

  const stake = () => {
    swal
      .fire({
        title: `How much would you like to stake into ${artist.username}?`,
        text: `Your balance is: ${balance} VINYL`,
        input: "number",
        inputValidator: (value) => {
          if (!value) {
            return "You cannot stake nothing!";
          }
          if (Number(value) > Number(balance)) {
            return "You cannot stake more than your balance!";
          }
        },
        confirmButtonText: "Stake!",
        // showDenyButton: true,
        // denyButtonText: `Stake Max`,
        // denyButtonColor: "#68c12f",
      })
      .then((res) => {
        console.log("stake res", res);
        // if (res.isConfirmed) {
        //   setIsStakeLoading(true);
        //   console.log("stake input ", res.value);
        //   stakeVinyl(res.value, artist.address, () => {
        //     console.log("Staked!");
        //     setIsStakeLoading(false);
        //     getBalances();
        //   });
        // }
      });
  };
  const stakeMax = () => {
    swal
      .fire({
        title: `Stake ${balance} VINYL in ${artist.username}?`,
        confirmButtonText: "Stake Max!",
        showCancelButton: true,
      })
      .then((res) => {
        if (res.isConfirmed) {
          setIsStakeMaxLoading(true);
          console.log("stake max!", balance);
          stakeVinyl(balance, artist.address, () => {
            console.log("Staked!");
            setIsStakeMaxLoading(false);
            getBalances();
          });
        }
      });
  };

  const unstake = () => {
    swal
      .fire({
        title: `You have ${userStakedToArtist} VINYL staked in ${artist.username}`,
        text: `How much would you like to withdraw?`,
        input: "number",
        inputAttributes: {
          min: 1,
          max: userStakedToArtist,
        },
        confirmButtonText: "Unstake",
        showCancelButton: true,
      })
      .then((res) => {
        if (res.isConfirmed) {
          setIsUnstakeLoading(true);
          unstakeVinyl(artist.address, res.value, () => {
            console.log("unstaked!");
            setIsUnstakeLoading(false);
            getBalances();
          });
        }
      });
  };

  const [allowance, setAllowance] = useState(0);
  const [currStaked, setCurrStaked] = useState(0);
  const [rewardsAvailable, serRewardsAvailable] = useState(0);

  if (!open) return null;
  return (
    <OpaqueFilter
      onClick={(e) =>
        !isStakeLoading && !isStakeMaxLoading && !isUnstakeLoading && hide(e)
      }
    >
      <Container onClick={(e) => stopProp(e)}>
        <StyledModal>
          <X
            onClick={(e) =>
              !isStakeLoading &&
              !isStakeMaxLoading &&
              !isUnstakeLoading &&
              hide(e)
            }
          />
          <Image src={artist.profilePic} alt="image" />
          <RightSide>
            <TitleContainer>
              <Artist to={`/artist/${artist.suburl}`}>
                {artist.username > 20
                  ? artist.username.slice(0, 20) + "..."
                  : artist.username}
              </Artist>
            </TitleContainer>
            <InfoContainer>
              <StakingRow>
                <StakingText>Total Staked (all users):</StakingText>
                <StakingAmount>{totalStakedToArtist} VINYL</StakingAmount>
              </StakingRow>
              <StakingRow>
                <StakingText>Your Balance:</StakingText>
                <StakingAmount>{balance} VINYL</StakingAmount>
              </StakingRow>
              <StakingRow>
                <StakingText>Currently Staked:</StakingText>
                <StakingAmount>{userStakedToArtist} VINYL</StakingAmount>
              </StakingRow>
              <StakingRow>
                <StakingText>Rewards Available:</StakingText>
                <StakingAmount>0.00 VINYL</StakingAmount>
              </StakingRow>
            </InfoContainer>
            <ButtonHolder>
              <StakeButton
                color={"#68c12f"}
                balance={!isStakeLoading && balance > 0 && true}
                onClick={() => !isStakeLoading && balance > 0 && stake()}
              >
                {isStakeLoading ? (
                  <Loading src={loading} alt="loading-icon" />
                ) : (
                  "STAKE"
                )}
              </StakeButton>
              <StakeButton
                color={"#20a4fc"}
                balance={!isStakeMaxLoading && balance > 0 && true}
                onClick={() => !isStakeMaxLoading && balance > 0 && stakeMax()}
              >
                {isStakeMaxLoading ? (
                  <Loading src={loading} alt="loading-icon" />
                ) : (
                  "STAKE MAX"
                )}
              </StakeButton>
              <StakeButton
                color={"#fa423e"}
                balance={!isUnstakeLoading && userStakedToArtist > 0 && true}
                onClick={() =>
                  !isUnstakeLoading && userStakedToArtist > 0 && unstake()
                }
              >
                {isUnstakeLoading ? (
                  <Loading src={loading} alt="loading-icon" />
                ) : (
                  "UNSTAKE"
                )}
              </StakeButton>
            </ButtonHolder>
          </RightSide>
        </StyledModal>
      </Container>
    </OpaqueFilter>
  );
};
const Loading = styled.img`
  width: 20px;
  height: 20px;
  & path {
    stroke: ${(props) => props.theme.color.lightgray};
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const StakingRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
const StakingText = styled.p`
  color: white;
  font-size: ${(props) => props.theme.fontSizes.xs};
`;
const StakingAmount = styled.p`
  color: white;
  font-size: ${(props) => props.theme.fontSizes.xs};
`;

const StakeButton = styled.button`
  cursor: ${(props) => (props.balance ? "pointer" : "not-allowed")};
  width: 32%;
  color: white;
  border: 2px solid ${(props) => props.color};
  background-color: ${(props) => props.theme.color.box};
  border-radius: ${(props) => props.theme.borderRadius}px;
  padding: 5px 0;
`;

const ButtonHolder = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;

const LikeButton = styled.button`
  background-color: transparent;
  padding: 0px;
  border: none;
  width: min-content;
  height: min-content;
  margin: 0px 4px 0 0;
`;

const ShareButton = styled.button`
  background-color: transparent;
  padding: 0px;
  border: none;
  width: min-content;
  height: min-content;
  margin: 0px 4px 0 0;
`;
const TrackDetailsHolder = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 50px;
  margin-bottom: 10px;
  justify-content: space-around;
  color: #666;
  padding-left: 20px;
  @media only screen and (max-width: 776px) {
    height: auto;
  }
`;
const X = styled(IconX)`
  position: absolute;
  right: 2px;
  top: 9px;
  width: 24px;
  height: 24px;
  margin: 0 4px 0 0;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  & path {
    transition: all 0.2s ease-in-out;
    stroke: ${(props) => props.theme.color.gray};
    fill: ${(props) => props.theme.color.gray};
  }
`;

const Side = styled.div`
  display: flex;
  align-items: center;
  margin-left: -25px;
  @media only screen and (max-width: 776px) {
    margin-left: 0;
  }
`;

const OpaqueFilter = styled.div`
  cursor: default;
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 500;
`;

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #666;
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 500px);
  padding: 10px 30px;
  @media only screen and (max-width: 776px) {
    width: 90vw;
    height: calc(100vh / 2);
    justify-content: space-between;
  }
`;
const StyledModal = styled.div`
  border-radius: 16px;
  border: solid 1px #181818;
  width: 800px;
  background-color: ${(props) => props.theme.bgColor};
  font-size: 16px;
  font-weight: normal;
  display: flex;
  justify-content: space-between;
  position: relative;
  @media only screen and (max-width: 776px) {
    width: 90vw;
    height: 95vh;
    flex-direction: column;
    align-items: center;
    /* justify-content: flex-start; */
  }
`;

const Image = styled.img`
  width: 500px;
  /* height: 400px; */
  aspect-ratio: 1;
  border-radius: 16px;
  border: 1px solid #262626;
  background-color: #1e1e1e;
  object-fit: cover;
  overflow: hidden;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
  /* margin-bottom: 16px; */
  @media only screen and (max-width: 776px) {
    width: 90vw;
    height: 90vw;
  }
`;

const BadgeHolder = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  height: 20px;
  padding: 10px 0;
  & > span {
    padding: 0 5px;
  }
  @media only screen and (max-width: 776px) {
    padding-bottom: 0px;
  }
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  white-space: nowrap;
  /* margin-top: -10px; */
  @media only screen and (max-width: 776px) {
    width: 90%;
    /* align-items: center; */
    margin-top: -25px;
  }
`;
const TrackName = styled.span`
  color: white;
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: 600;
  margin-bottom: 6px;
  @media only screen and (max-width: 776px) {
    margin-top: 5px;
    margin-bottom: 0px;
    font-size: ${(props) => props.theme.fontSizes.sm};
  }
`;
const Artist = styled(NavLink)`
  text-decoration: none;
  font-size: ${(props) => props.theme.fontSizes.sm};
  color: white;
  margin-bottom: 12px;
  @media only screen and (max-width: 776px) {
    margin-bottom: 0px;
  }
`;

const BuyButton = styled.button`
  width: 150px;
  /* height: 64px; */
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border: 1px solid ${(props) => props.theme.color.boxBorder};
  border-radius: 8px;
  background-color: ${(props) => props.theme.color.box};
  /* margin-bottom: 20px; */
  padding: 10px 20px;
  &:hover {
    background-color: ${(props) => props.theme.color.boxBorder};
    border: 1px solid #383838;
  }

  &.buyButton {
    background-color: ${(props) => props.theme.color.green};
  }
`;

export default StakingModal;
