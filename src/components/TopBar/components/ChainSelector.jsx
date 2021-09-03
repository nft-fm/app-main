import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useAccountConsumer } from "../../../contexts/Account";
import { useWallet } from "use-wallet";
import { getVinylBalance } from "../../../web3/utils";
import { ReactComponent as IconDown } from "../../../assets/img/icons/down_arrow.svg";
import { ReactComponent as IconBinance } from "../../../assets/img/icons/binance-logo.svg";

import { ReactComponent as IconEth } from "../../../assets/img/icons/ethereum.svg";
import ReactToolTip from "react-tooltip";
import switchNetwork from "../../../utils/switchNetwork";

const ChainSelector = () => {
  const { user } = useAccountConsumer();
  const { account } = useWallet();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    console.log("here");
    if (window.ethereum.chainId === ("0x4" || "0x1")) setSelected(0);
    // if (window.ethereum.chainId === ("0x38" || "0x61")) {
    //   console.log("here");
    //   setSelected(1);
    // }
    if (window.ethereum.chainId === "0x61") {
      console.log("here");
      setSelected(1);
    }
  }, [window.ethereum]);

  console.log(
    window.ethereum.chainId,
    typeof window.ethereum.chainId,
    selected
  );

  const switchChain = async (chain) => {
    await switchNetwork(chain);
    // window.location.reload();
  };

  const chooseChain = (val) => {
    let chainIcon = <Eth />;

    switch (val) {
      case 0:
        chainIcon = <Eth />;
        break;
      case 1:
        chainIcon = <Binance />;
        break;
    }
    return chainIcon;
  };

  return (
    <ChainHolder
      onMouseOver={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {chooseChain(selected)}
      <DropDown open={open}>
        <Spacer />
        <DropDownLinks>
          <Eth
            onClick={() => {
              setSelected(0);
              switchChain("ETH");
              setOpen(false);
            }}
            data-tip
            data-for="Ethereum"
          />
          <ReactToolTip id="Ethereum" place="right" effect="solid">
            Ethereum
          </ReactToolTip>
          <Binance
            onClick={() => {
              setSelected(1);
              switchChain("BSC");
              setOpen(false);
            }}
            data-tip
            data-for="Binance"
          />
          <ReactToolTip id="Binance" place="right" effect="solid">
            Binance
          </ReactToolTip>
        </DropDownLinks>
      </DropDown>
    </ChainHolder>
  );
};

const Binance = styled(IconBinance)`
  cursor: pointer;
  width: 18px;
  height: 18px;
  z-index: 1;
  /* & path {
    fill: ${(props) => props.theme.color.white};
  } */
`;
const Eth = styled(IconEth)`
  cursor: pointer;
  width: 18px;
  height: 18px;
  z-index: 1;
  & path {
    fill: ${(props) => props.theme.color.white};
  }
`;

const DownArrow = styled(IconDown)`
  /* margin-top: 1px; */
  width: 10px;
  height: 10px;
  & path {
    transition: all 0.2s ease-in-out;
    fill: ${(props) => props.theme.color.lightgray};
  }
`;

const DropDownLinks = styled.div`
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: rgb(18, 18, 18, 0.2);
  border-bottom: 1px solid #232323;
  border-left: 1px solid #232323;
  border-right: 1px solid #232323;
  width: 100%;

  @media only screen and (max-width: 776px) {
    background-color: #121212;
  }
`;

const Spacer = styled.div`
  height: 120px;
  z-index: -1;
`;
const DropDown = styled.div`
  display: ${(props) => (props.open ? "flex" : "none")};
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  /* top: 60px; */
  width: 30px;
`;

const ChainHolder = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
  width: 30px;
`;

export default ChainSelector;
