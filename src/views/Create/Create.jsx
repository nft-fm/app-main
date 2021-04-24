import React, { useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useWallet } from "use-wallet";
import axios from "axios";
import swal from "sweetalert2";

import BaseView from "../BaseView";
import { useAccountConsumer } from "../../contexts/Account";

import CreateForm from "./Components/CreateForm";

const Create = ({ open, hide, setNewNft }) => {
  const { account, user, setUser, usdPerEth } = useAccountConsumer();
  return (
    <BaseView>
      <CreateForm />
    </BaseView>
  );
};

export default Create;
