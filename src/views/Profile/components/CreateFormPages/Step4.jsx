import React, { useState } from "react";
import styled, { css } from "styled-components";
import Slider from './Slider';
import swal from 'sweetalert2';
import {
  warningIcon,
  imageWidth,
  imageHeight,
} from "../../../../utils/swalImages";

// const Step4 = ({ nftData: { price, numMinted, }, updateState, usdPerEth }) => {
const Step4 = ({ nftData, updateState, usdPerEth, usdPerBnb, currChainId }) => {
  const [checked, setChecked]= useState(false);

  const handleChange = () => {
    setChecked(!checked); 
    console.log(checked);

  };

  const handleSubmit = async () => {
  if (!checked) {
    return swal.fire({
      title: "🚨 Advanced options NFTs may be less likely to sell 🚨",
      timer: 5000,
      imageUrl: warningIcon,
      imageWidth, 
      imageHeight,
    }).then((res) => (!res.isDismissed ? handleChange() : null));
  }  
  };


  return (
    <InputContainer>
    {!checked ? (<Slider
      nftData={nftData}
      updateState={updateState}
      usdPerBnb={usdPerBnb}
      usdPerEth={usdPerEth}
      currChainId={currChainId}
    />) : (
      <div>
      <ArtistTop>
        <h1>Advanced Options</h1>
        <IconContainer>
          {/* <EthIcon />
          <UsdIcon /> */}
        </IconContainer>
      </ArtistTop>
      <SubHeader style={{ marginBottom: "15px" }}>Price</SubHeader>
      <PriceContainer>
        <StyledInput
          type="number"
          placeholder="Price"
          name="price"
          onChange={(e) => {
            updateState(e);
          }}
          value={nftData.price}
          noborder
          min="0"
          required
        />
        <p
          style={{
            padding: 0,
            margin: 0,
            paddingBottom: "3px",
            fontSize: "18px",
          }}
        >
          {currChainId === 1 || (currChainId === 4 && "ETH")}
          {currChainId === 56 || (currChainId === 97 && "BNB")}
        </p>
      </PriceContainer>
      <PriceContainer noBorder>
        <div />

        {(currChainId === 1 || currChainId === 4) && (
          <p>{(nftData.price * usdPerEth).toFixed(2)} $USD</p>
        )}
        {(currChainId === 56 || currChainId === 97) && (
          <p>{(nftData.price * usdPerBnb).toFixed(2)} $USD</p>
        )}
      </PriceContainer>
      <MobileSpacer height={30} />
      <SubHeader style={{ marginBottom: "15px" }}>Number of NFTs</SubHeader>
      <MobileSpacer height={5} />
      <StyledInput
        type="number"
        placeholder="Quantity"
        name="numMinted"
        onChange={(e) => {
          updateState(e);
        }}
        value={nftData.numMinted}
        step="1"
        min="0"
        onKeyDown={(event) =>
          event.key === "." ? event.preventDefault() : null
        }
        required
      />
      <PriceContainer noBorder>
        <div />
        {(currChainId === 1 || currChainId === 4) && (
          <p>
            {(nftData.price * usdPerEth * nftData.numMinted).toFixed(2)} $USD
          </p>
        )}
        {(currChainId === 56 || currChainId === 97) && (
          <p>
            {(nftData.price * usdPerBnb * nftData.numMinted).toFixed(2)} $USD
          </p>
        )}
      </PriceContainer> </div>)}
      <AdvancedOptions>
      <label>
        <input 
        type="checkbox" 
        checked={checked}
        onChange={handleChange}
        onClick={()=>handleSubmit()} /> Advanced Options
      </label>
      </AdvancedOptions>
      <BottomSpacer />
    </InputContainer>
  );
};

const AdvancedOptions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
  `;

const MobileSpacer = styled.div`
  @media only screen and (max-width: 776px) {
    height: ${(props) => props.height}px;
  }
`;
const BottomSpacer = styled.div`
  height: 100px;
  width: 100px;
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
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
`;

const PriceContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #383838;
  align-items: flex-end;
  color: #5c5c5c;
  justify-content: space-between;
  ${(props) =>
    props.noBorder &&
    css`
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
  input[type="number"] {
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
  ${(props) =>
    props.noborder &&
    css`
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
