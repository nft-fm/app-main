import React, { useState, useRef } from 'react';
import styled, { css } from "styled-components";

const Step4 = ({ nftData: { price, numMinted }, updateState, usdPerEth }) => {
  return (
    <InputContainer>
      <h2>Price and Quantity</h2>
      <SubHeader>Price</SubHeader>
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
        <p>ETH</p>
      </PriceContainer>
      <PriceContainer noBorder>
        <div/>
        <p>{price * usdPerEth} $USD</p>
      </PriceContainer>
      <SubHeader>Number of NFTs</SubHeader>
      <StyledInput
        type="number"
        placeholder="Quantity"
        name="numMinted"
        onChange={(e) => {updateState(e)}}
        value={numMinted}
        step="1"
        min="0"
        required
      />
      <PriceContainer noBorder>
        <div/>
        <p>{price * usdPerEth * numMinted} $USD</p>
      </PriceContainer>
      <div style={{height: "120px", width: "100px"}}/>
    </InputContainer>
  )
}

const PriceContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.color.boxBorder};
  align-items: flex-end;
  justify-content: space-between;
  ${props => props.noBorder && css`
    border: none;
  `}
  p {
    padding: 0;
    margin: 7px;
    color: #343434;
  }
`


const InputContainer = styled.div`
  height: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
  small {
    color: #343434;
  }
  @media only screen and (max-width: 776px) {
    width: 95%;
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
`;

const StyledInput = styled.input`
  color: white;
  background-color: #090909;
  border: none;
  outline: none;
  height: 30px;
  font-size: 16px;
  border-bottom: 1px solid ${(props) => props.theme.color.boxBorder};
  ${props => props.noborder && css`
    border: none;
  `}
  @media only screen and (max-width: 776px) {
    background-color: transparent;
    height: 30px;
  }
`;

const SubHeader = styled.h4`
  color: white;
  text-align: left;
`

export default Step4;
