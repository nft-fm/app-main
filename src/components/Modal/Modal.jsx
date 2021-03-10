import React from 'react'
import styled from 'styled-components'

import Card from '../Card'
import Container from '../Container'

const Modal = ({ children }) => {
  return (
    <Container size="sm">
      <StyledModal>
        {children}
      </StyledModal>
    </Container>
  )
}

const StyledModal = styled.div`
border-radius: 8px;
  position: relative;
  width: 100%;
  height: 100%;
  max-width: calc(90vw - 32px);
  background-color: #eee;
  padding: 15px;
  font-family: "Comic Book";
  font-size: 16px;
  font-weight: normal;
      border: solid #000;
      border-width: 5px 3px 3px 5px !important;
      border-top-left-radius: 2% 84%;
      border-top-right-radius: 4% 202%;
      border-bottom-right-radius: 50% 10%;
      border-bottom-left-radius: 5% 95%;
      transform: rotate(.5deg);
`

export default Modal