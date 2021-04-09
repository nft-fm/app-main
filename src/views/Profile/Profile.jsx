import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import isMobile from "../../utils/isMobile";
import BaseView from '../BaseView'
import axios from "axios";

const Profile = () => {
  const { account, connect } = useWallet()
  
  return (
        <BaseView>
        <FormContainer>
        </FormContainer>
        </BaseView>
  )
}

const FormContainer = styled.div`
width: 60%;
background-color: #eaeaea;
`;

export default Profile