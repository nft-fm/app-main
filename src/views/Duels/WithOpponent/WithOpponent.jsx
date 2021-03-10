import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Duellers from "./Duellers";
import {useDuels} from "../../../contexts/Duels";

function isMobile() {
	if (window.innerWidth < window.innerHeight) return true;
	return false
}

const WithOpponent = (props) => {
	const [search, setSearch] = useState("Search...")
	return (
		<Container>
			<Search>
				<input type="text"
							 value={search}
							 onChange={(e) => setSearch(e.target.value)}
							 onFocus={() => {
								 if (search === "Search...")
									 setSearch("");
							 }}
							 onBlur={() => {
								 if (search === "")
									 setSearch("Search...");
							 }}/>
			</Search>
			<Duellers />
		</Container>

	);

}


const Search = styled.div`
	width: 505px;
	height: 41px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  input {
    width: 100%;
    height: 100%;
		
    font-size: 15px;
    padding: 11px 14px;
    color: black;
    border: 2px solid black;
   
    background-color: white;

    &:focus {
      outline: none;
    }
  }
`;

const Container = styled.div`
	width: 100%;
	height: 80vh;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
`;

export default WithOpponent;