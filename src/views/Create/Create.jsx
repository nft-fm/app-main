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
    {user ? <CreateForm /> : <h1>Connect your wallet and set a username on the profile page to upload content!</h1>} 
    </BaseView>
  );
};

export default Create;
