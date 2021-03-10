import React from 'react'
import styled from 'styled-components'

const Input = ({
  endAdornment,
  onChange,
  placeholder,
  startAdornment,
  value,
  type,
}) => {
  return (
    <StyledInputWrapper>
      {!!startAdornment && startAdornment}
      <StyledInput type={type} placeholder={placeholder} value={value} onChange={onChange} />
      {!!endAdornment && endAdornment}
    </StyledInputWrapper>
  )
}

const StyledInputWrapper = styled.div`
  align-items: center;
  background-color: #eee;
  border-radius: ${props => props.theme.borderRadius}px;
  display: flex;
  height: 72px;
  padding: 0 ${props => props.theme.spacing[3]}px;
  border: solid black;
  border-width: 2px 2px 2px 2px;
  background-color: #fef9ed;
  border-top-left-radius: 18% 9%;
  border-top-right-radius: 95% 4%;
  border-bottom-right-radius: 16% 7%;
  border-bottom-left-radius: 95% 5%;
  color: black;
`

const StyledInput = styled.input`
  background: none;
  border: 0;
  color: black;
  font-size: 20px;
  flex: 1;
  height: 56px;
  max-width: 40vw;
  font-family: "Comic Book";
  margin: 0;
  padding: 0;
  text-align: right;
  outline: none;
`

export default Input