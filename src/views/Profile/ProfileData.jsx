import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import RankBubble from '../../assets/img/profile_page_assets/profile_rank_bubble.png'
import ProfileRankBG from "../../assets/img/profile_page_assets/profile_rank.png"
import ProfileHistoryBG from "../../assets/img/profile_page_assets/profile_history.png"

const Profile = ({ user }) => {

  // let width = (100 * (nft.xp / (nft.xpToNextLevel)));
  // if (width > 99) width = 99;
  // if (width < 1) width = 0;

  const levelPercent = user.rank > 0 ? Math.floor(100 * (user.xp / (user.rank * 10))) :  Math.floor(100 * (user.xp / 10));

  return (
    <Container>
      <Rank>
        <RankTitle>
          Rank
        </RankTitle>
        <RankLevelContainer>
          <RankShield viewBox="0 0 297.405 297.405">
            <g>
              <path d="m245.119,45.326c-13.074-12.034-22.289-25.739-26.607-38.13-0.688-1.973-2.444-3.381-4.519-3.624-19.434-2.278-41.666-3.572-65.29-3.572-23.624,0-45.856,1.294-65.291,3.572-2.074,0.243-3.832,1.652-4.519,3.624-4.317,12.392-13.532,26.097-26.607,38.13-11.258,10.362-23.515,17.768-34.817,21.719-2.326,0.813-3.812,3.08-3.636,5.538 2.207,30.831 5.159,70.781 7.203,93.583 5.685,63.399 42.156,91.162 101.173,115.009l23.513,15.343c1.811,1.182 4.15,1.182 5.961,0l23.512-15.343c59.018-23.847 95.488-51.61 101.173-115.009 2.045-22.803 4.996-62.752 7.203-93.583 0.176-2.454-1.314-4.726-3.636-5.538-11.301-3.951-23.557-11.357-34.816-21.719zm7.744,35.549c3.418,0.97 5.688,4.205 5.435,7.749-1.699,23.818-4.064,56.004-5.685,74.07-4.64,51.752-35.476,74.63-80.407,92.887l-19.404,12.663c-1.245,0.813-2.672,1.219-4.099,1.219-1.427,0-2.854-0.406-4.099-1.219l-19.404-12.663c-44.931-18.257-75.768-41.135-80.408-92.887-1.621-18.076-3.985-50.257-5.685-74.07-0.252-3.544 2.018-6.779 5.436-7.749 8.608-2.44 17.93-7.999 26.247-15.653 9.323-8.582 16.15-18.699 18.73-27.757 0.823-2.892 3.295-5.013 6.279-5.387 16.042-2.013 34.336-3.078 52.904-3.078 18.567,0 36.861,1.064 52.903,3.078 2.984,0.374 5.456,2.495 6.279,5.387 2.58,9.058 9.407,19.175 18.73,27.757 8.318,7.654 17.639,13.213 26.248,15.653z" fill="#1A8EB2" />
              <path d="m195.105,46.414c-14.288-1.582-30.22-2.414-46.402-2.414-16.183,0-32.114,0.832-46.402,2.414-4.025,10.229-11.603,20.87-21.353,29.845-8.226,7.569-17.439,13.485-26.466,17.058 1.648,22.961 3.766,51.49 5.249,68.038 4.016,44.776 29.355,63.458 71.769,80.595 1,0.406 0.045-0.139 17.203,11.058 17.155-11.195 16.203-10.652 17.203-11.058 42.413-17.137 67.753-35.818 71.768-80.595 1.483-16.54 3.602-45.072 5.25-68.038-9.027-3.572-18.24-9.488-26.466-17.058-9.751-8.975-17.328-19.616-21.353-29.845z" fill="#B72100" />
            </g>
          </RankShield>
          <RankLevel>
            {user.rank}
        </RankLevel>
        </RankLevelContainer>
        <BalanceBar>
          <div style={{ backgroundColor: '#1A8EB2', height: '100%', borderRadius: "2px 0 0 2px", width: levelPercent + '%', alignSelf: "flex-start" }} />
          <LevelPercent>
            {levelPercent}%
          </LevelPercent>
        </BalanceBar>
        <StatsContainer>
          <StatsTitles>
            <StatsTitle>
              Won
            </StatsTitle>
            <StatsDivider />
            <StatsTitle>
              Lost
            </StatsTitle>
            <StatsDivider />
            <StatsTitle>
              Played
            </StatsTitle>
            <StatsDivider />
            <StatsTitle>
              Win Rate
            </StatsTitle>
          </StatsTitles>
          <StatsFields>
            <StatsField>
              {user.battlesWon}
            </StatsField>
            <StatsDivider>
              /
              </StatsDivider>
            <StatsField>
              {user.battlesLost}
            </StatsField>
            <StatsDivider>
              /
              </StatsDivider>
            <StatsField>
              {user.battlesWon + user.battlesLost}
            </StatsField>
            <StatsDivider>
              /
              </StatsDivider>
            <StatsField>
              {(100 * user.battlesWon / (user.battlesWon + user.battlesLost)).toFixed(0)}%
            </StatsField>
          </StatsFields>
        </StatsContainer>
      </Rank>
      <DuelHistory>
        <ComicTitle>
          Duel History
        </ComicTitle>
      </DuelHistory>
    </Container>
  )
}

