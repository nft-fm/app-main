import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import WinBG from "../../assets/img/duels_page_assets/win_bg.png"
import LoseBG from "../../assets/img/duels_page_assets/lose_bg.png"

import CardImg from "../../assets/img/duels_page_assets/fake_card.png";
import { useDuels } from "../../contexts/Duels";
import { useMyNfts } from "../../contexts/MyNfts";
import Loading from "../../assets/img/loading.gif";

import cleanDate from "../../utils/cleanDate"

const History = (props) => {
	const { battleHistory, getNextBattlePage, battleLoading, battleAllLoaded } = useMyNfts();
	const user = props.user;

	const printHistory = () => {
		console.log("printing history")

		return (battleHistory.map((slide, index) => {
			return (
				<SlideContainer>
					<Result win={slide.won} key={"slide_" + index}>
						{slide.won ? "WON" : "LOST"}
					</Result>
					<Slide win={slide.won} key={"slide_" + index}>
						<Section>{slide.contestant1.nickname ? slide.contestant1.nickname : "no name"}</Section>
						<NFT src={slide.contestant1.nft.picture} alt="nft card" />
						<CenterSection>
							<Vs win={slide.won}>
								VS
							</Vs>
							<Date>
								{cleanDate(slide.timestamp)}
							</Date>
						</CenterSection>
						<NFT src={slide.contestant2.nft.picture} alt="nft card" />
						<Section>
							{slide.contestant2.nickname}
						</Section>
					</Slide>
				</SlideContainer>
			)
		}))
	}

	if (!battleHistory.length) {
		return (<Container>
			<Filler />
			<Box>
				<img width="40px" src={Loading} />
			</Box>
		</Container>)
	}

	let PaginationSection = <LoadMore onClick={() => getNextBattlePage()}>
		Load More
</LoadMore>;
	if (battleAllLoaded) {
		PaginationSection = <Box>End.</Box>
	} else if (battleLoading) {
		PaginationSection =
			<Box>
				<img width="40px" src={Loading} />
			</Box>
	}

	return (<Container>
		<Filler />
		{printHistory()}
		{PaginationSection}
	</Container>);
}

const Box = styled.div`
	flex: 1;
	border-bottom: 1px solid black;
	display: flex;
	align-items: center;
	justify-content: center;
	max-height: 40px;
	padding: 5px;
    font-family: "Comic Book";
    font-size: 16px;
    border: solid black;
    border-width: 3px 2px 2.5px 2px;
    background-color: #fef9ed;
    border-top-left-radius: 8% 5%;
    border-top-right-radius: 5% 4%;
    border-bottom-right-radius: 6% 7%;
    border-bottom-left-radius: 25% 5%;
    color: black;
		margin-bottom: 10px;
`;

const LoadMore = styled.button`
width: 180px;
height: 40px;
font-family: Bangers;
font-size: 20px;
font-stretch: normal;
font-style: normal;
line-height: 1;
text-decoration: none;
letter-spacing: normal;
margin-bottom: 10px;
display: flex;
justify-content: center;
align-items: center;
transition: all 0.1s ease-in-out;
background: url('data:image/svg+xml;utf8,<svg width="100" height="100" transform="rotate(25)" opacity="0.3" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="%23250E17"><circle cx="25" cy="25" r="12.5" /><circle cx="75" cy="75" r="12.5" /><circle cx="75" cy="25" r="12.5" /><circle cx="25" cy="75" r="12.5" /></g></svg>'),
#fff;
background-size: 12px, 100%;
border: 4px solid #000;
box-shadow:4px 4px 0 rgba(0,0,0,0.5);
cursor: pointer;
color: rgba(0,0,0,0.75);

&:hover {
	color: black;
box-shadow:4px 4px 0 black;

  }
`

const Filler = styled.div`
min-height: 70px;
`

const NFT = styled.img`
width: 10%;
`

const Date = styled.div`
	width: 200px;
	position: absolute;
	bottom: 0px;
	font-size: 12px;
`

const Vs = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 30px;
	width: 30px;
	font-family: "Edo";
	color: black;
	border-radius: 100px;
	background-color: ${props => props.win ? "#20b0dd" : "#F22D02"};
	font-size: 40px;
	word-break: keep-all;
`

const Section = styled.div`
  position: relative;
	width: 23%;
	height: 100%;
	
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: 14px;
`;

const CenterSection = styled(Section)`
		width: 26%;
`;
const ClickableSection = styled(Section)`
	text-decoration: underline;
  cursor: pointer;
	
`;

const SlideContainer = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
margin-bottom: 5px;
`

const Result = styled.div`
	width: 50px;
	margin-right: 10px;
	border-bottom: 1px solid black;
	padding-top: 10px;
	padding-bottom: 10px;
	
	font-family: Arial;
	font-size: 20px;
	color: black;
  word-break: break-all;

  background-image: url(${props => props.win ? WinBG : LoseBG});
	
  background-repeat: no-repeat;
	
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	padding: 10px 15px 5px 15px;
    font-family: "Comic Book";
    font-size: 16px;
    border: solid black;
    border-width: 3px 2px 2.5px 2px;
    background-color: #fef9ed;
    border-top-left-radius: 8% 5%;
    border-top-right-radius: 5% 4%;
    border-bottom-right-radius: 6% 7%;
    border-bottom-left-radius: 25% 5%;
    color: black;
`;

const Slide = styled.div`

	flex: 1;
	border-bottom: 1px solid black;
	padding-top: 10px;
	padding-bottom: 10px;
	font-family: Arial;
	font-size: 20px;
	color: black;
  word-break: break-all;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;

	padding: 10px 15px 5px 15px;
    /* width: calc(80% - 30px); */
    font-family: "Comic Book";
    font-size: 16px;
    border: solid black;
    border-width: 3px 2px 2.5px 2px;
    background-color: #fef9ed;
    border-top-left-radius: 8% 5%;
    border-top-right-radius: 5% 4%;
    border-bottom-right-radius: 6% 7%;
    border-bottom-left-radius: 25% 5%;
    color: black;
`;

const Container = styled.div`
	z-index: 20;
  width: 98%;
	padding: 0 1%;
	
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
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
	
  overflow-y: auto;
`;

export default History;