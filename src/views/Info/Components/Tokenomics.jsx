import React from "react";
import styled from "styled-components";
import isMobile from "../../../utils/isMobile";

const Tokenomics = () => {
  return (
    <>
      <LaunchContainer>
        <ContainerTitle>TOKENOMICS</ContainerTitle>
        {/* <NftContainerRight
          href="https://drive.google.com/file/d/1BHmrjYef0FBp4Q0I-juXVfllviT0Paj9/view?usp=sharing"
          target="_blank"
        >
          CONTRACT AUDIT
        </NftContainerRight> */}
        <ContainerOutline />
        <LaunchFeaturesContainer>
          <LaunchFeaturesBox>
            <LaunchFeaturesHeader style={{ color: "#fa423e" }}>
              TEAM / PROJECT
            </LaunchFeaturesHeader>
            <LaunchFeaturesTextLargest>15%</LaunchFeaturesTextLargest>
            <LaunchFeaturesTextSmallGray>
              For advertising, marketing, development
            </LaunchFeaturesTextSmallGray>
            {/* <br /> */}
            {/* <SubHolder /> */}
          </LaunchFeaturesBox>
          <LaunchFeaturesBox>
            <LaunchFeaturesHeader style={{ color: "#20a4fc" }}>
              SALES
            </LaunchFeaturesHeader>
            <SubHolder>
              <LaunchFeaturesTextLarge>Private: 21%</LaunchFeaturesTextLarge>
              <LaunchFeaturesTextSmallGray>
                21 Billion $VINYL
              </LaunchFeaturesTextSmallGray>
            </SubHolder>
            <br />
            <SubHolder>
              <LaunchFeaturesTextLarge>Presale: 32%</LaunchFeaturesTextLarge>
              <LaunchFeaturesTextSmallGray>
                32 Billion $VINYL
              </LaunchFeaturesTextSmallGray>
            </SubHolder>
          </LaunchFeaturesBox>
          <LaunchFeaturesBox>
            <LaunchFeaturesHeader style={{ color: "#68c12f" }}>
              LIQUIDITY
            </LaunchFeaturesHeader>
            {/* <LaunchFeaturesContent> */}
            <LaunchFeaturesTextLargest>32%</LaunchFeaturesTextLargest>
            <LaunchFeaturesTextSmallGray>
              With 2% of fees going back into liquidity
            </LaunchFeaturesTextSmallGray>
            <br />
            {/* <SubHolder /> */}
            {/* </LaunchFeaturesContent> */}
          </LaunchFeaturesBox>
          <LaunchFeaturesBox>
            <LaunchFeaturesHeader style={{ color: "#fde404" }}>
              FEE BREAKDOWN
            </LaunchFeaturesHeader>
            <SubHolder>
              <LaunchFeaturesTextLarge>6%</LaunchFeaturesTextLarge>
              <LaunchFeaturesTextSmallGray>
                Split between artists and stakers
              </LaunchFeaturesTextSmallGray>
            </SubHolder>
            <br />
            <SubHolder>
              <LaunchFeaturesTextLarge>4%</LaunchFeaturesTextLarge>
              <LaunchFeaturesTextSmallGray>
                Split between liquidity buyback and marketing
              </LaunchFeaturesTextSmallGray>
            </SubHolder>
          </LaunchFeaturesBox>
        </LaunchFeaturesContainer>
      </LaunchContainer>
      <div style={{ height: "50px" }} />
      <UtilityContainer>
        <Title>VINYL Utility </Title>
        <Divider />
        <Holder>
          <Half>
            <UtilityTitle>Governance</UtilityTitle>
            <Divider />
            <BulletPoint>
              Make and vote on proposals for new features or changes to NFTFM
            </BulletPoint>
            <br />
            <BulletPoint>
              Votes are weighted based on the amount of $VINYL that the user
              holds
            </BulletPoint>
            <br />
            <BulletPoint>
              On a regular basis, $VINYL holders will be polled on a decision
              being made. They get to vote on these corporate decisions with
              their vote being weighted by their coin ownership
            </BulletPoint>
            <br />
            <BulletPoint>
              Token holders likes cast on the site are weighted based off of the
              quantity of $VINYL that they hold
            </BulletPoint>
            <BulletPoint>More coming soon!</BulletPoint>
          </Half>
          <Half>
            <UtilityTitle>Staking</UtilityTitle>
            <Divider />
            <BulletPoint>
              Join your favorite NFT FM artist's fanclub by staking your $VINYL
              to start immediately earning rewards for both you and the artist!
            </BulletPoint>
            <br />
            <BulletPoint>
              Artist's can see who is staking on them and interact with them via
              our custom chat feature
            </BulletPoint>
            <br />
            {/* <BulletPoint>Artist's can </BulletPoint>
            <br /> */}
            <BulletPoint>
              Stake your $VINYL on your favorite NFT FM artist today!
            </BulletPoint>
            <br />
          </Half>
        </Holder>
      </UtilityContainer>
    </>
  );
};
const UtilityContainer = styled.div`
  margin-top: 80px;
  color: white;
  border-radius: ${(props) => props.theme.borderRadius}px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: calc(100% - 64px);
  padding: 32px;
  margin-bottom: 40px;
  border: solid 1px #262626;
  background-color: #181818;
`;

