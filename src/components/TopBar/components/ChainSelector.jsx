import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAccountConsumer } from "../../../contexts/Account";
import { ReactComponent as IconBinance } from "../../../assets/img/icons/binance-logo.svg";

import { ReactComponent as IconEth } from "../../../assets/img/icons/ethereum.svg";
import ReactToolTip from "react-tooltip";
import switchNetwork from "../../../utils/switchNetwork";

const ChainSelector = () => {
  const { currChainId } = useAccountConsumer();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (currChainId === 1 || currChainId === 4) {
      setSelected(0);
    }
    if (currChainId === 56 || currChainId === 97) {
      setSelected(1);
    }
  }, [currChainId]);
  const switchChain = async (chain) => {
    await switchNetwork(chain);
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
      onClick={() => setOpen(true)}
      aria-label="Change Chain Dropdown"
    >
      {chooseChain(selected)}
      <DropDown open={open}>
        <Spacer />
        <DropDownLinks>
          <WrapperButton
            onClick={() => {
              setSelected(0);
              switchChain("ETH");
              setOpen(false);
            }}
            data-tip
            data-for="Ethereum"
            aria-label="Ethereum Main Chain"
          >
            <Eth />
          </WrapperButton>
          <ReactToolTip id="Ethereum" place="right" effect="solid">
            Ethereum
          </ReactToolTip>
          <WrapperButton
            onClick={() => {
              setSelected(1);
              switchChain("BSC");
              setOpen(false);
            }}
            data-tip
            data-for="Binance"
            aria-label="Binance Smart Chain"
          >
            <Binance />
          </WrapperButton>
          <ReactToolTip id="Binance" place="right" effect="solid">
            Binance
          </ReactToolTip>
        </DropDownLinks>
      </DropDown>
    </ChainHolder>
  );
};

const WrapperButton = styled.button`
background-color: transparent;
padding: 0px;
border: none;
width: min-content;
height: min-content;
`

const Binance = styled(IconBinance)`
  cursor: pointer;
  width: 18px;
  height: 18px;
  z-index: 1;
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
  background-color: #090909;

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
  width: 30px;
`;

const ChainHolder = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
  width: 30px;
  padding-right: 10px;
  background-color: transparent;
  border: none;
`;

export default ChainSelector;
