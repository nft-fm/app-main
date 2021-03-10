import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

const Nft = ({ nft }) => {

  let width = (100 * (nft.xp / (nft.xpToNextLevel)));
  if (width > 99) width = 99;
  if (width < 1) width = 0;

  return (
    <NFTContainer>
      <Title>
        {nft.name}
      </Title>
      <NFTImage src={nft.picture} />
      <NFTMetaData>
        <NFTMetaDataTop>
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
        </NFTMetaDataTop>
        <BalanceBar>
          <div style={{ backgroundColor: '#d270ff', height: '100%', borderRadius: "6px 0 0 6px", width: width + '%' }} />
        </BalanceBar>
      </NFTMetaData>
    </NFTContainer>
  )
}

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
font-size: 16px;
`

const NFTLevel = styled.div`
width: 50px;
height: 50px;
border-radius: 50%;
background-color: rgba(0,0,0,0.15);
font-family: "Bangers";
font-size: 50px;
transform: rotate(-15deg);
`

const NFTStats = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
`

const BalanceBar = styled.div`
width: calc(100%);
height: 12px;
background-color: rgba(0,0,0,0.1);
border: 2px solid black;
border-radius: 8px;
`

const Title = styled.div`
position: absolute;
width: 200px;
left: 50%;
font-size: 30px;
margin-top: -15px;
margin-left: -100px;
font-family: "Bangers";
color: rgb(232, 230, 227);
text-shadow: rgb(90, 98, 102) 2px 2px 0px;
`

const NFTMetaDataTop = styled.div`
width: 100%;
display: flex;
flex-direction: row;  
margin-bottom: 5px;
justify-content: space-between;
`

const NFTMetaData = styled.div`
  padding: 5px 15px;
  width: calc(100% - 30px);
  font-family: "Comic Book";
  font-size: 16px;
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
  flex-direction: column;
`

const NFTImage = styled.img`
width: 100%;
margin-bottom: 5px;
border: 1px solid black;
`

const NFTContainer = styled.div`
width: calc(25% - 20px);
display: flex;
position: relative;
flex-direction: column;
margin-bottom: 25px;
`

export default Nft