import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import { useDuels } from "../../../contexts/Duels";
import bg from "../../../assets/img/game_assets/bg.png"
import buildings from "../../../assets/img/game_assets/buildings.png"

import HealthIcon from "../../../assets/img/duels_page_assets/icon_health.png";
import AttackIcon from "../../../assets/img/duels_page_assets/icon_attack.png";
import ShieldIcon from "../../../assets/img/duels_page_assets/icon_shield.png";

import Loading from "../../../assets/img/loading.gif";


import Controls from "./Controls";
import { useMyNfts } from "../../../contexts/MyNfts";
import preloadImage from "../../../utils/preloadImg";
import gameBg from "../../../assets/img/game_assets/bg.png";

const Game = (props) => {
	const { user, selectedOpponent, inGame } = useDuels();
	const { activeNft } = useMyNfts();

	const [userHealth, setUserHealth] = useState(1);
	const [opponentHealth, setOpponentHealth] = useState(1);

	let user_width = (100 * (userHealth / inGame.contestant1.health));
	if (user_width > 99) user_width = 100;
	if (user_width < 1) user_width = 0;

	let opponent_width = (100 * (opponentHealth / inGame.contestant2.health));
	if (opponent_width > 99) opponent_width = 100;
	if (opponent_width < 1) opponent_width = 0;

	useEffect(() => {
		if (inGame.history[0]) {
			let history = inGame.history;
			setUserHealth(history[history.length - 1].contestant1Health);
			setOpponentHealth(history[history.length - 1].contestant2Health);
		} else if (activeNft) {
			setUserHealth(activeNft.stats.heal);
			setOpponentHealth(selectedOpponent.nft.stats.heal);
		} else {
			preloadImage(gameBg);
			preloadImage(buildings);
		}
	}, [inGame, activeNft, selectedOpponent])

	if (!user || !selectedOpponent || !activeNft) {
		return (
			<img src={Loading} width="100px" />
		)
	}
	return (
		<Container>
			<Buildings>
				<img src={buildings} />
			</Buildings>
			<Content>
				<Profile style={{ marginLeft: "40px" }}>
					<UserInfo>
						<h2>{user.nickname || "no name"}</h2>
						<Avatar bg={user.pictureColor}>{user.picture}</Avatar>
					</UserInfo>
					<CardInfo>
						<CardImg>
							<img src={activeNft.picture} />
						</CardImg>
						<CardDesc>
							<NftName>
								<NftLevel>{activeNft.level}</NftLevel>
								{activeNft.name}
							</NftName>
							<HealthBar>
								<img src={HealthIcon} />
								<Bar>
									<FillBar width={user_width} />
									<BarValue>
										{userHealth} Health
										</BarValue>
								</Bar>
							</HealthBar>
							<StatusArea>
								<Status>
									<img src={AttackIcon} />
									<StatusValue>
										{activeNft.stats.attack}
									</StatusValue>
								</Status>
								<Status>
									<img src={ShieldIcon} />
									<StatusValue>
										{activeNft.stats.defense}
									</StatusValue>
								</Status>
							</StatusArea>
						</CardDesc>
					</CardInfo>
				</Profile>
				<Controls />
				<Profile style={{ marginRight: "40px" }}>
					<CardInfo alignEnd>
						<CardImg alignEnd>
							<img src={selectedOpponent.nft.picture} />
						</CardImg>
						<CardDesc>
							<NftName alignEnd>
								{selectedOpponent.nft.name}
								<NftLevel>{selectedOpponent.nft.level}</NftLevel>
							</NftName>
							<HealthBar marginLeft>
								<Bar>
									<FillBar width={opponent_width} />
									<BarValue>
										{opponentHealth} Health
									</BarValue>
								</Bar>
								<img src={HealthIcon} />
							</HealthBar>
							<StatusArea marginLeft>
								<Status>
									<StatusValue>
										{selectedOpponent.nft.stats.attack}
									</StatusValue>
									<img src={AttackIcon} />
								</Status>
								<Status>
									<StatusValue>
										{selectedOpponent.nft.stats.defense}
									</StatusValue>
									<img src={ShieldIcon} />
								</Status>
							</StatusArea>
						</CardDesc>
					</CardInfo>
					<UserInfo>
						<h2>{selectedOpponent.nickname || "no name"}</h2>
						<Avatar bg={selectedOpponent.pictureColor}>{selectedOpponent.picture}</Avatar>
					</UserInfo>
				</Profile>
			</Content>
		</Container>
	)
}

