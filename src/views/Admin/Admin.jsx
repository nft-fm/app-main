import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import BaseView from "../../components/Page/BaseView";
import UpdateSnnipets from "./UpdateSnnipets";
import Swal from "sweetalert2";
const Admin = () => {
  return (
    <BaseView>
      <Landing>
        <Content>
          <UpdateSnnipets />
        </Content>
      </Landing>
    </BaseView>
  );
};

const Content = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  width: 80%;
`;
const Landing = styled.div`
  /* height: 450px; */
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Banner = styled.div`
  height: 50px;
`;

export default Admin;
