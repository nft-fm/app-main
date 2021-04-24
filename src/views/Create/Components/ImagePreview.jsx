import React, { useCallback, useEffect, useState, useRef, Component } from "react";
import styled from "styled-components";
import image from "../../../assets/img/logos/fm_logo_1.png";

class ImagePreview extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.imageFile === nextProps.imageFile) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    return (
      <Image
        src={this.props.imageFile ? URL.createObjectURL(this.props.imageFile) : image}
        alt="image"
      />
    );
  }
}

const Image = styled.img`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 15px;
  border: 1px solid #707070;
  overflow: hidden;
  object-fit: cover;
`;

export default ImagePreview;
