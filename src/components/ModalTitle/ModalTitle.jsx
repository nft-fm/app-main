import React from 'react'
import styled from 'styled-components'

const ModalTitle = ({ text }) => (
  <StyledModalTitle>
    {text}
  </StyledModalTitle>
)

const StyledModalTitle = styled.div`
  align-items: center;
  color: black;
  font-family: "Compita";
  display: flex;
  font-size: 40px;
  letter-spacing: 1px;
  height: ${props => props.theme.topBarSize}px;
  justify-content: center;
  margin-top: ${props => -props.theme.spacing[2]}px;
`

export default ModalTitle