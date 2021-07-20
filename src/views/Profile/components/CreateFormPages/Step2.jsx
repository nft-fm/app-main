import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from "styled-components";
import UploadAudio from "../UploadAudio";
import axios from "axios";
import { useAccountConsumer } from "../../../../contexts/Account";

const Step2 = ({
  // hiddenImageInput,
  // handleImageChange,
  // imageFile,
  // handleImage,
  audioFile,
  setAudioFile,
  nftData,
  setNftData,
  isAudioUploaded,
  setIsAudioUploaded,
  audioUploadError,
  setAudioUploadError,
  setIsImageUploaded,
  setImageUploadError
}) => {
  const [imageFile, setImageFile] = useState(null);
  const { account } = useAccountConsumer();

  const hiddenImageInput = useRef(null);
  const handleImage = () => {
    setIsImageUploaded(null);
    setImageFile(null);
    hiddenImageInput.current.click();
  };

  const handleImageChange = (e) => {
    if (!e.target.files[0]) {
      return;
    }
    setImageFile(e.target.files[0]);
    setNftData({
      ...nftData,
      imageUrl:
        "https://nftfm-images.s3-us-west-1.amazonaws.com/" +
        account +
        "/" +
        e.target.files[0].name,
    });
  };

  useEffect(() => {
    if (imageFile) {
      const imageFormData = new FormData();
      imageFormData.append("artist", account);
      imageFormData.append("imageFile", imageFile);

      axios
        .post("/api/nft-type/uploadImageS3", imageFormData)
        .then((res) => {
          if (res.status === 200) {
            setIsImageUploaded(true);
          }
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          setImageUploadError(true);
        });
    }
  }, [imageFile]);
  return (
    <>
      <h2 style={{textAlign: "left"}}>Visual</h2>
      <UploadContainer>
        <p>PNG, JPG, GIF, MP4</p>
        <ChooseFile onClick={() => handleImage()} type="button">
          Choose File
        </ChooseFile>
        <StyledInput
          type="file"
          accept=".jpg,.jpeg,.png,.gif"
          ref={hiddenImageInput}
          onChange={handleImageChange}
          style={{ display: "none" }}
          defaultValue={imageFile}
        />
      </UploadContainer>

      <h2 style={{paddingTop: "20px", textAlign: "left"}}>Audio</h2>
      <UploadContainer>
        <p>MP3, FLAC</p>
        <UploadAudio
          audioFile={audioFile}
          setAudioFile={setAudioFile}
          nftData={nftData}
          setNftData={setNftData}
          isAudioUploaded={isAudioUploaded}
          setIsAudioUploaded={setIsAudioUploaded}
          audioUploadError={audioUploadError}
          setAudioUploadError={setAudioUploadError}
        />
      </UploadContainer>
    </>
  )
}


const StyledInput = styled.input`
  color: white;
  background-color: #090909;
  border: none;
  outline: none;
  height: 30px;
  font-size: 16px;
  border-bottom: 1px solid ${(props) => props.theme.color.boxBorder};
  ${props => props.noborder && css`
    border: none;
  `}
  @media only screen and (max-width: 776px) {
    background-color: transparent;
    height: 30px;
  }
`;

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  background-image: linear-gradient(to right, #262626, #383838);
  width: 220px;
  height: 120px;
  border-radius: 16px;
  margin: 20px;
  p {
    padding: 0;
    margin: 0;
    color: white;
  }
`

const ChooseFile = styled.button`
  display: flex;
  justify-content: center;
  border: solid 1.5px #181818;
  align-items: center;
  text-align: center;
  border-radius: 8px;
  width: 120px;
  height: 40px;
  font-family: Compita;
  font-size: 18px;
  text-align: center;
  color: #ffffff;
  background-image: linear-gradient(to right, #262626, #383838);
  &:hover {
    cursor: pointer;
    background-image: linear-gradient(to right, #333333, #8b8b8b);
  }
`

export default Step2;