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

  if (!user) return (<div />);

  return (

    <ProfileContent>
    <Flavor>
      Edition #{user.idNum}
    </Flavor>
    <Title>Profile</Title>
    <Container>
      <EditableProfile user={user} fetchAccount={() => fetchAccount()} />
      <ProfileData user={user} />
      <ProfileNFTs />
      <Community />

    </Container>
  </ProfileContent>
  )
}

const ProfileContent = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  width: 1156px;
  padding: 20px;
  background-color: white;
  border-radius: 2px 2px 0 0;
  border: 2px solid black;
  border-bottom: none;
  `

const Flavor = styled.div`
position: absolute;
top: 15px;
right: 25px;
font-family: "Bangers";
font-size: 20px;
`

const Title = styled.div`
  font-family: "Bangers";
  font-size: 80px;
  letter-spacing: 5px;
  margin-bottom: 10px;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: 4px;
  color: black;
`

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default Profile