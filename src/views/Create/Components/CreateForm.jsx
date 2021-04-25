import React, { useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useWallet } from "use-wallet";
import axios from "axios";
import swal from "sweetalert2";
import x from "../../../assets/img/icons/x.svg";
import image from "../../../assets/img/logos/fm_logo_1.png";
import upload_icon from "../../../assets/img/profile_page_assets/upload_icon.svg";
// import eth_icon from "../../../assets/img/profile_page_assets/eth_icon.svg";
// import eth_icon_white from "../../../assets/img/profile_page_assets/eth_icon_white.svg";
// import usd_icon from "../../../assets/img/profile_page_assets/usd_icon.svg";
import { ReactComponent as usd_icon } from "../../../assets/img/icons/dollar.svg";
import { ReactComponent as eth_icon } from "../../../assets/img/icons/ethereum.svg";
import { ReactComponent as arrow } from "../../../assets/img/icons/arrow_cropped.svg";
// import { ReactComponent as arrow_down } from "../../../assets/img/icons/arrow_down.svg";

import ImagePreview from "./ImagePreview";

import { useAccountConsumer } from "../../../contexts/Account";
import {mintNFT} from "../../../web3/utils";

const initialNftState = {
  artist: "",
  address: "",
  isDraft: true,
  genre: "",
  numMinted: "",
  price: "",
  producer: "",
  title: "",
  writer: "",
  imageUrl: "",
  audioUrl: "",
};

