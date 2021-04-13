import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useWallet } from "use-wallet";
import isMobile from "../../utils/isMobile";
import BaseView from "../BaseView";
import axios from "axios";
import swal from "sweetalert2"

const Profile = () => {
  const { account, connect } = useWallet();

  const [user, setUser] = useState(null);

  // const fetchAccount = () => {
  //   axios
  //     .post(`api/user/get-account`, { address: account })
  //     .then((res) => {
  //       console.log("user", res.data);
  //       setUser(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // useEffect(() => {
  //   fetchAccount();
  // }, []);

  const [nftData, setNftData] = useState({
    artist: account,
    title: "",
    genre: "",
    producer: "",
    writer: "",
    numMinted: "",
    price: "",
    music: null,
    image: null,
  });
  const getExtension = (filename) => {
    var parts = filename.split('.');
    return parts[parts.length - 1];
  }

  function isImage(filename) {
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
      case 'jpg':
      case 'gif':
      case 'bmp':
      case 'png':
        //etc
        return true;
    }
    return false;
  }

  useEffect(() => {
    setNftData({ ...nftData, artist: account })
  }, [account])

  const updateState = (e) => {
    setNftData({ ...nftData, [e.target.name]: e.target.value });
  };

  //TODO entry validation
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!account) {
      swal.fire("unlock your wallet in order to upload")
      return
    }
    // console.log("nftData: ", nftData);
    axios.post('/api/nft-type/new', nftData)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  };

  return (
    <BaseView>
      <FormContainer onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Title"
          name="title"
          onChange={(e) => updateState(e)}
        />
        <input
          type="text"
          placeholder="Genre"
          name="genre"
          onChange={(e) => updateState(e)}

        />
        <input
          type="text"
          placeholder="Producer"
          name="producer"
          onChange={(e) => updateState(e)}
        />
        <input
          type="text"
          placeholder="Writer"
          name="writer"
          onChange={(e) => updateState(e)}
        />
        <input
          type="number"
          placeholder="# Minted"
          name="numMinted"
          onChange={(e) => updateState(e)}
        />
        <input
          type="number"
          step="0.01"
          placeholder="Price (ETH)"
          name="price"
          onChange={(e) => updateState(e)}
        />
        <label>
          Music file:
          <input
            type="file"
            name="music"
            accept=".mp3"
            onChange={(e) => updateState(e)}
          />
        </label>
        <label>
          Image:
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => updateState(e)}
          />
        </label>
        <button type="submit">Create NFT</button>
      </FormContainer>
    </BaseView>
  );
};

const FormContainer = styled.form`
  width: 400px;
  background-color: #eaeaea;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export default Profile;
