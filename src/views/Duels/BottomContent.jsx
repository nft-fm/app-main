import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Profiles from "./Profiles";
import CardSlider from "./CardSlider";
import { useDuels } from "../../contexts/Duels";


const BottomContent = (props) => {
  const { leaderboard } = useDuels();
  const user = props.user;
  const [searchBar, setSearchBar] = useState("Search...");
  const printLeaderBoard = () => {
    const labels = [<tr className="label" key="label">
      <th className="left">Rank</th>
      <th>Name</th>
      <th>Played</th>
      <th>Won</th>
      <th>Lost</th>
      <th>Ratio</th>
    </tr>]
    if (leaderboard) {
      let lb = leaderboard.map((profile, index) => {
        if (profile.rank > 0)
          return <tr onClick={e => props.clickProfile(profile)} key={index}>
            <td className="left">#{profile.rank}</td>
            <td>{profile.nickname || "no name"}</td>
            <td>{profile.battlesLost + profile.battlesWon}</td>
            <td>{profile.battlesWon}</td>
            <td>{profile.battlesLost}</td>
            <td>{Math.floor((profile.battlesWon / (profile.battlesLost + profile.battlesWon)) * 100) || 0}%</td>
          </tr>
      });
      return labels.concat(lb);
    }
    else
      return labels;
  }

  return (
    <Container>
      <div id="profiles"></div>
      <Content>
        <Left>
          <HistoryContainer>
            <Title>Battle History</Title>
            <CardSlider user={user} clickProfile={props.clickProfile} />
          </HistoryContainer>

          <LeaderBoard>
            <Title>LeaderBoard</Title>
            <Table>
              <table>
                {printLeaderBoard()}
              </table>
            </Table>
          </LeaderBoard>
        </Left>
        <Profiles profiles={props.clickedProfiles}
          user={user}
          closeTab={props.unClickProfile} />
      </Content>
    </Container>
  );
}

const Table = styled.div`
  width: 98%;
  height: 100%;
  margin-bottom: 2%;

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: none;
    border-radius: 10px;
    background-color: #4d4d4a;
  }

  &::-webkit-scrollbar {
    width: 12px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #8B8B89;
  }

  overflow-y: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;

    a {
      text-decoration: none;
    }
  }

  tr {
    border: 0px;

    &:hover {
      background-color: #e5e1d6;
    }
  }

  td {
    border: 0px;
    cursor: pointer;
    line-height: 35px;
  }
  
  th {
    font-size: 25px;
    line-height: 50px;
  }

  .left {
    text-align: left;
  }
  .label {
    &:hover {
      background-color: transparent;
    }
  }

`;

const LeaderBoard = styled.div`
  height: 60%;
  width: 100%;
  background-color: #FEF9ED;
  border: 5px solid black;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  letter-spacing: 2px;
  
`;

const Title = styled.h3`
    font-family: Bangers;
    width: 100%;
    font-size: 40px;
    margin: 0px;
    padding-bottom: 15px;
    padding-top: 15px;
	  border-bottom: 3px solid black;
`

const HistoryContainer = styled.div`
  background-color: #FEF9ED;
  height: 35%;
  width: 100%;
  border: 5px solid black;

`

const Left = styled.div`
  width: 38%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Content = styled.div`
  height: calc(100vh - 88px);
  width: 95%;
  margin-top: 33px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

const Container = styled.div`
  width: 100%;
  height: auto;
  margin-top: 40px;
  padding-bottom: 40px;
  background-color: white;

  border-top: 3px solid black;
  font-family: Bangers;
  font-size: 20px;
  color: #292929;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export default BottomContent;