import React, { useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components";
import axios from "axios";
import moment from "moment";
import swal from "sweetalert2";

import upload_icon from "../../../assets/img/profile_page_assets/upload_icon.svg";
import loading_gif from "../../../assets/img/loading.gif";
import { ReactComponent as eth_icon } from "../../../assets/img/icons/ethereum.svg";
import x from "../../../assets/img/icons/x.svg";

import { errorIcon, imageWidth, imageHeight } from "../../../utils/swalImages";
import { useAccountConsumer } from "../../../contexts/Account";
import { mintNFT } from "../../../web3/utils";

import { Step1 } from "./CreateFormPages/Step1";
import Step2 from "./CreateFormPages/Step2";
import Step3 from "./CreateFormPages/Step3"
import Step4 from "./CreateFormPages/Step4"
import PreviewBuyModal from "./CreateFormPages/PreviewBuyModal"


import CreateFormPaginator from "./CreateFormPaginator";

const initialNftState = {
  artist: "",
  address: "",
  isDraft: true,
  genre: "",
  startTime: 0,
  dur: 0,
  numMinted: 0,
  price: 0,
  producer: "",
  title: "",
  writer: "",
  imageUrl: "",
  audioUrl: "",
  description: ""
};

const CreateForm = ({ open, hide }) => {
  const { account, user, usdPerEth } = useAccountConsumer();
  const [nftData, setNftData] = useState(initialNftState);
  const [curr, setCurr] = useState("ETH");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);


  useEffect(() => {
    user && user.username && setNftData({ ...nftData, artist: user.username });
  }, [user]);

  // useEffect(() => {
  //   const getDraft = async () => {
  //     const draft = await axios.get(`/api/nft-type/get-draft/${account}`);
  //     setNftData(draft.data[0]);
  //     console.log(draft.data[0]);
  //   }
  //   getDraft();
  // }, [open, account])

  useEffect(() => {
    setNftData({ ...nftData, address: account });
    axios
      .post("/api/nft-type/get-NFT", { account: account })
      .then((res) => setNftData(res.data));
  }, [account]);


  // const [videoFile, setVideoFile] = useState(null);

  // const hiddenVideoInput = useRef(null);
  // const handleVideo = () => {
  //   setIsVideoUploaded(null);
  //   setVideoFile(null);
  //   hiddenVideoInput.current.click();
  // };
  // const handleVideoChange = (e) => {
  //   console.log('here')
  // }


  //this is all to handle the image

  const isComplete = () => {
    if (
      nftData.title === "" ||
      nftData.genre === "" ||
      nftData.producer === "" ||
      nftData.numMinted === 0 ||
      nftData.numMinted === "0" ||
      nftData.numMinted === "" ||
      nftData.price === 0 ||
      nftData.price === "0" ||
      nftData.price === "" 
      // !isAudioUploaded ||
      // !isImageUploaded
    ) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("DUR", nftData.dur);
    if (!isComplete()) {
      return;
    }
    let newNftData = { ...nftData, timestamp: moment().format() }; //sets timestamp to right when the /finalize route is called
    if (curr === "USD") {
      newNftData = {
        ...nftData,
        price: (nftData.price / usdPerEth).toFixed(4),
      };
    }
    if (newNftData.artist === "") {
      newNftData = {
        ...nftData,
        artist: user.username,
      };
    }

    //Input validation below here
    if (nftData.numMinted === "0" || nftData.numMinted === 0) {
      console.log("e");
      swal.fire({
        title: "Created amount cannot be 0.",
        timer: 5000,
        imageUrl: errorIcon,
        imageWidth,
        imageHeight      
      });
      return;
    }
    if (Number(nftData.price) === 0) {
      console.log("re");
      swal.fire({
        title: "Total Copies or NFT Price cannot be 0.",
        timer: 5000,
        imageUrl: errorIcon,
        imageWidth,
        imageHeight      
      });
      return;
    }

    if (!nftData.imageUrl || !nftData.audioUrl) {
      console.log("here");
      swal.fire({
        title: "Please wait for your audio and image files to be processed.",
        timer: 5000,
        imageUrl: errorIcon,
        imageWidth,
        imageHeight      
      });
      return;
    }

    //run these two, store the returns in the nftData state object

    // if (!audioUploadError && !imageUploadError) {
      setIsLoading(true);
      // after nftData has both audio and image references, run this route
      axios
        .post("/api/nft-type/finalize", newNftData)
        .then((res) => {
          console.log("finalize res", res);
          if (res.status === 200) {
            mintNFT(
              res.data,
              () => {
                console.log("pending...");
                setIsLoading(true);
              },
              () => {
                console.log("final");
                setNftData(initialNftState);
                setIsLoading(false);
                swal
                  .fire({
                    title: "NFT Minted!",
                    text: "It can take 2-3 minutes for the new NFT to appear on your profile.",
                    timer: 10000,
                  })
                  .then(() => hide());
              }
            ).catch((err) => {
              setIsLoading(false);
              swal.fire({
                imageUrl: errorIcon,
                imageWidth,
                imageHeight,
                title: "Couldn't create NFT!",
                text: "Please try again",
              });
            });
            console.log("MINT");
          } else {
            setIsLoading(false);
            swal.fire({
              title: "Error",
              background: `#000`,
              boxShadow: `24px 24px 48px -24px #131313`,
              text: "Nft creation failed here, please try again.",
            });
          }
        })
        .catch((err) => {
          setIsLoading(false);
          swal.fire({
            title: "Error",
            background: `#000`,
            boxShadow: `24px 24px 48px -24px #131313`,
            text: "Nft creation failed on the server, please try again.",
          });
        });
    }

  useEffect(() => {
    if (nftData.price > 0) {
      if (curr === "USD") {
        setNftData({
          ...nftData,
          price: nftData.price * usdPerEth,
        });
      } else {
        setNftData({
          ...nftData,
          price: nftData.price / usdPerEth,
        });
      }
    }
  }, [curr]);

  const updateState = (e) => {
    if (e.target.name === "numMinted" && Number(e.target.value) > 10000) {
      return;
    }
    if (e.target.name === "price") {
      let string = e.target.value.toString();
      if (string.length > 8) {
        return;
      }
      if (curr === "ETH" && Number(e.target.value) > 1000) {
        return;
      }
      if (curr === "USD" && Number(e.target.value) > 1000 * usdPerEth) {
        return;
      }
    }
    if (e.target.name === "price") {
      curr === "ETH"
        ? setNftData({ ...nftData, [e.target.name]: Number(e.target.value) })
        : setNftData({
            ...nftData,
            [e.target.name]: Number(e.target.value / usdPerEth),
          });
    }
    setNftData({ ...nftData, [e.target.name]: e.target.value });
  };

  if (!open) return false;

  const steps = [
    <Step2 
      nftData={nftData} 
      setNftData={setNftData}
      isLoadingAudio={isLoadingAudio}
      setIsLoadingAudio={setIsLoadingAudio}
      isLoadingImage={isLoadingImage}
      setIsLoadingImage={setIsLoadingImage}
    />,
    <Step3 nftData={nftData} updateState={updateState} />,
    <Step4 nftData={nftData} updateState={updateState} usdPerEth={usdPerEth} />,
    <PreviewBuyModal nft={nftData} />
  ]

  if (currentStep === 1) {
    return (
      <>
        <SelectContainer style={{zIndex: 501}}>
          <StyledModal style={{background: "none", border: "none"}}>
            <Step1 setCurrentStep={setCurrentStep} />
          </StyledModal>
        </SelectContainer>
        <OpaqueFilter onClick={() => hide()} />
      </> 
    )
  } else {
    return(
      <OpaqueFilter>
        <Step1Container>
          <StyledModal>
            <X src={x} onClick={() => hide()} />
            {
              nftData.imageUrl === "" || !nftData.imageUrl ?
              <LeftSide /> : <Image src={nftData.imageUrl} alt="image" />
            }
          <RightSide step={currentStep}>
            {steps[currentStep - 2]}
          </RightSide>
          </StyledModal>
          <CreateFormPaginator 
            nftData={nftData} 
            currentStep={currentStep} 
            setCurrentStep={setCurrentStep}
            handleSubmit={handleSubmit}
          />
        </Step1Container>
      </OpaqueFilter>
    )
  }
};

