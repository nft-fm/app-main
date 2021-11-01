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
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState("Date: High - Low");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(2);
  const limit = 200;

  // const getNftsWithParams = async (pageIncrease, searchParam, sortParam) => {
  //   console.log("here", hasMore);
  //   if (hasMore) {
  //     await axios
  //       .post("/api/nft-type/getNftsWithParams", {
  //         address: account,
  //         limit,
  //         page: page,
  //         search: searchParam,
  //         sort: sortParam,
  //       })
  //       .then((res) => {
  //         setAllNfts([...allNfts, ...res.data.nfts]);
  //         setPage(page + pageIncrease);
  //         setHasMore(res.data.hasMore);
  //       });
  //   }
  // };

  // useEffect(() => {
  //   const fetchWithNoSearch = async () => {
  //     setPage(0);
  //     if (search === "") {
  //       setHasMore(true);
  //       setAllNfts([]);
  //       await axios
  //         .post("/api/nft-type/getNftsWithParams", {
  //           address: account,
  //           limit,
  //           page: 0,
  //           search: "",
  //           sort: sort,
  //         })
  //         .then((res) => {
  //           setAllNfts(res.data.nfts);
  //           setPage(page + 1);
  //           setHasMore(res.data.hasMore);
  //         });
  //     }
  //   };

  //   fetchWithNoSearch();
  // }, [search, account]);

  const handleSort = useCallback(async () => {
    setPage(0);
    setHasMore(true);
    await axios
      .post("/api/nft-type/getNftsWithParams", {
        address: account,
        limit,
        page: 0,
        search,
        sort,
      })
      .then((res) => {
        setAllNfts(res.data.nfts);
        setPage(1);
        setHasMore(res.data.hasMore);
      });
  }, [search, sort, account]);

  // handles login and sort
  useEffect(() => {
    handleSort();
  }, [sort, account, handleSort]);

  const handleSearch = async (e, pageIncrease, searchParam, sortParam) => {
    e.preventDefault();
    if (search !== "") {
      setPage(0);
      setHasMore(true);
      await axios
        .post("/api/nft-type/getNftsWithParams", {
          address: account,
          limit,
          page: 0,
          search: searchParam,
          sort: sortParam,
        })
        .then((res) => {
          setAllNfts(res.data.nfts);
          setPage(page + pageIncrease);
          setHasMore(res.data.hasMore);
        });
    }
  };

  const menuOptions = [
    <MenuSpan
      isMenuOpen={menuOpen}
      onClick={() => {
        setSort(2);
        setSelected("Date: High - Low");
        setMenuOpen(false);
      }}
      selected={selected === "Date: High - Low"}
    >
      Recently Added
    </MenuSpan>,
    <MenuSpan
      isMenuOpen={menuOpen}
      onClick={() => {
        setSort(0);
        setSelected("Price: High - Low");
        setMenuOpen(false);
      }}
      selected={selected === "Price: High - Low"}
    >
      Most Expensive
    </MenuSpan>,
    <MenuSpan
      isMenuOpen={menuOpen}
      onClick={() => {
        setSort(1);
        setSelected("Price: Low - High");
        setMenuOpen(false);
      }}
      selected={selected === "Price: Low - High"}
    >
      Cheapest
    </MenuSpan>,
    <MenuSpan
      isMenuOpen={menuOpen}
      onClick={() => {
        setSort(5);
        setSelected("Liked: High - Low");
        setMenuOpen(false);
      }}
      selected={selected === "Liked: High - Low"}
    >
      Liked
    </MenuSpan>,
  ];

  return (
    <LaunchContainer>
      <ContainerTitleForm onSubmit={(e) => handleSearch(e, 1, search, 2)}>
        <ContainerTitleInput
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </ContainerTitleForm>

      <ContainerTitleSorting
        onMouseEnter={() => setMenuOpen(true)}
        onMouseLeave={() => setMenuOpen(false)}
        isMenuOpen={menuOpen}
        optionCount={menuOptions.length}
      >
        <SelectedSpan onClick={() => setMenuOpen(!menuOpen)}>
          {/* {selected} */}
          Sort by <DownArrow />
        </SelectedSpan>
        {menuOptions.map((item, index) => {
          return item;
        })}
      </ContainerTitleSorting>

      <ContainerOutline />
      <NftScroll>
        {/* <InfiniteScroll
          dataLength={allNfts.length}
          next={() => getNftsWithParams(1, search, sort)}
          hasMore={hasMore}
        > */}
        {allNfts.map((item, index) => (
          <NftCard nft={item} />
        ))}
        {!hasMore && (
          <>
            <FillerCard />
            <FillerCard />
            <FillerCard />
          </>
        )}
        {/* </InfiniteScroll> */}
      </NftScroll>
    </LaunchContainer>
  );
};

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
    /* left: 80vw;
    right: auto; */
    left: auto;
    right: auto;
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
  @media only screen and (max-width: 776px) {
    flex-direction: column;
    align-items: center;
    margin-top: 24px;
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
