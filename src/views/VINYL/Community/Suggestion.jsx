import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import swal from "sweetalert2";
import { useWallet } from "use-wallet";
import { require, getVinylBalance } from "../../../web3/utils";
import { errorIcon, warningIcon, questionIcon, successIcon, infoIcon, imageWidth, imageHeight } from "../../../utils/swalImages";

// import AccountBoxIcon from '@material-ui/icons/AccountBox';

const Suggestion = ({ fetchSuggestions, suggestions, isDesktop, hasVinyl }) => {
  const [exploitPrevent, setExploitPrevent] = useState(false);
  const [votes, setVotes] = useState(0);
  const { account } = useWallet();

  useEffect(() => {
    getVinylBalance((res) => Number(res.vinyl[0]) > 0 && setVotes(Number(res.vinyl[0])))
  }, [account]);


  const newStyledSuggestions = suggestions.map((suggestion, index) => {
    let votesColor = "white";
    let votesSymbol = "";
    if (suggestion.totalVotes > 0) {
      votesColor = "#68c12f";
      votesSymbol = "+";
    } else if (suggestion.totalVotes < 0) {
      votesColor = "#de3a3a";
    }

    const convertNumber = (num) => {
      if (num >= 1000000) {
        let shortened = (num / 1000000).toFixed(1)
        return (shortened + 'm')
      }
      else if (num >= 1000) {
        let shortened = (num / 1000).toFixed(1)
        return (shortened + 'k')
      }
      else if (num <= -1000) {
        let shortened = (num / 1000).toFixed(1)
        return (shortened + 'k')
      }
      else if (num <= -1000000) {
        let shortened = (num / 1000000).toFixed(1)
        return (shortened + 'm')
      }
      else if (num === 0) return "0";
      return num.toFixed(1)
    }

    const castVote = async (voteAmount) => {
      if (exploitPrevent) {
        swal.fire({
          title: `Error`,
          text: `Wait to vote sdfjil.`,
          icon: "error",
        });
        return;
      }
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
      if (votes === 0) {
        return swal.fire({
          title: `Error`,
          text: `You cannot vote without $VINYL`,
          imageUrl: warningIcon,
          imageWidth,
          imageHeight
        });
      }
      castVote(suggestion.upDooted ? 0 : votes);
    };

    const downDoot = () => {
      if (votes === 0) {
        return swal.fire({
          title: `Error`,
          text: `You cannot vote without $VINYL`,
          imageUrl: errorIcon,
          imageWidth,
          imageHeight
        });
      }      
      castVote(suggestion.downDooted ? 0 : votes * -1);
    };
    
    return (
      <SuggestionCard key={index}>
        <UserVotes>
          <Upvote
            onClick={() => upDoot()}
            style={suggestion.upDooted ? { fill: "#68c12f" } : {}}
            viewBox="0 0 400 400"
            preserveAspectRatio="none">
            <path strokeWidth="3" d="M 100 100 L 300 100 L 200 300 z" />
          </Upvote>
          <Votes>
            <ColorVotes style={{ color: votesColor }}>
              {votesSymbol}
              {convertNumber(suggestion.totalVotes)}
            </ColorVotes>
          </Votes>
          <Downvote
            onClick={() => downDoot()}
            style={suggestion.downDooted ? { fill: "#fa423e" } : {}}
            viewBox="0 0 400 400"
            preserveAspectRatio="none">
            <path strokeWidth="3" d="M 100 100 L 300 100 L 200 300 z" />
          </Downvote>
        </UserVotes>    
        <Information>
          <Header>
            <UserInfo>
              {/* <AccountBoxIcon style={{marginRight: "5px", marginLeft: "-3px"}}/> */}
              <Address>
                {isDesktop
                  ? suggestion.address
                  : suggestion.address.substring(0, 6) + "..." +
                  suggestion.address.substring(suggestion.address.length - 4)}
              </Address>
            </UserInfo>
            <Timestamp>
              {moment(suggestion.timestamp).fromNow()}
            </Timestamp>
          </Header>
          <SuggestionBody>{suggestion.message}</SuggestionBody>
        </Information>
      </SuggestionCard>
    );
  });
  return newStyledSuggestions;
};

const Upvote = styled.svg`
  width: 30px;
  height: 20px;
  stroke: ${props => props.theme.color.gray};
  fill: ${props => props.theme.color.gray};
  cursor: pointer;
  transition: all 0.2s linear;
  transform: scaleY(-1);
  &:hover {
   fill: #68c12f;
   stroke: #68c12f;
  }
`
const Votes = styled.div`
  margin: 5px 0;
  font: "Compita";
`
const Downvote = styled.svg`
  width: 30px;
  height: 20px;
  stroke: ${props => props.theme.color.gray};
  fill: ${props => props.theme.color.gray};
  cursor: pointer;
  transition: all 0.2s linear;
  &:hover {
    fill: #fa423e;
    stroke: #fa423e;
  }
`

const ColorVotes = styled.div`
  font-size: 15px;
  letter-spacing: 0.5px;
  line-height: 15px;
  display: flex;
  align-items: center;
  font-family: "Sophia Nubian Bold"
`;

const UserVotes = styled.div`
  width: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 15px;
  @media only screen and (max-width: 360px){
    margin: 0 10px;
  }
`

const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Address = styled.div`
  font-size: 15px;
`

const Timestamp = styled.div`
  font-size: 0.75em;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 18px;
  color: #c1c1c1;
  align-items: center;
`

const SuggestionBody = styled.div`
  word-break: break-word;
  text-align: left;
  font-size: 16px;
`

const Information = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const SuggestionCard = styled.div`
  width: 100%;
  // border: 1px solid #2d2d34;
  border-radius: 5px;
  background-color: #1d1d21;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 10px;
  box-sizing: border-box;
  font-size: 16px;
  color: white;
  padding: 10px 20px 13px 0;

`

export default Suggestion