const RightSide = styled.div`
  ${props => props.currentStep !== 6 ? css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: calc(100% - 500px);
    padding: 10px 30px;
    @media only screen and (max-width: 776px) {
      width: 90vw;
      height: calc(100vh / 2);
      justify-content: space-between;
    }
  h2 {
    color: white;
    padding: 0;
    margin: 0;
  }
  ` : css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: calc(100% - 500px);
    padding: 10px 30px;
    @media only screen and (max-width: 776px) {
      width: 90vw;
      height: calc(100vh / 2);
      justify-content: space-between;
    }
    color: white;
  `}
`;

const CurrentStep = styled.div`
  ${props => props.step !== props.currentStep && css`
    display: none;
  `}
`
  const StyledModal = styled.div`
    border-radius: 8px;
    border: solid 1px #181818;
    width: 800px;
    background-color: ${(props) => props.theme.bgColor};
    font-size: 16px;
    font-weight: normal;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    @media only screen and (max-width: 776px) {
      width: 90vw;
      height: 95vh;
      flex-direction: column;
      align-items: center;
      /* justify-content: flex-start; */
    }
`;

const LeftSide = styled.div`
  display: flex;
  width: 500px;
  height: 500px;
  border-radius: 18px;
  background-color: white;
  justify-content: center;
  align-items: center;
`

