import React, { useCallback, useEffect, useState, useMemo } from 'react'
import { useWallet } from 'use-wallet'
import styled from 'styled-components'
import Button from '../../../components/Button'
import useModal from '../../../hooks/useModal'
import StakeModal from './StakeModal'
import UnstakeModal from './UnstakeModal'
import isMobile from "../../utils/isMobile";

const WarPool = () => {
	const { account, connect, ethereum } = useWallet()


	



	
	const [requestedApproval, setRequestedApproval] = useState(false)
	const [apr, setAPR] = useState(0)



	


	const [onPresentStake] = useModal(
		<StakeModal
			max={null}
			onConfirm={null}
			tokenName={"WAR"}
		/>
	)

	const [onPresentUnstake] = useModal(
		<UnstakeModal
			max={null}
			onConfirm={null}
			tokenName={"WAR"}
		/>
	)

	const unstake = () => {
		// alert()
		onPresentUnstake()
	}

	const now = new Date().getTime() / 1000;

	return (
		<InfoContainer>
			<WarTopContainer>
				<Title>$WARchest</Title>
				{/* <StyledDetails>
					<StyledDetail>APR</StyledDetail>
					<StyledDetail>{apr.toFixed(2)}%</StyledDetail>
				</StyledDetails> */}
			</WarTopContainer>
			<InfoLines>
				<Line>Your Balance: <ShadedLine>{null} WAR</ShadedLine></Line>
				<Line>Currently Staked: <ShadedLine>{null}</ShadedLine></Line>
				{/* <Line>Battle Rewards: <ShadedLine>{getDisplayBalance(earnings)} WAR</ShadedLine></Line>
				<Disclaimer>(Updated @ 19:00 UTC Each Day)</Disclaimer> */}
				{/* <Line>Daily Rewards Available: <ShadedLine>14000 WAR</ShadedLine></Line> */}
			</InfoLines>
			<BottomButtonContainer>
				{true ? (
					<Button
						size="lg"
						disabled={account ? false : true}
						onClick={null}
						text={`Approve WAR`}
					/>
					// <Button
					// 	size="lg"
					// 	disabled={true}
					// 	onClick={handleApprove}
					// 	text={`Approve WAR`}
					// />
				) : (
						<>
							<Button size='lg' onClick={onPresentStake}>Stake Tokens</Button>
							<Button size='lg' onClick={null} disabled={null}>Claim Rewards</Button>
							<Button size='xlg' onClick={null} disabled={null}>Claim & Restake</Button>
							<Button size='lg' onClick={unstake}>Unstake Tokens</Button>
							{/*<Button size='lg' onClick={onClaimUnstake} disabled={!earnings.toNumber()}>Claim & Unstake</Button>*/}
							{/* <Button size='lg' onClick={onPresentStake} disabled={true}>Stake Tokens</Button>
							<Button size='lg' onClick={onReward} disabled={true}>Claim Rewards</Button>
							<Button size='lg' onClick={onPresentUnstake} disabled={true}>Unstake Tokens</Button>
							<Button size='lg' onClick={onClaimUnstake} disabled={true}>Claim & Unstake</Button> */}
						</>
					)}
			</BottomButtonContainer>
		</InfoContainer>
	)
}

const Disclaimer = styled.div`
font-family: "Bangers";
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
	letter-spacing: 1px;
	margin: -5px 0 10px 0;
  color: #ffffff;
`
const MobileDisclaimer = styled.div`
font-family: "Bangers";
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: 1px;
  color: #ffffff;
  transform: translateY(16px);
	margin-top: -40px;
	margin-bottom: 20px;
`

const WarTopContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
height: 60px;
align-items: center;
`

const MobileButtons = styled.div`
display: flex;
flex-direction: column;
`

const BottomButtonContainer = styled.div`
width: 84%;
margin-left: 8%;
  display: flex;
  flex-direction: row;
  align-content: center;
	justify-content: space-evenly;
	margin-bottom: 30px;
`

const ShadedLine = styled.div`
margin-left: 20px;
color: #ffb700;
text-align: right;
`

const Line = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
margin-bottom: 10px;
`

const InfoLines = styled.div`
width: 94%;
height: 50%;
display: flex;
flex-direction: column;
justify-content: space-evenly;
text-align: left;
margin: 3%;
font-family: "Bangers";
  font-size: 40px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: 1px;
  color: #ffffff;
`

const MobileInfoLines = styled.div`
width: 80%;
height: 60%;
display: flex;
flex-direction: column;
justify-content: space-evenly;
text-align: left;
padding: 50px 10% 0% 10%;
font-family: "Bangers";
  font-size: 18px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: 1px;
  color: #ffffff;
`

const Title = styled.div`
font-family: "Bangers";
  font-size: 25px;
  
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #ffffff;
  margin-top: 1%;
`

const InfoContainer = !isMobile() ? styled.div`
width: 1000px;
  border-radius: 8px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
  border: solid 1px white;
  background-color: rgba(0,0,0,0.7);
	margin: 20px auto 80px auto;
`: styled.div`
width: 300px;
  height: 450px;
  border-radius: 8px;
  border: solid 2px rgba(255, 183, 0, 0.3);
  background-color: rgba(256,256,256,0.08);
	margin: 60px auto 60px auto;
`

const MobileInfoContainer = styled.div`
width: 80vw;
  height: 450px;
  border-radius: 8px;
  border: solid 2px rgba(255, 183, 0, 0.3);
  background-color: rgba(256,256,256,0.08);
	margin: 20px auto 60px auto;
`

export default WarPool