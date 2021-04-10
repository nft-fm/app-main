import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import isMobile from "../../utils/isMobile";
import BaseView from '../BaseView'
import axios from "axios";

const Profile = () => {
  const { account, connect } = useWallet()
  
  const [user, setUser] = useState(null);

  const fetchAccount = () => {
    axios.post(`api/user/get-account`,
      { address: account, }).then(res => {
        console.log("user", res.data);
        setUser(res.data);
      }).catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    fetchAccount()
  }, [])

  console.log("user", user)

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