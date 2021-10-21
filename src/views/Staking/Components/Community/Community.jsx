import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import styled from "styled-components";
import swal from "sweetalert2";
import { useWallet } from "use-wallet";
import useModal from "../../../../hooks/useModal";
import isMobile from "../../../../utils/isMobile";
import { require, getVinylBalance } from "../../../../web3/utils";
import { BaseView } from "../../../../components/Page/BaseView";
import RulesModal from "./RulesModal";
import Suggestion from "./Suggestion";
import { errorIcon, imageWidth, imageHeight } from "../../../../utils/swalImages";

const Community = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [newSuggestion, setNewSuggestion] = useState("");
  const [sort, setSort] = useState("new");
  const [userAlreadySuggested, setUserAlreadySuggested] = useState(false);
  const [presentRulesModal] = useModal(<RulesModal />);
  const { account, connect } = useWallet();
  const [hasVinyl, setHasVinyl] = useState(false);

  const fetchSuggestions = useCallback(() => {
    axios
      .post(`/api/gov/get-suggestions`, {
        address: account,
        page,
        sort,
      })
      .then((res) => {
        setSuggestions(res.data.suggestions);
        setUserAlreadySuggested(res.data.userAlreadySuggested);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [account, page, sort]);

  useEffect(() => {
    if (account) {
      fetchSuggestions();
      getVinylBalance((res) => Number(res.vinyl[0]) > 0 && setHasVinyl(true));
    }
  }, [page, sort, account, fetchSuggestions]);

  const handleChange = (e) => {
    if (e.target.value.length > 200) return;
    setNewSuggestion(e.target.value);
  };

  const submitSuggestion = async (e) => {
    e.preventDefault();
    if (!newSuggestion) {
      swal.fire("You must write a suggestion");
      return;
    }

    const { provider } = await require();
    const signer = provider.getSigner();
    const sig = await signer.signMessage(
      JSON.stringify({
        address: account,
        suggestion: newSuggestion,
      })
    );
    axios
      .post(`/api/gov/suggestion`, {
        address: account,
        sig,
        suggestion: newSuggestion,
      })
      .then((res) => {
        setSort("new");
        setNewSuggestion("");
        fetchSuggestions();
      })
      .catch((err) => {
        swal.fire({
          title: `Error: ${err.response ? err.response.status : 404}`,
          text: `${err.response ? err.response.data : "server error"}`,
          imageUrl: errorIcon,
          imageWidth,
          imageHeight,
        });
      });
  };

  const toggleSort = (newSort) => {
    setSort(newSort);
    setPage(0);
  };

  const getConnectedFam = async () => {
    connect("injected");
    await getVinylBalance(
      (res) => Number(res.vinyl[0]) > 0 && setHasVinyl(true)
    );
  };

  if (account && !hasVinyl) {
    return (
        <ApproveContainer>
          <ApproveText>
            No $VINYL detected in your account ending in:{" "}
            {account.substring(account.length - 4)}
          </ApproveText>
          {/* <ApproveButton onClick={() => getConnectedFam()}>
            I own $VINYL, Connect Me!
          </ApproveButton> */}
        </ApproveContainer>
    );
  }
  if (!account || !hasVinyl) {
    return (
        <ApproveContainer>
          <ApproveText>
            FANFARE Community is only available to $VINYL Holders.
          </ApproveText>
          <ApproveButton onClick={() => getConnectedFam()}>
            I own $VINYL, Connect Me!
          </ApproveButton>
        </ApproveContainer>
    );
  }
  return (
      <Container>
        <GovContainer>
          <ComicTitle>
            Community
            <Icon onClick={presentRulesModal} viewBox="0 0 180 180">
              <path
                fill="none"
                stroke-width="11"
                d="M9,89a81,81 0 1,1 0,2zm51-14c0-13 1-19 8-26c7-9 18-10 28-8c10,2 22,12 22,26c0,14-11,19-15,22c-3,3-5,6-5,9v22m0,12v16"
              />
            </Icon>
          </ComicTitle>
          {!isMobile() && (
            <Sorting>
              <Option
                style={{
                  color: sort === "top" ? "white" : "rgba(256,256,256,0.8)",
                  textDecoration: sort === "top" ? "underline" : "none",
                }}
                onClick={() => toggleSort("top")}
              >
                top
              </Option>
              <Option
                style={{
                  color: sort === "new" ? "white" : "rgba(256,256,256,0.8)",
                  textDecoration: sort === "new" ? "underline" : "none",
                }}
                onClick={() => toggleSort("new")}
              >
                new
              </Option>
            </Sorting>
          )}
          <SuggestionContainer>
            <Form>
              <InputWrapper>
                <Input
                  maxlength="200"
                  placeholder="What would you like to see on FANFARE?"
                  value={newSuggestion}
                  onChange={(e) => handleChange(e)}
                />
                {newSuggestion && (
                  <CharLimit
                    disabled={userAlreadySuggested}
                    style={{
                      color: newSuggestion.length >= 200 ? "red" : "white",
                    }}
                  >
                    {newSuggestion.length}/200
                  </CharLimit>
                )}
              </InputWrapper>
              <Button
                disabled={userAlreadySuggested}
                type="submit"
                onClick={(e) => submitSuggestion(e)}
              >
                Submit
              </Button>
            </Form>
          </SuggestionContainer>
          {isMobile() && (
            <Sorting>
              <Option
                style={{
                  color: sort === "top" ? "white" : "rgba(256,256,256,0.8)",
                  textDecoration: sort === "top" ? "underline" : "none",
                }}
                onClick={() => toggleSort("top")}
              >
                top
              </Option>
              <Option
                style={{
                  color: sort === "new" ? "white" : "rgba(256,256,256,0.8)",
                  textDecoration: sort === "new" ? "underline" : "none",
                }}
                onClick={() => toggleSort("new")}
              >
                new
              </Option>
            </Sorting>
          )}
          {suggestions.length > 0 && (
            <Suggestion
              fetchSuggestions={() => fetchSuggestions()}
              suggestions={suggestions}
            />
          )}
          <Pagination>
            <ReactPaginate
              previousLabel={"←"}
              nextLabel={"→"}
              breakLabel={"..."}
              pageCount={totalPages}
              marginPagesDisplayed={1}
              pageRangeDisplayed={3}
              onPageChange={(data) => setPage(data.selected)}
              forcePage={page}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </Pagination>
        </GovContainer>
      </Container>
  );
};

const ApproveText = styled.span`
  margin-bottom: 10px;
  font-size: ${(props) => props.theme.fontSizes.md};
  text-align: center;
`;

const ApproveButton = styled.button`
  width: 100%;
  padding: 10px 0;
  /* border: 2px solid white; */
  border: none;
  border-radius: ${(props) => props.theme.borderRadius}px;
  font-size: 16px;
  transition: all 0.2s linear;
  &:hover {
    background-color: ${(props) => props.theme.color.blue};
    color: white;
    cursor: pointer;
  }
`;

const ApproveContainer = styled.div`
  max-width: 80vw;
  border: 2px solid ${(props) => props.theme.color.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius}px;
  background-color: ${(props) => props.theme.color.box};
  color: white;
  width: 600px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: auto;
`;

const InputWrapper = styled.div`
  align-items: center;
  background-color: #eee;
  display: flex;

  height: 72px;
  padding: 0 10px;
  border: 2px solid rgba(256, 256, 256, 0.5);
  color: white;
  border-radius: 2px;
  background-color: rgba(0, 0, 0, 0.3);
  flex: 1;
  margin-right: 20px;
  position: relative;
  @media only screen and (max-width: 991px) {
    /* height: 100px; */
    /* width: 100%; */
    margin-right: 0px;
    margin-bottom: 10px;
  }
`;

const Button = styled.button`
  cursor: pointer;
  display: flex;
  width: 150px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  -webkit-transition: all 0.2s linear;
  transition: all 0.2s linear;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 991px) {
    width: 100%;
    height: 30px;
  }
`;

const ComicTitle = !isMobile()
  ? styled.div`
      position: absolute;
      padding: 5px 10px;
      font-weight: normal;
      font-size: 30px;
      letter-spacing: 1px;
      border-bottom: 2px solid white;
      font-weight: normal;
      top: 10px;
      z-index: 50;
    `
  : styled.div`
      padding: 5px 10px;
      font-weight: normal;
      font-size: 30px;
      letter-spacing: 1px;
      border-bottom: 2px solid white;
      font-weight: normal;
      margin-bottom: 10px;
      z-index: 50;
    `;

const GovContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  border-radius: 2px;
  border: 2px solid black;
  background-color: rgba(0, 0, 0, 0.1);
  align-self: stretch;
  margin: 15px;
  border: solid 1px #2d2d34;
  background-color: #17171a;
  color: white;
  padding: 20px 0px;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  position: relative;
  font-size: 20px;
`;

const SuggestionContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 2px;
  justify-content: center;
  align-self: stretch;
  margin-bottom: 20px;
  position: relative;
  @media only screen and (max-width: 991px) {
    /* margin-top: 90px;
    margin-bottom: -2px; */
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: flex-end;
  width: calc(100% - 37px);
  z-index: 20;
`;

const Option = !isMobile()
  ? styled.div`
      font-family: "Compita";
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
    `
  : styled.div`
      font-family: "Compita";
      font-size: 16px;
      font-stretch: normal;
      font-style: normal;
      line-height: 1;
      letter-spacing: normal;
      text-align: center;
      opacity: 0.9;
      cursor: pointer;
      &:hover {
        opacity: 1;
      }
    `;

const CharLimit = styled.div`
  font-family: "Compita";
  font-size: 14px;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  display: flex;
  align-items: center;
  position: absolute;
  right: 5px;
  bottom: 5px;
  display: flex;
  justify-content: flex-end;
`;

const Input = styled.textarea`
  background: none;
  border: 0;
  width: 100%;
  font-size: 16px;
  flex: 1;
  color: white;
  height: calc(100% - 20px);
  font-family: "Nunito";
  margin: 0;
  padding: 0;
  outline: none;
  resize: none;
  ::placeholder {
    color: rgba(256, 256, 256, 0.4);
  }
  @media only screen and (max-width: 991px) {
    width: calc(100% - 40px);
    /* flex-wrap: wrap; */
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  width: calc(100% - 40px);
  position: relative;
  @media only screen and (max-width: 991px) {
    flex-direction: column;
    /* flex-wrap: wrap; */
  }
`;

const Icon = styled.svg`
  width: 20px;
  height: 20px;
  stroke: white;
  cursor: pointer;
  transition: all 0.2s linear;
  margin-left: 10px;
  &:hover {
    stroke: #ffcb46;
  }
`;

const Sorting = styled.div`
  height: 45px;
  z-index: 20;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  font-family: "PlatNomor";
  font-size: 30px;
  align-items: center;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  @media only screen and (max-width: 991px) {
    justify-content: space-around;
  }
`;

const Container = styled.div`
  /* width: 1000px; */
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10vh;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  font-size: 20px;
  color: white;
`;

export default Community;
