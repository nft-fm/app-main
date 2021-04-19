import styled from "styled-components";

const mediaCollapse = {
  md: `
    @media only screen and (max-width: 991px) {
        display: none
    }
`,
  sm: `
    @media only screen and (max-width: 767px) {
        display: none
    }
`,
  xs: `
    @media only screen and (max-width: 480px) {
        display: none
    }
`,
};

const mediaExpand = {
  md: `
    @media only screen and (min-width: 991px) {
        display: none
    }
`,
  sm: `
    @media only screen and (min-width: 767px) {
        display: none
    }
`,
  xs: `
    @media only screen and (min-width: 480px) {
        display: none
    }
`,
};

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export const Col = styled.div`
  ${(props) => props.customStyle && props.customStyle};
  flex: ${(props) => props.size};
  flex-direction: column;
  ${(props) => props.collapse && mediaCollapse[props.collapse]}
  ${(props) => props.expand && mediaExpand[props.expand]}
`;
