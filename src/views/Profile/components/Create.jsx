import React, { useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useWallet } from "use-wallet";
import isMobile from "../../../utils/isMobile";
import axios from "axios";
import swal from "sweetalert2";
import x from "../../../assets/img/listen/x.svg";
import image from "../../../assets/img/logos/fm_logo_1.png";
import upload_icon from "../../../assets/img/profile_page_assets/upload_icon.svg";
// import eth_icon from "../../../assets/img/profile_page_assets/eth_icon.svg";
// import eth_icon_white from "../../../assets/img/profile_page_assets/eth_icon_white.svg";
// import usd_icon from "../../../assets/img/profile_page_assets/usd_icon.svg";
import { ReactComponent as usd_icon } from "../../../assets/img/icons/dollar.svg";
import { ReactComponent as eth_icon } from "../../../assets/img/icons/ethereum.svg";
import { ReactComponent as arrow } from "../../../assets/img/icons/arrow_cropped.svg";
// import { ReactComponent as arrow_down } from "../../../assets/img/icons/arrow_down.svg";

import BaseView from "../../BaseView";
import { useAccountConsumer } from "../../../contexts/Account";

const initialNftState = {
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

const Create = ({ open, hide }) => {
  const { account, user, setUser, usdPerEth } = useAccountConsumer();
  const [isLoading, setIsLoading] = useState(false);
  const [nftData, setNftData] = useState(initialNftState);
  const [audioFile, setAudioFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    console.log("nftData", nftData);
  }, [nftData]);

  const fetchNFT = async () => {
    await axios
      .post("/api/nft-type/get-NFT", { account: account })
      .then((res) => setNftData(res.data));
  };

  useEffect(() => {
    setNftData({ ...nftData, address: account });
    fetchNFT();
  }, [account]);

  const getExtension = (filename) => {
    var parts = filename.split(".");
    return parts[parts.length - 1];
  };
  //TODO entry validation
  const handleSubmit = () => {
    setIsLoading(true);

    let isUploadError = false;

    //run these two, store the returns in the nftData state object
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
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        isUploadError = true;
      });

    const imageFormData = new FormData();
    imageFormData.append("artist", account);
    imageFormData.append("imageFile", imageFile);

    axios
      .post("/api/nft-type/uploadImageS3", imageFormData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        isUploadError = true;
      });

    if (!isUploadError) {
      // after nftData has both audio and image references, run this route
      console.log("upload route called");
      axios
        .post("/api/nft-type/update", nftData)
        .then((res) => {
          console.log("update res", res);
          if (res.status === 200) {
            setNftData(initialNftState);
            setImageFile(null);
            setAudioFile(null);
            swal.fire({
              title: "Success!",
              background: `#000`,
              boxShadow: `24px 24px 48px -24px #131313`,
              text: "Nft successfully created!",
            });
          }
        })
        .catch((err) => console.log(err));
    } else {
      //do something
    }
    setIsLoading(false);
  };

  //this is all to handle the image and audio
  const hiddenAudioInput = useRef(null);
  const handleAudio = (e) => {
    hiddenAudioInput.current.click();
  };
  const handleAudioChange = (e) => {
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
  const handleImage = (e) => {
    hiddenImageInput.current.click();
  };
  const handleImageChange = (e) => {
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

  const updateState = (e) => {
    if (e.target.name === "price" || e.target.name === "numMinted") {
      let string = e.target.value.toString();
      if (string.length > 6) {
        return;
      }
    }
    setNftData({ ...nftData, [e.target.name]: e.target.value });
  };

  // if (!account) {
  //   return (
  //     <BaseView>
  //       <h1>Connect your wallet!!</h1>
  //     </BaseView>
  //   );
  // }

  if (!open) return null;
  const stopProp = (e) => {
    e.stopPropagation();
  };
  const hideCreate = (e) => {
    setNftData(initialNftState);
    setImageFile(null);
    setAudioFile(null);
    hide(e);
  };
  if (isLoading) {
    return (
      <BaseView>
        <h1>Loading...</h1>
      </BaseView>
    );
  }
  return (
    <OpaqueFilter onClick={(e) => hideCreate(e)}>
      <FormContainer onClick={(e) => stopProp(e)}>
        <Header>
          <span>Create NFTs</span>
          <X src={x} onClick={(e) => hideCreate(e)} />
        </Header>
        <Main>
          <Files>
            <ImagePreview>
              <Image src={image} alt="image" />
            </ImagePreview>
          </Files>
          <Inputs autoComplete="off">
            <TopInputs>
              <StyledInput
                type="text"
                placeholder="Title"
                name="title"
                onChange={(e) => updateState(e)}
                defaultValue={nftData.title}
              />
              <StyledInput
                type="text"
                placeholder="Genre"
                name="genre"
                onChange={(e) => updateState(e)}
                defaultValue={nftData.genre}
              />
              <StyledInput
                type="text"
                placeholder="Producer"
                name="producer"
                onChange={(e) => updateState(e)}
                defaultValue={nftData.producer}
              />
              <StyledInput
                type="text"
                placeholder="Writer"
                name="writer"
                onChange={(e) => updateState(e)}
                defaultValue={nftData.writer}
              />
            </TopInputs>
            <MiddleInputs>
              <StyledDivInput1>
                <label>NFT Created</label>
                <StyledNumberInput
                  className="mint"
                  type="number"
                  name="numMinted"
                  onChange={(e) => updateState(e)}
                  min="0"
                  value={nftData.numMinted}
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
                  <EthIcon /> <UsdIcon />
                </label>
                <StyledNumberInput
                  className="cost"
                  type="number"
                  name="price"
                  onChange={(e) => updateState(e)}
                  min="0"
                  value={nftData.price}
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
                <span>/ETH</span>
              </StyledDivInput2>
            </MiddleInputs>
            <BottomInput>
              <MediaButtons>
                <MediaButton onClick={() => handleAudio()}>
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
                />
                <MediaButton onClick={() => handleImage()}>
                  <span>Upload image</span>
                  <span>.png, .jpeg</span>
                  <img src={upload_icon} alt="upload-file-icon" />
                </MediaButton>
                <StyledInput
                  type="file"
                  accept=".jpg,.jpeg,.png,.gif"
                  ref={hiddenImageInput}
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                  defaultValue={imageFile}
                />
              </MediaButtons>
              <FileNames>
                <span>{audioFile?.name}</span>
                <span>{imageFile?.name}</span>
              </FileNames>
            </BottomInput>
          </Inputs>
        </Main>
        <SubmitButton onClick={() => handleSubmit()}>
          Approve and Create
        </SubmitButton>
      </FormContainer>
    </OpaqueFilter>
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
  bottom: 0px;
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

const CurrencyIcon = styled.img`
  width: 12px;
  height: 12px;
`;

const CurrencyButton = styled.div`
  width: 32%;
  border-radius: 5px;
  outline: none;
  border-width: 1px;
  border-style: solid;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &.ETH {
    background-color: black;
    color: white;
    border-color: black;
  }
  &.BTU {
    color: #7e2ce3;
    border-color: #7e2ce3;
  }

  &.USD {
    color: #038542;
    border-color: #038542;
  }
`;

const Subtext = styled.span`
  font-size: 0.6rem;
`;

const CurrencyButtons = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`;
const StyledInput = styled.input`
  color: white;
  background-color: ${(props) => props.theme.bgColor};
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.color.boxBorder};
  outline: none;
  margin-bottom: 5px;
`;

const TopInputs = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const StyledDivInput1 = styled.div`
  width: 35%;
  position: relative;
  height: 60px;
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
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > span {
    position: absolute;
    bottom: 0;
    right: 20px;
    color: white;
  }
  & > label {
    display: flex;
    align-items: center;
    position: relative;
  }
`;

const StyledNumberInput2 = styled.input`
  width: 100%;
  border: none;
  color: white;
  border-radius: 5px;
  text-indent: 100px;
  padding-bottom: 5px;
  margin-top: 20px;
  font-size: ${(props) => props.theme.fontSizes.sm};
  background-color: ${(props) => props.theme.bgColor};
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.color.boxBorder};
  outline: none;
  &.mint {
    width: 100%;
  }
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    display: none;
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
  background-color: ${(props) => props.theme.bgColor};
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

const MiddleInputs = styled.div`
  height: 30%;
  width: 100%;
  display: flex;
  /* flex-direction: column; */
  justify-content: space-between;
  color: white;
  margin-top: 10px;
  & > label {
    font-size: 0.8rem;
  }
`;

const BottomInput = styled.div`
  /* height: 20%; */
  width: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: flex-end; */
`;

const SubmitButton = styled.button`
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

const FileNames = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  /* position: absolute; */
  left: 0;
  bottom: -10px;
  margin-top: 5px;
  & > span {
    color: ${(props) => props.theme.fontColor.gray};
    width: 30%;
    font-size: 0.7rem;
    text-align: center;
    opacity: 0.7;
  }
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
`;

const MediaButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
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
const ImagePreview = styled.div``;
const Files = styled.div`
  width: 50%;
  /* height: 100%; */
  display: flex;
  flex-direction: column;
  /* padding: 10px; */
  position: relative;
`;

const Inputs = styled.div`
  width: 50%;
  /* height: 100%; */
  display: flex;
  flex-direction: column;
  padding: 0 0 0 20px;
`;
const Main = styled.div`
  width: 100%;
  height: calc(100% - 40px);
  display: flex;
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

const FormContainer = styled.div`
  width: 600px;
  /* height: 600px; */
  border-radius: 15px;
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.color.boxBorder};
  display: flex;
  flex-direction: column;
  padding: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
`;

const OpaqueFilter = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.9);
  -webkit-backdrop-filter: blur(4.6px);
  backdrop-filter: blur(4.6px);
`;

const X = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

export default Create;
