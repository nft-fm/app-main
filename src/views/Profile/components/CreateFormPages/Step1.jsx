import React from 'react';
import styled, { css } from "styled-components";
import single_nft from "../../../../assets/img/profile_page_assets/PNG_500px_single.png";
import many_nft from "../../../../assets/img/profile_page_assets/PNG_500px_multi.png";
import x from "../../../../assets/img/icons/x.svg";
import DemoImage from "../../../Home/Components/DemoImage/DemoImage"
/* 
  Select multiple or single
  https://app.zeplin.io/project/606f54fb991137523a503e45/screen/60947ff83e5b930e7a327ba6
*/

export const Step1 = ({ setCurrentStep }) => {
  return (
    <Outer>
      <SelectContainer>
        <Box disabled>
          <Header>Single</Header>
          <img src={single_nft} style={{width: "70%"}} alt="single"/>
          <List>
            <Row>
              <Text>
                Create a unique NFT with the option of auctioning it!
              </Text>
            </Row>
            <Row>
              <Text>
                Pick a price and time and sell to the highest bidder
              </Text>
            </Row>
          </List>
        </Box>
        <Fixed>COMING SOON</Fixed>
        <Box onClick={() => setCurrentStep(2)}>
          <Header>Multiple</Header>
          <img src={many_nft} style={{width: "70%"}} alt="many"/>
          <List>
            <Row>
              <Text>
                Create multiple NFTs
              </Text>
            </Row>
            <Row>
              <Text>Pick a price and how many NFTs you would like to have minted on the marketplace</Text>
            </Row>
          </List>
        </Box>
      </SelectContainer>
    </Outer>
  )
}

/* 
  Upload Images and Audio
  https://app.zeplin.io/project/606f54fb991137523a503e45/screen/60947ff818830a3516b3d3d2
*/

export const Step2 = ({ hide }) => {
  return (<StyledModal>
    <X src={x} onClick={() => hide()} />
    <LeftSide>
      <div style={{height: "280px"}}>
        <DemoImage />
      </div>
    </LeftSide>
    <RightSide>
      <h2>Visual</h2>
      <UploadContainer>
        <p>PNG, JPG, GIF, MP4</p>
        <ChooseFile>Choose File</ChooseFile>
      </UploadContainer>
      <h2 style={{paddingTop: "20px"}}>Audio</h2>
      <UploadContainer>
        <p>MP3, FLAC</p>
        <ChooseFile>Choose File</ChooseFile>
      </UploadContainer>
    </RightSide>
  </StyledModal>
  )
}

/*
  Artist Data
  https://app.zeplin.io/project/606f54fb991137523a503e45/screen/60947ff85ef6bb0a06f6ab24
*/
export const Step3 = ({ hide, nftData }) => {
  return (<StyledModal>
    <X src={x} onClick={() => hide()} />
    <LeftSide>
      <div style={{height: "280px"}}>
        <DemoImage />
      </div>
    </LeftSide>
    <RightSide>
      <InputContainer>
        <h2>Musician Data</h2>
        <Text style={{textAlign: "left"}}>Title</Text>
        <StyledInput
          type="text"
          placeholder="Title"
          name="title"
          onChange={(e) => {}}
          value={nftData.title}
          required
        />
        <Text style={{textAlign: "left"}}>Producer</Text>
        <StyledInput
          type="text"
          placeholder="Producer"
          name="producer"
          onChange={(e) => {}}
          value={nftData.producer}
          required
        />
        <Text style={{textAlign: "left"}}>Writer</Text>
        <StyledInput
          type="text"
          placeholder="Writer"
          name="writer"
          onChange={(e) => {}}
          value={nftData.title}
          required
        />
        <Text style={{textAlign: "left"}}>ISRC</Text>
        <StyledInput
          type="text"
          placeholder="Irsc"
          name="irsc"
          onChange={(e) => {}}
          value={nftData.title}
          required
        />
        <Text style={{textAlign: "left"}}>Description</Text>
        <StyledInput
          type="text"
          placeholder="Description"
          name="description"
          onChange={(e) => {}}
          value={nftData.title}
          required
        />
      </InputContainer>
    </RightSide>
  </StyledModal>
  )
}


/*
  Pricing and Quantity Data:
  https://app.zeplin.io/project/606f54fb991137523a503e45/screen/60947ff82e79553624128070
*/
export const Step4 = ({ hide, nftData }) => {
  return (<StyledModal>
    <X src={x} onClick={() => hide()} />
    <LeftSide>
      <div style={{height: "280px"}}>
        <DemoImage />
      </div>
    </LeftSide>
    <RightSide>
      <InputContainer>
        <h2>Price and Quantity</h2>
        <Text style={{textAlign: "left"}}>Price</Text>
        <StyledInput
          type="text"
          placeholder="Price"
          name="price"
          onChange={(e) => {}}
          value={nftData.title}
          required
        />
        <Text style={{textAlign: "left"}}>Number of NFTs</Text>
        <StyledInput
          type="text"
          placeholder="Quantity"
          name="quantity"
          onChange={(e) => {}}
          value={nftData.producer}
          required
        />
        <div style={{height: "120px", width: "100px"}}/>
      </InputContainer>
    </RightSide>
  </StyledModal>
  )
}
/*
  Preview and Submit
  https://app.zeplin.io/project/606f54fb991137523a503e45/screen/60947ff91620fe37238fc146
*/
export const SubmitStep = () => {
  return (<>Step 5</>)
}

const InputContainer = styled.div`
  height: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;

  @media only screen and (max-width: 776px) {
    width: 95%;
    margin-left: auto;
    margin-right: auto;
  }
`;

const StyledInput = styled.input`
  color: white;
  background-color: #090909;
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.color.boxBorder};
  outline: none;
  margin-bottom: 5px;
  height: 30px;

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
  background-color: #343434;
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

const ChooseFile = styled.div`
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
`;

const Fixed = styled.h1`
  flex-direction: column;
  position: fixed;
  left: 25%;
  top: 40%;
  transform: translate(-50%, -50%);
  color: white;
  cursor: not-allowed;
`;

const Header = styled.h3`
  margin-top: 0;
  margin-bottom: 20px;
  align-self: center;
  color: white;
  text-transform: uppercase;
  font-family: "Compita";
`;

const Text = styled.div`
  text-align: center;
  width: 100%;
  color: #888888;
`;

const List = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Row = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: "Compita";
  font-size: medium;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.12;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
  padding: 10px;
`;

const Box = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(48% - 64px);
  padding: 32px;
  border-radius: ${(props) => props.theme.borderRadius}px;
  border: solid 1px #262626;
  background-color: #181818;
  padding-bottom: 50px;
  @media only screen and (max-width: 776px) {
    width: calc(100% - 64px);
    &:first-child {
      margin-bottom: 20px;
    }
  }
  ${props => props.disabled && css `
    opacity: 0.7;
    cursor: not-allowed;
  `}
`;
const Outer = styled.div`
  margin-top: 60px;
  width: 800px;
  align-items: space-between;
  display: flex;
  flex-direction: column;
`;

const SelectContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  @media only screen and (max-width: 776px) {
    flex-direction: column;
    width: 100%;
    align-items: center;
  }
`;