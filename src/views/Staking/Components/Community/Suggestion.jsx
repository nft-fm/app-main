import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import swal from "sweetalert2";
import { useWallet } from "use-wallet";
import { require, getVinylBalance } from "../../../../web3/utils";

const Community = ({ fetchSuggestions, suggestions }) => {
  // const [exploitPrevent, setExploitPrevent] = useState(false);
  const [votes, setVotes] = useState(1);
  const { account } = useWallet();
  useEffect(() => {
    getVinylBalance(
      (res) => Number(res.vinyl[0]) > 0 && setVotes(Number(res.vinyl[0]))
    );
    // setVotes(1);
  }, [account]);

  const newStyledSuggestions = suggestions.map((suggestion, index) => {
    let votesColor = "white";
    let votesSymbol = "";
    if (suggestion.totalVotes > 0) {
      votesColor = "lightgreen";
      votesSymbol = "+";
    } else if (suggestion.totalVotes < 0) {
      votesColor = "#ff7c7c";
    }

    const castVote = async (voteAmount) => {
      // if (exploitPrevent) {
      //   swal.fire({
      //     title: `Error`,
      //     text: `Wait to vote sdfjil.`,
      //     icon: "error",
      //   });
      //   return;
      // }
      const { provider } = await require();
      const signer = provider.getSigner();
      const sig = await signer.signMessage(
        JSON.stringify({
          address: account,
          suggestionId: suggestion._id,
          voteAmount,
        })
      );
      axios
        .post(`api/gov/vote`, {
          address: account,
          voteAmount,
          suggestionId: suggestion._id,
          sig,
        })
        .then((res) => {
          fetchSuggestions();
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const upDoot = () => {
      if (suggestion.upDooted) return;
      castVote(votes);
    };
    const downDoot = () => {
      if (suggestion.downDooted) return;
      castVote(votes * -1);
    };
    return (
      <SingleSuggestion>
        <VoteButtons>
          <UpVote
            onClick={() => upDoot()}
            style={suggestion.upDooted ? { fill: "rgb(56, 205, 56)" } : {}}
            viewBox="0 0 400 400"
          >
            <path stroke-width="3" d="M 100 100 L 300 100 L 200 300 z" />
          </UpVote>
          <DownVote
            onClick={() => downDoot()}
            style={suggestion.downDooted ? { fill: "#ff4343" } : {}}
            viewBox="0 0 400 400"
          >
            <path stroke-width="3" d="M 100 100 L 300 100 L 200 300 z" />
          </DownVote>
        </VoteButtons>
        <SuggestionBody>
          <SingleTop>
            <SuggestionVotes>
              <SuggestedUserInfo>
                {suggestion.address.substring(0, 6) +
                  "..." +
                  suggestion.address.substring(suggestion.address.length - 4)}
              </SuggestedUserInfo>
              {suggestion.totalVotes !== 0 && (
                <ColorVotes style={{ color: votesColor }}>
                  {votesSymbol}
                  {suggestion.totalVotes.toLocaleString()}
                </ColorVotes>
              )}
            </SuggestionVotes>
            <SuggestionVotes>
              {moment(suggestion.timestamp).fromNow()}
            </SuggestionVotes>
          </SingleTop>
          <SuggestionText>{suggestion.message}</SuggestionText>
        </SuggestionBody>
      </SingleSuggestion>
    );
  });
  return newStyledSuggestions;
};

const SuggestedUserInfo = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.color.lightgray};
  font-family: "Compita";
`;

const SingleTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const ColorVotes = styled.div`
  font-family: "Compita";
  font-size: 14px;
  letter-spacing: 0.5px;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  display: flex;
  margin-left: 10px;
  align-items: center;
`;

const SuggestionVotes = styled.div`
  font-family: "Compita";
  font-size: 14px;
  letter-spacing: 0.5px;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  display: flex;
  color: white;
  align-items: center;
`;

const SuggestionText = styled.div`
  font-family: "Compita";
  font-size: 16px;
  font-stretch: normal;
  text-align: left;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: white;
  word-break: break-word;
`;

const SuggestionBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const UpVote = styled.svg`
  width: 20px;
  height: 20px;
  stroke: white;
  fill: white;
  cursor: pointer;
  transition: all 0.2s linear;
  transform: scaleY(-1);
  &:hover {
    fill: lightgreen;
    stroke: lightgreen;
  }
`;
const DownVote = styled.svg`
  width: 20px;
  height: 20px;
  stroke: white;
  fill: white;
  cursor: pointer;
  transition: all 0.2s linear;
  &:hover {
    fill: #ff7c7c;
    stroke: #ff7c7c;
  }
`;

const VoteButtons = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const SingleSuggestion = styled.div`
  width: calc(100% - 72px);
  padding: 8px 16px;
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  font-family: "Compita";
  font-size: 16px;
  border: 2px solid rgba(256, 256, 256, 0.5);
  border-radius: 2px;
  background-color: rgba(0, 0, 0, 0.1);
  color: white;
  margin-bottom: 10px;
  @media only screen and (max-width: 991px) {
    width: calc(100% - 50px);
  }
  /* &:nth-child(2n) {
  border-top-left-radius: 5% 4%;
  border-top-right-radius: 1% 62%;
  border-bottom-right-radius: 50% 10%;
  border-bottom-left-radius: 5% 7%;
  transform: rotate(.25deg);
} */
`;

export default Community;
