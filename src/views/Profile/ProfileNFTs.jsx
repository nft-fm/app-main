import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import BG from "../../assets/img/profile_nfts_bg.png";
import axios from "axios";
import ProfileNFT from "./ProfileNFT";


const Profile = ({ user }) => {
  const [nfts, setNfts] = useState([]);
  const { account, connect } = useWallet()
  const fetchNFTs = () => {
    axios.post(`api/nft/get-by-user`,
      { address: account, }).then(res => {
        console.log("nfts", res.data);
        setNfts(res.data);
      }).catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    fetchNFTs();
  }, [])

  const NFTArray = nfts.map((nft, index) => {
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
        {NFTArray}
      </NFTSection>
    </Container>
  )
}

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
  position: relative;
  border-radius: 2px;
  border: 2px solid black;
  background-image: url(${BG});
  justify-content: center;
  `

export default Profile