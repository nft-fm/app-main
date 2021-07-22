import React from 'react';
import styled, { css } from "styled-components";
import single_nft from "../../../../assets/img/profile_page_assets/PNG_500px_single.png";
import many_nft from "../../../../assets/img/profile_page_assets/PNG_500px_multi.png";

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
          <Image src={single_nft} alt="single"/>
          <List>
            <Row>
              <Text>
                Create a unique NFT with the option of auctioning it!
              </Text>
            </Row>
            <Row>
              <Text>
                Pick a price and time and sell to the highest bidder.
              </Text>
            </Row>
          </List>
        </Box>
        <Fixed>COMING SOON</Fixed>
        <Box onClick={() => setCurrentStep(2)}>
          <Header>Multiple</Header>
          <Image src={many_nft} alt="many"/>
          <List>
            <Row>
              <Text>Create multiple NFTs</Text>
            </Row>
            <Row>
              <Text>Pick a price and how many NFTs you would like to have minted on the marketplace.</Text>
            </Row>
          </List>
        </Box>
      </SelectContainer>
    </Outer>
  )
}

const Image = styled.img`
  width: 70%;
  @media only screen and (max-width: 500px) {
    width: 50%;
  }
`

const Fixed = styled.h1`
  flex-direction: column;
  position: fixed;
  left: 25%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: white;
  cursor: not-allowed;
  @media only screen and (max-width: 500px) {
    left: 50%;
    top: 30%;
  }
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
    width: calc(48% - 32px);
    padding: 16px;
  }
  ${props => props.disabled && css `
    opacity: 0.7;
    cursor: not-allowed;
  `}
  @media only screen and (max-width: 500px) {
    width: calc(100% - 32px);
    &:first-child {
      margin-bottom: 20px;
    }
  }
`;
const Outer = styled.div`
  margin-top: 60px;
  width: 800px;
  align-items: space-between;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 776px) {
    width: calc(100% - 64px);
  }
`;

const SelectContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  @media only screen and (max-width: 500px) {
    flex-direction: column;
    width: 100%;
    align-items: center;
  }
`;