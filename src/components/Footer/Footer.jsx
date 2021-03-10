import React from "react";
import styled from "styled-components";
import { FooterNav } from "./components/FooterNav";

export const Footer = () => (
  <StyledFooter>
    <StyledFooterBG>
      <FooterNav />
    </StyledFooterBG>
  </StyledFooter>
);

const StyledFooter = styled.footer`
  align-items: center;
  display: flex;
  justify-content: center;
  background-image: linear-gradient(
    to right,
    #b72100,
    #b72100 32%,
    #1a8eb2 69%,
    #1a8eb2
  );
`;

const StyledFooterBG = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px 0 30px 0;
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0) 50%
  );
  width: 100%;
  border: 2px solid black;
`;
