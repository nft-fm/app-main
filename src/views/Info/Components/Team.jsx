import React from "react";
import { Switch } from "react-router-dom";
import styled from "styled-components";
import logo from "../../../assets/img/logos/logo.png";
import jackson from "../../../assets/team_headshots/jackson.jpeg";
import quinn from "../../../assets/team_headshots/quinn.png";
import james from "../../../assets/team_headshots/james.jpeg";
import ben from "../../../assets/team_headshots/ben.jpg";
import TeamMember from "./TeamMember";

const Team = () => {
  return (
    <>
      <Title>Meet the Team</Title>

      <TeamSection>
        <TeamMember
          src={jackson}
          name="Jackson"
          role="CEO, Lead Developer"
          linkedin="https://www.linkedin.com/in/jacksonfelty/"
        />
        <TeamMember
          src={quinn}
          name="Quinn"
          role="CTO, Developer"
          linkedin="https://www.linkedin.com/in/quinn-labrie-300411a9/"
        />
        {/* <TeamMember src={james} name="James" role="CFO" />
        <TeamMember src={ben} name="Benjamin" role="Designer" /> */}
      </TeamSection>
    </>
  );
};

const Title = styled.h1`
margin-top: 80px;
color: white;
`
const TeamSection = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  margin-bottom: 30px;
  @media only screen and (max-width: 776px) {
    flex-direction: column;
    /* justify-content: space-evenly; */
  }
`;

export default Team;
