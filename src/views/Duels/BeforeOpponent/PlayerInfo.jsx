import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import AttackIcon from "../../../assets/img/duels_page_assets/icon_attack.png"
import ShieldIcon from "../../../assets/img/duels_page_assets/icon_shield.png"
import HealthIcon from "../../../assets/img/duels_page_assets/icon_health.png"
import CardImg from "../../../assets/img/duels_page_assets/fake_card.png";
import {useDuels} from "../../../contexts/Duels";
import swal from "sweetalert2";
import {useMyNfts} from "../../../contexts/MyNfts";
import axios from "axios";
import {useWallet} from "use-wallet";

function isMobile() {
	if (window.innerWidth < window.innerHeight) return true;
	return false
}

const PlayerInfo = (props) => {
	const { account } = useWallet();
	const {prepareDuel, user, setOpponents } = useDuels();
	const [searchResults, setSearchResults] = useState(false);
	const [resultsDisplay, setResultsDisplay] = useState(false);
	const [searchBar, setSearchBar] = useState("Search...");
	const profile = props.profile;
	const nft = props.nft;

	const search = async (e) => {
		setSearchBar(e.target.value)
		await axios.post('/api/battle/opponents', {address: account, rules: e.target.value})
			.then(res => {
				console.log(res.data);
				setSearchResults(res.data)
			})
			.catch(err => {
				console.log("error")
			})
	}

	const selectDuel = () => {
		if (!user.activeNFT) {
			swal.fire({
				title: `You need to chose an NFT before battle!`,
				icon: 'warning',
				confirmButtonText: 'Go to inventory'
			}).then(res => {
					const element = document.getElementById("inventory");
					console.log(element)
					element.scrollIntoView({block: "end"});
			})
		} else {
			prepareDuel(profile, nft)
		}
	}

	const printSearchResults = () => {
		return searchResults.map((result, index) => {
			return <Result onClick={async e => await props.getProfileActiveCard(result)}>{result.nickname}</Result>
		})
	}

	useEffect(() => {
			setSearchResults(false)
	}, [props.profile])
	return (
		<Container>
			<SearchBar>
				<input type="text"
							 value={searchBar}
							 onChange={(e) => search(e)}
							 onFocus={() => {
								 if (searchBar === "Search...")
									 setSearchBar("");
							 }}
							 onBlur={() => {
								 if (searchBar === "")
								 {
								 	setSearchBar("Search...");
								 	setSearchResults(false);
								 }
							 }}/>
				{searchResults &&
				<SearchResults>
					{printSearchResults()}
				</SearchResults>
				}
			</SearchBar>
			{profile &&
			<Display>
				<Title>{profile.nickname}</Title>
				<LinksArea>
					<StyledLink width="95px" height="35px" onClick={e => selectDuel()}>Duel!</StyledLink>
					<StyledLink width="120px" height="35px" onClick={e => props.goToProfile(profile)}>View Profile</StyledLink>
				</LinksArea>
					<Card src={nft.picture}/>
				<Status>
					<img src={HealthIcon}/>
					<Bar color="#5ed57a">
						{nft.stats.heal} Health
					</Bar>
				</Status>
				<Status>
					<img src={AttackIcon}/>
					<Bar color="#d55e5e">
						{nft.stats.attack} Attack
					</Bar>
				</Status>
				<Status>
					<img src={ShieldIcon}/>
					<Bar color="#7e9ad9">
						{nft.stats.defense} Defense
					</Bar>
				</Status>
			</Display>
			}
		</Container>
	);
}

const Bar = styled.div`
  width: 155.9px;
  height: 13.2px;
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
		width: 24px;
		margin-right: 4px;
	}
`;

const StyledLink = styled.a`
width: ${props => props.width ? props.width : "95px"};
height:  ${props => props.height ? props.height: "35px"};
font-size: 24px;
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
  text-transform: uppercase;
  background: url('data:image/svg+xml;utf8,<svg width="100" height="100" transform="rotate(25)" opacity="0.3" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="%23250E17"><circle cx="25" cy="25" r="12.5" /><circle cx="75" cy="75" r="12.5" /><circle cx="75" cy="25" r="12.5" /><circle cx="25" cy="75" r="12.5" /></g></svg>'),
    #fff;
  background-size: 12px, 100%;
  border: 4px solid #000;
  position: relative;
  box-shadow:6px 6px 0 #222;
&:hover {
		color: black;
    background: url('data:image/svg+xml;utf8,<svg width="100" height="100" transform="rotate(25)" opacity="0.8" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="%23d68810"><circle cx="25" cy="25" r="12.5" /><circle cx="75" cy="75" r="12.5" /><circle cx="75" cy="25" r="12.5" /><circle cx="25" cy="75" r="12.5" /></g></svg>'),
    #ffcd28;
    background-size: 12px, 100%;
    font-size:26px;
		cursor: pointer;
  }
`

const LinksArea = styled.div`
	width: 87%;
	
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	
	margin-bottom: 16px;
`;

const Title = styled.div`
  font-family: Bangers;
  font-size: 40px;
  color: #292929;

	margin-top: 9px;
  margin-bottom: 9px;
`;

const Card = styled.img`
    width: 205.5px;
		margin-bottom: 25px;
`;

const Display = styled.div`
	width: 100%;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const Result = styled.div`
	width: 100%;
	height: 25px;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	
  cursor: pointer;

  &:hover {
    background-color: #D8D4CA;
  }
`;

const SearchResults = styled.div`
	position: absolute;
	top: 40px;
	width: 285px;
  border: 3px solid black;
  background-color: #FEF9ED;
	
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
`;

const SearchBar = styled.div`
	position: relative;
  width: 257px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
	
  input {
    font-size: 15px;
    padding: 11px 14px;
    height: 19px;
    color: black;
    border: 3px solid black;
    width: 100%;
    background-color: white;
    
    &:focus {
        outline: none;
    }
  }
`

const Container = styled.div`
  width: 285px;
  height: 580px;
  padding: 10px;
  background-color: #FEF9ED;

  border: 5px solid black;
  font-family: Bangers;
  font-size: 17px;
  color: black;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export default PlayerInfo;