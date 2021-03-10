import React from 'react'
import styled from 'styled-components'
import CardContent from '../CardContent'
import Container from '../Container'

const Modalmd = ({ children }) => {
  return (
    <Container size="lg">
      <StyledModal>
        <CardContent>
          {children}
        </CardContent>
      </StyledModal>
    </Container>
  )
}

const StyledModal = styled.div`
border-radius: 8px;
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #ccc;
  z-index: 100000;
`

export default Modalmd