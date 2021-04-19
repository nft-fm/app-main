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

export default BaseView
