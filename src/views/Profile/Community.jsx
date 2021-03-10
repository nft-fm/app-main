import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import axios from "axios";
import swal from "sweetalert2";
import ReactPaginate from 'react-paginate';
import useModal from '../../hooks/useModal'
import RulesModal from "./RulesModal";
import Suggestions from "./Suggestions";
import { require } from "../../web3/utils";
import isMobile from "../../utils/isMobile";
import ProfileGovBG from "../../assets/img/profile_page_assets/profile_gov.png";
import ProfileSuggestBG from "../../assets/img/profile_page_assets/profile_suggest.png";

const Community = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [newSuggestion, setNewSuggestion] = useState("")
  const [sort, setSort] = useState("top");
  const [userAlreadySuggested, setUserAlreadySuggested] = useState(false);
  const [presentRulesModal] = useModal(<RulesModal />);
  const { account, connect } = useWallet()

  const fetchSuggestions = () => {
    axios.post(`/api/user/get-suggestions`, {
      address: account,
      page,
      sort
    }).then(res => {
      console.log("suggestions", res.data);
      setSuggestions(res.data.suggestions);
      setUserAlreadySuggested(res.data.userAlreadySuggested);
      setTotalPages(res.data.totalPages);
    }).catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    if (account) {
      fetchSuggestions()
    }
  }, [page, sort, account])


  const handleChange = (e) => {
    if (e.target.value.length > 200) return;
    setNewSuggestion(e.target.value);
  }

  const submitSuggestion = async (e) => {
    e.preventDefault();
    console.log("megastank", suggestions);
    if (!newSuggestion) return;

    const { provider } = await require();
    const signer = provider.getSigner();
    const sig = await signer.signMessage(JSON.stringify({
      address: account,
      suggestion: newSuggestion,
    }))
    axios.post(`/api/user/suggestion`,
      {
        address: account,
        sig,
        suggestion: newSuggestion,
      }).then(res => {
        setSort("new");
        setNewSuggestion("");
        fetchSuggestions()
      }).catch(err => {
        console.log(err.response);
        swal.fire({
          icon: 'error',
          title: `Error: ${err.response ? err.response.status : 404}`,
          text: `${err.response ? err.response.data : "server error"}`
        })
      })
  }

  const toggleSort = (newSort) => {
    setSort(newSort);
    setPage(0);
  }

  return (
    <Container>
      <GovContainer>
        <ComicTitle>
          Community Governance <Icon onClick={presentRulesModal} viewBox="0 0 180 180">
            <path fill="none" stroke-width="11" d="M9,89a81,81 0 1,1 0,2zm51-14c0-13 1-19 8-26c7-9 18-10 28-8c10,2 22,12 22,26c0,14-11,19-15,22c-3,3-5,6-5,9v22m0,12v16" />
          </Icon>
        </ComicTitle>
        <Sorting>
          <Option style={{ color: sort === "top" ? "white" : "rgba(256,256,256,0.8)", textDecoration: sort === "top" ? "underline" : "none" }} onClick={() => toggleSort("top")}>
            top
          </Option>
          <Option style={{ color: sort === "new" ? "white" : "rgba(256,256,256,0.8)", textDecoration: sort === "new" ? "underline" : "none" }} onClick={() => toggleSort("new")}>
            new
          </Option>

        </Sorting>
        {suggestions.length > 0 && <Suggestions fetchSuggestions={() => fetchSuggestions()} suggestions={suggestions} />}
        <Pagination>
          <ReactPaginate
            previousLabel={'◄'}
            nextLabel={'►'}
            breakLabel={'...'}
            pageCount={totalPages}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            onPageChange={(data) => setPage(data.selected)}
            forcePage={page}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
          />
        </Pagination>
      </GovContainer>
      <SuggestionContainer>
        <ComicTitle>Suggestion Box</ComicTitle>
        <SuggestionTitle>
          What would you like to see on Block Duelers? Let the community decide!
        </SuggestionTitle>
        <Form>
          <InputWrapper>
            <Input maxlength="200" placeholder="We should..." value={newSuggestion} onChange={(e) => handleChange(e)} />
          </InputWrapper>
          {newSuggestion &&
            <CharLimit
              disabled={userAlreadySuggested ? true : false}
              style={{ color: newSuggestion.length >= 200 ? "red" : "black" }}
            >
              {newSuggestion.length}/200
              </CharLimit>}
          <Button
            disabled={userAlreadySuggested ? true : false}
            type="submit"
            onClick={(e) => submitSuggestion(e)}
          >
            Submit
            </Button>
        </Form>
      </SuggestionContainer>
    </Container>
  )
}

const InputWrapper = styled.div`
  align-items: center;
  background-color: #eee;
  display: flex;
  height: 72px;
  padding: 0 10px;
  border: solid black;
  border-width: 2px 2px 2px 2px;
  background-color: #fef9ed;
  border-top-left-radius: 18% 9%;
  border-top-right-radius: 95% 4%;
  border-bottom-right-radius: 16% 7%;
  border-bottom-left-radius: 95% 5%;
  color: black;
  margin-bottom: 20px;
  width: calc(100% - 40px);
`

