import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import HealthIcon from "../../../assets/img/duels_page_assets/icon_health.png";
import AttackIcon from "../../../assets/img/duels_page_assets/icon_attack.png";
import ShieldIcon from "../../../assets/img/duels_page_assets/icon_shield.png";

import DuelNoGlow from "../../../assets/img/duels_page_assets/duel_neutral.png";
import DuelGlow from "../../../assets/img/duels_page_assets/duel_lit.png";

import cardImg from "../../../assets/img/duels_page_assets/fake_card.png";

import DuelButton from "./DuelButton";
import {useDuels} from "../../../contexts/Duels";
import {useMyNfts} from "../../../contexts/MyNfts";
import Loading from "../../../assets/img/loading.gif";
import preloadImage from "../../../utils/preloadImg";
import {getMyNFTs} from "../../../web3/utils";

import gameBg from "../../../assets/img/game_assets/bg.png"
import buildings from "../../../assets/img/game_assets/buildings.png"

const Duellers = (props) => {
    const {user, selectedOpponent} = useDuels();
    const {activeNft} = useMyNfts();
    let opponent = selectedOpponent;

    if (!user || !selectedOpponent || !activeNft) {
        return (
          <img src={Loading} width="200px"/>
        )
    }


    return (
        <Container>
            <Dueler>
                <Info>
                    <Rank left>#{user.rank}</Rank>
                    <UserInfo>
                        <Avatar bg={user.pictureColor}>{user.picture}</Avatar>
                        <Personal>
                            <spam>{user.nickname || "no name"}</spam>
                            <spam>{user.idNum}</spam>
                        </Personal>
                    </UserInfo>
                </Info>
                <CardInfo alignEnd>
                    <CardImg src = {activeNft.picture} />
                    <CardDesc>
                        <NftName>
                            <X>{activeNft.level}</X>
                            CARD NAME
                        </NftName>
                        <Status>
                            <img src={HealthIcon}/>
                            <Bar color="#5ed57a">
                                {activeNft.stats.heal} Health
                            </Bar>
                        </Status>
                        <Status>
                            <img src={AttackIcon}/>
                            <Bar color="#d55e5e">
                                {activeNft.stats.attack} Attack
                            </Bar>
                        </Status>
                        <Status>
                            <img src={ShieldIcon}/>
                            <Bar color="#7e9ad9">
                                {activeNft.stats.defense} Defense
                            </Bar>
                        </Status>
                    </CardDesc>
                </CardInfo>
            </Dueler>
            <DuelButton />
            <Dueler>
                <Info alignEnd>
                    <Rank>#{opponent.rank}</Rank>
                    <UserInfo>
                        <Personal alignEnd>
                            <spam>{opponent.nickname}</spam>
                            <Id>{opponent.idNum}</Id>
                        </Personal>
                        <Avatar bg={opponent.pictureColor}>{opponent.picture}</Avatar>
                    </UserInfo>
                </Info>
                <CardInfo>
                    <CardDesc>
                        <NftName alignEnd>
                            {/*opponent.nft.cardName*/}Card Name
                            <X marginLeft>{opponent.nft.level}</X>
                        </NftName>
                        <Status marginLeft>
                            <Bar color="#5ed57a">
                                {opponent.nft.stats.heal} Health
                            </Bar>
                            <img src={HealthIcon}/>
                        </Status>
                        <Status marginLeft>
                            <Bar color="#d55e5e">
                                {opponent.nft.stats.attack} Attack
                            </Bar>
                            <img src={AttackIcon}/>
                        </Status>
                        <Status marginLeft>
                            <Bar color="#7e9ad9">
                                {opponent.nft.stats.defense} Defense
                            </Bar>
                            <img src={ShieldIcon}/>
                        </Status>
                    </CardDesc>
                    <CardImg src = {opponent.nft.picture} />
               </CardInfo>
            </Dueler>
        </Container>
    );
}

const Bar = styled.div`
  width: 238px;
  height: 14px;
	padding: 2px 0px;
  border-radius: 10px;
  border: solid 1.5px black;
  background-color: ${props => props.color ? props.color : "transparent" };

  font-family: Bangers;
  font-size: 13px;
	color: white;
`;

const Status = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
    
	img {
		width: 34px;
		margin-right: ${props => !props.marginLeft ? "4px" : "10%"};
    margin-left: ${props => props.marginLeft ? "4px" : "10%"};
	}
`;

const X = styled.div`
  font-size: 50px;
  
  margin-right: 1vw;
  margin-left:  1vw;
`;

const NftName = styled.div`
    width: 100%;
    font-size: 35px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: ${props => props.alignEnd ? "flex-end" : "flex-start"};
`;

const CardDesc = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const Id = styled.div`
  font-size: calc(30px + 0.6vw);
`;

const Personal = styled.div`
  margin-top: 2vw;
  margin-left: ${props => !props.alignEnd  && "0.5vw"};
  margin-right: ${props => props.alignEnd && "0.5vw"};
    
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: ${props => props.alignEnd ? "flex-end" : "flex-start"};
`;

const Avatar = styled.div`
    margin-top: -3%;
    margin-left: 18px;

    width: calc(100px + 4.5vw);
    height: calc(100px + 4.5vw);

    border: 6px solid white;
    border-radius: 100px;

    font-size: calc(50px + 4.5vw);
    background-color: ${props => props.bg};

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const UserInfo = styled.div`
  margin-top: -20px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
    
  h2 {
      font-size: 40px;
  }
`;

const Rank = styled.div`
  font-size: calc(50px + 0.7vw);
  margin-left: ${props => props.left && "12vw"} ;
  margin-right: ${props => !props.left && "12vw"};
`;


const Info = styled.div`
  width: 100%;
  
  display: flex;
  flex-direction: column;
  align-items: ${props => props.alignEnd ? "flex-end" : "flex-start"};
  justify-content: flex-start;
`;

const CardImg = styled.img`
    width: 17vw;
    height: 24vw;
`;

const CardInfo = styled.div`
  width: 95%;
  margin-top: 5vh;
  margin-right: ${props => props.alignEnd && "5%"};
  margin-left: ${props => !props.alignEnd && "5%"};
    
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content:  ${props => props.alignEnd ? "flex-end" : "flex-start"};
`;


const Dueler = styled.div`
  width: 50%;
  font-family: Bangers;
  font-size: 40px;
  color: white;
  padding: 20px;
  
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`

const Container = styled.div`
  position: relative;
  width: 100%;
  margin-top: -20px;
  
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
`



export default Duellers;