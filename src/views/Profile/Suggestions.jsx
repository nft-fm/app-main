import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import axios from "axios";
import swal from "sweetalert2";
import moment from 'moment';
import { fetchBDTVotes, require } from "../../web3/utils";

const Community = ({ fetchSuggestions, suggestions }) => {
  const [exploitPrevent, setExploitPrevent] = useState(false);
  const [bdtVotes, setBdtVotes] = useState(0);
  const { account, connect } = useWallet()

  useEffect(() => {
    fetchBDTVotes((res) => setBdtVotes(res))
  }, [account])

  const newStyledSuggestions = suggestions.map((suggestion, index) => {
    let votesColor = "black";
    let votesSymbol = "";
    if (suggestion.totalVotes > 0) {
      votesColor = "rgb(56, 205, 56)";
      votesSymbol = "+";
    } else if (suggestion.totalVotes < 0) {
      votesColor = "#ff4343";
    }

    const castVote = async (voteAmount) => {
      if (exploitPrevent) {
        swal.fire({
          icon: 'error',
          title: `Error`,
          text: `Wait to vote sdfjil.`
        })
        return;
      }
      if (1 <= 0) {
        swal.fire({
          icon: 'error',
          title: `Error`,
          text: `You must have BDT or ETH-BDT-LP staked in order to participate in governance. Please stake BDT on the stake page.`
        })
        return;
      }
      const { provider } = await require();
      const signer = provider.getSigner();
      const sig = await signer.signMessage(JSON.stringify({
        address: account,
        suggestionId: suggestion._id,
        voteAmount
      }))
      axios.post(`api/user/vote`,
        {
          address: account, voteAmount, suggestionId: suggestion._id,
          sig
        }).then(res => {
          console.log("user", res.data);
          fetchSuggestions();
        }).catch(err => {
          console.log(err);
        })
    }
    const upDoot = () => {
      if (suggestion.upDooted) return;
      castVote(bdtVotes);
    }
    const downDoot = () => {
      if (suggestion.downDooted) return;
      castVote(bdtVotes * -1);
    }
    console.log("suggest", suggestion)
    return (
      <SingleSuggestion>
        <VoteButtons>
          <UpVote onClick={() => upDoot()} style={suggestion.upDooted ? { fill: "rgb(56, 205, 56)" } : {}} viewBox="0 0 400 400">
            <path stroke-width="3" d="M 100 100 L 300 100 L 200 300 z" />
          </UpVote>
          <DownVote onClick={() => downDoot()} style={suggestion.downDooted ? { fill: "#ff4343" } : {}} viewBox="0 0 400 400">
            <path stroke-width="3" d="M 100 100 L 300 100 L 200 300 z" />
          </DownVote>
        </VoteButtons>
        <SuggestionBody>
          <SingleTop>
            <SuggestionVotes>
              <SuggestedUserInfo>
                <StyledCardIcon style={{ backgroundColor: suggestion.pictureColor }}>{suggestion.picture}</StyledCardIcon>
                {suggestion.nickname ? suggestion.nickname : suggestion.address.substring(0, 6) + '...' + suggestion.address.substring(account.length - 4)}

              </SuggestedUserInfo>
              {suggestion.totalVotes !== 0 &&
                <ColorVotes style={{ color: votesColor }}>
                  {votesSymbol}{suggestion.totalVotes.toLocaleString()}
                </ColorVotes>
              }
            </SuggestionVotes>
            <SuggestionVotes>
              {moment(suggestion.timestamp).fromNow()}
            </SuggestionVotes>
          </SingleTop>
          <SuggestionText>
            {suggestion.message}
          </SuggestionText>
        </SuggestionBody>
      </SingleSuggestion>
    )
  })
  return (newStyledSuggestions);
}

const SuggestedUserInfo = styled.div`
display: flex;
align-items: center;
`

const StyledCardIcon = styled.div`
font-family: "Bangers";
  font-size: 16px;
  height: 18px;
  width: 18px;
  border-radius: 50%;
  align-items: center;
  display: flex;
  justify-content: center;
  border: solid 2px rgba(256,256,256,0.3);
  margin-right: 5px;
`;

const SingleTop = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
margin-bottom: 8px;`


const ColorVotes = styled.div`
font-family: "Bangers";
font-size: 14px;
letter-spacing: 0.5px;
font-stretch: normal;
font-style: normal;
line-height: 1;
display: flex;
margin-left: 10px;
align-items: center;`

const SuggestionVotes = styled.div`
font-family: "Bangers";
font-size: 14px;
letter-spacing: 0.5px;
font-stretch: normal;
font-style: normal;
line-height: 1;
display: flex;
color: black;
align-items: center;`

const SuggestionText = styled.div`
font-family: "Comic Book";
font-size: 16px;
font-stretch: normal;
text-align: left;
font-style: normal;
line-height: 1;
letter-spacing: normal;
color: black;
word-break: break-word;
`

const SuggestionBody = styled.div`
width: 100%;
display: flex;
flex-direction: column;
align-items: flex-start;
`

const UpVote = styled.svg`
width: 20px;
height: 20px;
stroke: grey;
fill: grey;
cursor: pointer;
transition: all 0.2s linear;
transform: scaleY(-1);
&:hover {
  fill: black;
  stroke: rgb(255,204,74);
}
`
const DownVote = styled.svg`
width: 20px;
height: 20px;
stroke: grey;
fill: grey;
cursor: pointer;
transition: all 0.2s linear;
&:hover {
  fill: black;
  stroke: rgb(255,204,74);
}`

const VoteButtons = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`


const SingleSuggestion = styled.div`
width: calc(100% - 72px);
padding: 8px 16px;
display: flex;
flex-direction: row;
margin-bottom: 20px;
font-family: "Comic Book";
font-size: 16px;
border: solid black;
border-width: 2px;
background-color: #fef9ed;
border-top-left-radius: 8% 5%;
border-top-right-radius: 5% 4%;
border-bottom-right-radius: 6% 7%;
border-bottom-left-radius: 25% 5%;
transform: rotate(-0.25deg);
color: black;
margin-bottom: 10px;
&:nth-child(2n) {
  border-top-left-radius: 5% 4%;
  border-top-right-radius: 1% 62%;
  border-bottom-right-radius: 50% 10%;
  border-bottom-left-radius: 5% 7%;
  transform: rotate(.25deg);
}
`

export default Community