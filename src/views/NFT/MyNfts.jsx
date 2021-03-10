import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import BG from "../../assets/img/profile_nfts_bg.png";
import axios from "axios";
import ProfileNFT from "./MyNft";


const Profile = () => {
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
  }, [account])

  const NFTArray = nfts.map((nft, index) => {
    return (
      <ProfileNFT nft={nft} key={index} />
    )
  })

  return (
    <Container>
      <ComicTitle>
        My Collection
      </ComicTitle>
      <NFTSection>
        {nfts.length > 0 ? NFTArray : "none"}
      </NFTSection>
    </Container>
  )
}

const NFTSection = styled.div`
margin-top: 60px;
// width: 100%;
display: flex;
flex-wrap: wrap;
justify-content: center;
align-items: center;
font-family: "Comic Book";
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
  max-width: 80vw;
  min-width: 200px;
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  position: relative;
  border: solid black;
  border-width: 5px 3px 4px 3px;
  background-color: #fef9ed;
  border-top-left-radius: 0.5% 2%;
  border-top-right-radius: 2% 57%;
  border-bottom-right-radius: 46% 1%;
  border-bottom-left-radius: 8% 2%;
  transform: rotate(-0.5deg);
  color: black;
  `

export default Profile