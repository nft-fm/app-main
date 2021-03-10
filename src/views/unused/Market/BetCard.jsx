import React, { useEffect, useState, useMemo, useCallback } from 'react'
import styled from 'styled-components'
import Button from '../../../components/Button'
import { useWallet } from "use-wallet";
import Container from '../../../components/Container'
import './swal.css'
import Swal from 'sweetalert2';
import Pool3 from "./Pool3";
import BigNumber from 'bignumber.js'
import isMobile from "../../utils/isMobile";

const Bet = ({ battle, candidateInfo, electionContract }) => {
	const { account, connect, ethereum } = useWallet()


	const [ethInput, setETHInput] = useState(0);
	const [warInput, setWARInput] = useState(0);
	const [disabled, setDisabled] = useState(false)
	const [farmBets, setFarmBets] = useState({ pool1ETHPot: { value: 0, choice: "" }, pool2ETHPot: { value: 0, choice: "" } });
	const [farmBalances, setFarmBalances] = useState({ value: 0 });
	const [pending, setPending] = useState(false);

	


	let candidate = battle.pool1.name
	if (candidateInfo === 'pool2')
		candidate = battle.pool2.name

	return (
		<Container size="sm">
			<VersusContainer>

				<TitleText>
					Your Bets
				</TitleText>
				<YourBets>
					{!farmBalances.value > 0 ?
						<NoBetsText>none, place a bet!</NoBetsText>
						: null
					}
					{farmBalances.value > 0 ?
						<Column>
							{farmBalances.value > 0 &&
								<Bets>
									<AmountBet>
										<SmallText>{farmBalances.choiceId}</SmallText>
										{'$ETH: ' + farmBalances.value.toLocaleString(undefined, {
											minimumFractionDigits: 3,
											maximumFractionDigits: 3
										})}
									</AmountBet>
								</Bets>}
						</Column>
						: null
					}
				</YourBets>

				<Separator />

				<Text>
					All Bets
				</Text>
				<AllBets>
					<BetDisplay>
						<CardIcon src={battle.pool1.icon} />
						<AmountBet>
							<SmallText>{farmBets.pool1ETHPot.choice}</SmallText>
							{'$ETH: ' + farmBets.pool1ETHPot.value.toLocaleString(undefined, {
								minimumFractionDigits: 3,
								maximumFractionDigits: 3
							})}
						</AmountBet>
					</BetDisplay>
					<BetDisplay>
						<CardIcon src={battle.pool2.icon} />
						<AmountBet>
							<SmallText>{farmBets.pool2ETHPot.choice}</SmallText>
							{'$ETH: ' + farmBets.pool2ETHPot.value.toLocaleString(undefined, {
								minimumFractionDigits: 3,
								maximumFractionDigits: 3
							})}
						</AmountBet>
					</BetDisplay>
				</AllBets>

				<Separator />

				<Text>
					Bet $ETH
				</Text>
				<Top>
					<Text>
						{candidate + " to Win"}
					</Text>
					<InputContainer>
						<Input disabled={pending ? true : false} type="number" min="0" value={ethInput} onChange={e => setETHInput(e.target.value)} />
						ETH
					</InputContainer>
				</Top>
				{pending ?
					<BetPlaced>Your bet is pending. Check MetaMask for updates.</BetPlaced>
					:
					<Button size="xlg" onClick={null} disabled={!account || disabled ? true : false}>Place a Bet</Button>
				}
			</VersusContainer>
			{/* <Button size="xlg" onClick={() => redeemRewards()}>Redeem Rewards</Button> */}
		</Container>
	)
}


const Separator = styled.div`
  width: 80%;
  height: 1px;
  margin: 15px;
  background-image: linear-gradient(90deg, rgba(256, 256, 256, 0), rgba(256, 256, 256, 0.6) 20%, rgba(256, 256, 256, 0.6) 80%, rgba(256, 256, 256, 0));
`

const BetDisplay = styled.div`
display: flex;
flex-direction: column;
justify-content: space-evenly;
align-items: center;
`

