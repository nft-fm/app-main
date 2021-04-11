import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useWallet } from "use-wallet";
import isMobile from "../../utils/isMobile";
import BaseView from "../BaseView";
import axios from "axios";

const Profile = () => {
  const { account, connect } = useWallet();

  const [user, setUser] = useState(null);

  const fetchAccount = () => {
    axios
      .post(`api/user/get-account`, { address: account })
      .then((res) => {
        console.log("user", res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  console.log("user", user);

  const [nftData, setNftData] = useState({
    title: "",
    genre: "",
    producer: "",
    writer: "",
    numMinted: "",
    price: "",
    music: null,
    image: null,
  })

  const handleSubmit = (e) => {
    e.preventDefault();


  }
 
  return (
    <BaseView>
      <FormContainer onSubmit={(e) => handleSubmit(e)}>
        <input type="text" placeholder="Title" />
        <input type="text" placeholder="Genre" />
        <input type="text" placeholder="Producer" />
        <input type="text" placeholder="Writer" />
        <input type="number" placeholder="# Minted" />
        <input type="number" placeholder="Price (ETH)" />

        <label>Music file: 
        <input type="file" /></label>
        <label>
          Image: 
          <input type="file" />
        </label>
        <button type="submit">Create NFT</button>
      </FormContainer>
    </BaseView>
  );
};

const FormContainer = styled.div`
  width: 400px;
  background-color: #eaeaea;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export default Profile;
