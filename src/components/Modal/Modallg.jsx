import React from 'react'
import styled from 'styled-components'
import CardContent from '../CardContent'
import Container from '../Container'

const Modallg = ({ children }) => {
  return (
    <Container size="lg">
      <StyledModal>
          {children}
      </StyledModal>
    </Container>
  )
}

const StyledModal = styled.div`
  border-radius: ${props => props.theme.borderRadius}px;
  position: relative;
  width: 100%;
  height: 70vh;
  background-color: ${props => props.theme.color.box};
  z-index: 100000;
`

export default Modallg