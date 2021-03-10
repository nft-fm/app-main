import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useWallet } from "use-wallet";
import Bubble from "../../assets/img/unlock_wallet_bubble.png";
import useModal from "../../hooks/useModal";
import {
  approveBDTStaking,
  claimBDTDC,
  fetchBDTStaked,
  stakeBDT,
  unstakeBDT
} from "../../web3/utils";
import { PoolActions } from "./components/PoolActions";
import { PoolContainer } from "./components/PoolContainer";
import { PoolInfo } from "./components/PoolInfo";
import StakeModal from "./StakeModal";
import UnstakeModal from "./UnstakeModal";

const WarPool = () => {
  const { account, connect, ethereum } = useWallet();

  const [requestedApproval, setRequestedApproval] = useState(false);
  const [allowance, setAllowance] = useState(0);
  const [balance, setBalance] = useState(0);
  const [currStaked, setCurrStaked] = useState(0);
  const [rewardsAvailable, setRewardsAvailable] = useState(0);
  const [apr, setAPR] = useState(0);

  /*const onClaimUnstake = () => {
		onPresentUnstake()
		onReward();
	}*/

  const claim = () => {
    claimBDTDC(() => {
      checkStake();
    });
  };

  const unstake = (amount) => {
    unstakeBDT(amount, () => {
      checkStake();
    });
  };

  const stake = (amount) => {
    stakeBDT(amount, () => {
      checkStake();
    });
  };

  const [onPresentStake] = useModal(
    <StakeModal max={balance} onConfirm={stake} tokenName={"BDT"} />
  );

  const [onPresentUnstake] = useModal(
    <UnstakeModal max={currStaked} onConfirm={unstake} tokenName={"BDT"} />
  );

  const handleApprove = async () => {
    if (!account) {
      // return;
      connect("injected");
      return;
    }
    await approveBDTStaking((res) => {
      setBalance(res.balance);
      setAllowance(res.allowance);
    });
  };

  const checkStake = async () => {
    console.log("checkin");
    fetchBDTStaked((res) => {
      if (res.balance) {
        setBalance(res.balance);
      }
      if (res.allowance) {
        setBalance(res.balance);
        setAllowance(res.allowance);
        setCurrStaked(res.currStaked);
        setRewardsAvailable(res.rewardsAvailable);
      }
    });
  };

  useEffect(() => {
    if (account) {
      checkStake();
      setInterval(function () {
        checkStake();
      }, 6000);
    }
  }, [account]);

  return (
    <Container>
      <TitleBubble>
        <ButtonText>Stake BDT, Earn DC</ButtonText>
        <ButtonSubText>Earn 4 DC per day for each BDT staked</ButtonSubText>
      </TitleBubble>
      <PoolContainer red={true}>
        <PoolInfo
          balance={balance}
          currStaked={currStaked}
          rewardsAvailable={rewardsAvailable}
          unit="BDT"
        />
        <PoolActions
          allowance={allowance}
          handleApprove={handleApprove}
          account={account}
          onPresentStake={onPresentStake}
          claim={claim}
          onPresentUnstake={onPresentUnstake}
        />
      </PoolContainer>
    </Container>
  );
};

const ButtonText = styled.div`
  margin-top: 43px;
  font-family: "Bangers";
  font-size: 35px;
  @media only screen and (max-width: 991px) {
    margin-top: 37px;
    font-size: 30px;
  }
  @media only screen and (max-width: 500px) {
    margin-top: 37px;
    font-size: 25px;
  }
`;

const ButtonSubText = styled.div`
  font-family: "Bangers";
  font-size: 17px;
  @media only screen and (max-width: 991px) {
    font-size: 15px;
  }
  @media only screen and (max-width: 500px) {
    font-size: 12px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-right: -9px;
  margin-top: 40px;
  transform: scale(1.1);
  transform-origin: right;
  @media only screen and (max-width: 991px) {
    margin-right: 40px;
  }
`;

const TitleBubble = styled.div`
  position: absolute;
  background-image: url(${Bubble});
  background-repeat: no-repeat;
  width: 450px;
  height: 150px;
  background-size: contain;
  background-repeat: no-repeat;
  transition: all 0.1s ease-in-out;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  z-index: 20;
  top: -70px;
  right: 30px;
  @media only screen and (max-width: 991px) {
    transform: scaleX(0.9);
    width: 400px;
    right: -110px;
  }
  @media only screen and (max-width: 500px) {
    transform: scaleX(0.8);
  }
`;

export default WarPool;
