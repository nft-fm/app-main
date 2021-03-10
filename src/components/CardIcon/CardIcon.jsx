import React from 'react'
import styled from 'styled-components'

const CardIcon = ({ children }) => (
  <StyledCardIcon>
    {children}
  </StyledCardIcon>
)

const StyledCardIcon = styled.div`
  font-size: 60px;
  height: 80px;
  width: 80px;
  border-radius: 40px;
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0px auto 16px;
`

export default CardIcon