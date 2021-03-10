import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import Inventory from "./Inventory";
import AnonPic from "../../assets/img/duels_page_assets/anon_pic.jpg";
import { useDuels } from "../../contexts/Duels";
import CardImg from "../../assets/img/duels_page_assets/fake_card.png";
import { useWallet } from "use-wallet";
import swal from "sweetalert2";

const Profiles = (props) => {
  const { account, connect } = useWallet();
  const { user, prepareDuel } = useDuels();
  const profiles = props.profiles;
  const closeTab = props.closeTab;

  const [clicked, setClicked] = useState(props.profiles.length - 1);


  const selectDuel = (profile) => {
    console.log(profile);
    if (!user.activeNFT) {
      swal.fire({
        title: `You need to chose an NFT in your inventory before battle!`,
        icon: 'warning',
      })
    } else {
      const nft = profile.inventory.find(card => profile.activeNFT === card.nftId);
      prepareDuel(profile, nft);
      const element = document.getElementById("top");
      element.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }

  const printTabs = () => {
    return profiles.map((prof, index) => {
      return (<Tab key={index} onClick={e => setClicked(index)}>
        {prof.nickname || "no name"}
        <CloseTabButton onClick={e => closeTab(index)}>
          x
                                            </CloseTabButton>
      </Tab>);
    })
  }

  const printProfile = () => {
    let profile;
    if (clicked === -1)
      profile = user;
    else
      profile = profiles[clicked] ? profiles[clicked] : user;
    return (<Profile>
      <TopInformation>
        <Rank>#{profile.rank}</Rank>
        {profile.address !== account &&
          <DuelButton onClick={e => selectDuel(profile, "hello")}>
            Duel!
                      </DuelButton>}
        <PlayerInfo>
          <Avatar bg={profile.pictureColor}>
            {profile.picture}
          </Avatar>
          <IdInfo>
            {profile.nickname || "No Name"}
            <Id>{profile.idNum}</Id>
          </IdInfo>
          <Statuses>
            <Status>
              <spam>Played</spam>
              <spam>{profile.battlesWon + profile.battlesLost}</spam>
            </Status>
            <Status>
              <spam>Won</spam>
              <spam>{profile.battlesWon}</spam>
            </Status>
            <Status>
              <spam>Lost</spam>
              <spam>{profile.battlesLost}</spam>
            </Status>
            <Status>
              <spam>Ratio</spam>
              <spam>{Math.floor((profile.battlesWon / (profile.battlesLost + profile.battlesWon)) * 100) || 0}%</spam>
            </Status>
          </Statuses>
        </PlayerInfo>
      </TopInformation>
      <Inventory profile={profile} />
    </Profile>)
  }

  useEffect(() => {
    setClicked(props.profiles.length - 1);
  }, [props.profiles]);

  if (!user) {
    return (
      <div>Loading User...</div>
    )
  }
  return (
    <Container>
      <Tabs>
        <Tab onClick={e => setClicked(-1)}>
          {user.nickname || "No Name"}
        </Tab>
        {printTabs()}
      </Tabs>
      {printProfile()}
    </Container>
  );
}

const DuelButton = styled.div`
  position: absolute;
  right: 20px;
  top: 3%;
  width: 80px;
  height: 4%;

  font-family: Bangers;
  font-size: 22px;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  text-decoration: none;
  letter-spacing: normal;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: all 0.2s ease-in-out;

  color: black;
  background: url('data:image/svg+xml;utf8,<svg width="100" height="100" transform="rotate(25)" opacity="0.3" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="%23250E17"><circle cx="25" cy="25" r="12.5" /><circle cx="75" cy="75" r="12.5" /><circle cx="75" cy="25" r="12.5" /><circle cx="25" cy="75" r="12.5" /></g></svg>'),
  #fff;
  background-size: 12px, 100%;
  border: 4px solid #000;
  box-shadow:4px 4px 0 #222;

  &:hover {
    color: black;
    background: url('data:image/svg+xml;utf8,<svg width="100" height="100" transform="rotate(25)" opacity="0.8" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="%23d68810"><circle cx="25" cy="25" r="12.5" /><circle cx="75" cy="75" r="12.5" /><circle cx="75" cy="25" r="12.5" /><circle cx="25" cy="75" r="12.5" /></g></svg>'),
    #ffcd28;
    background-size: 12px, 100%;
    font-size:22px;
    cursor: pointer;
  }
`;
const Status = styled.div`
  height: 60%;
  font-size: calc(18px + 0.3vw);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Statuses = styled.div`
  height: 100%;
  flex-grow: 2;
  width: auto;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  
  margin-right: 2%;
`;

const Id = styled.div`
  font-size: calc(18px + 0.7vw);
`;

const IdInfo = styled.div`
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  
  font-size: 40px;
  margin-left: 2%;
  margin-right: 2%;
`;

const Avatar = styled.div`
  margin-top: -3%;
  margin-left: 18px;
  
  width: calc(100px + 4.5vw);
  height: calc(100px + 4.5vw);
  
  border: 2px solid black;
  border-radius: 100px;
  
  font-size: calc(50px + 4.5vw);
  background-color: ${props => props.bg};
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const PlayerInfo = styled.div`
  color: white;
  width: calc(100% + 6px);
  height: 78%;
  padding-top: 1%;
  margin-left: -6px;
  border: 3px solid black;

  background-image: linear-gradient(to right, #b72100, #b72100 33%, #1a8eb2 74%, #1a8eb2);
  
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`;

const Rank = styled.div`
  width: 95%;
  height: 25%;
  text-align: left;

  margin-top: -6%;
  margin-bottom: 0.5%;
  margin-left: 20%;
  font-size: calc(30px + 0.5vw);
  font-family: Bangers;
`;

const TopInformation = styled.div`
  width: 100%;
  height: 20%;
  
  margin-top: 7%;
`;


const Profile = styled.div`
  height: calc(100% - 18px);
  width: 100%;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const CloseTabButton = styled.div`
    position: absolute;
    right: 5px;
    top: 2px;
    
    font-weight: bolder;
    font-family: Arial;
    cursor: pointer;
`;

const Tab = styled.div`
  position: relative;
  width: 20%;
  height: 100%;
  background-color: white;
  border: 2px solid black;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  
  margin-left: 5px;
  cursor: pointer;
  overflow: hidden;
`;

const Tabs = styled.div`
  width: 99%;
  height: 38px;
  font-size: 25px;
  
  margin-top: -20px;
  margin-right: 1%;

  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: flex-start;
`;

const Container = styled.div`
  position: relative;
  width: 58%;
  height: calc(100% - 10px);
  border: 5px solid black;
  background-color: #FEF9ED;
  font-size: 24px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export default Profiles;