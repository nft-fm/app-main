import React, { useState, useRef } from 'react';
import styled, { css } from "styled-components";

const Step3 = ({ 
  nftData: { title, producer, description, genre }, 
  updateState 
}) => {
  return (
    <InputContainer>
      <ArtistTop>
        <h2>Musician Data</h2>
        <small>*fields required</small>
      </ArtistTop>
      <FieldHeaders>
        <SubHeader>Title</SubHeader>
        <p>*</p>
      </FieldHeaders>
      <StyledInput
        type="text"
        placeholder="Title"
        name="title"
        onChange={(e) => {updateState(e)}}
        value={title}
        required
      />
      <FieldHeaders>
        <SubHeader>Producer</SubHeader>
        <p>*</p>
      </FieldHeaders>      
      <StyledInput
        type="text"
        placeholder="Producer"
        name="producer"
        onChange={(e) => {updateState(e)}}
        value={producer}
        required
      />
      <FieldHeaders>
        <SubHeader>Genre</SubHeader>
        <p>*</p>
      </FieldHeaders>
      <StyledInput
        type="text"
        placeholder="Genre"
        name="genre"
        onChange={(e) => {updateState(e)}}
        value={genre}
        required
      />
      <FieldHeaders>
        <SubHeader>Description</SubHeader>
        <p>*</p>
      </FieldHeaders>
      <StyledInput
        type="text"
        placeholder="Description"
        name="description"
        onChange={(e) => {updateState(e)}}
        value={description}
        required
      />
    </InputContainer>
  )
}

const ArtistTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  @media only screen and (max-width: 776px) {
      margin-bottom: -15px;
  }
`

const FieldHeaders = styled.div`
  display: flex;
  flex-direction: row;
  p {
    font-size: 18px;
    margin-left: 3px;
    color: #343434
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
    height: 20px;
    font-size: 14px;
    margin-top: -15px;
  }
`;

const SubHeader = styled.h4`
  color: white;
  text-align: left;
  @media only screen and (max-width: 776px) {
    font-size: 16;
  }
`

export default Step3;