import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Input, { InputProps } from '../Input/input'
import { fetchStakingFee } from "../../web3/utils"

const TokenInput = ({
  max,
  symbol,
  onChange,
  onSelectMax,
  value,
}) => {
  const [feeRate, setFeeRate] = useState(0);

  useEffect(() => {
    fetchStakingFee((res) => {
      setFeeRate(res);
    })
  }, [])

  return (
    <StyledTokenInput>
      <TopContainer>
        <FeeRate>
          Staking Fee: {feeRate > 0 ? feeRate * 100 : "--"} %
      </FeeRate>
        <StyledMaxText>{max.toLocaleString({ maximumFractionDigits: 4 })} {symbol} Available</StyledMaxText>
      </TopContainer>
      <Input
        endAdornment={(
          <StyledTokenAdornmentWrapper>
            <StyledTokenSymbol>{symbol}</StyledTokenSymbol>
            <StyledSpacer />
            <div>
              <ModalButton onClick={onSelectMax} >
                Max
                </ModalButton>
            </div>
          </StyledTokenAdornmentWrapper>
        )}
        onChange={onChange}
        placeholder="0"
        value={value}
        type="number"
      />
    </StyledTokenInput>
  )
}

const FeeRate = styled.div`
display: flex;
align-items: center;
`

const TopContainer = styled.div`
display: flex;
justify-content: space-between;
`

const ModalButton = styled.button`
  align-items: center;
  border-radius: 2px;
  cursor: pointer;
  opacity: 0.8;
  display: flex;
  background-color: rgba(256, 256, 256, 0.05);
  height: 42px;
  padding: 3px 10px 0 10px;
  justify-content: center;
  outline: none;
  font-family: "Compita";
  font-size: 20px;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #003677;
  transition: all .1s linear;
  align-items: center;
  cursor: pointer;
  display: flex;
  background-color: rgba(256, 256, 256, 0.05);
  padding: 3px 10px 0 10px;
  justify-content: center;
  outline: none;
  font-family: "Compita";
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #222;
  box-shadow:5px 5px 0 #222;
  border: 4px solid #222;

  display: flex;
align-items: center;
  text-transform: uppercase;
  background: url('data:image/svg+xml;utf8,<svg width="100" height="100" transform="rotate(25)" opacity="0.15" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="%23250E17"><circle cx="25" cy="25" r="12.5" /><circle cx="75" cy="75" r="12.5" /><circle cx="75" cy="25" r="12.5" /><circle cx="25" cy="75" r="12.5" /></g></svg>'),
    #fff;
  background-size: 12px, 100%;
  position: relative;
  padding: 12px;

transition: all 0.2s ease-in-out;
  &:hover {
    color: #000;
    box-shadow:5px 5px 0 #000;
    border: 4px solid #000;
  }
`

const StyledTokenInput = styled.div`
font-size: 14px;
`

const StyledSpacer = styled.div`
  width: ${props => props.theme.spacing[3]}px;
`

const StyledTokenAdornmentWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
`

const StyledMaxText = styled.div`
  align-items: center;
  color: black;
  display: flex;
  font-size: 16px;
  height: 44px;
  justify-content: flex-end;
`

const StyledTokenSymbol = styled.span`
color: #0d87b3;
  font-size: 16px;
`

export default TokenInput