import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { BaseView } from "../../../components/Page/BaseView";
import styled from "styled-components";
import swal from "sweetalert2";
import AddNewPoll from './AddNewPoll'
import useModal from "../../../hooks/useModal"
import { useAccountConsumer } from "../../../contexts/Account";

import Error404 from "../../404"
const GovPolls = () => {
  const { user, isAdmin } = useAccountConsumer();

  useEffect(() => {
  }, [])

  if (!isAdmin) {
    return <Error404 />
  }

  return (
    <BaseView>
      <Container>
        <ButtonGroup>
          <StyledButton>View All</StyledButton>
          <StyledButton>View Active</StyledButton>
          <StyledButton>View Inactive</StyledButton>
        </ButtonGroup>
        <Spacer />
        <AddNewPoll />
        {/* <FAQ /> */}
      </Container>
    </BaseView>
  )
}

const Spacer = styled.div`
  height: 20px;
`

const ButtonGroup = styled.div`
  display:flex;
  width: 80%;
  flex-direction: row;
`

const StyledButton = styled.button`
  width: 45%;
  -webkit-box-align: center;
  align-items: center;
  border: 2px solid rgb(255, 183, 0);
  border-radius: 2px;
  cursor: pointer;
  opacity: 1;
  display: flex;
  background-color: black;
  height: 38px;
  -webkit-box-pack: center;
  justify-content: center;
  outline: none;
  padding-top: 3px;
  font-family: "Compita";
  font-size: 20px;
  letter-spacing: 1px;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  transition: all 0.1s linear 0s;
  color: white;
`

const Container = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10vh;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  font-size: 20px;
  color: white;
`;

export default GovPolls