import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import axios from "axios";
import EditableProfile from "./EditableProfile";
import ProfileData from "./ProfileData"
import ProfileNFTs from "./ProfileNFTs";
import Community from "./Community";
import isMobile from "../../utils/isMobile";

const Profile = () => {
  const { account, connect } = useWallet()
  const [user, setUser] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);

  const fetchAccount = () => {
    axios.post(`api/gov/get-account`,
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

  if (!user) return (<div />);

  return (
    <Container>
      <EditableProfile user={user} fetchAccount={() => fetchAccount()} />
      <ProfileData />
      <ProfileNFTs />
      <Community />

    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default Profile