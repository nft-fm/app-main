import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import styled, { css } from "styled-components";
import swal from "sweetalert2";
import { useWallet } from "use-wallet";
import { PollOptions, PollResults } from "./PollOptions";
import { require, getVinylBalance } from "../../../web3/utils";
import {
  errorIcon,
  successIcon,
  imageWidth,
  imageHeight,
} from "../../../utils/swalImages";

const Community = ({ poll, setPoll, hasVinyl, getConnectedFam }) => {
  const { account } = useWallet();
  const [votes, setVotes] = useState(1);
  const [alreadyVoted, setAlreadyVoted] = useState(true);

  const fetchPoll = useCallback(() => {
    axios
      .post(`/api/admin-poll/current`, {
        address: account,
      })
      .then((res) => {
        setPoll(res.data);
        setAlreadyVoted(res.data.alreadyVoted);
      })
      .catch((err) => {
        console.log(err);
        setPoll([]);
      });
  }, [account]);

  const submitVote = async (e, optionId) => {
    e.preventDefault();
    if (!hasVinyl) {
      return swal.fire({
        title: `Error`,
        text: `You cannot vote without $VINYL.`,
        imageUrl: errorIcon,
        imageWidth,
        imageHeight,
      });
    }
    const { provider } = await require();
    const signer = provider.getSigner();
    const sig = await signer.signMessage(
      JSON.stringify({
        address: account,
        optionId,
        voteAmount: votes,
      })
    );
    axios
      .post(`/api/admin-poll/vote/`, {
        address: account,
        optionId,
        sig,
        voteAmount: votes,
      })
      .then(() => {
        fetchPoll();
        swal.fire({
          title: `You have successfully voted`,
          // text: `You have succesfully voted`,
          imageUrl: successIcon,
          imageWidth,
          imageHeight,
        });
      })
      .catch((err) => {
        console.log(err.response);
        swal.fire({
          title: `Error: ${err.response ? err.response.status : 404}`,
          text: `${err.response ? err.response.data : "server error"}`,
          imageUrl: errorIcon,
          imageWidth,
          imageHeight,
        });
      });
  };

  useEffect(() => {
    fetchPoll();
    if (account) {
      getVinylBalance(
        (res) => Number(res.vinyl[0]) > 0 && setVotes(Number(res.vinyl[0]))
      );
    }
  }, [account, fetchPoll]);

  if (!poll.question) return null;

  return (
    <LaunchContainer>
      <ContainerTitle>
        <span>VOTE</span>
      </ContainerTitle>
      <ContainerOutline />
      <UtilityContainer>
        <ComicTitle>NFT FM TEAM</ComicTitle>
        <PollContainer>
          <SuggestionBody>
            <SuggestionText>{poll.question}</SuggestionText>
          </SuggestionBody>
          <PollResults poll={poll} votes={votes} submitVote={submitVote} />
        </PollContainer>
      </UtilityContainer>
      <PollsContainer>
        {account ? (
          <PollOptions poll={poll} votes={votes} submitVote={submitVote} />
        ) : (
          <Button onClick={getConnectedFam}>Connect Wallet</Button>
        )}
      </PollsContainer>
      <ContainerOutline alreadyVoted={alreadyVoted} reverse />
    </LaunchContainer>
  );
};

const Button = styled.button`
  cursor: pointer;
  display: flex;
  width: 100%;
  background-color: ${(props) => props.theme.color.blue};
  border-radius: 5px;
  border: none;
  color: white;
  padding: 22px 34px 20px;
  font-size: 20px;
  -webkit-transition: all 0.2s linear;
  transition: all 0.2s linear;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 1;
    color: white;
  }

  @media only screen and (max-width: 776px) {
    margin-top: 40px;
  }
`;

const ContainerOutline = styled.div`
  border-radius: 24px 24px 0 0;
  border: 6px solid #383838;
  border-bottom: none;
  height: 40px;
  width: 80%;
  display: flex;

  ${({ reverse }) =>
    reverse &&
    css`
      border-radius: 0 0 24px 24px;
      height: 60px;
      border-top: none;
      border-bottom: 6px solid #383838;
      @media only screen and (max-width: 776px) {
        display: none;
      }
    `}
`;

const ContainerTitle = styled.div`
  position: absolute;
  font-weight: 600;
  left: calc(10% + 50px);
  top: -17px;
  padding: 5px 8px 3px 8px;
  font: "Compita";
  background-color: ${(props) => props.theme.color.boxBorder};
  font-size: ${(props) => props.theme.fontSizes.sm};
  color: ${(props) => (props.faq ? "#3d3d3d" : props.theme.color.gray)};
  border: 4px solid #383838;
  border-radius: 20px;
  display: flex;
`;

const PollsContainer = styled.span`
  position: absolute;
  bottom: -45px;
  font: "Compita";
  width: 100%;
  font-size: ${(props) => props.theme.fontSizes.sm};
  color: ${(props) => (props.faq ? "#3d3d3d" : props.theme.color.gray)};
  display: flex;
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: center;
  b {
    margin-left: 5px;
    color: ${(props) => props.theme.color.gray};
    font-size: ${(props) => props.theme.fontSizes.sm};
  }
  b.first {
    margin-left: 0px;
  }

  @media only screen and (max-width: 776px) {
    bottom: 0;
    position: relative;
    width: 95%;
  }
`;

const LaunchContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 40px;
  @media only screen and (max-width: 776px) {
    width: 100%;
  }
`;

const UtilityContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: calc(100% - 32px);
  padding: 16px;
  border-radius: ${(props) => props.theme.borderRadius}px;
  border: solid 1px ${(props) => props.theme.color.blue};
  background-color: #1d1d21;
  padding-bottom: 50px;
  @media only screen and (max-width: 776px) {
    width: calc(95% - 32px);
    &:first-child {
      margin-bottom: 20px;
    }
  }
`;

const ComicTitle = styled.div`
  width: 80%;
  font: "Compita";
  color: ${(props) => (props.faq ? "#3d3d3d" : props.theme.color.gray)};
  font-size: ${(props) => props.theme.fontSizes.sm};
  text-align: center;
  // padding: 5px 10px;
  font-weight: normal;
  letter-spacing: 1px;
  font-weight: normal;
  font-weight: 600;
`;

const SuggestionText = styled.div`
  font-family: "Compita";
  font-size: ${(props) => props.theme.fontSizes.md};
  font-stretch: normal;
  text-align: left;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: white;
  word-break: break-word;
  margin-bottom: -10px;
`;

const SuggestionBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SingleSuggestion = styled.div`
  margin: 10px 0px;
  width: calc(90% - 72px);
  padding: 8px 16px;
  display: flex;
  flex-direction: row;
  font-family: "Compita";
  font-size: 16px;
  border-radius: 5px;
  color: white;
  @media only screen and (max-width: 991px) {
    width: calc(100% - 50px);
  }
`;

const PollContainer = styled(SingleSuggestion)`
  width: calc(100% - 72px);
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;
export default Community;
