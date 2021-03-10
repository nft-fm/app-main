import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import CardImg from "../../assets/img/duels_page_assets/fake_card.png";
import Bg from "../../assets/img/duels_page_assets/inventory_bg.png"
import { useMyNfts } from "../../contexts/MyNfts";
import { useWallet } from "use-wallet";
import swal from "sweetalert2";

import { require } from "../../web3/utils";
import axios from "axios";
import { useDuels } from "../../contexts/Duels";

const Inventory = (props) => {
	const profile = props.profile;
	const { account, connect } = useWallet();
	const { user, setUser, setSelectedOpponent } = useDuels();
	const { myNfts, setActiveNft, activeNft } = useMyNfts();

	const [inventory, setInventory] = useState([]);

	const selectCard = (nft) => {
		swal.fire({
			title: `You are about to choose this NFT to battle`,
			icon: 'warning',
			confirmButtonText: 'Confirm Operation'
		}).then(async res => {
			const { provider } = await require();
			const signer = provider.getSigner();
			const sig = await signer.signMessage(JSON.stringify({
				activeNFT: nft.nftId,
				address: account
			}))

			axios.post(`api/user/update-activeNft`, {
				activeNFT: nft.nftId,
				address: account,
				sig,
			}).then(res => {
				setUser({
					...user,
					activeNFT: nft.nftId
				});
				setActiveNft(nft);
				swal.fire("successfully updated account");
			}).catch(err => {
				console.log(err);
				swal.fire({
					icon: 'error',
					title: `Error: It wasn't possible to update your nft`,
					text: 'Something went wrong!'
				})
			})
		})
	}

	const printCards = () => {
		if (profile.address === account) {
			return inventory.map((nft, index) => {
				if (activeNft && activeNft.nftId === nft.nftId) {
					return <Card selected>
						<Nft src={nft.picture} key={index} selected />
						<NFTMetaData>
							<NFTLevel>
								{nft.level}
							</NFTLevel>
							<NFTStats>
								<NFTStat>
									<StatLeft>
										Attack:
												</StatLeft>
									<StatRight>
										{nft.stats?.attack}
									</StatRight>
								</NFTStat>
								<NFTStat>
									<StatLeft>
										Defense:
												</StatLeft>
									<StatRight>
										{nft.stats?.defense}
									</StatRight>
								</NFTStat>
								<NFTStat>
									<StatLeft>
										Heal:
												</StatLeft>
									<StatRight>
										{nft.stats?.heal}
									</StatRight>
								</NFTStat>
							</NFTStats>
						</NFTMetaData>
					</Card>
				}
				else if (profile.activeNFT && profile.activeNFT === nft.nftId)
					return <Card selected>
						<Nft src={nft.picture} key={index} selected />
						<NFTMetaData>
							<NFTLevel>
								{nft.level}
							</NFTLevel>
							<NFTStats>
								<NFTStat>
									<StatLeft>
										Attack:
									</StatLeft>
									<StatRight>
										{nft.stats?.attack}
									</StatRight>
								</NFTStat>
								<NFTStat>
									<StatLeft>
										Defense:
									</StatLeft>
									<StatRight>
										{nft.stats?.defense}
									</StatRight>
								</NFTStat>
								<NFTStat>
									<StatLeft>
										Heal:
									</StatLeft>
									<StatRight>
										{nft.stats?.heal}
									</StatRight>
								</NFTStat>
							</NFTStats>
						</NFTMetaData>
					</Card>
				else
					return <Card src={nft.picture} key={index}  >
						<Nft src={nft.picture} key={index} />
						<NFTMetaData>
							<NFTLevel>
								{nft.level}
							</NFTLevel>
							<NFTStats>
								<NFTStat>
									<StatLeft>
										Attack:
									</StatLeft>
									<StatRight>
										{nft.stats?.attack}
									</StatRight>
								</NFTStat>
								<NFTStat>
									<StatLeft>
										Defense:
									</StatLeft>
									<StatRight>
										{nft.stats?.defense}
									</StatRight>
								</NFTStat>
								<NFTStat>
									<StatLeft>
										Heal:
									</StatLeft>
									<StatRight>
										{nft.stats?.heal}
									</StatRight>
								</NFTStat>
							</NFTStats>
						</NFTMetaData>
						<Message onClick={e => selectCard(nft)}>
							Choose to Battle!
						</Message>
					</Card>
			})
		} else {
			return inventory.map((nft, index) => {
				return <Card selected={profile.activeNFT && profile.activeNFT === nft.nftId}>
					<Nft src={nft.picture} key={index} />
					<NFTMetaData>
						<NFTLevel>
							{nft.level}
						</NFTLevel>
						<NFTStats>
							<NFTStat>
								<StatLeft>
									Attack:
												</StatLeft>
								<StatRight>
									{nft.stats?.attack}
								</StatRight>
							</NFTStat>
							<NFTStat>
								<StatLeft>
									Defense:
												</StatLeft>
								<StatRight>
									{nft.stats?.defense}
								</StatRight>
							</NFTStat>
							<NFTStat>
								<StatLeft>
									Heal:
												</StatLeft>
								<StatRight>
									{nft.stats?.heal}
								</StatRight>
							</NFTStat>
						</NFTStats>
					</NFTMetaData>
				</Card>
			})
		}
	}

	useEffect(() => {
		if (profile.address === account) {
			console.log("user inventory", myNfts)
			setInventory(myNfts)
		} else {
			setInventory(profile.inventory)
		}
	}, [props.profile, myNfts])

	return (
		<Container id="inventory">
			<Title>Inventory</Title>
			<CardDisplayArea>
				<CardDisplay>
					{printCards()}
				</CardDisplay>
			</CardDisplayArea>
		</Container>
	);
}

