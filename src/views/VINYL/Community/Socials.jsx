import React from "react";
import styled from "styled-components";
import { ReactComponent as IconDiscord } from "../../../assets/img/icons/social_discord.svg";
import { ReactComponent as IconMedium } from "../../../assets/img/icons/social_medium.svg";
import { ReactComponent as IconTelegram } from "../../../assets/img/icons/social_telegram.svg";
import { ReactComponent as IconTwitter } from "../../../assets/img/icons/social_twitter.svg";

export const Socials = () => (
  <Landing>
    <SocialsBar>
    <IconContainer
          href="http://t.me/fanfare_fm"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Telegram />
          <IconText>Telegram</IconText>
        </IconContainer>
        <IconContainer
          href="https://fanfare-fm.medium.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Medium />
          <IconText>Medium</IconText>
        </IconContainer>
        <IconContainer
          href="https://twitter.com/fanfare_fm"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Twitter />
          <IconText>Twitter</IconText>
        </IconContainer>
        <IconContainer
          href="https://discord.gg/ejXAypqHD6"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Discord />
          <IconText>Discord</IconText>
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
  padding-top: 40px;
  color: white;
  font-size: ${(props) => props.theme.fontSizes.xs};
`;

const IconText = styled.span`
  margin: 1px 0 0 12px;
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