const Image = styled.img`
  width: 500px;
  aspect-ratio: 1;
  border-radius: 16px;
  border: 1px solid #262626;
  background-color: #1e1e1e;
  object-fit: cover;
  overflow: hidden;
  @media only screen and (max-width: 776px) {
    width: 90vw;
    height: 90vw;
  }
`;
  // <Header>
  //   <span>Create NFTs</span>
  //   <X src={x} onClick={() => hide()} />
  // </Header>
  // <Main>
  //   <Files>
  //     <ImagePreview imageFile={imageFile} />
  //   </Files>
  //   <Inputs autoComplete="off">
  //     <TopInputs>
  //       <MediaButtons>
  //         <UploadAudio
  //           audioFile={audioFile}
  //           setAudioFile={setAudioFile}
  //           nftData={nftData}
  //           setNftData={setNftData}
  //           isAudioUploaded={isAudioUploaded}
  //           setIsAudioUploaded={setIsAudioUploaded}
  //           audioUploadError={audioUploadError}
  //           setAudioUploadError={setAudioUploadError}
  //         />
  //         <MediaButton onClick={() => handleImage()} type="button">
  //           <span>Upload image</span>
  //           <span>.png, .jpeg, .gif</span>
  //           {imageFile && !isImageUploaded ? (
  //             <img src={loading_gif} alt="loading" />
  //           ) : (
  //             <img src={upload_icon} alt="upload-file-icon" />
  //           )}
  //         </MediaButton>
  //         <StyledInput
  //           type="file"
  //           accept=".jpg,.jpeg,.png,.gif"
  //           ref={hiddenImageInput}
  //           onChange={handleImageChange}
  //           style={{ display: "none" }}
  //           defaultValue={imageFile}
  //           // required
  //         />
  //         <MediaButton onClick={() => handleImage()} type="button">
  //           <span>Upload video</span>
  //           <span>.mp4</span>
  //           {videoFile ? (
  //             <img src={loading_gif} alt="loading" />
  //           ) : (
  //             <img src={upload_icon} alt="upload-file-icon" />
  //           )}
  //         </MediaButton>
  //         <StyledInput
  //           type="file"
  //           accept=".mp4"
  //           ref={hiddenVideoInput}
  //           onChange={handleVideoChange}
  //           style={{ display: "none" }}
  //           defaultValue={videoFile}
  //           // required
  //         />
  //       </MediaButtons>
  //       <FileNames>
  //         <span>
  //           {audioFile?.name.length > 10
  //             ? audioFile?.name.substring(0, 10) +
  //               "-" +
  //               audioFile?.name.substring(audioFile.name.lastIndexOf("."))
  //             : audioFile?.name}
  //         </span>
  //         <span>
  //           {imageFile?.name.length > 10
  //             ? imageFile?.name.substring(0, 10) +
  //               "-" +
  //               imageFile?.name.substring(imageFile.name.lastIndexOf("."))
  //             : imageFile?.name}
  //         </span>
  //       </FileNames>
  //     </TopInputs>
  //     <MiddleInputs>
  //       <StyledInput
  //         type="text"
  //         placeholder="Title"
  //         name="title"
  //         onChange={(e) => updateState(e)}
  //         value={nftData.title}
  //         required
  //       />
  //       <StyledInput
  //         type="text"
  //         placeholder="Genre"
  //         name="genre"
  //         onChange={(e) => updateState(e)}
  //         value={nftData.genre}
  //         required
  //       />
  //       <StyledInput
  //         type="text"
  //         placeholder="Producer"
  //         name="producer"
  //         onChange={(e) => updateState(e)}
  //         value={nftData.producer}
  //         required
  //       />
  //       <StyledInput
  //         type="text"
  //         placeholder="Writer"
  //         name="writer"
  //         onChange={(e) => updateState(e)}
  //         value={nftData.writer}
  //         required
  //       />
  //     </MiddleInputs>
  //     <BottomInput>
  //       <StyledDivInput1>
  //         <label>Total Copies</label>
  //         <StyledNumberInput
  //           className="mint"
  //           type="number"
  //           name="numMinted"
  //           onChange={(e) => updateState(e)}
  //           min="0"
  //           value={nftData.numMinted === 0 ? "" : nftData.numMinted}
  //           required
  //         />
  //       </StyledDivInput1>
  //       <StyledDivInput2>
  //         <label>
  //           NFT Price /ea &nbsp;
  //           <EthIcon
  //             onClick={() => setCurr("ETH")}
  //             active={curr === "ETH" ? true : false}
  //           />{" "}
  //         </label>
  //         <StyledNumberInput
  //           className="cost"
  //           type="number"
  //           name="price"
  //           onChange={(e) => updateState(e)}
  //           min="0"
  //           max={curr === "ETH" ? "1000" : `1000 * ${usdPerEth}`}
  //           step="0.0001"
  //           value={nftData.price === 0 ? "" : nftData.price}
  //           required
  //         />
  //         <span>/{curr}</span>
  //         <SubText>
  //           <span>
  //             ${" "}
  //             {nftData.price &&
  //               (nftData.price * usdPerEth).toLocaleString(undefined, {
  //                 minimumFractionDigits: 2,
  //                 maximumFractionDigits: 2,
  //               })}
  //           </span>
  //         </SubText>
  //       </StyledDivInput2>
  //     </BottomInput>
  //   </Inputs>
  // </Main>
  // {isLoading ? (
  //   <SubmitButton
  //     type="button"
  //     style={{ filter: "saturate(.2)", cursor: "not-allowed" }}
  //   >
  //     <img src={loading_gif} alt="loading" />
  //   </SubmitButton>
  // ) : (
  //   <SubmitButton
  //     type="submit"
  //     style={
  //       !isComplete()
  //         ? { filter: "saturate(.2)", cursor: "not-allowed" }
  //         : null
  //     }
  //   >
  //     <span>Mint NFTs!</span>
  //   </SubmitButton>
  // )