const Nft = styled.img`
  width: 100%;
  height: 100%;

  box-shadow: 15px 15px 20px 0 rgba(0, 0, 0, 0.81);
  border: ${props => props.selected ? "3px solid #B72100" : "3px solid transparent"};

  &:hover {
    border: 3px solid #1A8EB2;
  }
`;

const Message = styled.div`
	position: absolute;
	top: 0px;
	width: 100%;
	height: 100%;

	background-color: transparent;
	color: transparent;
	
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	&:hover {
		color: white;
	}
`;

const StatRight = styled.div`
  font-family: "Comic Book";
  margin-top: -5px;
`

const StatLeft = styled.div`
  font-family: "Bangers";
  margin-right: 5px;
  letter-spacing: 1px;
`

const NFTStat = styled.div`
  display: flex;
  font-size: 15px;
`

const NFTStats = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
`

const NFTLevel = styled.div`
width: 45px;
height: 45px;
border-radius: 50%;
background-color: rgba(0,0,0,0.15);
font-family: "Bangers";
font-size: 30px;
transform: rotate(-15deg);
`

const NFTMetaData = styled.div`
	padding: 5px 15px;
	width: calc(100% - 30px);
	font-family: "Comic Book";
	font-size: 18px;
	border: solid black;
	border-width: 3px 2px 2.5px 2px;
	background-color: #fef9ed;
	border-top-left-radius: 8% 5%;
	border-top-right-radius: 5% 4%;
	border-bottom-right-radius: 6% 7%;
	border-bottom-left-radius: 25% 5%;
	transform: rotate(-0.5deg);
	color: black;
	
	display: flex;
	flex-direction: row;
	margin-bottom: 5px;
	justify-content: space-between;
`

const Card = styled.div`
	position: relative;
	width: 30%;
	
	margin-right: 3%;
	margin-bottom: 3%;
	
	cursor: pointer;
`;

const CardDisplay = styled.div`
	width: 95%;
	padding: 1%;
	height:	100%;
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	justify-content: flex-start;
	flex-wrap: wrap;
	
	overflow-y: auto;

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
`;

const CardDisplayArea = styled.div`
	width: 100%;
	height: 94.5%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	
	background-image: url(${Bg});
  background-size: cover;
	background-repeat: no-repeat;
`;

const Title = styled.div`
		width: 100%;
		height: 7%;
		border-bottom: 4px solid black;
		font-size: calc(30px + 0.5vw);
	
		margin-top: -2%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
`;

const Container = styled.div`
	width: 100%;
	height: calc(77% - 4px);

	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
`;

export default Inventory;