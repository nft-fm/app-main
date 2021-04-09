import React from "react";
import styled from "styled-components";
import { FooterNav } from "./components/FooterNav";

export const Footer = () => (
  <StyledFooter>
    {/* <StyledFooterBG> */}
      <FooterNav />
    {/* </StyledFooterBG> */}
  </StyledFooter>
);

const StyledFooter = styled.footer`
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
  background-color: black;
  padding: 10px 0 10px 0;

  border-top: 4px solid#7e2ce3;
`;

const StyledFooterBG = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
