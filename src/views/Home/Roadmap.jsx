import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import security from "../../assets/img/milestones/icon_security.png";
import battle from "../../assets/img/milestones/icon_battle.png";
import community from "../../assets/img/milestones/icon_community.png";
import development from "../../assets/img/milestones/icon_development.png";
import nft from "../../assets/img/milestones/icon_nft.png";
import launch from "../../assets/img/milestones/icon_launch.png";
import isMobile from "../../utils/isMobile";

const Roadmap = () => {
  return (
    <Rectangle>
      <RecTitle><u>Roadmap</u></RecTitle>
      <RecDesc>
        <Title >
          January
      </Title>
        <MilestoneRow>
          <img className="milestone-image" alt="milestone" src={development} />
          <MilestoneTextDone>
            Development Begins
              </MilestoneTextDone>
        </MilestoneRow>
        <MilestoneRow>
          <img className="milestone-image" alt="milestone" src={community} />
          <MilestoneTextDone>
            Roadmap Announced
              </MilestoneTextDone>
        </MilestoneRow>
        <MilestoneRow>
          <img className="milestone-image" alt="milestone" src={development} />
          <MilestoneTextDone>
            App UX Designed
              </MilestoneTextDone>
        </MilestoneRow>
        <MilestoneRow>
          <img className="milestone-image" alt="milestone" src={nft} />
          <MilestoneTextDone>
            Initial NFT's Commissioned
              </MilestoneTextDone>
        </MilestoneRow>
        <Space />
        <Title >
          February
      </Title>
        <MilestoneRow>
          <img className="milestone-image" alt="milestone" src={development} />
          <MilestoneText>
            Smart Contract Development Complete
              </MilestoneText>
        </MilestoneRow>
        <MilestoneRow>
          <img className="milestone-image" alt="milestone" src={battle} />
          <MilestoneText>
            Dueling and Leveling System Complete
              </MilestoneText>
        </MilestoneRow>
        <MilestoneRow>
          <img className="milestone-image" alt="milestone" src={community} />
          <MilestoneText>
            Community Governance System Complete
              </MilestoneText>
        </MilestoneRow>
        <MilestoneRow>
          <img className="milestone-image" alt="milestone" src={security} />
          <MilestoneText>
            Security Review Done
              </MilestoneText>
        </MilestoneRow>
        <Space />
        <Title >
          March
      </Title>
        <MilestoneRow>
          <img className="milestone-image" alt="milestone" src={nft} />
          <MilestoneText>
            Founder NFT's Airdropped
              </MilestoneText>
        </MilestoneRow>
        <MilestoneRow>
          <img className="milestone-image" alt="milestone" src={development} />
          <MilestoneText>
            Smart Contract Audit
              </MilestoneText>
        </MilestoneRow>
        <MilestoneRow>
          <img className="milestone-image" alt="milestone" src={battle} />
          <MilestoneText>
            Testing
              </MilestoneText>
        </MilestoneRow>
        <MilestoneRow>
          <img className="milestone-image" style={{ width: "60px", marginLeft: "-10px", marginRight: "-10px" }} alt="milestone" src={launch} />
          <MilestoneText>
            Beta Launched!
              </MilestoneText>
        </MilestoneRow>

      </RecDesc>
    </Rectangle>
  );
};


const MilestoneRow = styled.div`display: flex; align-items: center; margin-bottom: 5px;`

const MilestoneText = styled.div`
margin-left: 30px;
font-family: "Comic Book";
font-size: 18px;
font-stretch: normal;
font-style: normal;
line-height: 1.33;
letter-spacing: normal;
text-align: left;
`

const MilestoneTextDone = styled.div`margin-left: 30px;
font-family: "Comic Book";
font-size: 18px;
font-stretch: normal;
font-style: normal;
line-height: 1.33;
letter-spacing: normal;
color: rgba(0,0,0,0.5);
text-decoration: line-through;`

const Space = styled.div`height: 20px;`

const RecDesc = styled.div`
  font-family: "Comic Book";
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.56;
  letter-spacing: normal;
  padding: 30px;
  padding-top: 10px;
`;

const RecTitle = styled.div`
  margin: auto;
  font-family: "Compita";
  font-size: 40px;
  text-decoration: none;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  padding: 30px;
  padding-bottom: 10px;
  & > u {
    color: white;
  }
`;

const Rectangle = !isMobile()
  ? styled.div`
      border-radius: 8px;
        border: solid 2px rgba(255, 183, 0, 0.3);
      background-color: #ddd;
      width: 570px;
      padding: 15px !important;
    border: solid #000;
    border-width: 5px 3px 4px 3px !important;
    border-top-left-radius: 4% 95%;
    border-top-right-radius: 95% 4%;
    border-bottom-right-radius: 6% 92%;
    border-bottom-left-radius: 95% 5%;
    transform: rotate(-.5deg);
    color: #000 !important;
    margin: 0 auto 120px auto;
    `
  : styled.div`
      width: 90vw;
      border-radius: 8px;
        border: solid 2px rgba(255, 183, 0, 0.3);
      background-color: #ddd;
      width: 570px;
      padding: 15px !important;
    border: solid #000;
    border-width: 5px 3px 4px 3px !important;
    border-top-left-radius: 4% 95%;
    border-top-right-radius: 95% 4%;
    border-bottom-right-radius: 6% 92%;
    border-bottom-left-radius: 95% 5%;
    transform: rotate(-.5deg);
    color: #000 !important;
    margin: 0 auto 40px auto;
    `;

const Title = styled.div`
  font-family: "Comic Book";
  font-weight: 600;
  font-size: 24px;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #ffffff;
  margin-bottom: 10px;
  text-align: left;
  padding-left: 30px;
  color: black;
`;


export default Roadmap;
