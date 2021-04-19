import React, { useCallback, useEffect, useState } from "react";
import styled from 'styled-components'
import { useWallet } from "use-wallet";
import Uniswap from '../../assets/img/icons/uniswap.svg'
import isMobile from "../../utils/isMobile";

const Value = () => {
  const { account, connect } = useWallet()
  const currentPrice = 5
  const warStaked = 5
  const circSupply = 19

  return (
    <TopDisplayContainer>
      {/* <DisplayItem>
        $BDT Price:&nbsp;
          {currentPrice
          ? `$${Number(currentPrice).toLocaleString(undefined, {
            minimumFractionDigits: 4,
            maximumFractionDigits: 4
          })}`
          : "-"}
      </DisplayItem>
      <DisplayItem>
        Marketcap:&nbsp;
          {currentPrice && warStaked
          ? `$${Number(warStaked.circSupply.multipliedBy(currentPrice).dividedBy(10 ** 18).toFixed(2)).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}`
          :
          "-"}
      </DisplayItem>
      <StyledA
        style={{ marginTop: "-5px" }}
        href="https://uniswap.info/token/${tokenaddress}"
        target="_blank"
      /> */}
    </TopDisplayContainer>
  )
}


const StyledA = styled.a`
  cursor: pointer;
  display: flex;
  background-image: url(${Uniswap});
  background-size: cover;
  background-position: center;
  height: 30px;
  opacity: 0.9;
  width: 137px;
  transition: all .1s linear;
  &:hover {
    opacity: 1;
  }
`

const TopDisplayContainer = !isMobile()
  ? styled.div`
        width:80vw;
        position: static;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
        margin: 16px auto 20px auto;
      `
  : styled.div`
        width: 60vw;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
        margin: 8px auto 10px auto;
        display: flex;
        flex-wrap: wrap;
      `;

const DisplayItem = !isMobile()
  ? styled.div`
        color: white;
        font-family: "Compita";
        font-size: 18px;
        
        font-stretch: normal;
        font-style: normal;
        line-height: 1;
        letter-spacing: normal;
        color: #ffffff;
        opacity: 0.9;
      `
  : styled.div`
        width: 100%;
        margin-bottom: 10px;
        color: white;
        text-align: center;
        font-family: "Compita";
        font-size: 18px;
        
        font-stretch: normal;
        font-style: normal;
        line-height: 1;
        letter-spacing: normal;
        opacity: 0.9;
        color: #ffffff;
      `;

export default Value