import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'


const Container = ({ children, size = 'md' }) => {
  const { siteWidth } = useContext(ThemeContext)
  let width;
  switch (size) {
    case 'sm':
      width = siteWidth / 2
      break
    case 'md':
      width = siteWidth * 2 / 3
      break
    case 'lg':
    default:
      width = siteWidth
  }
  return (
    <StyledContainer width={width}>
      {children}
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  box-sizing: border-box;
  margin: 0 auto;
  width: ${props => props.width}px;
  max-width: 100%;
  /* padding: 0 ${props => props.theme.spacing[4]}px; */
`

export default Container