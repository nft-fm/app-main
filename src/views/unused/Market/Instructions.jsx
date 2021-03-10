import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import img_1 from "../../assets/img/unused/instructions/0@2x.png";
import img_2 from "../../assets/img/unused/instructions/1@2x.png";
import img_3 from "../../assets/img/unused/instructions/2@2x.png";
import img_4 from "../../assets/img/unused/instructions/3@2x.png";
import img_5 from "../../assets/img/unused/instructions/4@2x.png";
import img_6 from "../../assets/img/unused/instructions/5@2x.png";
import isMobile from "../../utils/isMobile";

const Instructions = () => {

  return (
    <Rectangle>
      <RecDesc>
        <MilestoneRow>
          <img className="milestone-image" alt="milestone" src={img_1} />
          <MilestoneText>
            Your staked WAR is never at risk, but your daily rewards are fought over in battle!

              </MilestoneText>
        </MilestoneRow>
        <MilestoneRow>
          <img className="milestone-image" alt="milestone" src={img_2} />
          <MilestoneText>
            Fight with the winning army and win 50% of the losers rewards!
              </MilestoneText>
        </MilestoneRow>
        <MilestoneRow>
          <img className="milestone-image" alt="milestone" src={img_3} />
          <MilestoneText>
            Leave a battle before it ends (18:00 UTC) and your votes/rewards for that day will not be counted!
              </MilestoneText>
        </MilestoneRow>
        <MilestoneRow>
          <img className="milestone-image" alt="milestone" src={img_4} />
          <MilestoneText>
            You can only vote once per day. Votes and Rewards are tallied by how much you have staked in battle when voting ends (18:00 UTC). Early and late voters earn the same.
              </MilestoneText>
        </MilestoneRow>
        <MilestoneRow>
          <img className="milestone-image" alt="milestone" src={img_5} />
          <MilestoneText>
            Battles end at 18:00 UTC daily and start again at 19:00 UTC.
              </MilestoneText>
        </MilestoneRow>
        <MilestoneRow>
          <img className="milestone-image" alt="milestone" src={img_6} />
          <MilestoneText>
            $WAR Rewards will only show in your account after battles end and votes are tallied.
              </MilestoneText>
        </MilestoneRow>
      </RecDesc>
    </Rectangle>
  );
};

const MilestoneRow = styled.div`display: flex; align-items: center; margin-bottom: 20px;`

const MilestoneText = styled.div`margin-left: 30px;
font-family: "Bangers";
font-size: 18px;

font-stretch: normal;
font-style: normal;
line-height: 1.33;
letter-spacing: normal;
color: #ffffff;
text-align: left;`


const RecDesc = styled.div`
  font-family: "Bangers";
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.56;
  letter-spacing: normal;
  color: #ffffff;
  padding: 30px;
  padding-bottom: 20px;
`;

const Rectangle = !isMobile()
  ? styled.div`
      border-radius: 8px;
        border: solid 2px rgba(255, 183, 0, 0.3);
      background-color: rgba(256,256,256,0.08);
      margin-bottom: 80px;
      margin-top: 80px;
      width: 780px;
    `
  : styled.div`
      width: 90vw;
      border-radius: 8px;
        border: solid 2px rgba(255, 183, 0, 0.3);
      background-color: rgba(256,256,256,0.08);
      margin-bottom: 80px;
    `;

export default Instructions;