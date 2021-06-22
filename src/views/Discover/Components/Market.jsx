import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import NftCard from "../../../components/NftCards/SaleNftCard";
import { useAccountConsumer } from "../../../contexts/Account";
import Select from "react-dropdown-select";

const Listen = () => {
  const { user, account } = useAccountConsumer();
  const [allNfts, setAllNfts] = useState([]);
  const [everyArtist, setEveryArtist] = useState([]);
  const formatNfts = (nftsData) => {
    return nftsData.map((nft) => <NftCard nft={nft} />);
  };

  const getAll = () => {
    axios.post("/api/nft-type/all", { address: account }).then((res) => {
      const formattedNfts = formatNfts(res.data);
      for (let i = 0; i < 5; i++) {
        formattedNfts.push(<FillerCard />);
      }
      setAllNfts(formattedNfts);
      setEveryArtist([...new Set(res.data.map((item) => item))]);
    });
  };

  useEffect(() => {
    getAll();
  }, [user]);

  const dropDownStyle = {
    backgroundColor: "#262626",
    color: "#3d3d3d",
    outline: "none",
  };

  const [selectedArtist, setSelectedArtist] = useState([])
  console.log("selectedArtist", selectedArtist);

  return (
    <LaunchContainer>
      <ContainerTitle>
        <span>MARKET</span>
      </ContainerTitle>
      <ContainerTitleRight>
        <StyledSelect
        value={[]}
          options={everyArtist}
          style={dropDownStyle}
          onChange={(e) => setSelectedArtist(e)}
        />
      </ContainerTitleRight>
      <ContainerOutline />
      <NftScroll> {allNfts} </NftScroll>
    </LaunchContainer>
  );
};

const StyledSelect = styled(Select)`
  background: #333;
  border: #333 !important;
  color: #fff;
  .react-dropdown-select-clear,
  .react-dropdown-select-dropdown-handle {
    color: #fff;
  }
  .react-dropdown-select-option {
    border: 1px solid #fff;
  }
  .react-dropdown-select-item {
    /* color: #333; */
    color: white;
  }
  .react-dropdown-select-input {
    color: #fff;
  }
  .react-dropdown-select-dropdown {
    position: absolute;
    left: 0;
    border: none;
    width: 500px;
    padding: 0;
    display: flex;
    flex-direction: column;
    border-radius: 2px;
    max-height: 300px;
    overflow: auto;
    z-index: 9;
    background: #333;
    box-shadow: none;
    color: #fff !important;
  }
  .react-dropdown-select-item {
    color: #f2f2f2;
    border-bottom: 1px solid #333;
       
    :hover {
       color: #ffffff80;
    }
  }
  .react-dropdown-select-item.react-dropdown-select-item-selected,
  .react-dropdown-select-item.react-dropdown-select-item-active {
    //background: #111;
    border-bottom: 1px solid #333;
    color: #fff;
    font-weight: bold;
  }
  .react-dropdown-select-item.react-dropdown-select-item-disabled {
    background: #777;
    color: #ccc;
  }
`;

const FillerCard = styled.div`
  width: 226px;
  height: 0px;
`;

const NftScroll = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
  @media only screen and (max-width: 776px) {
    flex-direction: column;
    align-items: center;
  }
`;

const LaunchContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`;

const ContainerTitle = styled.div`
  position: absolute;
  font-weight: 600;
  left: calc(10% + 50px);
  top: -17px;
  padding: 5px 8px 3px 8px;
  font: "Compita";
  background-color: ${(props) => props.theme.color.boxBorder};
  font-size: ${(props) => props.theme.fontSizes.sm};
  color: ${(props) => (props.faq ? "#3d3d3d" : props.theme.color.gray)};
  border: 4px solid #383838;
  border-radius: 20px;
  display: flex;
  @media only screen and (max-width: 776px) {
    left: auto;
    margin-left: auto;
    margin-right: auto;
  }
`;
const ContainerTitleRight = styled.div`
  position: absolute;
  font-weight: 600;
  right: calc(10% + 50px);
  top: -17px;
  padding: 5px 8px 3px 8px;
  font: "Compita";
  background-color: ${(props) => props.theme.color.boxBorder};
  font-size: ${(props) => props.theme.fontSizes.sm};
  color: ${(props) => (props.faq ? "#3d3d3d" : props.theme.color.gray)};
  border: 4px solid #383838;
  border-radius: 20px;
  display: flex;
  @media only screen and (max-width: 776px) {
    left: auto;
    margin-left: auto;
    margin-right: auto;
  }
`;
// const ContainerTitle = styled.span`
//   position: absolute;
//   font-weight: 600;
//   left: calc(10% + 50px);
//   top: -4px;
//   padding: 0 12px;
//   font: "Compita";
//   background-color: ${(props) => props.theme.bgColor};
//   font-size: ${(props) => props.theme.fontSizes.xs};
//   color: ${(props) => props.theme.color.gray};
//   display: flex;
//   flex-direction: row;
//   display: flex;
//   align-items: center;
//   @media only screen and (max-width: 776px) {
//     left: auto;
//   }
// `;

const ContainerOutline = styled.div`
  border-radius: 24px 24px 0 0;
  border: 6px solid #383838;
  border-bottom: none;
  height: 40px;
  width: 80%;
  /* display: flex;
  flex-direction: row; */
  @media only screen and (max-width: 776px) {
    border-radius: 0;
    width: 100%;
  }
`;

export default Listen;
