import React from "react";
import styled from "styled-components";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const CarouselHolder = ({ artists }) => {
  const x = 100 / 3
  return (
    <Container>
      <h1>Carousel goes here</h1>
      <Wrapper>
        <Carousel
          // autoPlay
          infiniteLoop
          centerMode
          centerSlidePercentage={x}
        >
          {artists.map((artist) => {
            return (
              <ArtistHolder>
                <ProfilePic
                  src={artist.profilePic}
                  alt={`${artist.username}'s profile picture`}
                />
                <Legend>{artist.username}</Legend>
              </ArtistHolder>
            );
          })}
        </Carousel>
      </Wrapper>
    </Container>
  );
};

const Wrapper = styled.div`
  border: 2px solid ${(props) => props.theme.color.boxBorder};
`;

const Legend = styled.p`
  position: absolute;
  bottom: 0px;
  border: 2px solid ${(props) => props.theme.color.blue};
  border-radius: 10px;
  background: #000;
  color: #fff;
  padding: 10px;
  font-size: ${(props) => props.theme.fontSizes.xs};
  text-align: center;
  transition: opacity 0.35s ease-in-out;
`;

const ArtistHolder = styled.div``;
const ProfilePic = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  width: 100%;
`;

export default CarouselHolder;