const Step1Container = styled.div`
  width: 800px;
  align-items: space-between;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  @media only screen and (max-width: 776px) {
    width: 90vw;
    height: 95vh;
    flex-direction: column;
    align-items: center;
  }
`;

const SelectContainer = styled.div`
  width: 800px;
  align-items: space-between;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  @media only screen and (max-width: 776px) {
    width: 90vw;
    flex-direction: column;
    align-items: center;
  }
`;

const SubText = styled.div`
  position: absolute;
  bottom: -10px;
  left: 0;
  & > span {
    width: 50%;
    font-size: 0.8rem;
    color: ${(props) => props.theme.color.gray};
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none;
  }
`;

const EthIcon = styled(eth_icon)`
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  right: -15px;
  transition: all 0.2s;
  & path {
    fill: ${(props) => props.theme.color.gray};
    ${({ active }) =>
      active &&
      `
  fill: #20a4fc;
  `}
  }

  &:hover {
    & path {
      filter: contrast(2);
    }
  }
`;

// const UsdIcon = styled(usd_icon)`
//   width: 20px;
//   height: 20px;
//   cursor: pointer;
//   position: absolute;
//   right: -35px;
//   transition: all 0.2s;
//   & path {
//     fill: ${(props) => props.theme.color.gray};
//     ${({ active }) =>
//       active &&
//       `
//       fill: #68c12f;
// `}
//   }