const Button = styled.button`
  align-items: center;
  cursor: pointer;
  display: flex;
  background-color: rgba(256, 256, 256, 0.05);
  height: 50px;
  padding: 3px 10px 0 10px;
  justify-content: center;
  outline: none;
  font-family: "Bangers";
  font-size: 26px;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #444;
  box-shadow:5px 5px 0 #333;
  border: 4px solid #333;
  display: flex;
align-items: center;
  text-transform: uppercase;
  background: url('data:image/svg+xml;utf8,<svg width="100" height="100" transform="rotate(25)" opacity="0.15" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="%23250E17"><circle cx="25" cy="25" r="12.5" /><circle cx="75" cy="75" r="12.5" /><circle cx="75" cy="25" r="12.5" /><circle cx="25" cy="75" r="12.5" /></g></svg>'),
    #fff;
  background-size: 12px, 100%;
  position: relative;
  padding: 12px;
  width: 60%;
transition: all 0.2s ease-in-out;
  &:hover {
    color: #000;
    box-shadow:5px 5px 0 #000;
    border: 4px solid #000;
  }
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
z-index: 50;

`

const GovContainer = styled.div`
width: calc(60% - 14px);
display: flex;
flex-direction: column;
align-items: center;
position: relative;
border-radius: 2px;
border: 2px solid black;
background-color: rgba(0,0,0,0.1);
align-self: stretch;

position: relative;
::before {
  content: "";
position: absolute;  
  top: 0px;
  right: 0px;
  left: 0px;
  bottom: 0px;
  filter: grayscale(.7) brightness(110%);
  background-image: url(${ProfileGovBG});
  background-repeat: no-repeat;
background-position: center;
background-size: cover;
}
`

const SuggestionContainer = styled.div`
width: calc(40% - 14px);
display: flex;
align-items: center;
display: flex;
flex-direction: column;
justify-content: center;
border-radius: 2px;
border: 2px solid black;
background-color: rgba(0,0,0,0.1);
justify-content: center;
min-height: 300px;
align-self: stretch;
position: relative;
::before {
  content: "";
position: absolute;  
  top: 0px;
  right: 0px;
  left: 0px;
  bottom: 0px;
  filter: grayscale(.7) brightness(110%);
  background-image: url(${ProfileSuggestBG});
  background-repeat: no-repeat;
background-position: center;
background-size: cover;
}
`

const Pagination = styled.div`
display:flex;
justify-content: flex-end;
width: calc(100% - 26px);
margin-bottom: 10px;
z-index: 20;

`

const Option = !isMobile() ? styled.div`
font-family: "Bangers";
font-size: 16px;

font-stretch: normal;
font-style: normal;
line-height: 1;
letter-spacing: normal;
text-align: center;
opacity: 0.9;
cursor: pointer;
margin-right: 16px;
&:hover {
  opacity: 1;
}
` : styled.div`
font-family: "Bangers";
font-size: 16px;
font-stretch: normal;
font-style: normal;
line-height: 1;
letter-spacing: normal;
text-align: center;
opacity: 0.9;
cursor: pointer;
margin-right: 16px;
&:hover {
  opacity: 1;
}
margin-left: 20vw;
`

const CharLimit = styled.div`
color: black;
font-family: "Comic Book";
font-size: 14px;
font-stretch: normal;
font-style: normal;
line-height: 1;
letter-spacing: normal;
display: flex;
align-items: center;
position: absolute;
width: 70px;
top: 77px;
left: 330px;
display: flex;
justify-content: flex-end;
`


const Input = styled.textarea`
background: none;
border: 0;
color: black;
width: 100%;
font-size: 16px;
flex: 1;
height: 56px;
font-family: "Comic Book";
margin: 0;
padding: 0;
outline: none;
resize: none;
  ::placeholder {
    color: rgba(0,0,0,0.4);
  }
  `

const Form = styled.form`
display: flex;
flex-direction: column;
align-items: center;
width: calc(100% - 40px);
position: relative;
`

const SuggestionTitle = styled.div`
margin-top: 40px;
margin-bottom: 10px;
font-family: "Comic Book";
z-index: 20;
  font-size: 18px;
  font-stretch: normal;
  font-style: normal;
  color: white;
  line-height: 1.5;
  letter-spacing: normal;
`

const Icon = styled.svg`
width: 20px;
height: 20px;
stroke: black;
cursor: pointer;
transition: all 0.2s linear;
margin-left: 10px;
&:hover {
  stroke: rgb(205,154,24);
}
`

const Sorting = styled.div`
margin-top: 10px;
height: 45px;
z-index: 20;

align-items: center;
width: 100%;
display: flex;
justify-content: flex-end;
font-family: "Bangers";
  font-size: 30px;
  align-items: center;
  margin-bottom: 20px;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
`

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: black;
  margin-bottom: 20px;
  `

export default Community