import React, { useRef } from 'react';
import styled, { css } from "styled-components";
import x from "../../../../assets/img/icons/x.svg";
import DemoImage from "../../../Home/Components/DemoImage/DemoImage"
import UploadAudio from "../UploadAudio";
import PreviewBuyModal from "./PreviewBuyModal"
export const ModalFormSteps = ({
  hide,
  currentStep,
  nftData,
  hiddenImageInput,
  imageFile,
  handleImage,
  handleImageChange,
  updateState,
  usdPerEth,
  // UploadAudioStuff
  audioFile,
  setAudioFile,
  setNftData,
  isAudioUploaded,
  setIsAudioUploaded,
  audioUploadError,
  setAudioUploadError
}) => {
  const steps = [
    null,
    <UploadImageAndMusic 
      hiddenImageInput={hiddenImageInput}
      imageFile={imageFile}
      handleImage={handleImage}
      handleImageChange={handleImageChange}
      // UploadAudioStuff
      audioFile={audioFile}
      setAudioFile={setAudioFile}
      nftData={nftData}
      setNftData={setNftData}
      isAudioUploaded={isAudioUploaded}
      setIsAudioUploaded={setIsAudioUploaded}
      audioUploadError={audioUploadError}
      setAudioUploadError={setAudioUploadError}
    />,
    <ArtistInfo 
      nftData={nftData}
      updateState={updateState}
    />,
    <PriceAndQuantity
      nftData={nftData}
      updateState={updateState}
      usdPerEth={usdPerEth} 
    />,
    <PreviewBuyModal
      nft={nftData}
    />,
  ];

  return (
    <StyledModal>
      <X src={x} onClick={() => hide()} />
        {
          nftData.imageUrl === "" || !nftData.imageUrl ?
            <LeftSide>
              {/* <div style={{height: "280px"}}> */}
                {/* <DemoImage /> */}
              {/* </div>  */}
            </LeftSide>
          :
          <Image src={nftData.imageUrl} alt="image" />
        }
      <RightSide step={currentStep}>
        {steps[currentStep - 1]}
      </RightSide>
    </StyledModal>
  )
}

const UploadImageAndMusic = ({
  hiddenImageInput,
  handleImageChange,
  imageFile,
  handleImage,
  audioFile,
  setAudioFile,
  nftData,
  setNftData,
  isAudioUploaded,
  setIsAudioUploaded,
  audioUploadError,
  setAudioUploadError
}) => {
  return (
    <>
      <h2 style={{textAlign: "left"}}>Visual</h2>
      <UploadContainer>
        <p>PNG, JPG, GIF, MP4</p>
        <ChooseFile onClick={() => handleImage()} type="button">
          Choose File
        </ChooseFile>
        <StyledInput
          type="file"
          accept=".jpg,.jpeg,.png,.gif"
          ref={hiddenImageInput}
          onChange={handleImageChange}
          style={{ display: "none" }}
          defaultValue={imageFile}
        />
      </UploadContainer>

      <h2 style={{paddingTop: "20px", textAlign: "left"}}>Audio</h2>
      <UploadContainer>
        <p>MP3, FLAC</p>
        <UploadAudio
          audioFile={audioFile}
          setAudioFile={setAudioFile}
          nftData={nftData}
          setNftData={setNftData}
          isAudioUploaded={isAudioUploaded}
          setIsAudioUploaded={setIsAudioUploaded}
          audioUploadError={audioUploadError}
          setAudioUploadError={setAudioUploadError}
        />
      </UploadContainer>
    </>
  )
}

const ArtistInfo = ({ 
  nftData: { title, producer, isrc, description, genre }, 
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
      <SubHeader>Producer</SubHeader>
      <StyledInput
        type="text"
        placeholder="Producer"
        name="producer"
        onChange={(e) => {updateState(e)}}
        value={producer}
        required
      />
      <SubHeader>Genre</SubHeader>
      <StyledInput
        type="text"
        placeholder="Genre"
        name="genre"
        onChange={(e) => {updateState(e)}}
        value={genre}
        required
      />
      <SubHeader>ISRC</SubHeader>
      <StyledInput
        type="text"
        placeholder="IRSC"
        name="irsc"
        onChange={(e) => {updateState(e)}}
        value={isrc}
        required
      />
      <SubHeader>Description</SubHeader>
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

const PriceAndQuantity = ({ nftData: { price, numMinted }, updateState, usdPerEth }) => {
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


/*
  Preview and Submit
  https://app.zeplin.io/project/606f54fb991137523a503e45/screen/60947ff91620fe37238fc146
*/
const SubmitStep = () => {
  return (<>Step 5</>)
}

const ArtistTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: -15px;
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

const Image = styled.img`
  width: 500px;
  aspect-ratio: 1;
  border-radius: 16px;
  border: 1px solid #262626;
  background-color: #1e1e1e;
  object-fit: cover;
  overflow: hidden;
  @media only screen and (max-width: 776px) {
    width: 90vw;
    height: 90vw;
  }
`;

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

const X = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const LeftSide = styled.div`
  display: flex;
  width: 500px;
  height: 500px;
  border-radius: 18px;
  background-color: white;
  justify-content: center;
  align-items: center;
`
const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  background-image: linear-gradient(to right, #262626, #383838);
  width: 220px;
  height: 120px;
  border-radius: 16px;
  margin: 20px;
  p {
    padding: 0;
    margin: 0;
    color: white;
  }
`

const ChooseFile = styled.button`
  display: flex;
  justify-content: center;
  border: solid 1.5px #181818;
  align-items: center;
  text-align: center;
  border-radius: 8px;
  width: 120px;
  height: 40px;
  font-family: Compita;
  font-size: 18px;
  text-align: center;
  color: #ffffff;
  background-image: linear-gradient(to right, #262626, #383838);
  &:hover {
    cursor: pointer;
    background-image: linear-gradient(to right, #333333, #8b8b8b);
  }
`

const StyledModal = styled.div`
  border-radius: 8px;
  border: solid 1px #181818;
  width: 800px;
  background-color: ${(props) => props.theme.bgColor};
  font-size: 16px;
  font-weight: normal;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  @media only screen and (max-width: 776px) {
    width: 90vw;
    height: 95vh;
    flex-direction: column;
    align-items: center;
    /* justify-content: flex-start; */
  }
`;

const RightSide = styled.div`
  ${props => props.currentStep !== 6 ? css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: calc(100% - 500px);
    padding: 10px 30px;
    @media only screen and (max-width: 776px) {
      width: 90vw;
      height: calc(100vh / 2);
      justify-content: space-between;
    }
  h2 {
    color: white;
    padding: 0;
    margin: 0;
  }
  ` : css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: calc(100% - 500px);
    padding: 10px 30px;
    @media only screen and (max-width: 776px) {
      width: 90vw;
      height: calc(100vh / 2);
      justify-content: space-between;
    }
    color: white;
  `}
`;

const SubHeader = styled.h4`
  color: white;
  text-align: left;
`

