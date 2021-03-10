import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import HealthIcon from "../../../assets/img/duels_page_assets/icon_health.png";
import AttackIcon from "../../../assets/img/duels_page_assets/icon_attack.png";
import ShieldIcon from "../../../assets/img/duels_page_assets/icon_shield.png";
import GrabIcon from "../../../assets/img/game_assets/icon_grab.png";

import HealMove from "../../../assets/img/game_assets/heal_move.png";
import AttackMove from "../../../assets/img/game_assets/attack_move.png";
import DefendMove from "../../../assets/img/game_assets/defense_move.png";
import GrabMove from "../../../assets/img/game_assets/grab_move.png";

import Loading from "../../../assets/img/loading.gif";

import swal from "sweetalert2";
import axios from "axios";
import { useWallet } from "use-wallet";
import { useDuels } from "../../../contexts/Duels";

const Controls = () => {
	const { account, connect } = useWallet();
	const { inGame, setInGame, initialize, setSelectedOpponent } = useDuels();
	const [loading, setLoading] = useState(false);
	const [hover, setHover] = useState(undefined);
	const [results, setResults] = useState(undefined);

	const calculateHealth = (newHealth, oldHealth) => {
		if (newHealth > oldHealth) {
			return `got + ${newHealth - oldHealth} Health`;
		} else if (newHealth < oldHealth) {
			return `got - ${oldHealth - newHealth} Health`
		} else {
			return `health didn't change`
		}
	}
	const clickOption = (option) => {
		swal.fire({
			title: `You are about to ${option} your opponent`,
			icon: 'warning',
			confirmButtonText: 'Confirm Operation'
		}).then(async res => {
			setResults(undefined);
			setLoading(true);
			axios.post(`api/battle/update`, {
				address: account,
				move: option
			})
				.then(res => {
					let history = res.data.newHistory
					let newHistory = history[history.length - 1];
					let before_user = history[history.length - 2] ? history[history.length - 2].contestant1Health : inGame.contestant1.health;
					let before_opponent = history[history.length - 2] ? history[history.length - 2].contestant2Health : inGame.contestant2.health;

					const won = newHistory.contestant1Health > 0;
					if (res.data.finished) {
						swal.fire({
							title: `Your opponent used ${newHistory.contestant2Move}\n
											 You used ${newHistory.contestant1Move}\n
											 You ${calculateHealth(newHistory.contestant1Health, before_user)}\n
											 Your opponent ${calculateHealth(newHistory.contestant2Health, before_opponent)}
											 ${won ? "You won" : "You lost"}. Your xp and your card's will be updated!`,
							icon: won ? 'success' : 'error',
							confirmButtonText: 'Confirm Operation'
						}).then(res => {
							setInGame(false);
							setSelectedOpponent(false);
							initialize();
						});
					} else {
						setResults([newHistory.contestant1Move, newHistory.contestant2Move]);
						setLoading(false);
						setInGame({
							...inGame,
							history: res.data.newHistory
						});
					}
				})
				.catch(err => {
					console.log("fail", err);
				})
		})
	}

	const getMoves = (index) => {
		switch (results[index]) {
			case "HEAL":
				return <Result><MoveImg src={HealMove} alt="heal" /></Result>
			case "ATTACK":
				return <Result><MoveImg src={AttackMove} alt="attack" /></Result>
			case "DEFEND":
				return <Result><MoveImg src={DefendMove} alt="defend" /></Result>
			case "GRAB":
				return <Result><MoveImg src={GrabMove} alt="grab" /></Result>
		}
	}

	if (loading) {
		return <Container>
			<img style={{ width: "50%" }} src={Loading} />
		</Container>
	}
	return (
		<Container>
			{results &&
				<Results>
					{getMoves(0)}
					{getMoves(1)}
				</Results>
			}
			<Options>
				<Option onMouseEnter={(e) => setHover("health")}
					onMouseLeave={(e) => setHover(undefined)}
					onClick={(e) => clickOption("HEAL")}>
					<img src={HealthIcon} alt="Heal" />
					{hover === "health" &&
						<MoveDescription>heal</MoveDescription>}
				</Option>
				<Option
					onMouseEnter={(e) => setHover("attack")}
					onMouseLeave={(e) => setHover(undefined)}
					onClick={(e) => clickOption("ATTACK")}>
					<img
						style={{ marginTop: "20px" }}

						src={AttackIcon} alt="Attack" />
					{hover === "attack" &&
						<MoveDescription>attack</MoveDescription>}
				</Option>
				<Option

					onMouseEnter={(e) => setHover("defend")}
					onMouseLeave={(e) => setHover(undefined)}
					onClick={(e) => clickOption("DEFEND")}>
					<img
						style={{ marginTop: "20px" }}

						src={ShieldIcon} alt="Defend" />
					{hover === "defend" &&
						<MoveDescription>defend</MoveDescription>}
				</Option>
				<Option onMouseEnter={(e) => setHover("grab")}
					onMouseLeave={(e) => setHover(undefined)}
					onClick={(e) => clickOption("GRAB")}>
					<img src={GrabIcon} alt="Grab" />
					{hover === "grab" &&
						<MoveDescription>grab</MoveDescription>}
				</Option>
			</Options>
		</Container>
	)
}

const MoveDescription = styled.h2`
margin: 5px 0;
`

const Option = styled.div`
	width: 20%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	
  cursor: pointer;
  img {
    width: 100%;
  }
`;
const Options = styled.div`
	height: 4vw;
	display: flex;
	flex-direction: row;
	align-items: flex-end;
	justify-content: space-between;
`;

const MoveImg = styled.img`
  width: 100%;
	
  animation: fade 10s forwards;
	
  @keyframes fade {
    0%,100% { opacity: 0 }
    25% { opacity: 1 }
  }
`;

const Result = styled.div`
	width: 50%;
	height: 100%;
`

const Results = styled.div`
  width: 250%;
  position: absolute;
	z-index: 20;
	top: -600%;

	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

const Container = styled.div`
  position: relative;
	width: 20%;
	margin: 0 auto 40px auto;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-end;
`;

export default Controls;