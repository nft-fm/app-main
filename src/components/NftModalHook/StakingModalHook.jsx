import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import styled from "styled-components";
import swal from "sweetalert2";
import { ReactComponent as IconX } from "../../assets/img/icons/x.svg";
import { useAccountConsumer } from "../../contexts/Account";
import { useStakingConsumer } from "../../contexts/Staking";
import {
  stakeVinyl,
  claimVinyl,
  unstakeVinyl,
  getBalanceOfVinyl,
  getTotalStakedToArtist,
  getUserStakedToArtist,
  getTotalEarned,
} from "../../web3/utils";
import loading from "../../assets/img/loading.gif";
import axios from "axios";

const StakingModal = (props) => {
  const { open, hide, artist, setIsStakedArtist } = props;
  const { account, connect, user } = useAccountConsumer();
  const { balance, setNeedToUpdateBalances, updateOrder } =
    useStakingConsumer();
  const [isStakeLoading, setIsStakeLoading] = useState(false);
  const [isStakeMaxLoading, setIsStakeMaxLoading] = useState(false);
  const [isUnstakeLoading, setIsUnstakeLoading] = useState(false);
  const [totalStakedToArtist, setTotalStakedToArtist] = useState(0);
  const [userStakedToArtist, setUserStakedToArtist] = useState(0);
  const [artistTotalEarned, setArtistTotalEarned] = useState(0);

  const closeModal = (val) => {
    updateOrder();
    hide();
  };

  const handleUnlockClick = () => {
    connect("injected");
    closeModal();
  };

  //if true is passed in and the res from getUserStakedToArtist === 0, delete artist address from users' schema
  const getArtistBalances = () => {
    getTotalStakedToArtist(artist.address, (res) => {
      setTotalStakedToArtist(res.totalStaked);
    });
    getTotalEarned(artist.address, (res) => {
      setArtistTotalEarned(res.totalEarned);
    });
    account &&
      getUserStakedToArtist(account, artist.address, (res) => {
        setUserStakedToArtist(res.userStaked);
      });
  };

  useEffect(() => {
    if (open) {
      getArtistBalances();
    }
  }, [open]);

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
      })
      .then((res) => {
        if (res.isConfirmed) {
          setIsStakeLoading(true);
          stakeVinyl(res.value, artist.address, (err) => {
            if (err) {
              setIsStakeLoading(false);
              swal.fire({
                title: "Error when staking, please refresh and try again.",
              });
            } else {
              setIsStakeLoading(false);
              setNeedToUpdateBalances(true);
              getArtistBalances();
              axios
                .post("/api/user/saveStakedArtist", {
                  artist: artist.address,
                  account: account,
                })
                .catch((err) => console.log(err));
            }
          });
        }
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
          stakeVinyl(balance, artist.address, (err) => {
            if (err) {
              setIsStakeMaxLoading(false);
              swal.fire({
                title: "Error when staking, please refresh and try again.",
              });
            } else {
              setIsStakeMaxLoading(false);
              getArtistBalances();
              setNeedToUpdateBalances(true);

              axios
                .post("/api/user/saveStakedArtist", {
                  artist: artist.address,
                  account: account,
                })
                .catch((err) => console.log(err));
            }
          });
        }
      });
  };

  const unstake = () => {
    swal
      .fire({
        title: `You have ${userStakedToArtist} VINYL staked in ${artist.username}`,
        text: `How much would you like to withdraw?`,
        input: "text",
        // inputAttributes: {
        //   min: 1,
        //   max: userStakedToArtist,
        // },
        confirmButtonText: "Unstake",
        showCancelButton: true,
      })
      .then((res) => {
        if (res.isConfirmed) {
          if (Number(res.value)) {
            setIsUnstakeLoading(true);
            unstakeVinyl(artist.address, res.value, (err) => {
              if (err) {
                setIsUnstakeLoading(false);
                swal.fire({
                  title: "Error when staking, please refresh and try again.",
                });
              } else {
                setIsUnstakeLoading(false);
                //passing 'true' in triggers the getArtistBalances function to delete artist address in mongo if new staked value = 0
                getArtistBalances();
                setNeedToUpdateBalances(true);
                if (Number(res.value) === Number(userStakedToArtist)) {
                  axios
                    .post("/api/user/removeStakedArtist", {
                      artist: artist.address,
                      account: account,
                    })
                    .then((res) => {
                      console.log(res);
                      setIsStakedArtist(false);
                      closeModal(true);
                    })
                    .catch((err) => console.log(err));
                }
              }
            });
          } else {
            swal.fire('Unstake value must be a number!')
          }
        }
      });
  };

  const stopProp = (e) => {
    e.stopPropagation();
  };
  if (!open) return null;
  return (
    <OpaqueFilter
      onClick={(e) =>
        !isStakeLoading &&
        !isStakeMaxLoading &&
        !isUnstakeLoading &&
        closeModal(e)
      }
    >
      <Container onClick={(e) => stopProp(e)}>
        <StyledModal>
          <X
            onClick={(e) =>
              !isStakeLoading &&
              !isStakeMaxLoading &&
              !isUnstakeLoading &&
              closeModal(e)
            }
          />
          <Image src={artist.profilePic} alt="image" />
          <InfoContainer>
            <Artist to={`/artist/${artist.suburl}`}>
              {artist.username > 20
                ? artist.username.slice(0, 20) + "..."
                : artist.username}
            </Artist>
            <StakingRow>
              <StakingText>Total Staked (all users):</StakingText>
              <StakingAmount>
                {Math.round(totalStakedToArtist * 100) / 100} VINYL
              </StakingAmount>
            </StakingRow>
            <StakingRow>
              <StakingText>Total Earned:</StakingText>
              <StakingAmount>
                {Math.round(artistTotalEarned * 100) / 100} VINYL
              </StakingAmount>
            </StakingRow>
            <StakingRow>
              <StakingText>Your Balance:</StakingText>
              <StakingAmount>
                {Math.round(balance * 100) / 100} VINYL
              </StakingAmount>
            </StakingRow>
            <StakingRow>
              <StakingText>Currently Staked:</StakingText>
              <StakingAmount>
                {Math.round(userStakedToArtist * 100) / 100} VINYL
              </StakingAmount>
            </StakingRow>
            {account ? (
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
                  onClick={() =>
                    !isStakeMaxLoading && balance > 0 && stakeMax()
                  }
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
            ) : (
              <AccountButton onClick={() => handleUnlockClick()}>
                Connect
              </AccountButton>
            )}
          </InfoContainer>
        </StyledModal>
      </Container>
    </OpaqueFilter>
  );
};

const AccountButton = styled.div`
  width: 140px;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${(props) => props.theme.color.red};
  height: 32px;
  border-radius: 20px;
  font-family: "Compita";
  background-color: #181818;
  letter-spacing: 1px;
  font-size: ${(props) => props.theme.fontSizes.xs};
  font-weight: 600;
  cursor: pointer;
  color: white;
  &:hover {
    background-color: rgba(256, 256, 256, 0.2);
  }
`;

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
  justify-content: space-evenly;
  align-items: center;
  width: calc(100% - 500px);
  padding: 10px 30px;
  @media only screen and (max-width: 776px) {
    width: 90vw;
    height: calc(100vh / 2);
    justify-content: space-between;
  }
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
  height: 37px;
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
const Artist = styled(NavLink)`
  text-decoration: none;
  font-size: ${(props) => props.theme.fontSizes.md};
  color: white;
  /* margin-bottom: 12px; */
  @media only screen and (max-width: 776px) {
    margin-bottom: 0px;
  }
`;

export default StakingModal;
