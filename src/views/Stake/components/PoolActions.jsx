import React from "react";
import styled from "styled-components";
import Button from "../../../components/Button";

export const PoolActions = (props) => {
    return (
        <BottomButtonContainer>
        {!props.allowance ? (
          <Button onClick={props.handleApprove}>
            {props.account ? "Approve" : "Connect"}
          </Button>
        ) : (
          <>
            <Button onClick={props.onPresentStake}>Stake</Button>
            <Button onClick={props.claim}>Claim</Button>
            <Button onClick={props.onPresentUnstake}>Unstake</Button>
          </>
        )}
      </BottomButtonContainer>
    )
}

const BottomButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 30px;
  transform: skewX(15deg);
`;
