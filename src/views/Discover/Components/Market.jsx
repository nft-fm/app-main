import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import NftCard from "../../../components/NftCards/SaleNftCard";
import { useAccountConsumer } from "../../../contexts/Account";
import { ReactComponent as down_arrow } from "../../../assets/img/icons/down_arrow.svg";
import { ReactComponent as IconEth } from "../../../assets/img/icons/ethereum.svg";
import InfiniteScroll from "react-infinite-scroll-component";

const Listen = () => {
  const { account } = useAccountConsumer();
  const [allNfts, setAllNfts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(0);
  const limit = 5;

  const getNftsWithParams = async () => {
    console.log("1");
    if (allNfts.length >= 7) {
      setHasMore(false);
    } else {
      if (hasMore) {
        console.log("fetching");
        await axios
          .post("/api/nft-type/getNftsWithParams", {
            address: account,
            limit: limit,
            page: page,
          })
          .then((res) => {
            console.log(res.data);
            if (res.data.length) {
              setAllNfts([...allNfts, ...res.data]);
              setPage(page+1);
            } else {
              setHasMore(false);
            }
          });
      }
    }
  };

  useEffect(() => {
    getNftsWithParams();
  }, [])

  console.log("here", page, hasMore, isFetching, allNfts.length,);

  return (
    <LaunchContainer>
      <ContainerOutline />
      <NftScroll>
        <InfiniteScroll
          dataLength={allNfts.length}
          next={() => getNftsWithParams()} //pass function to get next set of NFTs
          hasMore={hasMore}
          loader={<span style={{ color: "white" }}>Loading...</span>}
          endMessage={<End style={{ color: "white" }}>No more NFTs</End>}
        >
          {allNfts.map((item, index) => (
            <NftCard nft={item} />
          ))}
        </InfiniteScroll>
      </NftScroll>
    </LaunchContainer>
  );
};

const End = styled.div`
width: 40vw;

`

{
  /* <ContainerTitleInput
type="text"
placeholder="Search..."
onChange={(e) => setSearch(e.target.value)}
/> */
}

// //search function, sorts and sets returned NFTs to displayedNfts
// useEffect(() => {
//   if (search != "") {
//     axios
//       .post("/api/nft-type/search", { params: search })
//       .then((res) => {
//         setUnformattedNftData(res.data);
//         formatNfts(res.data)
//         for (let i = 0; i < 5; i++) {
//           formattedNfts.push(<FillerCard />);
//         }
//         setDisplayedNfts(formattedNfts);
//       })
//       .catch((err) => console.log(err));
//   } else {
//     const formattedNfts = formatNfts(allNfts);
//     for (let i = 0; i < 5; i++) {
//       formattedNfts.push(<FillerCard />);
//     }
//     setDisplayedNfts(formattedNfts);
//   }
// }, [search]);

// const masterSort = (i) => {
//   //price high to low
//   if (i === 0) {
//     if (search === "") {
//       const everyNft = formatNfts(
//         allNfts.sort(function (a, b) {
//           return b.price - a.price;
//         })
//       );
//       for (let i = 0; i < 5; i++) {
//         everyNft.push(<FillerCard />);
//       }
//       setDisplayedNfts(everyNft);
//     } else {
//       const formattedNfts = formatNfts(
//         unformattedNftData.sort(function (a, b) {
//           return b.price - a.price;
//         })
//       );
//       for (let i = 0; i < 5; i++) {
//         formattedNfts.push(<FillerCard />);
//       }
//       setDisplayedNfts(formattedNfts);
//     }
//   }
//   //price low to high
//   if (i === 1) {
//     if (search === "") {
//       const everyNft = formatNfts(
//         allNfts.sort(function (a, b) {
//           return a.price - b.price;
//         })
//       );
//       for (let i = 0; i < 5; i++) {
//         everyNft.push(<FillerCard />);
//       }
//       setDisplayedNfts(everyNft);
//     } else {
//       const formattedNfts = formatNfts(
//         unformattedNftData.sort(function (a, b) {
//           return a.price - b.price;
//         })
//       );
//       for (let i = 0; i < 5; i++) {
//         formattedNfts.push(<FillerCard />);
//       }
//       setDisplayedNfts(formattedNfts);
//     }
//   }
//   //likes high to low
//   if (i === 2) {
//     if (search === "") {
//       const everyNft = formatNfts(
//         allNfts.sort(function (a, b) {
//           return b.likeCount - a.likeCount;
//         })
//       );
//       for (let i = 0; i < 5; i++) {
//         everyNft.push(<FillerCard />);
//       }
//       setDisplayedNfts(everyNft);
//     } else {
//       const formattedNfts = formatNfts(
//         unformattedNftData.sort(function (a, b) {
//           return b.likeCount - a.likeCount;
//         })
//       );
//       for (let i = 0; i < 5; i++) {
//         formattedNfts.push(<FillerCard />);
//       }
//       setDisplayedNfts(formattedNfts);
//     }
//   }
//   //likeCount low to high
//   if (i === 3) {
//     if (search === "") {
//       const everyNft = formatNfts(
//         allNfts.sort(function (a, b) {
//           return a.likeCount - b.likeCount;
//         })
//       );
//       for (let i = 0; i < 5; i++) {
//         everyNft.push(<FillerCard />);
//       }
//       setDisplayedNfts(everyNft);
//     } else {
//       const formattedNfts = formatNfts(
//         unformattedNftData.sort(function (a, b) {
//           return a.likeCount - b.likeCount;
//         })
//       );
//       for (let i = 0; i < 5; i++) {
//         formattedNfts.push(<FillerCard />);
//       }
//       setDisplayedNfts(formattedNfts);
//     }
//   }
//   //date high to low
//   if (i === 4) {
//     if (search === "") {
//       const everyNft = formatNfts(
//         allNfts.sort(function (a, b) {
//           return moment(b.timestamp) - moment(a.timestamp);
//         })
//       );
//       for (let i = 0; i < 5; i++) {
//         everyNft.push(<FillerCard />);
//       }
//       setDisplayedNfts(everyNft);
//     } else {
//       const formattedNfts = formatNfts(
//         unformattedNftData.sort(function (a, b) {
//           return moment(b.timestamp) - moment(a.timestamp);
//         })
//       );
//       for (let i = 0; i < 5; i++) {
//         formattedNfts.push(<FillerCard />);
//       }
//       setDisplayedNfts(formattedNfts);
//     }
//   }
//   //date low to high
//   if (i === 5) {
//     if (search === "") {
//       const everyNft = formatNfts(
//         allNfts.sort(function (a, b) {
//           return moment(a.timestamp) - moment(b.timestamp);
//         })
//       );
//       for (let i = 0; i < 5; i++) {
//         everyNft.push(<FillerCard />);
//       }
//       setDisplayedNfts(everyNft);
//     } else {
//       const formattedNfts = formatNfts(
//         unformattedNftData.sort(function (a, b) {
//           return moment(a.timestamp) - moment(b.timestamp);
//         })
//       );
//       for (let i = 0; i < 5; i++) {
//         formattedNfts.push(<FillerCard />);
//       }
//       setDisplayedNfts(formattedNfts);
//     }
//   }
// };

{
  /* <ContainerTitleSorting
  onMouseEnter={() => setMenuOpen(true)}
  onMouseLeave={() => setMenuOpen(false)}
  isMenuOpen={menuOpen}
>
  <SelectedSpan onClick={() => setMenuOpen(!menuOpen)}>
    {selected}
  </SelectedSpan>
  {menuOptions.map((item, index) => {
    return item;
  })}
</ContainerTitleSorting> */
}

// const [menuOpen, setMenuOpen] = useState(false);
// const [selected, setSelected] = useState("Price: High - Low");
// const menuOptions = [
//   <MenuSpan
//     isMenuOpen={menuOpen}
//     onClick={() => {
//       masterSort(0);
//       setSelected("Price: High - Low");
//       setMenuOpen(false);
//     }}
//   >
//     Price: High - Low
//   </MenuSpan>,
//   <MenuSpan
//     isMenuOpen={menuOpen}
//     onClick={() => {
//       masterSort(1);
//       setSelected("Price: Low - High");
//       setMenuOpen(false);
//     }}
//   >
//     Price: Low - High
//   </MenuSpan>,
//   <MenuSpan
//     isMenuOpen={menuOpen}
//     onClick={() => {
//       masterSort(2);
//       setSelected("Likes: High - Low");
//       setMenuOpen(false);
//     }}
//   >
//     Likes: High - Low
//   </MenuSpan>,
//   <MenuSpan
//     isMenuOpen={menuOpen}
//     onClick={() => {
//       masterSort(3);
//       setSelected("Likes: Low - High");
//       setMenuOpen(false);
//     }}
//   >
//     Likes: Low - High
//   </MenuSpan>,
//   <MenuSpan
//     isMenuOpen={menuOpen}
//     onClick={() => {
//       masterSort(4);
//       setSelected("Date: High - Low");
//       setMenuOpen(false);
//     }}
//   >
//     Date: High - Low
//   </MenuSpan>,
//   <MenuSpan
//     isMenuOpen={menuOpen}
//     onClick={() => {
//       masterSort(5);
//       setSelected("Date: Low - High");
//       setMenuOpen(false);
//     }}
//   >
//     Date: Low - High
//   </MenuSpan>,
// ];

const Eth = styled(IconEth)`
  width: 18px;
  height: 18px;
  & path {
    fill: ${(props) => props.theme.color.white};
  }
`;

const Arrow = styled(down_arrow)`
  width: 15px;
  height: 15px;
  cursor: pointer;
  transition: all 0.2s linear;
  margin-left: 7px;
  margin-top: -3px;
  & path {
    fill: ${(props) => props.theme.color.gray};
  }
  @media only screen and (max-width: 776px) {
  }
`;

const SelectedSpanMobile = styled.span`
  text-decoration: underline;
  margin-top: -3px;
  @media only screen and (min-width: 776px) {
    content: "Sort";
  }
`;
const SelectedSpan = styled.span`
  text-decoration: underline;
  margin-top: -3px;
  /* @media only screen and (max-width: 776px) {
    display: none;
  } */
`;

const MenuSpan = styled.span`
  display: ${(props) => (props.isMenuOpen ? "block" : "none")};
  padding-top: 5px;
  cursor: pointer;
`;
const ContainerTitleSorting = styled.div`
  position: absolute;
  left: 37%;
  top: -15px;
  height: 20px;
  padding: 5px 8px 3px 8px;
  font: "Compita";
  background-color: ${(props) => props.theme.color.boxBorder};
  font-size: ${(props) => props.theme.fontSizes.sm};
  color: ${(props) => (props.faq ? "#3d3d3d" : props.theme.color.gray)};
  border: 4px solid #383838;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  height: ${(props) => props.isMenuOpen && "195px"};

  @media only screen and (max-width: 1200px) {
    left: auto;
    right: calc(10% + 50px);
  }
  @media only screen and (max-width: 776px) {
    /* left: 80vw;
    right: auto; */
    left: auto;
    right: auto;
    top: 25px;
  }
`;
const ContainerTitleDate = styled.div`
  cursor: pointer;
  position: absolute;
  left: 50%;
  top: -15px;
  height: 20px;
  padding: 5px 8px 3px 8px;
  font: "Compita";
  background-color: ${(props) => props.theme.color.boxBorder};
  font-size: ${(props) => props.theme.fontSizes.sm};
  color: ${(props) => (props.faq ? "#3d3d3d" : props.theme.color.gray)};
  border: 4px solid #383838;
  border-radius: 20px;
  display: flex;
  align-items: center;
  @media only screen and (max-width: 1200px) {
    left: auto;
    right: calc(10% + 50px);
  }
  @media only screen and (max-width: 776px) {
    left: 80vw;
    right: auto;
  }
`;
const ContainerTitleInput = styled.input`
  outline: none;
  position: absolute;
  left: calc(10% + 50px);
  top: -15px;
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
    left: auto;
    margin-left: auto;
    margin-right: auto;
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
    margin-top: 25px;
  }
  &>div {
    display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
  @media only screen and (max-width: 776px) {
    flex-direction: column;
    align-items: center;
    margin-top: 25px;
}
&>div {
    display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
  @media only screen and (max-width: 776px) {
    flex-direction: column;
    align-items: center;
    margin-top: 25px;
  }
  }
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

const ContainerTitleLeft = styled.div`
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
