
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import isMobile from "../../../utils/isMobile";
import { require, getVinylBalance } from "../../../web3/utils";
import { useWallet } from "use-wallet";

const getColor = (index) => {
  const colors = [
    'gold',
    'yellowgreen',
    'tomato',
    'dodgerblue',
  ]
  return colors[index % 4]
}

const ResultsBar = ({ percentage, index }) => (
  <FullWidth>
    <ColoredBar
      style={{
        backgroundColor: getColor(index),
        width: percentage + "%",
      }}
    />
  </FullWidth>
)

export const PollResults = ({ poll, votes, submitVote }) => {
  const { account } = useWallet();

  if (votes && poll.alreadyVoted === true) {
    let grandTotal = 0;
    poll.options.forEach(option => grandTotal += option.totalVotes)
    grandTotal += (grandTotal === 0) ? 1 : 0;

    return (
      <Results>
        <tbody>
        {poll.options.map((option, index) => {
          const percentage = option.totalVotes / grandTotal * 100;
          
          return <Result key={index - 1}>
            <OptionStats>
                <OptionText>{option.message}</OptionText>
            </OptionStats>
            <ResultsBar percentage={percentage} index={index}/>
            <PercentageText>({percentage.toFixed(2)}%)</PercentageText>
          </Result>
        })}
        </tbody>
      </Results>
    )
  }
  return null
}

export const PollOptions = ({ poll, votes, submitVote }) => {
  const { account } = useWallet();

  if (votes && poll.alreadyVoted === true) {
    return null
  }

  const length = poll.options.length
  return (
    <ButtonGroup length={length}>
      {poll.options.map((option, index) =>
        votes > 0 && poll.alreadyVoted === false ? 
        <Button
          key={option._id}
          borderColor={getColor(index)}
          onClick={e => submitVote(e, option._id)}
          length={length}
        > {option.message}
        </Button>
          :
        <Button 
          key={option._id}
          borderColor={getColor(index)}
          disabled
          length={length}
          onClick={e => submitVote(e, option._id)}
        >
          {option.message}
        </Button>
      )}
    </ButtonGroup>
  )
}

const Spacer = styled.div`
  height: 800px;
`

const OptionText = styled.div`
  font-size: 18px;
  text-align: center;
  @media only screen and (max-width: 776px) {
    font-size: 14px;
  }
`

const PercentageText = styled.td`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  text-align: center;
  @media only screen and (max-width: 776px) {
    font-size: 14px;
  }
`

const OptionStats = styled.td`
  display: flex;
  flex-direction: column;
  max-width: 170px;
  width: 30%;
  min-width: 100px;
  justify-content: center;
  align-items: center;
  text-align: center;
`

const Result = styled.tr`
  display: flex;
  flex-direction: row;
  width: 100%;
`

const Results = styled.table`
  display: flex;
  margin-top: 50px;
  margin-bottom: -50px;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  tbody {
    width 100%;
  }

  tr{
    padding: 5px 0px;
  }
`


const ButtonGroup = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: space-between;
  button:first-child {
    margin-left: 0;
  }
  button:last-child {
    margin-right: 0;
  }
  @media only screen and (max-width: 776px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  ${({ length }) =>
    (length > 3) && css`
      flex-direction: column;
      justify-content: center;
      align-items: center;
    `
  }
`

const Button = styled.button`
  cursor: ${props => props.disabled ? "not-allowed" : "pointer"};
  cursor: ${props => props.disabled ? "white" : "black"};
  display: flex;
  border: none;
  border-radius: ${(props) => props.theme.borderRadius}px;
  border: solid 1px  ${(props) => props.borderColor};
  font-size: 16px;
  -webkit-transition: all 0.2s linear;
  transition: all 0.2s linear;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-height: 50px;
  margin-right: 8px;
  margin-left: 8px;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #1d1d21;
  color: white;
  &:hover {
    background-color: #888888;
    // opacity: 0.8;
  }
  @media only screen and (max-width: 776px) {
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px 0px;
  }
`;


const FullWidth = styled.td`
  width: 100%;
  display: flex;
  flex: 1;
  height: 10px;
  // margin-top: 20px;
  justify-content: left;
  padding: 20px;
`;

const ColoredBar = styled.div`
  height: 100%;
`