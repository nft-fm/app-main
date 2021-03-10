import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useWallet } from "use-wallet";
import Bubble from "../../assets/img/unlock_wallet_bubble.png";
import useModal from "../../hooks/useModal";
import {
  approveBDTLPStaking,
  claimBDTLPDC,
  fetchBDTLPStaked,
  stakeBDTLP,
  unstakeBDTLP
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
    claimBDTLPDC(() => {
      checkStake();
    });
  };

  const unstake = (amount) => {
    unstakeBDTLP(amount, () => {
      checkStake();
    });
  };

  const stake = (amount) => {
    stakeBDTLP(amount, () => {
      checkStake();
    });
  };

  const [onPresentStake] = useModal(
    <StakeModal max={balance} onConfirm={stake} tokenName={"ETH-BDT-LP"} />
  );

  const [onPresentUnstake] = useModal(
    <UnstakeModal
      max={currStaked}
      onConfirm={unstake}
      tokenName={"ETH-BDT-LP"}
    />
  );

  const handleApprove = async () => {
    if (!account) {
      // return;
      connect("injected");
      return;
    }
    await approveBDTLPStaking((res) => {
      setBalance(res.balance);
      setAllowance(res.allowance);
    });
  };

  const checkStake = async () => {
    fetchBDTLPStaked((res) => {
      console.log(res);
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
      <PoolContainer red={false}>
        <PoolInfo
          balance={balance}
          currStaked={currStaked}
          rewardsAvailable={rewardsAvailable}
          unit="ETH-BDT-LP"
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
      <TitleBubble>
        <ButtonText>
          Stake ETH-BDT-LP, Earn 30x DC
          <ButtonSubText>
            Earn 120 DC per day for each ETH-BDT-LP Staked
          </ButtonSubText>
        </ButtonText>
      </TitleBubble>
      {/* <Disclosure>
				The liquidity staking pool will open as soon as the uniswap listing occurs, on January 18th at 12PM EST!
			</Disclosure> */}
    </Container>
  );
};

const ButtonText = styled.div`
  margin-top: 47px;
  font-family: "Bangers";
  font-size: 28px;
  margin-left: -15px;
  transform: scaleX(1);
  @media only screen and (max-width: 500px) {
    font-size: 22px;
  }
`;

const ButtonSubText = styled.div`
  font-family: "Bangers";
  font-size: 17px;
  @media only screen and (max-width: 500px) {
    font-size: 12px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-left: -9px;
  margin-top: 10px;
  margin-bottom: 80px;
  transform: scale(1.1);
  transform-origin: left;
  @media only screen and (max-width: 991px) {
    margin-top: -17px;
    margin-right: 90px;
  }
`;

const TitleBubble = styled.div`
  position: absolute;
  width: 450px;
  height: 150px;
  transition: all 0.1s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  z-index: 20;
  bottom: -80px;
  left: 30px;
  &:before {
    background-image: url(${Bubble});
    transform: scaleX(-1);
    background-repeat: no-repeat;
    width: 450px;
    height: 150px;
    content: "";
    position: absolute;
    background-size: contain;
  }
  @media only screen and (max-width: 991px) {
    transform: scaleX(0.8);
    left: -50px;
    bottom: -120px;
  }
  @media only screen and (max-width: 500px) {
    transform: scaleX(0.7);
  }
`;

export default WarPool;
