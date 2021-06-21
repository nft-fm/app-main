import React from "react";
import styled from "styled-components";
import { ReactComponent as IconDiscord } from "../../../../assets/img/icons/social_discord.svg";
import { ReactComponent as IconMedium } from "../../../../assets/img/icons/social_medium.svg";
import { ReactComponent as IconTelegram } from "../../../../assets/img/icons/social_telegram.svg";
import { ReactComponent as IconTwitter } from "../../../../assets/img/icons/social_twitter.svg";

const VinylLinks = () => (
  <Landing>
    <SocialsBar>
      <IconContainer
        href="https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0xc17b6c92bb728259ca2f76c88a4a48ac077587f7&use=V2"
        target="_blank"
        rel="noopener noreferrer"
      >
        {/* <Telegram /> */}
        <IconText>Purchase</IconText>
      </IconContainer>
      <IconContainer
        href="https://drive.google.com/file/d/1i24DtdT2pIxu5YgIvud0bGa6zxl888GJ/view?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
      >
        {/* <Medium /> */}
        <IconText>Litepaper</IconText>
      </IconContainer>
      <IconContainer
        href="https://www.dextools.io/app/uniswap/pair-explorer/0xc25500b8b3d21a5b4cc362ecbabf69e665cb38e0"
        target="_blank"
        rel="noopener noreferrer"
      >
        {/* <Twitter /> */}
        <IconText>Chart</IconText>
      </IconContainer>
      <IconContainer
        href="https://t.me/joinchat/q6_q25NWr99kOGUx"
        target="_blank"
        rel="noopener noreferrer"
      >
        {/* <Discord /> */}
        <IconText>Telegram</IconText>
      </IconContainer>
    </SocialsBar>
  </Landing>
);

const Landing = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  /* padding-top: 40px; */
  color: white;
  font-size: ${(props) => props.theme.fontSizes.xs};
`;

const IconText = styled.span`
  /* margin: 1px 0 0 12px; */
  font-weight: 600;
  letter-spacing: 1px;
`;

const SocialsBar = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
  @media only screen and (max-width: 776px) {
    margin-top: 30px;
    margin-bottom: 30px;
    flex-direction: column;
    width: 100%;
    align-items: center;
    & > * {
      margin-bottom: 16px;
    }
  }
`;

const IconContainer = styled.a`
  text-decoration: none;
  margin: 0 8px;
  align-items: center;
  border: solid #707070;
  height: 28px;
  width: 98px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid 1px ${(props) => props.theme.color.boxBorder};
  border-radius: 18px;
  background-color: ${(props) => props.theme.color.box};
  display: flex;
  flex-direction: row;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: ${(props) => props.theme.color.boxBorder};
    border: solid 1px #383838;
  }
  @media only screen and (max-width: 776px) {
    margin: 8px;
  }
`;

const Discord = styled(IconDiscord)`
  margin-top: 1px;
  width: 19px;
  height: 19px;
  & path {
    transition: all 0.2s ease-in-out;
    fill: ${(props) => props.theme.color.white};
  }
`;

const Twitter = styled(IconTwitter)`
  margin-top: 1px;
  width: 17px;
  height: 17px;
  & path {
    transition: all 0.2s ease-in-out;
    fill: ${(props) => props.theme.color.white};
  }
`;

const Medium = styled(IconMedium)`
  margin-top: 1px;

  width: 21px;
  height: 21px;
  & path {
    transition: all 0.2s ease-in-out;
    fill: ${(props) => props.theme.color.white};
  }
`;

const Telegram = styled(IconTelegram)`
  width: 19px;
  height: 19px;
  margin-top: 1px;
  & path {
    transition: all 0.2s ease-in-out;
    fill: ${(props) => props.theme.color.white};
  }
`;

export default VinylLinks;