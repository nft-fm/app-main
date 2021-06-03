import React from "react";
import styled from "styled-components";

import { ReactComponent as LinkedIn } from "../../../assets/img/icons/linkedin.svg";
const TeamMember = (props) => {
  console.log(props);
  return (
    <Container>
      <ImageWrapper>
        <TeamImage src={props.src} />
      </ImageWrapper>
      <TeamName>{props.name}</TeamName>
      <TeamRole>{props.role}</TeamRole>
      <LinkedInLink
        href={props.linkedin}
        target="_blank"
        rel="noopener noreferrer"
      >
        <LinkedInIcon />
      </LinkedInLink>
    </Container>
  );
};

const LinkedInLink = styled.a`
  border: solid 1px ${(props) => props.theme.color.gray};
  border-radius: 4px;
  background-color: ${(props) => props.theme.color.boxBorder};
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  transition: all 0.2s ease-in-out;
  &:hover {
    border: solid 1px ${(props) => props.theme.color.blue};
  }
`;

const LinkedInIcon = styled(LinkedIn)`
  /* margin-top: 1px; */
  width: 17px;
  height: 17px;
  & path {
    transition: all 0.2s ease-in-out;
    fill: white;
  }
`;
const TeamRole = styled.p`
  font-size: 20px;
  margin: 0 0 15px 0;
  color: #c1c1c1;
`;

const TeamName = styled.h3`
  font-size: 20px;
  margin: 10px 0 10px 0;
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  padding: 0 10px;
`;

const TeamImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.color.boxBorder};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 28px;
  color: white;
  align-items: center;
  margin: 20px;
  background-color: ${(props) => props.theme.color.box};
  border-radius: ${(props) => props.theme.borderRadius}px;
  border: 1px solid ${(props) => props.theme.color.boxBorder};
  padding: 10px;
  /* @media only screen and (min-width: 601px) and (max-width: 850px) {
    width: 40%;
  }
  @media only screen and (max-width: 991px) {
    min-width: 320px;
  } */
`;

export default TeamMember;
