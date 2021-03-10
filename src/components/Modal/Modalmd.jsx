import React from 'react'
import styled from 'styled-components'
import Card from '../Card'
import CardContent from '../CardContent'
import Container from '../Container'

const Modalmd = ({ children }) => {
  return (
    <Container size="md">
      <StyledModal>
          <Card>
            <CardContent>
              {children}
            </CardContent>
          </Card>
      </StyledModal>
    </Container>
  )
}

const StyledModal = styled.div`
  border-radius: 12px;
  box-shadow: 24px 24px 48px -24px ${props => props.theme.color.grey[600]};
  position: relative;
  z-index: 100000;

`

export default Modalmd