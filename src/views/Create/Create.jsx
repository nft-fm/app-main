import React, { useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useWallet } from "use-wallet";
import isMobile from "../../utils/isMobile";
import BaseView from "../BaseView";
import axios from "axios";
import swal from "sweetalert2";
import x from "../../assets/img/listen/x.svg";
import image from "../../assets/img/logos/fm_logo_1.png";
import upload_icon from "../../assets/img/profile_page_assets/upload_icon.svg";
import eth_icon from "../../assets/img/profile_page_assets/eth_icon.svg";
import eth_icon_white from "../../assets/img/profile_page_assets/eth_icon_white.svg";
import usd_icon from "../../assets/img/profile_page_assets/usd_icon.svg";

const Create = () => {
  const { account, connect } = useWallet();

  const [user, setUser] = useState(null);
  const [currency, setCurrency] = useState(0);

  const fetchCurrencyRates = async () => {
    await axios
      .get(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=USD"
      )
      .then((res) => setCurrency(res.data.ethereum.usd));
  };
  const fetchNFT = async () => {
    await axios.post('/api/nft-type/fetchNFT', { account: account })
      .then(res => console.log('res', res))
  }

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

  useEffect(() => {
    fetchCurrencyRates();
    fetchNFT();
  }, []);

  const [nftData, setNftData] = useState({
    artist: "",
    title: "",
    genre: "",
    producer: "",
    writer: "",
    numMinted: "",
    price: "",
  });
  const [audioFile, setAudioFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);


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
    if (e.target.name === "price") {
      let string = e.target.value.toString();
      if (string.length > 7) {
        return;
      }
    }
    setNftData({ ...nftData, [e.target.name]: e.target.value });
  };

  //TODO entry validation
  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!account) {
    //   swal.fire("unlock your wallet dipshit");
    //   return;
    // }
    // if (
    //   !audioFile ||
    //   !imageFile ||
    //   nftData.title === "" ||
    //   nftData.genre === "" ||
    //   nftData.producer === "" ||
    //   nftData.writer === "" ||
    //   nftData.numMinted === "" ||
    //   nftData.price === ""
    // ) {
    //   swal.fire("fill in all fields");
    //   return;
    // }

    //run these two, store the returns in the nftData state object
    const audioFormData = new FormData();
    audioFormData.append("audioFile", audioFile);

    console.log(...audioFormData)

    axios
      .post("/api/nft-type/handleAudio", { audioFile: audioFile, nftData: nftData })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));

    const imageFormData = new FormData();
    imageFormData.append("imageFile", imageFile);

    // axios
    //   .post("/api/nft-type/handleImage", imageFormData)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => console.log(err));

    //after nftData has both audio and image references, run this route
    // axios
    //   .post("/api/nft-type/new", {
    //     nftData: nftData,
    //     audio: audioFile,
    //     image: imageFile,
    //   })
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
  };

  //this is all to handle the image and audio
  const hiddenAudioInput = useRef(null);
  const handleAudio = (e) => {
    hiddenAudioInput.current.click();
  };
  const handleAudioChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  const hiddenImageInput = useRef(null);
  const handleImage = (e) => {
    hiddenImageInput.current.click();
  };
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };
  return (
    <BaseView>
      <FormContainer>
        <Header>
          <span>Add NFTs</span>
          {/* <X src={x}/> */}
        </Header>
        <Main>
          <Files>
            <ImagePreview>
              <Image src={image} alt="image" />
            </ImagePreview>
            <MediaButtons>
              <MediaButton onClick={() => handleAudio()}>
                <span>Upload audio</span>
                <span>.mp3, .flac</span>
                <img src={upload_icon} alt="upload-file-icon" />
              </MediaButton>
              <StyledInput
                type="file"
                ref={hiddenAudioInput}
                onChange={handleAudioChange}
                style={{ display: "none" }}
              />
              <MediaButton onClick={() => handleImage()}>
                <span>Upload image</span>
                <span>.png, .jpeg</span>
                <img src={upload_icon} alt="upload-file-icon" />
              </MediaButton>
              <StyledInput
                type="file"
                ref={hiddenImageInput}
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </MediaButtons>
          </Files>
          <Inputs autoComplete="off" onSubmit={handleSubmit}>
            {/* remove the autocomplete off later, for testing only */}
            <TopInputs>
              <StyledInput
                type="text"
                placeholder="Title"
                name="title"
                onChange={(e) => updateState(e)}
              />
              <StyledInput
                type="text"
                placeholder="Genre"
                name="genre"
                onChange={(e) => updateState(e)}
              />
              <StyledInput
                type="text"
                placeholder="Producer"
                name="producer"
                onChange={(e) => updateState(e)}
              />
              <StyledInput
                type="text"
                placeholder="Writer"
                name="writer"
                onChange={(e) => updateState(e)}
              />
            </TopInputs>
            <MiddleInputs>
              <label>NFT Created</label>
              <StyledDivInput>
                <StyledNumberInput
                  className="mint"
                  type="number"
                  name="numMinted"
                  onChange={(e) => updateState(e)}
                  min="0"
                />
              </StyledDivInput>
              <label>NFT Price</label>
              <StyledDivInput>
                <StyledNumberInput
                  className="cost"
                  type="number"
                  name="price"
                  onChange={(e) => updateState(e)}
                  value={nftData.price}
                />
                <span>/ETH</span>
              </StyledDivInput>
              <CurrencyButtons>
                <CurrencyButton type="button" className="ETH">
                  <div>
                    <CurrencyIcon src={eth_icon_white} /> ETH
                  </div>
                  <Subtext>{currency}</Subtext>
                </CurrencyButton>
                <CurrencyButton type="button" className="BTU">
                  <div>
                    <CurrencyIcon src={eth_icon} /> ABC
                  </div>
                  <Subtext>{currency}</Subtext>
                </CurrencyButton>
                <CurrencyButton type="button" className="USD">
                  <div>
                    <CurrencyIcon src={usd_icon} />
                    USD
                  </div>
                  <Subtext>
                    $
                    {(currency * nftData.price).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                  </Subtext>
                </CurrencyButton>
              </CurrencyButtons>
            </MiddleInputs>
            <BottomInput>
              <SubmitButton type="submit">Approve and Create</SubmitButton>
            </BottomInput>
          </Inputs>
        </Main>
      </FormContainer>
    </BaseView>
  );
};

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

