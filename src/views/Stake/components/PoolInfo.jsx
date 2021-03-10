import React from "react";
import styled from "styled-components";

export const PoolInfo = (props) => {
    return (
        <InfoLines>
        <Line style={{ marginLeft: "20px", marginRight: "-20px" }}>
          Your Balance:
          <ShadedLine>{parseFloat(props.balance).toFixed(2)}{` ${props.unit}`}</ShadedLine>
        </Line>
        <Line style={{ marginLeft: "7px", marginRight: "-7px" }}>
          Currently Staked:
          <ShadedLine>{parseFloat(props.currStaked).toFixed(2)}</ShadedLine>
        </Line>
        <Line style={{ marginLeft: "-6px", marginRight: "6px" }}>
          Rewards Available:
          <ShadedLine>{props.rewardsAvailable} DC</ShadedLine>
        </Line>
      </InfoLines>
    )
}


const InfoLines = styled.div`
  width: 90%;
  margin: 30px auto 10px auto;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-align: left;
  font-family: "Bangers";
  font-size: 30px;
  line-height: 1;
  letter-spacing: 1px;
  color: #ffffff;
  transform: skewX(15deg);
  @media only screen and (max-width: 1200px) {
    font-size: 18px;
  }
`;

const ShadedLine = styled.div`
  margin-left: 20px;
  color: #ffb700;
  text-align: right;
`;

const Line = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;