const StatsField = styled.span`
width: 20%;
font-size: 35px;
display: flex;
align-items: center;
justify-content: center;
`
const StatsFields = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
`

const StatsDivider = styled.div`
width: 5%;
display: flex;
align-items: center;
justify-content: center;
font-size: 50px;
`
const StatsTitle = styled.span`
width: 20%;
font-size: 12px;
display: flex;
align-items: center;
justify-content: center;
`

const StatsTitles = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
`

const StatsContainer = styled.div`
width: 80%;
display: flex;
flex-direction: column;
justify-content: space-between;
z-index: 20;

padding: 10px 15px 5px 15px;
    width: calc(80% - 30px);
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
    display: flex;
    flex-direction: column;

`

const LevelPercent = styled.div`
font-family: "Comic Book";
color:white;
position: absolute;
font-size: 18px;
-webkit-text-stroke-width: .5px;
  -webkit-text-stroke-color: black;
width: 100px;
    left: calc(50% - 50px);
    display: flex;
    justify-content: center;
    align-items: center;
`

const BalanceBar = styled.div`
width: 60%;
height: 20px;
    background-color: #fef9ed;
border: 2px solid black;
border-radius: 2px;
z-index: 20;
display:flex;
align-items: center;
margin-top: -20px;

`

const RankLevelContainer = styled.div`
z-index: 20;
width: 100px;
display: flex;
align-items: center;
justify-content: center;
`

const RankLevel = styled.div`
z-index: 50;
font-family: "Bangers";
/* font-weight: bold; */
font-size: 45px;
color: #ddd;
position: absolute;
`

const RankShield = styled.svg`
width: 100px;
height: auto;
display: flex;
align-items: center;
justify-content: center;
`

const RankTitle = styled.div`
position: absolute;
width: 180px;
height: 120px;
font-family: "Comic Book";
font-weight: normal;
font-size: 30px;
letter-spacing: 1px;
font-weight: normal;
top: -10px;
left: -20px;
background-image: url(${RankBubble});
background-repeat: no-repeat;
background-size: contain;
transform: rotate(-10deg);
padding-top: 35px;
`

const ComicTitle = styled.div`
z-index: 22;
position: absolute;
padding: 5px 10px;
font-family: "Bangers";
font-weight: normal;
font-size: 30px;
border: solid #000;
background-color: #ddd;
border: 1px solid #222;
box-shadow: 5px 5px 0 #222;
letter-spacing: 1px;
font-weight: normal;
top: 10px;
left: 5px;
`

const Container = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: black;
  `

const Rank = styled.div`
width: calc(40% - 14px);
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-around;
height: 300px;
border-radius: 2px;
border: 2px solid black;
position: relative;
::before {
  content: "";
position: absolute;  
  top: 0px;
  right: 0px;
  left: 0px;
  bottom: 0px;
  filter: grayscale(.7) brightness(110%);
  background-image: url(${ProfileHistoryBG});
  background-repeat: no-repeat;
background-position: center;
background-size: cover;
}
`

const DuelHistory = styled.div`
width: calc(60% - 14px);
display: flex;
align-items: center;
justify-content: center;  
  
position: relative;
height: 300px;
border-radius: 2px;
border: 2px solid black;
position: relative;
::before {
  content: "";
position: absolute;  
  top: 0px;
  right: 0px;
  left: 0px;
  bottom: 0px;
  filter: grayscale(.7) brightness(110%);
  background-image: url(${ProfileRankBG});
  background-repeat: no-repeat;
background-position: center;
background-size: cover;
}
`



export default Profile