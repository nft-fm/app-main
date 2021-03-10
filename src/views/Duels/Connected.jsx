import { useWallet } from "use-wallet";
import Page from "../../components/Page";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDuels } from "../../contexts/Duels";
import WithOponent from "./WithOpponent/WithOpponent";
import BeforeOponent from "./BeforeOpponent/BeforeOpponent";
import BottomContent from "./BottomContent";
import CardImg from "../../assets/img/duels_page_assets/fake_card.png";
import Game from "./Game/Game";
import { Route, Switch } from "react-router-dom";
import { getOthersNFTs } from "../../web3/utils";
import axios from "axios";
import loading from "../../assets/img/loading.gif";

const fake_user = {
	rank: 128,
	id: "2i3j8ol31k2sjei204",
	dueler: "mar",
	total: 10,
	won: 8,
	lost: 2,
	ratio: 80,
	card: { cardImg: CardImg, cardName: "NTF_CARD", attack: 19, defense: 65, health: 94 }
}

const Connected = () => {
	const { initialize, selectedOpponent, inGame, user, opponents } = useDuels();
	const [clickedProfiles, setClickedProfiles] = useState([]);

	const fetchNfts = async (nftIds, profile) => {
		let nfts = [];
		for (const nftId of nftIds) {
			const nftData = await axios.post('/api/nft/get-one', {
				nftId
			}).then(res => {
				return res.data;
			})
			nfts.push(nftData);
		}
		if (clickedProfiles.length >= 2) {
			setClickedProfiles([clickedProfiles[0], { ...profile, inventory: nfts }]);
		} else {
			setClickedProfiles([...clickedProfiles, { ...profile, inventory: nfts }]);
		}
	}

	const prepareInventory = async (res, profile) => {
		res = res.map(nft => {
			return nft.map(s => s.toNumber())
		})
		await fetchNfts(res[0], profile);
	}

	const getNewClickInventory = async (profile) => {
		await getOthersNFTs(prepareInventory, profile);
	}

	//Adds the clicked profile to the array of profiles sent to <Profiles>
	const clickProfile = (newClick) => {
		console.log("clicked", newClick);
		getNewClickInventory(newClick)
	}

	const unClickProfile = (index) => {
		if (clickedProfiles.length === 1)
			setClickedProfiles([]);
		else
			setClickedProfiles(index === 0 ? [clickedProfiles[1]] : [clickedProfiles[0]])
	}

	useEffect(() => {
		initialize();
	}, [])

	if (inGame) {
		return (
			<Page>
				<Game />
			</Page>
		);
	} else if (!opponents || !user) {
		return (
			<Page>
				<Loading src={loading} />
			</Page>
		)
	}
	return (
		<Page>
			<Header>
				<Title>Duel!</Title>
				<StyledLink>Help! Where am I?</StyledLink>
			</Header>
			{selectedOpponent ?
				<WithOponent opponent={selectedOpponent} /> :
				<BeforeOponent clickProfile={clickProfile}
					unClickProfile={unClickProfile}
				/>}
			<BottomContent user={fake_user}
				clickedProfiles={clickedProfiles}
				clickProfile={clickProfile}
				unClickProfile={unClickProfile} />
		</Page>
	)
}

const Loading = styled.img`
margin-top: 100px;
`

const StyledLink = styled.a`
position: absolute;
right: 20px;
top: 20px;
width: 180px;
height:  ${props => props.height ? props.height : "35px"};
font-family: Bangers;
font-size: 20px;
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
box-shadow:8px 8px 0 #222;
    
&:hover {
		color: black;
    background: url('data:image/svg+xml;utf8,<svg width="100" height="100" transform="rotate(25)" opacity="0.8" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="%23d68810"><circle cx="25" cy="25" r="12.5" /><circle cx="75" cy="75" r="12.5" /><circle cx="75" cy="25" r="12.5" /><circle cx="25" cy="75" r="12.5" /></g></svg>'),
    #ffcd28;
    background-size: 12px, 100%;
    font-size:22px;
		cursor: pointer;
  }
`


const InfoButton = styled.div`
  position: absolute;
  right: 280px;
  top: 55px;

  width: 10%;
  background-color: white;
  font-family: Bangers;
  font-size: 20px;
  padding: 8px;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  cursor: pointer;
`;

const Title = styled.div`
  /*  text-shadow: 10px 10px 0 #000000;*/
    font-family: Bangers;
    font-size: 120px;
    letter-spacing:8px;
    line-height: 1.07;
    text-align: center;
    color: #fef9ed;
    margin-top: 2vh;
`;

const Header = styled.div`
  position: relative;
  width: 100%;
  color: #292929;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 767px) {
    font-size: 80px;
    margin-top: 0vh;
  }
`

export default Connected;