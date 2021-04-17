import React from 'react'
import styled from 'styled-components'
import Card from '../Card'
import CardContent from '../CardContent'
import Container from '../Container'

const Modalmd = ({ children }) => {
  return (
    <Container size="md">
      <StyledModal>
          {children}
      </StyledModal>
    </Container>
  )
}

const StyledModal = styled.div`
  position: relative;
  border-radius: ${props => props.theme.borderRadius}px;
  box-shadow: 24px 24px 48px -24px ${props => props.theme.color.grey[600]};
  width: 100%;
  height: 50vh;
  background-color: ${props => props.theme.boxColor};
  z-index: 100000;
`

export default Modalmd