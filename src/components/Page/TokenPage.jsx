import React from "react";
import styled from "styled-components";
import { Footer } from "../Footer/Footer";
import TopBar from "../TopBar";
import { Nav } from "../TopBar/components/Nav";
import { usePlaylistConsumer } from "../../contexts/Playlist";
// import Background from '../../assets/img/community_background.jpg'

const Page = ({ children }) => {
  const { isOpen } = usePlaylistConsumer();
  return (
    <StyledPage>
      <BackgroundSection/>
      <Aesthetics>
        <Aesthetics1 />
        <Aesthetics2 />
        <Aesthetics3 />
        <Aesthetics4 />
      </Aesthetics>
      <TopBar />
      <NavContainer>
        <Nav />
      </NavContainer>
      <StyledMain>
        {children}
        <Push />
      </StyledMain>
      <Footer />
      {isOpen ? <Spacer/> : ''}
    </StyledPage>
  )
}

const Spacer = styled.div`
  height: 60px;
`
const BackgroundSection = styled.div`
  /* background-image: url(${Background}); */
  /* background-position: center; */
  top: 0;
  height: 100vh;
  width: 100vw;
  position: fixed;
  /* background-size: cover; */
`

const Aesthetics4 = styled.div`
width: 100%;
height: 20px;
position: relative;
background-color: ${props => props.theme.color.red};
`

const Aesthetics3 = styled.div`
width: 100%;
position: relative;
height: 20px;
background-color: ${props => props.theme.color.green};
`

const Aesthetics2 = styled.div`
width: 100%;
height: 20px;
position: relative;
background-color: ${props => props.theme.color.yellow};
`

const Aesthetics1 = styled.div`
width: 100%;
height: 20px;
background-color: ${props => props.theme.color.blue};
position: relative;
`

const Aesthetics = styled.div`
width: 40vw;
position: absolute;
right: 0;
transform: rotate(0.6turn) translate(-70px, 100px);
`

const NavContainer = styled.div`
  display: none;
  @media only screen and (max-width: 776px) {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    padding: 12px 0 0 0px;
  }
`

const StyledPage = styled.div`
  height: 100vh;
  margin: 0;
/* background-color: ${props => props.theme.bgColor}; */
`;

const StyledMain = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: calc(100% - 61px);
  /* overflow-y: hidden; */
  margin: 0 auto -120px auto;
  /* margin: auto; */
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1226px;
  @media only screen and (max-width: 1500px) {
    width: 976px;
  }
  @media only screen and (max-width: 1200px) {
    width: 726px;
  }
  @media only screen and (max-width: 776px) {
    width: 100%;
  }
`

const Push = styled.div`
  height: 120px;
  /* @media only screen and (max-width: 991px) {
    height: 170px;
 } */
`

export default Page;

