import React from 'react'
import styled from 'styled-components'

const ModalActions = ({ children }) => {
  const l = React.Children.toArray(children).length
  return (
    <StyledModalActions>
      {React.Children.map(children, (child, i) => (
        <>
          <StyledModalAction>
            {child}
          </StyledModalAction>
          {i < l - 1 && <StyledSpacer />}
        </>
      ))}
    </StyledModalActions>
  )
}

const StyledModalActions = styled.div`
  align-items: center;
  background-color: ${props => props.theme.color.grey[100]}00;
  display: flex;
  height: 96px;
  margin-top: 10px;
  padding: 0 ${props => props.theme.spacing[4]}px;
`

const StyledModalAction = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`

const StyledSpacer = styled.div`
  width: ${props => props.theme.spacing[4]}px;
`

export default ModalActions