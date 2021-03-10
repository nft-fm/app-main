import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { useWallet } from "use-wallet";
import Button from "../../../components/Button";
import CardIcon from "../../../components/CardIcon";
import { AddIcon, RemoveIcon } from "../../../components/icons";
import IconButton from "../../../components/IconButton";
import Label from "../../../components/Label";
import Value from "../../../components/Value";
import useModal from "../../../hooks/useModal";
import DepositModal from "./DepositModal";
import WithdrawModal from "./WithdrawModal";

const Stake = ({ poolContract, tokenContract, tokenName }) => {
  const { account, connect } = useWallet();

  const [requestedApproval, setRequestedApproval] = useState(false);

  const [onPresentDeposit] = useModal(
    <DepositModal max={null} onConfirm={null} tokenName={tokenName} />
  );

  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={null} onConfirm={null} tokenName={tokenName} />
  );

  return (
    <StyledCardContentInner>
      <StyledCardHeader>
        <CardIcon>🌱</CardIcon>
        <Value value={null} />
        <Label text={`ETH-WAR LP Staked`} />
      </StyledCardHeader>
      <StyledCardActions>
        {!true ? (
          <Button
            size="sm"
            disabled={account ? false : true}
            onClick={null}
            text={`Approve ${null}`}
          />
        ) : (
          <>
            <IconButton onClick={onPresentWithdraw}>
              <RemoveIcon />
            </IconButton>
            <StyledActionSpacer />
            <IconButton onClick={onPresentDeposit}>
              <AddIcon />
            </IconButton>
          </>
        )}
      </StyledCardActions>
    </StyledCardContentInner>
  );
};

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[6]}px;
  width: 100%;
`;

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export default Stake;
