import React from "react";
import styled from "styled-components";

export const PoolContainer = (props) => {
    return (
    <Contents>
        <Border red={props.red}>
          {props.red ? (
            <RedBG>
                {props.children}
            </RedBG>
          ) : (
            <BlueBG>
                {props.children}
            </BlueBG>
          )}
        </Border>
    </Contents>
    )
}

const RedBG = styled.div`
  height: 208px;
  width: 508px;
  padding: 20px;
  border: 3px solid white;
  background-image: radial-gradient(circle, lightblue, #005c8b);
  background: url('data:image/svg+xml;utf8,<svg width="20" height="20" transform="rotate(25)" opacity="0.04" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="%23250E17"><circle cx="25" cy="25" r="12.5" /><circle cx="75" cy="75" r="12.5" /><circle cx="75" cy="25" r="12.5" /><circle cx="25" cy="75" r="12.5" /></g></svg>'),
    radial-gradient(circle, lightcoral, #a3000b);
  @media only screen and (max-width: 991px) {
    width: 55vw;
  }
`;

const BlueBG = styled.div`
  width: 508px;
  height: 208px;
  padding: 20px;
  border: 3px solid white;
  background-image: radial-gradient(circle, lightblue, #005c8b);
  background: url('data:image/svg+xml;utf8,<svg width="20" height="20" transform="rotate(25)" opacity="0.04" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="%23250E17"><circle cx="25" cy="25" r="12.5" /><circle cx="75" cy="75" r="12.5" /><circle cx="75" cy="25" r="12.5" /><circle cx="25" cy="75" r="12.5" /></g></svg>'),
    radial-gradient(circle, lightblue, #005c8b);
  @media only screen and (max-width: 991px) {
    width: 55vw;
  }
`;

const Border = styled.div`
  height: 254px;
  width: 560px;
  transform: skewX(-15deg);
  background: linear-gradient(
    to ${props => props.red ? "right" : "left"},
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0) 50%,
    rgba(256, 256, 256, 1) 90%,
    rgba(256, 256, 256, 1)
  );
  padding: 20px;
  @media only screen and (max-width: 991px) {
    width: 60vw;
    background: none
  }
`;

const Contents = styled.div`
  height: 300px;
  width: 600px;
  @media only screen and (max-width: 991px) {
    height: 294px;
    width: 65vw;
  }
`;