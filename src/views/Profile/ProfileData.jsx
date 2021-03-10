import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import RankBubble from '../../assets/img/profile_rank_bubble.png'

const Profile = ({ user }) => {

  return (
    <Container>
      <Rank>
        <RankTitle>
          Rank
        </RankTitle>
      </Rank>
      <DuelHistory>
        <ComicTitle>
          Duel History
        </ComicTitle>
      </DuelHistory>
    </Container>
  )
}

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
align-items: center;
height: 300px;
border-radius: 2px;
border: 2px solid black;
background-color: rgba(0,0,0,0.1);
justify-content: center;
`

const DuelHistory = styled.div`
width: calc(60% - 14px);
display: flex;
align-items: center;
position: relative;
height: 300px;
border-radius: 2px;
border: 2px solid black;
background-color: rgba(0,0,0,0.1);
justify-content: center;
`



export default Profile