const BulletPoint = styled.li`
  margin-bottom: 10px;
  text-align: left;
  font-size: 16px;
  width: 100%;
`;
const Holder = styled.div`
  width: 100%;
  display: flex;
`;

const UtilityTitle = styled.span`
  font-size: 20px;
`;

const Half = styled.ul`
  width: 50%;
  margin: 0;
  padding: 0 10px;
`;

const NftContainerRight = styled.a`
  text-decoration: none;
  white-space: nowrap;
  position: absolute;
  font-weight: 600;
  margin-left: 80%;
  margin-right: 20%;
  height: 17px;
  /* width: 17px; */
  top: -13px;
  padding: 5px 8px 3px 8px;
  font: "Compita";
  background-color: ${(props) => props.theme.bgColor};
  font-size: ${(props) => props.theme.fontSizes.xs};
  color: ${(props) => props.theme.color.lightgray};
  display: flex;
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid #383838;
  border-radius: 20px;
  transition: 0.2s;
  /* ${({ active }) =>
    !active &&
    `
  color:  white;
  `} */
  &:hover {
    color: white;
  }
`;

const Title = styled.h1`
  margin: 0;
  /* margin-top: -12px; */
`;
const Divider = !isMobile()
  ? styled.div`
      height: 1px;
      width: 100%;
      background-color: rgba(256, 256, 256, 0.6);
      -webkit-align-self: center;
      -ms-flex-item-align: center;
      align-self: center;
      margin: 5px 0 20px 0;
    `
  : styled.div`
      height: 1px;
      width: 90%;
      background-color: rgba(256, 256, 256, 0.6);
      -webkit-align-self: center;
      -ms-flex-item-align: center;
      align-self: center;
      margin: 5px 0 20px 0;
    `;

const LaunchContainer = styled.div`
  position: relative;
  // border-radius: ${(props) => props.theme.borderRadius}px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 120px;
  @media only screen and (max-width: 800px) {
    margin-top: 80;
  }
`;
const ContainerTitle = styled.span`
  position: absolute;
  font-weight: 600;
  left: calc(10% + 50px);
  top: -13px;
  padding: 0 12px;
  /* font-family: "Flames"; */
  letter-spacing: 3px;
  background-color: ${(props) => props.theme.bgColor};
  font-size: ${(props) => props.theme.fontSizes.sm};
  color: ${(props) => props.theme.color.white};
  display: flex;
  flex-direction: row;
  display: flex;
  align-items: center;

  padding: 5px 8px 3px 8px;
  background-color: ${(props) => props.theme.color.boxBorder};
  font-size: ${(props) => props.theme.fontSizes.xs};
  color: ${(props) => props.theme.color.gray};
  border: 4px solid #383838;
  border-radius: 20px;

  @media only screen and (max-width: 776px) {
    left: 15%;
  }
`;

const ContainerOutline = styled.div`
  border-radius: 24px 24px 0 0;
  border: 6px solid #383838;
  border-bottom: none;
  height: 40px;
  width: 80%;
  display: flex;
  flex-direction: row;
`;
const LaunchFeaturesContainer = styled.div`
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
const LaunchFeaturesBox = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 20%;
  padding: 20px;
  /* height: 300px; */
  border-radius: ${(props) => props.theme.borderRadius}px;
  border: solid 1px #262626;
  background-color: #181818;
  @media only screen and (max-width: 1200px) {
    padding: 10px;
  }
  @media only screen and (max-width: 776px) {
    width: calc(100% - 64px);
    margin-bottom: 20px;
    height: auto;
  }
`;

const LaunchFeaturesHeader = styled.h3`
  margin-top: 0;
  margin-bottom: 30px;
  align-self: center;
  color: white;
  font-family: "Compita";
  @media only screen and (max-width: 1200px) {
    margin-bottom: 10px;
  }
`;

// const LaunchFeaturesContent = styled.div`
//   width: 100%;
//   height: auto;
//   display: flex;
//   flex-direction: column;
//   margin-top: 40%;
//   margin-bottom: 60%;
// `;

const LaunchFeaturesTextLargest = styled.span`
  font-size: ${(props) => props.theme.fontSizes.xl};
  font-weight: 600;
  text-align: center;
  color: white;
  height: 105px;
  @media only screen and (max-width: 776px) {
    /* font-size: ${(props) => props.theme.fontSizes.md}; */
    height: auto;
  }
`;
const LaunchFeaturesTextLarge = styled.span`
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: 600;
  text-align: center;
  color: white;
  @media only screen and (max-width: 1200px) {
    font-size: 1.3rem;
  }
  @media only screen and (max-width: 776px) {
    font-size: ${(props) => props.theme.fontSizes.md};
  }
`;

const LaunchFeaturesTextSmallGray = styled.span`
  font-size: 0.85rem;
  font-size: ${(props) => props.theme.fontSizes.xs};
  text-align: center;
  color: ${(props) => props.theme.color.lightgray};
  @media only screen and (max-width: 1200px) {
    font-size: 0.85rem;
  }
  @media only screen and (max-width: 776px) {
    font-size: ${(props) => props.theme.fontSizes.xs};
  }
`;

const SubHolder = styled.div`
  display: flex;
  flex-direction: column;
  height: 105px;
  @media only screen and (max-width: 776px) {
    height: auto;
  }
`;

export default Tokenomics;
