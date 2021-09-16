import React from "react";
import styled from "styled-components";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const CarouselHolder = ({ artists }) => {
  return (
    <Container>
      <h1>Carousel goes here</h1>
      <Carousel
        autoPlay
        infiniteLoop
        centerMode
        centerSlidePercentage={33.3}
      >
        {artists.map((artist) => {
          return (
            <div>
              <ProfilePic
                src={artist.profilePic}
                alt={`${artist.username}'s profile picture`}
              />
              <p className="legend">{artist.username}</p>
            </div>
          );
        })}
      </Carousel>
    </Container>
  );
};

const ProfilePic = styled.img`
  width: 200px;
  height: 200px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  width: 100%;
`;

export default CarouselHolder;