const CreateForm = ({ setNewNft }) => {
  const { account, user, setUser, usdPerEth } = useAccountConsumer();
  const [isLoading, setIsLoading] = useState(false);
  const [nftData, setNftData] = useState(initialNftState);
  const [audioFile, setAudioFile] = useState(null);
  const [audioUploadError, setAudioUploadError] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [curr, setCurr] = useState("ETH");
  const [isAudioUploaded, setIsAudioUploaded] = useState(false);
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  useEffect(() => {
    user && user.username && setNftData({ ...nftData, artist: user.username });
  }, [user]);

  useEffect(() => {
    setNftData({ ...nftData, address: account });
    axios
      .post("/api/nft-type/get-NFT", { account: account })
      .then((res) => setNftData(res.data));
  }, [account]);

  useEffect(() => {
    if (audioFile) {
      const audioFormData = new FormData();
      audioFormData.append("artist", account);
      audioFormData.append("audioFile", audioFile);

      axios
        .post("api/nft-type/uploadAudioS3", audioFormData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setIsAudioUploaded(true);
          }
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          setAudioUploadError(true);
        });
    }
  }, [audioFile]);

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

  //this is all to handle the image and audio
  const hiddenAudioInput = useRef(null);
  const handleAudio = (e) => {
    hiddenAudioInput.current.click();
  };
  const handleAudioChange = (e) => {
    if (!e.target.files[0]) {
      return;
    }
    setAudioFile(e.target.files[0]);
    setNftData({
      ...nftData,
      audioUrl:
        "https://nftfm-music.s3-us-west-1.amazonaws.com/" +
        account +
        "/" +
        e.target.files[0].name,
    });
  };

  const hiddenImageInput = useRef(null);
  const handleImage = () => {
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


  const isComplete = () => {
    if (nftData.title === "" ||
    nftData.genre === "" ||
    nftData.producer === "" ||
    nftData.writer === "" ||
    nftData.numMinted === 0 ||
    nftData.numMinted === "0" ||
    nftData.numMinted === "" ||
    nftData.price === 0 ||
    nftData.price === "0" ||
    nftData.price === "" ||
    !isAudioUploaded ||
    !isImageUploaded) {
      return false;
    } else {
      return true;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isComplete()) {
      return;
    }
    let newNftData = nftData;
    if (curr === "USD") {
      newNftData = {
        ...nftData,
        price: (nftData.price / usdPerEth).toFixed(4)
      };
    }
    if (newNftData.artist === "") {
      newNftData = {
        ...nftData,
        artist: user.username,
      };
    }
    console.log('handleSubmit', newNftData)

    //Input validation below here
    if (nftData.numMinted === "0" || nftData.numMinted === 0) {
      console.log("e")
      swal.fire({
        title: "Created amount cannot be 0.",
        timer: 5000,
        icon: "error",
      });
      return;
    }
    if (nftData.price === "0" || nftData.price === 0) {
      console.log("re")
      swal.fire({
        title: "Created amount cannot be 0.",
        timer: 5000,
        icon: "error",
      });
      return;
    }
    if (!imageFile || !audioFile) {
      console.log("ere")
      swal.fire({
        title: "Cannot submit without audio and image files.",
        timer: 5000,
        icon: "error",
      });
      return;
    }
    if (!isAudioUploaded || !isImageUploaded) {
      console.log("here")
      swal.fire({
        title: "Please wait for your audio and image files to be processed.",
        timer: 5000,
        icon: "error",
      });
      return;
    }
    console.log()

    setIsLoading(true);
    //run these two, store the returns in the nftData state object
    console.log("here")
    if (!audioUploadError && !imageUploadError) {
      // after nftData has both audio and image references, run this route
      axios
        .post("/api/nft-type/finalize", newNftData)
        .then((res) => {
          console.log("finalize res", res);

          if (res.status === 200) {
            setNftData(initialNftState);
            setImageFile(null);
            setAudioFile(null);
            mintNFT(res.data, () => console.log("pending..."), () => console.log("final"));
            console.log("MINT")
            /*swal.fire({
              title: "Success!",
              background: `#000`,
              boxShadow: `24px 24px 48px -24px #131313`,
              text: "Nft successfully created!",
            });
            setNewNft(true);*/
          } else {
            swal.fire({
              title: "Error",
              background: `#000`,
              boxShadow: `24px 24px 48px -24px #131313`,
              text: "Nft creation failed, please try again.",
            });
          }
        })
        .catch((err) => console.log(err));
    } else {
      swal.fire({
        title: "Error uploading audio or image.",
        text: "Please refresh the page and try again. If the issues persists, contact NFT FM.",
        icon: "error",
      });
    }

    setIsLoading(false);
  };

  const updateState = (e) => {
    if (e.target.name === "price" || e.target.name === "numMinted") {
      let string = e.target.value.toString();
      if (string.length > 6) {
        return;
      }
    }
    // if (e.target.name === "price") {
    //   curr === "ETH"
    //     ? setNftData({ ...nftData, [e.target.name]: e.target.value })
    //     : setNftData({
    //         ...nftData,
    //         [e.target.name]: (e.target.value / usdPerEth).toFixed(4),
    //       });
    // }
    setNftData({ ...nftData, [e.target.name]: e.target.value });
  };

  const stopProp = (e) => {
    e.stopPropagation();
  };
  const hideCreate = (e) => {
    setNftData(initialNftState);
    setImageFile(null);
    setAudioFile(null);
  };


  return (
    <FormContainer onSubmit={(e) => handleSubmit(e)}>
      <Header>
        <span>Create NFTs</span>
      </Header>
      <Main>
        <Files>
          <ImagePreview imageFile={imageFile} />
        </Files>
        <Inputs autoComplete="off">
          <TopInputs>
            <MediaButtons>
              <MediaButton onClick={() => handleAudio()} type="button">
                <span>Upload audio</span>
                <span>.mp3, .flac</span>
                <img src={upload_icon} alt="upload-file-icon" />
              </MediaButton>
              <StyledInput
                type="file"
                accept=".mp3,.flac"
                ref={hiddenAudioInput}
                onChange={handleAudioChange}
                style={{ display: "none" }}
                defaultValue={audioFile}
                // required
              />
              <MediaButton onClick={() => handleImage()} type="button">
                <span>Upload image</span>
                <span>.png, .jpeg, .gif</span>
                <img src={upload_icon} alt="upload-file-icon" />
              </MediaButton>
              <StyledInput
                type="file"
                accept=".jpg,.jpeg,.png,.gif"
                ref={hiddenImageInput}
                onChange={handleImageChange}
                style={{ display: "none" }}
                defaultValue={imageFile}
                // required
              />
            </MediaButtons>
            <FileNames>
              <span>
                {audioFile?.name.length > 10
                  ? audioFile?.name.substring(0, 10) +
                    "-" +
                    audioFile?.name.substring(audioFile.name.lastIndexOf("."))
                  : audioFile?.name}
              </span>
              <span>
                {imageFile?.name.length > 10
                  ? imageFile?.name.substring(0, 10) +
                    "-" +
                    imageFile?.name.substring(imageFile.name.lastIndexOf("."))
                  : imageFile?.name}
              </span>
            </FileNames>
          </TopInputs>
          <MiddleInputs>
            <StyledInput
              type="text"
              placeholder="Title"
              name="title"
              onChange={(e) => updateState(e)}
              defaultValue={nftData.title}
              required
            />
            <StyledInput
              type="text"
              placeholder="Genre"
              name="genre"
              onChange={(e) => updateState(e)}
              defaultValue={nftData.genre}
              required
            />
            <StyledInput
              type="text"
              placeholder="Producer"
              name="producer"
              onChange={(e) => updateState(e)}
              defaultValue={nftData.producer}
              required
            />
            <StyledInput
              type="text"
              placeholder="Writer"
              name="writer"
              onChange={(e) => updateState(e)}
              defaultValue={nftData.writer}
              required
            />
          </MiddleInputs>
          <BottomInput>
            <StyledDivInput1>
              <label>NFT Created</label>
              <StyledNumberInput
                className="mint"
                type="number"
                name="numMinted"
                onChange={(e) => updateState(e)}
                min="0"
                value={nftData.numMinted}
                required
              />
              <Spinner>
                <ArrowUp
                  onClick={() =>
                    setNftData({
                      ...nftData,
                      numMinted: Number(nftData.numMinted) + 1,
                    })
                  }
                />
                <ArrowDown
                  onClick={() =>
                    nftData.numMinted > 0 &&
                    setNftData({
                      ...nftData,
                      numMinted: Number(nftData.numMinted) - 1,
                    })
                  }
                />
              </Spinner>
            </StyledDivInput1>
            <StyledDivInput2>
              <label>
                NFT Price /ea &nbsp;
                <EthIcon onClick={() => setCurr("ETH")} />{" "}
                <UsdIcon onClick={() => setCurr("USD")} />
              </label>
              <StyledNumberInput
                className="cost"
                type="number"
                name="price"
                onChange={(e) => updateState(e)}
                min="0"
                value={nftData.price}
                required
              />
              <Spinner>
                <ArrowUp
                  onClick={() =>
                    setNftData({
                      ...nftData,
                      price: (Number(nftData.price) + 0.01).toFixed(4),
                    })
                  }
                />
                <ArrowDown
                  onClick={() =>
                    nftData.price > 0 &&
                    setNftData({
                      ...nftData,
                      price: (Number(nftData.price) - 0.01).toFixed(4),
                    })
                  }
                />
              </Spinner>
              <span>/{curr}</span>
            </StyledDivInput2>
          </BottomInput>
        </Inputs>
      </Main>
      <SubmitButton type="submit" style={!isComplete() ? {filter: "saturate(.2)", cursor: "not-allowed"} : null}>Approve and Create</SubmitButton>
    </FormContainer>
  );
};

