import React from 'react'
import styled from 'styled-components'

const ModalTitle = ({ children }) => (
  <StyledModalTitle>
    {children}
  </StyledModalTitle>
)

const StyledModalTitle = styled.div`
  align-items: center;
  color: ${props => props.theme.fontColor.white};
  display: flex;
  font-size: ${props => props.theme.fontSizes.lg};
  letter-spacing: 1px;
  justify-content: center;
`

export default ModalTitle