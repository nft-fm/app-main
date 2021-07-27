import React, { useState, useRef } from 'react';
import styled, { css } from "styled-components";
import { ReactComponent as usd_icon } from "../../../../assets/img/icons/dollar.svg";
import { ReactComponent as eth_icon } from "../../../../assets/img/icons/ethereum.svg";

const Step4 = ({ nftData: { price, numMinted }, updateState, usdPerEth }) => {
  return (
    <InputContainer>
      <ArtistTop>
        <h1>Data</h1>
        <IconContainer>
          <EthIcon/>
          <UsdIcon/>
        </IconContainer>
      </ArtistTop>
      <SubHeader style={{marginBottom: "15px"}}>Price</SubHeader>
      <PriceContainer>
        <StyledInput
          type="number"
          placeholder="Price"
          name="price"
          onChange={(e) => {updateState(e)}}
          value={price}
          noborder
          min="0"
          required
        />
        <p style ={{ padding: 0, margin: 0, paddingBottom: "3px", fontSize: "18px"}}>ETH</p>
      </PriceContainer>
      <PriceContainer noBorder>
        <div/>
        <p>{(price * usdPerEth).toFixed(2)} $USD</p>
      </PriceContainer>
      <MobileSpacer height={30}/>
      <SubHeader style={{marginBottom: "15px"}}>Number of NFTs</SubHeader>
      <MobileSpacer height={5}/>
      <StyledInput
        type="number"
        placeholder="Quantity"
        name="numMinted"
        onChange={(e) => {updateState(e)}}
        value={numMinted}
        step="1"
        min="0"
        onKeyDown={event => event.key==='.' ? event.preventDefault() : null}
        required
      />
      <PriceContainer noBorder>
        <div/>
        <p>{(price * usdPerEth * numMinted).toFixed(2)} $USD</p>
      </PriceContainer>
      <BottomSpacer />
    </InputContainer>
  )
}

const MobileSpacer = styled.div`
  @media only screen and (max-width: 776px) {
    height: ${props => props.height}px;
  }
`
const BottomSpacer = styled.div`
  height: 100px;
  width: 100px;
`

const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const UsdIcon = styled(usd_icon)`
  width: 20px;
  height: 20px;
  & path {
    fill: ${(props) => props.theme.color.gray};
    ${({ active }) =>
      active &&
      `
      fill: #68c12f;
      `}
  }
`;

const EthIcon = styled(eth_icon)`
  width: 20px;
  height: 20px;
  & path {
    fill: ${(props) => props.theme.color.blue};
    ${({ active }) =>
      active &&
      `
      fill: #20a4fc;
    `}
  }
`;

const ArtistTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  h1 {
    margin: 0;
    padding-top: -5px;
  }
  padding: 30px 0;
  /* @media only screen and (max-width: 776px) {
    padding: 20px 0;
  } */
`

const PriceContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #383838;
  align-items: flex-end;
  color: #5c5c5c;
  justify-content: space-between;
  ${props => props.noBorder && css`
    border: none;
  `}
  p {
    @media only screen and (min-width: 776px) {
      margin: 0;
      padding: 8px 0 10px 0;
    }
  }

  @media only screen and (max-width: 776px) {
    height: 40px;
  }
`;


const InputContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  color: white;
  small {
    opacity: 1;
    color: #5c5c5c;
  }
  @media only screen and (max-width: 776px) {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type=number] {
    -moz-appearance: textfield;
  }
  @media only screen and (max-width: 776px) {
    height: 400px;
  }
`;

const StyledInput = styled.input`
  color: white;
  background-color: #181818;
  border: none;
  outline: none;
  height: 30px;
  font-size: 18px;
  border-bottom: 1px solid #383838;
  ${props => props.noborder && css`
    border: none;
  `}
  @media only screen and (max-width: 776px) {
    background-color: transparent;
  }
`;

const SubHeader = styled.h3`
  color: white;
  text-align: left;
`;

export default Step4;
