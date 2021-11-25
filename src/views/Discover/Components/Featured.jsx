import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as down_arrow } from "../../../assets/img/icons/down_arrow.svg";
import NftCard from "../../../components/NftCards/SaleNftCard";
import { useAccountConsumer } from "../../../contexts/Account";
// import { ReactComponent as down_arrow } from "../../../assets/img/icons/down_arrow.svg";

const Listen = () => {
  const { account } = useAccountConsumer();
  const [allNfts, setAllNfts] = useState([]);
  const [shown, setShown] = useState(6);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState("Date: High - Low");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(2);
  const [genre, setGenre] = useState("All");
  const [genreMenu, setGenreMenu] = useState(false);
  // const [sort, setSort] = useState(Math.floor(Math.random() * 6));
  const limit = 200;
  const [pauseSong, setPauseSong] = useState(() => () => {}) // this is fucking weird, don't touch me.

  axios.post("/api/nft-type/get-featured").then(res => {
    setAllNfts(res.data);
  });

  return (
    <LaunchContainer>
      <ContainerOutline />
      <NftScroll>
        {allNfts.map((item, index) => {
          if (index >= shown * 3) return null;
          else return <NftCard nft={item} pauseSong={pauseSong} setPauseSong={setPauseSong} />;
        })}
      </NftScroll>
    </LaunchContainer>
  );
};

const LoadMore = styled.div`
  align-self: center;
  margin-top: 20px;
  margin-bottom: 50px;
  cursor: pointer;
`;

const DownArrow = styled(down_arrow)`
  position: absolute;
  right: 15px;
  top: 5px;
  width: 15px;
  height: 15px;
  cursor: pointer;
  & path {
    fill: ${(props) => props.theme.color.gray};
  }
`;

const SelectedSpan = styled.span`
  color: white;
  position: relative;
  width: 100%;
  padding-left: 10px;
  cursor: pointer;
`;

const MenuSpan = styled.span`
  display: ${(props) => (props.isMenuOpen ? "block" : "none")};
  padding-top: 10px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.1s ease-in-out;
  ${(props) => props.selected && `text-decoration: underline;`}
  &:hover {
    color: white;
  }
`;
const ContainerTitleGenre = styled.div`
  width: 110px;
  position: absolute;
  right: calc(25% + 50px);
  top: -15px;
  height: 20px;
  padding: 5px 10px 5px 10px;
  font: "Compita";
  background-color: ${(props) => props.theme.color.boxBorder};
  font-size: 1.2rem;
  color: ${(props) => (props.faq ? "#3d3d3d" : props.theme.color.gray)};
  border: 4px solid #383838;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  height: ${(props) => props.isMenuOpen && `${props.optionCount * 28 + 20}px`};
  z-index: 2;

  @media only screen and (max-width: 1200px) {
    left: 44%;
  }
  @media only screen and (max-width: 776px) {
    left: 10%;
    top: 25px;
  }
`;
const ContainerTitleSorting = styled.div`
  width: 110px;
  position: absolute;
  right: calc(10% + 50px);
  top: -15px;
  height: 20px;
  padding: 5px 10px 5px 10px;
  font: "Compita";
  background-color: ${(props) => props.theme.color.boxBorder};
  font-size: 1.2rem;
  color: ${(props) => (props.faq ? "#3d3d3d" : props.theme.color.gray)};
  border: 4px solid #383838;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  height: ${(props) => props.isMenuOpen && `${props.optionCount * 28 + 20}px`};
  z-index: 2;

  @media only screen and (max-width: 1200px) {
    left: auto;
    right: calc(10% + 50px);
  }
  @media only screen and (max-width: 776px) {
    right: 10%;
    top: 25px;
  }
`;
const ContainerTitleForm = styled.form`
  position: absolute;
  top: -15px;
  left: calc(10% + 50px);
  @media only screen and (max-width: 776px) {
    left: auto;
  }
`;

const ContainerTitleInput = styled.input`
  outline: none;
  padding: 5px 8px 3px 8px;
  height: 20px;
  font: "Compita";
  background-color: ${(props) => props.theme.color.boxBorder};
  font-size: ${(props) => props.theme.fontSizes.xs};
  color: ${(props) => (props.faq ? "#3d3d3d" : props.theme.color.gray)};
  border: 4px solid #383838;
  border-radius: 20px;
  display: flex;
  @media only screen and (max-width: 776px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const FillerCard = styled.div`
  width: 375px;
  height: 0px;

  @media only screen and (max-width: 330px) {
    width: 300px;
  }
`;

const NftScroll = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
  overflowy: scroll !important;
  @media only screen and (max-width: 1200px) {
    width: 775px;
  }
  @media only screen and (max-width: 776px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
    margin-top: 24px;
  }
`;

const LaunchContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
  overflowy: scroll !important;
`;

const ContainerOutline = styled.div`
  border: 6px solid #383838;
  border-bottom: none;
  // height: 40px;
  margin-bottom: 40px;
  width: 80%;
  /* display: flex;
  flex-direction: row; */
  @media only screen and (max-width: 776px) {
    border-radius: 0;
    width: 100%;
  }
`;

export default Listen;
