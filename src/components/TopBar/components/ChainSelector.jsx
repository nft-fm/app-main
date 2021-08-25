import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useAccountConsumer } from "../../../contexts/Account";
import { useWallet } from "use-wallet";
import { getVinylBalance } from "../../../web3/utils";
import { ReactComponent as IconDown } from "../../../assets/img/icons/down_arrow.svg";
import { ReactComponent as BinanceIcon } from "../../../assets/img/icons/binance-logo.svg";

import { ReactComponent as EthIcon } from "../../../assets/img/icons/ethereum.svg";

const ChainSelector = () => {
  const { user } = useAccountConsumer();
  const { account } = useWallet();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);

  console.log("open", open);

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
        <DropDownLinks>
          <Spacer />
          <Eth onClick={() => setSelected(0)} />
          <Binance onClick={() => setSelected(1)} />
        </DropDownLinks>
      </DropDown>
    </ChainHolder>
  );
};

const Binance = styled(BinanceIcon)`
  cursor: pointer;
  width: 18px;
  height: 18px;
  /* & path {
    fill: ${(props) => props.theme.color.white};
  } */
`;
const Eth = styled(EthIcon)`
  cursor: pointer;
  width: 18px;
  height: 18px;
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
  height: 105px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  /* background-color: #121212; */
  background-color: rgb(18, 18, 18, 0.2);
  border-bottom: 1px solid #232323;
  border-left: 1px solid #232323;
  border-right: 1px solid #232323;
`;

const Spacer = styled.div`
  height: 21px;
`;
const DropDown = styled.div`
  display: ${(props) => (props.open ? "flex" : "none")};
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  height: 160px;
  width: 30px;
  /* top: 40px; */
`;

const ChainHolder = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
  width: 20px;
  position: relative;
`;

export default ChainSelector;