const CardImg = styled.div`
	width: 16vw;
	height: 23vw;
	margin-bottom: 5%;
  margin-right: ${props => props.alignEnd && "-5%"};
  margin-left: ${props => !props.alignEnd && "-5%"};
	img {
		width: 100%;
		height: 100%;
	}
`;

const CardInfo = styled.div`
  width: 55%;
  margin-right: ${props => props.alignEnd && "20px"};
  margin-left: ${props => !props.alignEnd && "20px"};
    
  display: flex;
  flex-direction: column;
  align-items: ${props => props.alignEnd ? "flex-end" : "flex-start"};
  justify-content: flex-start;
`;

const StatusValue = styled.div`
	position: absolute;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	
	width: 26px;
	height: 26px;
	border: 1.5px solid black;
	border-radius: 100px;
	background-color: white;
	color: black;
`;

const Status = styled.div`
	position: relative;
	width: 42px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	img {
		width: 42px;
	}
	
	&:first-child {
		margin-right: 30px;
	}
`;

const StatusArea = styled.div`
	margin-top: 5px;
	width: 100%;

  margin-right: ${props => !props.marginLeft ? "4px" : "10%"};
  margin-left: ${props => props.marginLeft ? "4px" : "10%"};
	
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
`;

const BarValue = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0px;
	
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const FillBar = styled.div`
	width: ${props => props.width ? props.width + "%" : "100%"};
	height: 100%;
	background-color: #5ed57a;
	border: 0px;
  border-radius:  ${props => props.width === 100 ? "10px" : "10px 0px 0px 10px"};

  -webkit-transition: width 5s ease-in-out;
  transition: width 5s ease-in-out;
`;

const Bar = styled.div`
  position: relative;
  /* width: 238px; */
	width: 100%;
  height: 20px;
  border-radius: 10px;
  border: solid 1.5px black;
  background-color: #313131;

  font-family: Bangers;
  font-size: 13px;
  color: white;
`;

const HealthBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
	width: 100%;
  img {
    width: 34px;
    margin-right: ${props => !props.marginLeft ? "4px" : "10%"};
    margin-left: ${props => props.marginLeft ? "4px" : "10%"};
  }
`;

const NftLevel = styled.div`
  font-size: 50px;
  
  margin-right: 1vw;
  margin-left:  1vw;
`;

const NftName = styled.div`
		width: 100%;
    font-size: 32px;

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
	width: 100%;
`;

const Avatar = styled.div`
		margin-bottom: 25%;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
	width: 40%;
	
	h2 {
		font-size: 24px;
		margin-bottom: 10px;
	}
`;

const Profile = styled.div`
	width: 35%;
	
	display: flex;
	flex-direction: row;
	align-items: flex-end;
	justify-content: space-between;
`;

const Content = styled.div`
	z-index: 20;
	width: 100%;
	margin-bottom: 10px;
	
	display: flex;
	flex-direction: row;
	align-items: flex-end;
	justify-content: space-between;
`;

const Buildings = styled.div`
	width: 100%;
	height: 100%;
	position: absolute;
	
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	
	img {
		height: 110%;
		width: auto;
	}
`;

const Container = styled.div`
	z-index: 15;
	width: 100%;
	height: calc(100vh - 193px);
  background-repeat: no-repeat;
  background-size: cover;
	background-position: center;
	background-image: url(${bg});
	position: relative;
	font-family: Bangers;
	color: white;
	
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-end;
`;

export default Game;