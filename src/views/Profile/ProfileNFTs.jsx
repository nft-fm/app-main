import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import axios from "axios";
import ProfileNFT from "./ProfileNFT";
import ProfileNFTsBG from "../../assets/img/profile_page_assets/profile_nfts.png"
import { useMyNfts } from "../../contexts/MyNfts";
import loading from "../../assets/img/loading.gif";


const Profile = ({ user }) => {
  const { myNfts, hasNfts } = useMyNfts();


  const NFTArray = myNfts.map((nft, index) => {
    return (
      <ProfileNFT nft={nft} key={index} />
    )
  })

  return (
    <Container>
      <ComicTitle>
        My NFTs
      </ComicTitle>
      <NFTSection>
        {hasNfts ?
          myNfts?.length > 0 ?
            NFTArray
            :
            <LoadingContainer>
              <Loading src={loading} />
            </LoadingContainer>
          :
          <LoadingContainer>
            empty
            </LoadingContainer>
        }
      </NFTSection>
    </Container>
  )
}

const Loading = styled.img`
  height: 50px;
  width: auto;
	position: relative;
`

const LoadingContainer = styled.div`
height: 100%;
width: 100%;
display: flex;
align-items: center;
justify-content: center;
`


const NFTSection = styled.div`
margin-top: 80px;
width: 100%;
display: flex;
justify-content: space-between;
flex-wrap: wrap;
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
  margin-bottom: 20px;
  width: calc(100% - 44px);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
  position: relative;
border: 2px solid black;

::before {
  content: "";
position: absolute;  
  top: 0px;
  right: 0px;
  left: 0px;
  bottom: 0px;
  filter: grayscale(.7) brightness(110%);
  background-image: url(${ProfileNFTsBG});
  background-repeat: no-repeat;
background-position: center;
background-size: cover;
}
  `

export default Profile