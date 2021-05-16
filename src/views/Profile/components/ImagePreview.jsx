import React, { Component } from "react";
import styled from "styled-components";
import recordPlayer from "../../../assets/img/record_player_blank.png";
import recordPlayerSpin from "../../../assets/img/record_player_spin.png";

class ImagePreview extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.imageFile === nextProps.imageFile) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    if (this.props.imageFile)
      return (
        <Image src={URL.createObjectURL(this.props.imageFile)} alt="image" />
      );
    return (
      <Container>
        <OuterImage src={recordPlayer} />
        <InnerImage src={recordPlayerSpin} />
      </Container>
    );
  }
}

const InnerImage = styled.img`
  /* width: 102%;
height: 102%;
margin-top: -0.5%;
margin-left: -0.5%; */
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;
  animation-name: spin;
  animation-duration: 5000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const OuterImage = styled.img`
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  border: 1px solid #707070;
  border-radius: ${(props) => props.theme.borderRadius}px;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  aspect-ratio: 1;
  border-radius: ${(props) => props.theme.borderRadius}px;
  border: 1px solid #707070;
  overflow: hidden;
  object-fit: cover;
`;

export default ImagePreview;
