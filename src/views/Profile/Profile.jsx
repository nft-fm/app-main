import React, { useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useWallet } from "use-wallet";
import isMobile from "../../utils/isMobile";
import BaseView from "../BaseView";
import axios from "axios";
import swal from "sweetalert2";

const Profile = () => {
  const { account, connect } = useWallet();
  return (
    <BaseView>
    <h1>Profile :D</h1>
    </BaseView>
  );
};

export default Profile;
