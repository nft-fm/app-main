import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import styled from "styled-components";
import swal from "sweetalert2";
import { useWallet } from "use-wallet";
import { require, getVinylBalance } from "../../../web3/utils";
import { BaseView } from "../../../components/Page/BaseView";
// import RulesModal from "./RulesModal";
import Suggestion from "./Suggestion";
import GovernancePolls from "./GovernancePolls";
import { Socials } from "./Socials";
import { errorIcon, imageWidth, imageHeight } from "../../../utils/swalImages";

const Community = () => {
  const { account, connect } = useWallet();
  const [suggestions, setSuggestions] = useState([]);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 991);

  const [sort, setSort] = useState("new");
  const [active, setActive] = useState({ top: false, new: true });

  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);

  const [newSuggestion, setNewSuggestion] = useState("");
  const [userAlreadySuggested, setUserAlreadySuggested] = useState(false);
  const [hasVinyl, setHasVinyl] = useState(false);

  const [poll, setPoll] = useState([]);

  useEffect(() => {
    window.addEventListener("resize", updateWindow);
    return () => window.removeEventListener("resize", updateWindow);
  });

  if (
    window.location.hostname === "localhost" &&
    process.env.REACT_APP_IS_MAINNET
  ) {
    swal.fire({
      title: `You are on MAINNET and LOCALHOST be careful`,
      text: `🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆`,
      imageUrl: errorIcon,
      imageWidth,
      imageHeight,
    });
  }

  const updateWindow = () => setIsDesktop(window.innerWidth > 991);
  const handleChange = (e) =>
    e.target.value.length > 200 ? null : setNewSuggestion(e.target.value);

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
    fetchSuggestions();
    if (account) {
      getVinylBalance((res) => Number(res.vinyl[0]) > 0 && setHasVinyl(true));
    }
  }, [page, sort, account, fetchSuggestions]);

  const toggleSort = (newSort) => {
    setSort(newSort);
    setPage(0);
    setActive(
      newSort === "top" ? { top: true, new: false } : { top: false, new: true }
    );
  };

  const submitSuggestion = async (e) => {
    e.preventDefault();
    if (!hasVinyl) {
      return swal.fire({
        title: `Error`,
        text: `You cannot submit proposals without $VINYL.`,
        imageUrl: errorIcon,
        imageWidth,
        imageHeight,
      });
    }
    if (!newSuggestion) {
      swal.fire("You must write a proposal");
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

  const getConnectedFam = async () => {
    connect("injected");
    await getVinylBalance(
      (res) => Number(res.vinyl[0]) > 0 && setHasVinyl(true)
    );
  };

  return (
    <BaseView>
      <Container>
        <Title>COMMUNITY</Title>
        <GovernancePolls
          hasVinyl={hasVinyl}
          getConnectedFam={getConnectedFam}
          poll={poll}
          setPoll={setPoll}
        />
        {poll.question ? <Socials /> : null}
        <LaunchContainer>
          <ContainerOutline />
          <ContainerTitle>
            <span>PROPOSE</span>
          </ContainerTitle>
          <GovContainer id="Gov">
            <SuggestionContainer>
              {newSuggestion ? (
                <CharLimit
                  style={{
                    color: newSuggestion.length >= 200 ? "red" : "white",
                  }}
                >
                  {newSuggestion.length} / 200
                </CharLimit>
              ) : null}
              <Form>
                <Wrapper>
                  <InputWrapper>
                    <Input
                      maxlength="200"
                      placeholder={
                        account
                          ? "Type here..."
                          : "Connect wallet to suggest..."
                      }
                      value={newSuggestion}
                      onChange={(e) => (account ? handleChange(e) : null)}
                      isDesktop={isDesktop}
                      disabled={account ? false : true}
                    />
                  </InputWrapper>
                </Wrapper>
                {account ? (
                  <SubmitButton
                    disabled={userAlreadySuggested}
                    type="submit"
                    onClick={(e) => submitSuggestion(e)}
                  >
                    Submit
                  </SubmitButton>
                ) : (
                  <SubmitButton type="button" onClick={() => getConnectedFam()}>
                    Connect
                  </SubmitButton>
                )}
              </Form>
            </SuggestionContainer>

            <Middle>
              <SubTitle>
                Help suggest what we should do next. You can make one proposal
                every voting cycle.
              </SubTitle>
              <Sorting>
                <OptionContainer>
                  <Option
                    className={"top"}
                    onClick={() => toggleSort("top")}
                    active={active.top}
                  >
                    Top
                  </Option>
                  <Option
                    className={"new"}
                    onClick={() => toggleSort("new")}
                    active={active.new}
                  >
                    New
                  </Option>
                </OptionContainer>
              </Sorting>
            </Middle>
            {suggestions.length > 0 && (
              <Suggestion
                hasVinyl={hasVinyl}
                fetchSuggestions={() => fetchSuggestions()}
                suggestions={suggestions}
                isDesktop={isDesktop}
              />
            )}
          </GovContainer>
          <Pagination>
            <ReactPaginate
              previousLabel={"◄"}
              nextLabel={"►"}
              showPaginationBottom={false}
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
        </LaunchContainer>
        {!poll.question ? <Socials /> : null}
      </Container>
    </BaseView>
  );
};

const LaunchContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
  margin-bottom: 80px;
  min-height: 900px;

  @media only screen and (max-width: 991px) {
    width: 100%;
    min-height: 1000px;
  }
  @media only screen and (max-width: 500px) {
    width: 100%;
    min-height: 1100px;
  }
`;

const ContainerOutline = styled.div`
  position: absolute;
  border-radius: 24px 24px 24px 24px;
  border: 6px solid #383838;
  height: 100%;
  width: 80%;
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
`;

// const ApproveText = styled.span`
//   margin-bottom: 10px;
//   font-size: ${(props) => props.theme.fontSizes.md};
//   text-align: center;
// `;

const Middle = styled.div`
  display: flex;
  min-height: 80px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  @media only screen and (max-width: 776px) {
    justify-content: center;
    flex-direction: column;
  }
`;

const Title = styled.h1`
  font-size: ${(props) => props.theme.fontSizes.xl};
  font: "Compita";
  color: white;
  z-index: 1;
`;

const SubTitle = styled.h3`
  text-align: center;
  width: 48vw;
  padding-left: 12vw;
  font-size: ${(props) => props.theme.fontSizes.xs};
  line-height: 27px;
  color: ${(props) => props.theme.color.gray};
  @media only screen and (max-width: 776px) {
    width: 80%;
    padding: 0;
  }
`;

const GovContainer = styled.div`
  padding-top: -1000px;
  flex-direction: column;
  align-items: center;
  border-radius: 2px;
  margin: 15px;
  color: white;
  padding: 20px 0;
  flex: 1;
  font-size: 20px;
  width: 100%;
  @media only screen and (max-width: 991px) {
    width: 95%;
  }
  z-index: 1;
`;

const SuggestionContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 15px;
  @media only screen and (max-width: 991px) {
    margin-bottom: 5px;
  }
`;

const CharLimit = styled.div`
  font-size: 14px;
  padding: 5px;
  border: 1px solid #2d2d34;
  border-radius: 5px;
  background-color: #1d1d21;
`;

const Form = styled.form`
  padding-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  width: 100%;
  @media only screen and (max-width: 991px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
`;

const Input = styled.textarea`
  background: none;
  border: 0;
  width: 100%;
  font-size: 16px;
  flex: 1;
  color: white;
  margin: 10px 0 10px 0;
  padding: 0 5px 0 0;
  outline: none;
  resize: none;
  font-family: "Compita";

  ::placeholder {
    color: #c1c1c1;
    opacity: 1;
  }
`;

const InputWrapper = styled.div`
  align-items: center;
  display: flex;
  width: 100%;
  padding: 0 5px 0 15px;
  border: 1px solid #2d2d34;
  border-radius: 5px;
  background-color: #1d1d21;
  color: white;
  flex: 1;
  box-sizing: border-box;
  @media only screen and (max-width: 991px) {
    margin-right: 0;
  }
`;

const SubmitButton = styled.button`
  cursor: pointer;
  display: flex;
  width: 150px;
  margin-left: 10px;
  background-color: ${(props) => props.theme.color.blue};
  border-radius: 5px;
  border: none;
  color: white;
  padding: 22px 34px 20px;
  font-size: 20px;
  -webkit-transition: all 0.2s linear;
  transition: all 0.2s linear;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 1;
    color: white;
  }

  @media only screen and (max-width: 991px) {
    width: 40%;
    max-width: 250px;
    padding: 10px 5px;
    margin: 0 0 15px 0;
    margin-top: 10px;
  }
`;

const Sorting = styled.div`
  height: 45px;
  z-index: 20;
  display: flex;
  justify-content: center;
  font-size: 30px;
  align-items: center;
  line-height: 1;
`;

const OptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  @media only screen and (max-width: 991px) {
    justify-content: center;
  }
`;

const Option = styled.div`
  background-color: #1d1d21;
  border-radius: ${(props) =>
    props.className === "top" ? "5px 0 0 5px" : " 0 5px 5px 0"};
  border: 1px solid
    ${(props) => (props.active ? props.theme.color.blue : "#2d2d34")};

  font-size: 16px;
  padding: 5px 20px;
  opacity: 0.9;
  cursor: pointer;
  color: ${(props) => (props.active ? "white" : "#c1c1c1")};

  &:hover {
    opacity: 1;
  }
  @media only screen and (max-width: 991px) {
    font-size: 18px;
  }
`;

const Pagination = styled.div`
  display: flex;
  position: absolute;
  justify-content: around;
  align-items: center;
  z-index: 20;
  margin-bottom: -30px;
  min-width: 150px;
  background-color: black;
  bottom: 0;
  padding: 10px;
  padding: 5px 8px 3px 8px;
  font: "Compita";
  background-color: ${(props) => props.theme.color.boxBorder};
  font-size: ${(props) => props.theme.fontSizes.sm};
  color: ${(props) => (props.faq ? "#3d3d3d" : props.theme.color.gray)};
  border: 4px solid #383838;
  border-radius: 20px;
  display: flex;

  .pagination > li {
    background-color: none;
    border: none;
    border-radius: ${(props) => props.theme.borderRadius}px;
  }

  .pagination > li > a,
  .pagination > li > span {
    border-radius: ${(props) => props.theme.borderRadius}px;
    position: relative;
    float: left;
    text-decoration: none;
    width: 8px;
    height: 24px;
    margin: 0px 20px;
    color: #fff;
    margin-left: -2px;
  }

  .pagination > li.active > a {
    color: #fff;
    background-color: ${(props) => props.theme.color.blue};
  }

  /* Style the active class (and buttons on mouse-over) */
  .pagination > li > a:hover {
    background-color: ${(props) => props.theme.color.blue};
    opacity: 0.8;
  }

  .pagination > li:first-child > a,
  .pagination > li:first-child > span {
    margin-left: -18px;
    // padding: 0px;
  }
  .pagination > li:last-child > a,
  .pagination > li:last-child > span {
    // padding: 0px!important;
  }
`;

const Container = styled.div`
  width: 100%;
  margin: 5vh auto;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  font-size: 20px;
  color: white;
`;

export default Community;
