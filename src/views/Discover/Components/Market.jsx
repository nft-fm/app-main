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
  const [featuredNfts, setFeaturedNfts] = useState([]);
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
  const [pauseSong, setPauseSong] = useState(() => () => { }) // this is fucking weird, don't touch me.

  console.log("genre", genre);

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
        genre,
      })
      .then((res) => {
        setAllNfts(res.data.nfts);
        setPage(1);
        setHasMore(res.data.hasMore);
      });
  }, [search, sort, account, genre]);

  // handles login and sort
  useEffect(() => {
    handleSort();
  }, [sort, account, handleSort, genre]);

  useEffect(() => {
    axios.post("/api/nft-type/get-featured").then(res => {
      setFeaturedNfts(res.data);
    });
  }, [])

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
          genre,
        })
        .then((res) => {
          setAllNfts(res.data.nfts);
          setPage(page + pageIncrease);
          setHasMore(res.data.hasMore);
        });
    }
  };

  const loadMore = () => {
    setShown(shown + 6);
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
    <MenuSpan
      isMenuOpen={menuOpen}
      onClick={() => {
        setSort(6);
        setSelected("Sales: High - Low");
        setMenuOpen(false);
      }}
      selected={selected === "Sales: High - Low"}
    >
      Most Sales
    </MenuSpan>,
  ];

  const genres = [
    "All",
    "Country",
    "Electronic",
    "Funk",
    "Hip hop",
    "Jazz",
    "Latin",
    "Pop",
    "Punk",
    "Raggae",
    "Rock",
    "Metal",
    "Soul music and R&B",
    "Polka",
    "Traditional/Folk",
    "Other",
  ];

  console.log(pauseSong)

  return (
    <>
      <LaunchContainer>
        <Featured>
          Featured
        </Featured>
        <ContainerOutline />
        <NftScroll>
          {featuredNfts.map((item, index) => {
            if (index >= shown * 3) return null;
            else return <NftCard nft={item} pauseSong={pauseSong} setPauseSong={setPauseSong} />;
          })}
        </NftScroll>
      </LaunchContainer>
      <LaunchContainer>

        <ContainerOutline />
        <ContainerTitleForm onSubmit={(e) => handleSearch(e, 1, search, 2)}>
          <ContainerTitleInput
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </ContainerTitleForm>

        <ContainerTitleGenre
          onMouseEnter={() => setGenreMenu(true)}
          onMouseLeave={() => setGenreMenu(false)}
          isMenuOpen={genreMenu}
          optionCount={genres.length}
        >
          <SelectedSpan onClick={() => setGenreMenu(!genreMenu)}>
            Genre <DownArrow />
          </SelectedSpan>
          {genres.map((item) => {
            return (
              <MenuSpan
                isMenuOpen={genreMenu}
                onClick={() => {
                  setGenre(item);
                  setGenreMenu(false);
                }}
                selected={genre === item}
              >
                {item}
              </MenuSpan>
            );
          })}
        </ContainerTitleGenre>

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
        <NftScroll>
          {allNfts.map((item, index) => {
            if (index >= shown * 3) return null;
            else return <NftCard nft={item} pauseSong={pauseSong} setPauseSong={setPauseSong} />;
          })}
        </NftScroll>
        {shown * 3 < allNfts.length && (
          <LoadMore onClick={loadMore}>Load More</LoadMore>
        )}
      </LaunchContainer>
    </>
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

const Featured = styled.div`
  position: absolute;
  top: -15px;
  background-color: #090909;
  font-size: 50px;
  font-weight: bold;
  left: calc(10% + 50px);
  font-size: 36px;
    font-weight: bold;
    left: calc(10% + 50px);
    width: 160px;
    align-items: center;
    display: flex;
    justify-content: center;
  @media only screen and (max-width: 776px) {
    left: auto;
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
