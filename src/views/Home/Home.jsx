import React, { useCallback, useEffect, useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { useWallet } from "use-wallet";
import styled, { keyframes } from "styled-components";
import BaseView from "../BaseView";
import axios from "axios";
import NftCard from "../../components/NftCard/NftCard";
import GenericBanner from "../../assets/img/generic_banner.jpg";

const Listen = () => {
  const { path } = useRouteMatch();
  const { account, connect } = useWallet();

  const [nfts, setNfts] = useState([])
  const getNfts = () => {
    axios.get("/api/nft-type/all").then((res) => setNfts(res.data))
  }

  useEffect(() => {
    getNfts()
  }, [])

  return (
    <Switch>
      <BaseView>
        <LandingSection>
          <Banner>
            <HeaderContents>
              Exclusive drops from your favorite Artists.
            </HeaderContents>
          </Banner>
        </LandingSection>
        <MainContents>
          <InfoSection>
            {/* <InfoHeaderText>
              NFT <span>FM</span>
            </InfoHeaderText> */}
            <InfoSectionContent>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              lacinia justo non consequat euismod. Praesent venenatis maximus
              purus, a elementum sem ultricies et. Sed sollicitudin congue
              lectus, sit amet suscipit lacus iaculis in. Integer nibh ipsum,
              pulvinar eu scelerisque in, malesuada sit amet lorem. Vivamus at
            </InfoSectionContent>
          </InfoSection>
          <NftSectionHolder>
            <SearchBar type="text" placeholder="Search..." />
            <NftDisplay>
              {nfts.map((nft) => (
                <NftCard nft={nft} />
              ))}
            </NftDisplay>
          </NftSectionHolder>
        </MainContents>
      </BaseView>
    </Switch>
  );
};

const InfoSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const SearchBar = styled.input`
  border-radius: 15px;
  width: 50%;
  padding: 5px 10px;
  outline: none;
  background-color: #eaeaea;
  border: 4px solid white;
  position: absolute;
  top: -18px;
`;

const InfoSectionContent = styled.span`
  padding: 40px 40px 60px 40px;
`;

const NftSectionHolder = styled.div`
  width: 100%;
  background-color: #eaeaea;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  flex: 1;
  position: relative;
`;

const NftDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 1200px;
  @media only screen and (max-width: 1337px) {
    width: 900px;
  }
  @media only screen and (max-width: 991px) {
    width: 700px;
  }
  @media only screen and (max-width: 700px) {
    width: 500px;
  }
  @media only screen and (max-width: 500px) {
    width: 300px;
    justify-content: center;
  }
`;

const InfoHeaderText = styled.div`
  font-family: "Compita";
  font-size: 30px;
  text-align: center;
  & > span {
    color: #7e2ce3;
  }
`;

const LandingSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`;

const HeaderContents = styled.span`
  color: white;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: grayscale(50%) brightness(30%);

  font-family: "Compita";
  font-weight: bold;
  letter-spacing: 2px;
  font-size: 40px;
  /* margin-top: -40px; */
  /* margin-top: 50px; */
`;

const Banner = styled.div`
  margin-top: -65px;
  width: 100%;
  height: 365px;
  background-color: black;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-bottom: 4px solid#7e2ce3;
  z-index: 0;
  background: url(${GenericBanner});
  background-size: cover;
  background-position-y: -70px;
`;

const MainContents = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;
export default Listen;


  // const nfts = [
  //   {
  //     artist: "Big Tone",
  //     title: "Tony in Paris",
  //     image: placeholderImage,
  //     price: 1.4,
  //   },
  //   {
  //     artist: "Big Tone",
  //     title: "Here He Comes",
  //     image: placeholderImage,
  //     price: 0.4,
  //   },
  //   {
  //     artist: "Big Tone",
  //     title: "Girls Love Big Katz",
  //     image: placeholderImage,
  //     price: 1.1,
  //   },
  //   {
  //     artist: "Big Tone",
  //     title: "Snoozin' and Croozin'",
  //     image: placeholderImage,
  //     price: 1.3,
  //   },
  //   {
  //     artist: "Big Tone",
  //     title: "Tony in Paris 2",
  //     image: placeholderImage,
  //     price: 1.9,
  //   },
  //   {
  //     artist: "Big Tone",
  //     title: "Here He Comes 2",
  //     image: placeholderImage,
  //     price: 1.3,
  //   },
  //   {
  //     artist: "Big Tone",
  //     title: "Girls Love Big Katz 2",
  //     image: placeholderImage,
  //     price: 1.4,
  //   },
  //   {
  //     artist: "Big Tone",
  //     title: "Snoozin' and Croozin' 2",
  //     image: placeholderImage,
  //     price: 1.18,
  //   },
  //   {
  //     artist: "Big Tone",
  //     title: "Tony in Paris 3",
  //     image: placeholderImage,
  //     price: 10.4,
  //   },
  //   {
  //     artist: "Big Tone",
  //     title: "Here He Comes 3",
  //     image: placeholderImage,
  //     price: 1.04,
  //   },
  //   {
  //     artist: "Big Tone",
  //     title: "Girls Love Big Katz 3",
  //     image: placeholderImage,
  //     price: 1,
  //   },
  //   {
  //     artist: "Big Tone",
  //     title: "Snoozin' and Croozin' 3",
  //     image: placeholderImage,
  //     price: 1.9,
  //   },
  //   {
  //     artist: "Big Tone",
  //     title: "Tony in Paris 4",
  //     image: placeholderImage,
  //     price: 1.14,
  //   },
  //   {
  //     artist: "Big Tone",
  //     title: "Here He Comes 4",
  //     image: placeholderImage,
  //     price: 1.45,
  //   },
  //   {
  //     artist: "Big Tone",
  //     title: "Girls Love Big Katz 4",
  //     image: placeholderImage,
  //     price: 4.4,
  //   },
  // ];