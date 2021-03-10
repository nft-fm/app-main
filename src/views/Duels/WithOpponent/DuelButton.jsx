import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import DuelNoGlow from "../../../assets/img/duels_page_assets/duel_neutral.png";
import DuelGlow from "../../../assets/img/duels_page_assets/duel_lit.png";
import {useDuels} from "../../../contexts/Duels";
import axios from "axios";
import {useWallet} from "use-wallet";
import swal from "sweetalert2";

const DuelButton = (props) => {
	const { account, connect } = useWallet()
	const {selectedOpponent, setSelectedOpponent, setInGame, user} = useDuels();

	const createBattle = () => {
		if (!user.activeNFT) {
			swal.fire({
				title: `You need to chose an NFT before battle!`,
				icon: 'warning',
				confirmButtonText: 'Go to inventory'
			});
		} else {
			axios.post('/api/battle/new', {address: account,
																							opponent: selectedOpponent})
				.then(res => {
					console.log(res.data)
					setInGame(res.data);
				})
				.catch(err => {
					console.log(err);
				})
		}
	}
	return (
		<ButtonArea>
			<CloseIcon onClick={e => setSelectedOpponent(undefined)}>X</CloseIcon>
			<Button>
				Duel!
			</Button>
			<DuelImg onClick={e => createBattle()}/>
		</ButtonArea>
	);

}

const CloseIcon = styled.div`
	position: absolute;
	top: 0px;
	right: 0px;
	
	z-index: 10;
	
	width: 35px;
	height: 35px;
	
	border: 2px solid black;
	border-radius: 50%;
	background-color: white;
	
	font-weight: bolder;
	font-size: 30px;
	
	padding-left: 1.5px;
	padding-top: 1px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const DuelImg = styled.div`
    width: 360px;
    height: 280px;
    
    margin-top: -60px;
    background-image: url(${DuelNoGlow});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    
    &:hover {
        background-image: url(${DuelGlow});
    }
`;

const Button = styled.div`
  width: 120px;
  height: 56px;
  z-index: 10;
    
  object-fit: contain;
  border: solid 2px #000000;
  background-color: #ffffff;
    
  font-family: Bangers;
  font-size: 53px;

  cursor: pointer;
`

const ButtonArea = styled.div`
    width: 20%;

    position: absolute;
    top: 90px;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    cursor: pointer;
`;

export default DuelButton;