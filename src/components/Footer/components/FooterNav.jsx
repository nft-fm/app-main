import React from "react";
import styled from "styled-components";
import discord from "../../../assets/img/social_discord.png";
import medium from "../../../assets/img/social_medium.png";
import telegram from "../../../assets/img/social_telegram.png";
import twitter from "../../../assets/img/social_twitter.png";
import { Col, Row } from "../../Grid";
import { FooterLink } from "./FooterLink";
export const FooterNav = () => {
  return (
    <Row>
      <Col size={1} style={{ alignItems: "center" }}>
        <Row>
          <FooterLink
            link="https://twitter.com/Blockduelers"
            icon={twitter}
            text="Twitter"
          />
          <FooterLink
            link="https://discord.com/invite/7ww5YaYfWC"
            icon={discord}
            text="Discord"
          />
          <FooterLink
            link="https://medium.com/@blockduelers"
            icon={medium}
            text="Medium"
          />
          <FooterLink
            link="https://t.me/BlockDuelers"
            icon={telegram}
            text="Telegram"
          />
        </Row>
      </Col>
    </Row>
  );
};

const ContactTop = styled.div`
  font-family: Bangers;
  font-size: 20px;
  line-height: 1;
  text-align: center;
  color: #fef9ed;
  margin-bottom: 10px;
`;

const ContactBottom = styled.div`
  font-family: Bangers;
  font-size: 30px;
  line-height: 0.67;
  text-align: center;
  color: #fef9ed;
`;

const StyledContact = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
