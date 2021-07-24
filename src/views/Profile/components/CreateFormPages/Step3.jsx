import React, { useState, useRef } from 'react';
import styled, { css } from "styled-components";

// https://en.wikipedia.org/wiki/Music_genre#Major_music_genres
const GENRES = [
  "Select",
  "Country",
  "Electronic",
  "Funk",
  "Hip hop",
  "Jazz",
  "Latin",
  "Pop",
  "Punk",
  "Raggae",
  "Rock",
  "Metal",
  "Soul music and R&B",
  "Polka",
  "Traditional/Folk",
  "Other"
];

const Step3 = ({ 
  nftData: { title, producer, description, genre }, 
  updateState 
}) => {
  return (
    <InputContainer>
      <ArtistTop>
        <h1>Data</h1>
        <small>*fields required</small>
      </ArtistTop>
      <FieldHeaders>
        <SubHeader>Title</SubHeader>
        <p>*</p>
      </FieldHeaders>
      <StyledInput
        type="text"
        placeholder="Song title"
        name="title"
        onChange={(e) => {updateState(e)}}
        value={title}
        maxLength={50}
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
      <StyledSelect 
        name="genre"
        onChange={(e) => {updateState(e)}}
        value={genre}
      >
        {GENRES.map(genre => 
          <option value={genre}>{genre}</option>
        )}
      </StyledSelect>
      <FieldHeaders>
        <SubHeader>Description</SubHeader>
        <p>*</p>
      </FieldHeaders>
      <StyledTextArea
        type="text"
        placeholder="Description"
        name="description"
        onChange={(e) => {updateState(e)}}
        value={description}
        required
      />
      <BottomSpacer />
    </InputContainer>
  )
}

const BottomSpacer = styled.div`
  @media only screen and (max-width: 776px) {
    height: 50px;
    width: 100px;
  }
`

const StyledTextArea = styled.textarea`
  color: white;
  background-color: #181818;
  border: none;
  outline: none;
  height: 80px;
  resize: none;
  font-size: 18px;
  border: 1px solid #383838;
  border-radius: 8px;
  padding: 5px;
  margin-top: 5px;
  font-family: "Compita";
  ${props => props.noborder && css`
    border: none;
  `}
  @media only screen and (max-width: 776px) {
    background-color: transparent;
    height: 60px;
    padding-top: 0;
    margin-top: -12px;
  }
`;

const ArtistTop = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  h1 {
    margin: 0;
  }
  @media only screen and (max-width: 776px) {
    margin-bottom: -15px;
    padding-top: 20px;
  }
`

const FieldHeaders = styled.div`
  padding: 12px 0;
  display: flex;
  flex-direction: row;
  p {
    font-size: 16px;
    color: #383838;
    margin: 12px 0 0px 0;
    margin-left: 3px;
    @media only screen and (max-width: 776px) {
      padding: 10px 0;
    }
  }
  @media only screen and (max-width: 776px) {
    margin: 15px 0px;
  }
`

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
    height: 600px;
  }
`;

const StyledInput = styled.input`
  color: white;
  background-color: #181818;
  border: none;
  outline: none;
  height: 30px;
  font-size: 16px;
  border-bottom: 1px solid #383838;
  ${props => props.noborder && css`
    border: none;
  `}
  @media only screen and (max-width: 776px) {
    background-color: transparent;
    height: 20px;
    margin-top: -15px;
  }
`;

const StyledSelect = styled.select`
  color: white;
  background-color: #181818;
  border: none;
  outline: none;
  height: 30px;
  font-size: 16px;
  border-bottom: 1px solid #383838;
  ${props => props.noborder && css`
    border: none;
  `}
  @media only screen and (max-width: 776px) {
    /* background-color: transparent; */
    height: 20px;
    margin-top: -15px;
  }
`

const SubHeader = styled.h4`
  color: white;
  text-align: left;
  margin: 12px 0 0px 0;
  padding: 0;
  @media only screen and (max-width: 776px) {
    font-size: 16;
    padding: 10px 0;
  }
`

export default Step3;