const StyledDivInput = styled.div`
  width: 100%;
  height: 20px;
  background-color: white;
  position: relative;
  border-radius: 5px;
  display: flex;
  & > span {
    width: 15%;
    color: #bababa;
  }
`;

const StyledNumberInput = styled.input`
  width: 85%;
  border: none;
  outline: none;
  border-radius: 5px;
  text-align: right;
  &.mint {
    width: 100%;
  }
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    display: none;
  }
`;

const StyledInput = styled.input`
  background-color: #eaeaea;
  border: none;
  border-bottom: 1px solid #bababa;
  outline: none;
`;

const TopInputs = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const MiddleInputs = styled.div`
  height: 40%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  & > label {
    font-size: 0.8rem;
  }
`;

const BottomInput = styled.div`
  height: 20%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const SubmitButton = styled.button`
  /* width: 100%; */
  height: 60px;
  color: white;
  background-color: #7e2ce3;
  border: none;
  border-radius: 15px;
  font-size: 20px;
`;

const MediaButton = styled.button`
  background-color: white;
  border-radius: 10px;
  color: #707070;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #707070;
  padding: 5px;
  cursor: pointer;
  margin-top: 30px;
  & > img {
    height: 20px;
    opacity: 0.5;
  }
`;

const MediaButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;

const Image = styled.img`
  width: 250px;
  height: 250px;
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
  padding: 10px;
`;

const Inputs = styled.form`
  width: 50%;
  /* height: 100%; */
  display: flex;
  flex-direction: column;
  padding: 10px;
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
  & > span {
    font-family: "Compita";
    color: #7e2ce3;
  }
`;

const FormContainer = styled.div`
  width: 600px;
  /* height: 600px; */
  border-radius: 15px;
  background-color: #eaeaea;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const X = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;
`;

export default Create;
