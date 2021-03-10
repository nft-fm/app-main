import React, { useCallback, useMemo, useState } from "react";
import BigNumber from "bignumber.js";
import Modal, { ModalProps } from "../../components/Modal";
import ModalActions from "../../components/ModalActions";
import ModalTitle from "../../components/ModalTitle";
import TokenInput from "../../components/TokenInput";
import styled from "styled-components";
import { getFullDisplayBalance } from "../../utils/formatBalance";

const DepositModal = ({ max, onConfirm, onDismiss, tokenName = "" }) => {
  const [val, setVal] = useState("");
  const [done, setDone] = useState(false);

  const fullBalance = useMemo(() => {
    // return getFullDisplayBalance(max)
    return max;
  }, [max]);

  const handleChange = useCallback(
    (e) => {
      setVal(e.currentTarget.value);
    },
    [setVal]
  );

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance);
  }, [fullBalance, setVal]);

  const confirm = useCallback(
    (value) => {
      if (!value) {
        return;
      }
      onConfirm(value);
      setDone(true);
    },
    [fullBalance, setVal]
  );

  return (
    <Modal>
      <ModalTitle text={`Unstake Your Tokens`} />
      {done ? (
        <DoneMessage>
          Your transaction has been submitted to the contract. Please approve it
          via your web3 compatable wallet, and monitor the transaction status.
        </DoneMessage>
      ) : (
        <TokenInput
          value={val}
          onSelectMax={handleSelectMax}
          onChange={handleChange}
          max={parseFloat(fullBalance).toFixed(2)}
          symbol={tokenName}
        />
      )}

      {done ? (
        <ModalActions>
          <ModalButton style={{ width: "60%", minWidth: "120px" }} onClick={onDismiss}>
            Close
          </ModalButton>
        </ModalActions>
      ) : (
        <ModalActions>
          <ModalButton style={{ width: "60%", minWidth: "120px" }} onClick={onDismiss}>
            {" "}
            Cancel
          </ModalButton>
          <ModalButton style={{ width: "60%", minWidth: "120px" }} onClick={() => confirm(val)}>
            Confirm
          </ModalButton>
        </ModalActions>
      )}
    </Modal>
  );
};

const DoneMessage = styled.div`
  height: 120px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  text-align: center;
`;

const ModalButton = styled.button`
  align-items: center;
  cursor: pointer;
  display: flex;
  background-color: rgba(256, 256, 256, 0.05);
  height: 50px;
  padding: 3px 10px 0 10px;
  justify-content: center;
  outline: none;
  font-family: "Bangers";
  font-size: 26px;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #444;
  box-shadow: 5px 5px 0 #333;
  border: 4px solid #333;
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
    box-shadow: 5px 5px 0 #000;
    border: 4px solid #000;
  }
`;

export default DepositModal;
