import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import PlayerInfo from "./PlayerInfo";
import {useDuels} from "../../../contexts/Duels";
import axios from "axios";

const BeforeOpponent = (props) => {
    const { opponents, user } = useDuels();
    const [opponentInfo, setopponentInfo] = useState(undefined);
    const [opponentNft, setOpponentNft] = useState(undefined);
    const clickProfile = props.clickProfile;
    const unClickProfile = props.unClickProfile;

    const goToProfile = (opponent) => {
      clickProfile(opponent);
      const element = document.getElementById("profiles");
      element.scrollIntoView({ behavior: "smooth"} );
    }

    const getProfileActiveCard = async (opponent) => {
        await axios.post('/api/nft/get-one', {
          nftId: opponent.activeNFT
        }).then(res => {
          setOpponentNft(res.data);
          setopponentInfo(opponent)
        }).catch(err => {
          console.log(err);
        })
    }

    const printopponents = () => {
        if (!opponents) {
          return <div>No opponents found</div>
        }
        return opponents.map((opponent, index) => {
            return (
            <tr key={index}
                onClick={async () => {await getProfileActiveCard(opponent)}}
                isClicked={opponentInfo && opponent.id === opponentInfo.id}>
                <td>#{opponent.rank}</td>
                <td>{opponent.nickname || "No Name"}</td>
                <td className="center">{opponent.battlesLost + opponent.battlesWon}</td>
                <td className="center">{Math.floor((opponent.battlesWon / (opponent.battlesLost + opponent.battlesWon)) * 100)  || 0}%</td>
            </tr>
            );
        })
    }
    return (
        <Container>
          <ListContainer>
              <List>
                <Holder>
                  <table>
                    {printopponents()}
                  </table>
                </Holder>
              </List>
              <PlayerInfo profile={opponentInfo}
                          nft={opponentNft}
                          goToProfile={goToProfile}
                          setOpponent={props.setOpponent}
                          getProfileActiveCard={getProfileActiveCard}/>
          </ListContainer>
        </Container>
    );
}

const Holder = styled.div`
  width: 448px;
  height: 570px;
  overflow: auto;
  &::-webkit-scrollbar {
    height: 50px;
    width: 16px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: none;
    width: 16px;
    border-radius: 10px;
    background-color: #4d4d4a;
  }

  &::-webkit-scrollbar-thumb {
    background-clip: padding-box;
    height: 6px;
    width: 12px;
    border-radius: 10px;
    background-color: #8B8B89;
  }

  overflow-y: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  table {
    margin-top: 2px;
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    color: #292929;
  }

  tr {
    border: none;
    line-height: 19px;
    cursor: pointer;
    
    background-color: ${props => {
                          console.log(props);
                          return props.isClicked ? "#D8D4CA" : "transparent"}
                          };
    
    &:hover {
      background-color: #D8D4CA;
    }
  }

  td {
    border: none;
    text-align: left;
    overflow: hidden;
  }
  
  .center {
    text-align: center;
  }
  
`;

const List = styled.div`
  position: relative;
  width: 467px;
  height: 600px;
  background-color: #FEF9ED;
  margin-right: 20px;

  border: 5px solid black;
  font-family: Bangers;
  font-weight: normal;
  font-size: 17px;
  color: #292929;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  a {
    text-decoration: underline;
  }
`;
const ListContainer = styled.div`
  width: 849px;
  height: 645px;
  background-color: white;
  border: 5px solid black;
  
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
  margin-top: 19px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`

export default BeforeOpponent;