const EthIcon = styled(eth_icon)`
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  right: -15px;
  /* transition: all 0.2s linear; */
  & path {
    fill: ${(props) => props.theme.color.blue};
  }

  &:hover {
    & path {
      filter: contrast(2);
    }
  }
`;

const UsdIcon = styled(usd_icon)`
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  right: -35px;
  /* transition: all 0.2s linear; */
  & path {
    fill: ${(props) => props.theme.color.gray};
  }

  &:hover {
    & path {
      filter: contrast(0.5);
    }
  }
`;

const Spinner = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 15px;
  right: 5px;
`;

const ArrowUp = styled(arrow)`
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  -o-transform: rotate(180deg);
  transform: rotate(180deg);
  /* margin-bottom: -5px; */
  width: 10px;
  height: 10px;
  cursor: pointer;
  /* border: 1px solid red; */
  /* transition: all 0.2s linear; */
  & path {
    fill: ${(props) => props.theme.color.blue};
  }

  &:hover {
    & path {
      filter: contrast(2);
    }
  }
`;
const ArrowDown = styled(arrow)`
  /* margin-top: -5px; */
  width: 10px;
  height: 10px;
  cursor: pointer;
  /* border: 1px solid red; */
  /* transition: all 0.2s linear; */
  & path {
    fill: ${(props) => props.theme.color.blue};
  }

  &:hover {
    & path {
      filter: contrast(2);
    }
  }
`;
const StyledInput = styled.input`
  color: white;
  background-color: ${(props) => props.theme.color.box};
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.color.boxBorder};
  outline: none;
  margin-bottom: 5px;

 @media only screen and (max-width: 776px) {
  background-color: transparent;
   }
