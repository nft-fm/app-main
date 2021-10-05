import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as IconBinance } from "../../assets/img/icons/binance-logo.svg";
import { ReactComponent as IconEth } from "../../assets/img/icons/ethereum.svg";
import loading from "../../assets/img/loading.gif";
import StakingModalHook from "../NftModalHook/StakingModalHook";
import { useAccountConsumer } from "../../contexts/Account";

const StakingCard = (props) => {
  const [artist, setArtist] = useState(null);

  const [imageLoaded, setImageLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hide = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (props.artist) setArtist(props.artist);
  }, [props.artist]);

  if (!artist) {
    return null;
  }

  return (
    <Container
      role="button"
      aria-pressed="false"
      tabindex="0"
      open={isModalOpen}
      isStakedArtist={artist.isUserStaked}
    >
      <StakingModalHook open={isModalOpen} hide={hide} artist={artist} />
      {imageLoaded ? null : <Image src={loading} alt="image" />}
      <Image
        src={artist.profilePic}
        style={imageLoaded ? {} : { display: "none" }}
        alt="image"
        onLoad={() => setImageLoaded(true)}
        onClick={() => setIsModalOpen(true)}
      />
      <Artist to={`/artist/${artist.suburl}`}>
        {artist.username.length > 20
          ? artist.username.slice(0, 20) + "..."
          : artist.username}
      </Artist>
    </Container>
  );
};

const Container = styled.div`
  color: ${(props) => props.theme.color.gray};
  padding: 12px;
  background-color: ${(props) => props.theme.color.box};
  border: 1px solid
    ${(props) =>
      props.isStakedArtist
        ? props.theme.color.blue
        : props.theme.color.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius}px;
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 200px;
  margin-bottom: 20px;
  position: relative;
  transition: all 0.1s ease-in-out;
  cursor: pointer;
  :focus {
    border: 1px solid white;
  }
`;

const Image = styled.img`
  cursor: pointer;
  width: 200px;
  height: 200px;
  border-radius: 12px;
  object-fit: cover;
  margin-bottom: 12px;
  border: 1px solid ${(props) => props.theme.color.boxBorder};
  background-color: #1e1e1e;
`;

const Artist = styled(NavLink)`
  font-size: ${(props) => props.theme.fontSizes.xxs}px;
  text-align: center;
  color: ${(props) => props.theme.gray};
  /* margin-bottom: 12px; */
  text-decoration: none;
  /* cursor: pointer; */
  &:hover {
    text-decoration: underline;
  }
`;

export default StakingCard;