const AllBets = styled.div`
width: 100%;
height: 100px;
display: flex;
flex-direction: row;
justify-content: space-evenly;
`

const YourBets = styled.div`
display: flex;
width: 100%;
justify-content: space-evenly;`

const Column = styled.div`
display: flex;
flex-direction: column;
align-items: center;`

const BetPlaced = styled.div`
color: rgb(255, 190, 26);
font-family: Gilroy;
font-size: 18px;

font-stretch: normal;
font-style: normal;
line-height: 1;
letter-spacing: normal;
`

const Space = styled.div`
height: 20px;`


const AmountBet = styled.div`
font-family: Gilroy;
font-size: 16px;

font-stretch: normal;
font-style: normal;
line-height: 1;
letter-spacing: normal;
color: #ffffff;`

const CardIcon = styled.img`
	height: 40px;
  width: 40px;
  border-radius: 50%;
  align-items: center;
  display: flex;
  justify-content: center;
	margin: 0 15px;
	object-fit: cover;
`
const Bets = styled.div`
display: flex;
align-items: center;
margin-bottom: 10px;`

const Bottom = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
`

const Row = styled.div`
width: 100%;
display: flex;
justify-content: space-evenly;`

const Top = styled.div`
width: 100%;
display: flex;
flex-direction: row;
flex-wrap: nowrap;
align-items: center;
margin-bottom: 20px;
justify-content: space-between;`

const TitleText = styled.div`
font-family: "Bangers";
font-size: 22px;

font-stretch: normal;
font-style: normal;
line-height: 1;
letter-spacing: normal;
color: rgb(255, 204, 160);
margin-bottom: 10px;
`

const Text = styled.div`
font-family: "Bangers";
color: rgb(255, 204, 160);
font-size: 22px;

font-stretch: normal;
font-style: normal;
line-height: 1;
letter-spacing: normal;
margin-bottom: 5px;
align-items: center;
`

const SmallText = styled.div`
font-family: "Bangers";
font-size: 14px;
font-weight: 100;
font-stretch: normal;
font-style: normal;
line-height: 1;
letter-spacing: normal;
color: #ffffff;
margin-bottom: 5px;
`

const NoBetsText = styled.div`
font-family: "Bangers";
font-size: 14px;
font-weight: 100;
font-stretch: normal;
font-style: normal;
line-height: 1;
letter-spacing: normal;
color: #ffffff;
margin-top: 10px;
`

const Input = styled.input`
font-family: "Bangers";
font-size: 20px;

font-stretch: normal;
font-style: normal;
letter-spacing: normal;
color: rgb(255, 204, 160);
text-align: right;
height: 35px;
width: 90%;
background: none;
border: none;
margin-right: 10px;
:focus{
	outline: none;
}`

const InputContainer = styled.div`
width: 170px;
border-radius: 8px;
box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
border: solid 1px rgb(255, 204, 160);
background-color: rgba(255, 255, 255, 0.2);
font-family: "Bangers";
font-size: 20px;

font-stretch: normal;
font-style: normal;
letter-spacing: normal;
color: rgb(255, 204, 160);
text-align: right;
display: flex;
justify-content: flex-end;
align-items: center;
padding-right: 10px;`

const VersusContainer = !isMobile() ? styled.div`
display: flex;
flex-direction: column;
align-items: center;
font-size: 30px;
font-family: "Bangers";

font-stretch: normal;
font-style: normal;
line-height: 1;
letter-spacing: normal;
color: #ffffff;
border-radius: 8px;
border: solid 2px rgba(255, 255, 255, 0.2);
background-color: rgb(40,40,40);
padding: 20px;
` : styled.div`
margin: 0 0 40px 0;
max-width: 95wvw;
display: flex;
flex-direction: column;
font-family: "Bangers";
  font-size: 25px;
  
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
	color: #ffffff;
	padding: 20px;
	border-radius: 8px;
	border: solid 2px rgba(255, 183, 0, 0.3);
	background-color: rgba(4,2,43,1);
	`

export default Bet