//   &:hover {
//     & path {
//       filter: contrast(0.5);
//     }
//   }
// `;

// const Spinner = styled.div`
//   display: flex;
//   flex-direction: column;
//   position: absolute;
//   bottom: 15px;
//   right: 5px;

//   @media only screen and (max-width: 776px) {
//     bottom: 5px;
//   }
// `;

// const ArrowUp = styled(arrow)`
//   -webkit-transform: rotate(180deg);
//   -moz-transform: rotate(180deg);
//   -ms-transform: rotate(180deg);
//   -o-transform: rotate(180deg);
//   transform: rotate(180deg);
//   /* margin-bottom: -5px; */
//   width: 10px;
//   height: 10px;
//   cursor: pointer;
//   /* border: 1px solid red; */
//   /* transition: all 0.2s linear; */
//   & path {
//     fill: ${(props) => props.theme.color.blue};
//   }

//   &:hover {
//     & path {
//       filter: contrast(2);
//     }
//   }
// `;
// const ArrowDown = styled(arrow)`
//   /* margin-top: -5px; */
//   width: 10px;
//   height: 10px;
//   cursor: pointer;
//   /* border: 1px solid red; */
//   /* transition: all 0.2s linear; */
//   & path {
//     fill: ${(props) => props.theme.color.blue};
//   }

//   &:hover {
//     & path {
//       filter: contrast(2);
//     }
//   }
// `;
const StyledInput = styled.input`
  color: white;
  background-color: ${(props) => props.theme.color.box};
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.color.boxBorder};
  outline: none;
  margin-bottom: 5px;

  @media only screen and (max-width: 776px) {
    background-color: transparent;
    height: 20px;
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

  @media only screen and (max-width: 776px) {
    background-color: transparent;
    height: 20px;
    padding-bottom: 0;
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

  @media only screen and (max-width: 776px) {
    width: 95%;
    margin-left: auto;
    margin-right: auto;
  }
`;

const BottomInput = styled.div`
  height: 30%;
  width: 100%;
  display: flex;
  color: white;
  justify-content: space-between;

  @media only screen and (max-width: 776px) {
    width: 95%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
  }
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
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none;
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
    right: 0px;
    color: white;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none;
    @media only screen and (max-width: 776px) {
      bottom: 5px;
    }
  }
  & > label {
    display: flex;
    align-items: center;
    position: relative;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none;
  }
`;

const SubmitButton = styled.button`
  cursor: pointer;
  width: 100%;
  height: 60px;
  color: white;
  background-color: ${(props) => props.theme.color.blue};
  border: none;
  border-radius: ${(props) => props.theme.borderRadius}px;
  font-size: 20px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 20px;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
  & > img {
    width: 30px;
  }
  @media only screen and (max-width: 776px) {
    margin-bottom: 40px;
    width: 95%;
  }
`;

const MediaButton = styled.button`
  background-color: ${(props) => props.theme.color.box};
  border-radius: ${(props) => props.theme.borderRadius}px;
  color: ${(props) => props.theme.fontColor.gray};
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid ${(props) => props.theme.fontColor.boxBorderColor};
  padding: 5px;
  cursor: pointer;
  /* margin-top: 30px; */
  /* position: relative; */
  /* height: 50px; */
  width: 40%;
  & > img {
    margin-top: 5px;
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

// const Image = styled.img`
//   width: 100%;
//   aspect-ratio: 1;
//   /* height: 250px; */
//   border-radius: 15px;
//   border: 1px solid #707070;
//   overflow: hidden;
//   object-fit: cover;
// `;
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
  border-radius: ${(props) => props.theme.borderRadius}px;
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
    /* margin-top: 100px; */
  }
`;

const OpaqueFilter = styled.div`
  /* position: absolute; */
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.9);
  -webkit-backdrop-filter: blur(4.6px);
  backdrop-filter: blur(4.6px);
  z-index: 500;
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