`;
const StyledNumberInput = styled.input`
  width: 100%;
  border: none;
  color: white;
  border-radius: 0;
  text-align: left;
  padding-bottom: 5px;
  margin-top: 20px;
  font-size: ${(props) => props.theme.fontSizes.xs};
  background-color: ${(props) => props.theme.color.box};
  border: none;
  border-bottom: 2px solid ${(props) => props.theme.color.boxBorder};
  outline: none;
  &.mint {
    width: 100%;
  }
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    display: none;
  }
`;

const FileNames = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  /* position: absolute; */
  left: 0;
  bottom: -10px;
  margin-top: 5px;
  height: 15px;
  & > span {
    /* color: ${(props) => props.theme.fontColor.gray}; */
    color: white;
    width: 40%;
    font-size: 0.7rem;
    text-align: center;
    opacity: 0.7;
  }
  @media only screen and (max-width: 776px) {

  & > span {
    /* color: ${(props) => props.theme.fontColor.gray}; */
    color: white;
    width: 50%;
    font-size: 0.7rem;
    text-align: center;
    opacity: 0.7;
  }
   }
`;

const TopInputs = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  position: relative;
`;

const MiddleInputs = styled.div`
  height: 40%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
`;

const BottomInput = styled.div`
  height: 30%;
  width: 100%;
  display: flex;
  color: white;
  justify-content: space-between;
`;

const StyledDivInput1 = styled.div`
  width: 35%;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > label {
    display: flex;
    align-items: center;
  }
`;
const StyledDivInput2 = styled.div`
  width: 60%;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > span {
    position: absolute;
    bottom: 15px;
    right: 20px;
    color: white;
  }
  & > label {
    display: flex;
    align-items: center;
    position: relative;
  }
`;

const SubmitButton = styled.button`
  cursor: pointer;
  width: 100%;
  height: 60px;
  color: white;
  background-color: ${(props) => props.theme.color.blue};
  border: none;
  border-radius: 15px;
  font-size: 20px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 20px;
`;

const MediaButton = styled.button`
  background-color: ${(props) => props.theme.color.box};
  border-radius: 10px;
  color: ${(props) => props.theme.fontColor.gray};
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid ${(props) => props.theme.fontColor.boxBorderColor};
  padding: 5px;
  cursor: pointer;
  /* margin-top: 30px; */
  /* position: relative; */
  width: 40%;
  & > img {
    height: 20px;
    opacity: 0.5;
  }

 @media only screen and (max-width: 776px) {
   width: 45%;
   }
`;

const MediaButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

 @media only screen and (max-width: 776px) {
   width: 95%;
   margin-left: auto;
   margin-right: auto;
   }
`;

const Image = styled.img`
  width: 100%;
  aspect-ratio: 1;
  /* height: 250px; */
  border-radius: 15px;
  border: 1px solid #707070;
  overflow: hidden;
  object-fit: cover;
`;
// const ImagePreview = styled.div``;
const Files = styled.div`
  width: 50%;
  /* height: 100%; */
  display: flex;
  flex-direction: column;
  /* padding: 10px; */
  position: relative;
 @media only screen and (max-width: 776px) {
   width: 95%;
   flex-direction: column;
   align-items: center;
   }
`;

const Inputs = styled.div`
  width: 50%;
  /* height: 100%; */
  display: flex;
  flex-direction: column;
  padding: 0 0 0 20px;
 @media only screen and (max-width: 776px) {
   width: 100%;
   padding: 0;
   margin-top: 20px;
   }
`;
const Main = styled.div`
  width: 100%;
  height: calc(100% - 40px);
  display: flex;
 @media only screen and (max-width: 776px) {
   flex-direction: column;
   align-items: center;
   }
`;

const Header = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  & > span {
    color: white;
    font-weight: 600;
    font-size: ${(props) => props.theme.fontSizes.md};
  }
`;

const FormContainer = styled.form`
  width: 600px;
  /* height: 600px; */
  border-radius: 15px;
  background-color: ${(props) => props.theme.color.box};
  border: 1px solid ${(props) => props.theme.color.boxBorder};
  display: flex;
  flex-direction: column;
  padding: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
 @media only screen and (max-width: 776px) {
   width: 95vw;
   background-color: transparent;
   border: none;
   margin-top: 100px;
   }
`;

const OpaqueFilter = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.9);
  -webkit-backdrop-filter: blur(4.6px);
  backdrop-filter: blur(4.6px);
  z-index: 10;
  top: 0;
`;

const X = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

export default CreateForm;

// @media only screen and (max-width: 776px) {
//   margin-top: 6px;
//   }