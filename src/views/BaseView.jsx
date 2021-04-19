import React from "react";
import styled from "styled-components";
import Page from "../components/Page";
import isMobile from "../utils/isMobile";

export const BaseView = (props) => {
  return (
    <StyledCanvas>
      <Page>{props.children}</Page>
    </StyledCanvas>
  );
};

const StyledCanvas = styled.div`
  height: 100%;
`;

const ContentContainer = styled.div`
  width: 100%;
  text-align: center;
`;

export default BaseView

// const BigLogoContainer = !isMobile()
//   ? styled.div`
//       position: fixed;
//       width: 100%;
//       height: auto;
//       top: 0vh;
//       display: flex;
//       align-items: center;
//     `
//   : styled.div`
//       position: fixed;
//       height: 100vh;
//       left: -40vw;
//       display: flex;
//       align-items: center;
//       top: 20vh;
//     `;

// const BigLogo = styled.img`
//   width: 100%;
//   height: auto;
//   opacity: 0.2;
// `;

// const BackgroundOverlay = styled.div`
//   position: fixed;
//   width: 100vw;
//   height: 100vh;
//   top: 0;
//   background-image: linear-gradient(
//     55deg,
//     #5092b1,
//     #79b9d6 50%,
//     #4065df 95%,
//     #4065df /* #FAB2FF, #FAB2FF 25%, #1904E5 95%,  #1904E5 */
//   );
// `;