import React, { useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components";
import axios from "axios";
import moment from "moment";
import swal from "sweetalert2";

import upload_icon from "../../../assets/img/profile_page_assets/upload_icon.svg";
import loading_gif from "../../../assets/img/loading.gif";
import { ReactComponent as eth_icon } from "../../../assets/img/icons/ethereum.svg";
import x from "../../../assets/img/icons/x.svg";
import { ReactComponent as IconX } from "../../../assets/img/icons/x.svg";

import { errorIcon, successIcon, questionIcon, imageWidth, imageHeight } from "../../../utils/swalImages";
import { useAccountConsumer } from "../../../contexts/Account";
import { mintNFT } from "../../../web3/utils";

import { Step1 } from "./CreateFormPages/Step1";
import Step2 from "./CreateFormPages/Step2";
import Step3 from "./CreateFormPages/Step3"
import Step4 from "./CreateFormPages/Step4"
import PreviewBuyModal from "./CreateFormPages/PreviewBuyModal"
import CreateFormPaginator from "./CreateFormPaginator";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}


const initialNftState = {
  artist: "",
  address: "",
  isDraft: true,
  genre: "Select a genre",
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
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (isLoadingAudio || isLoadingImage || isLoading) {
      window.onbeforeunload = () => {
        return 'Navigating away from this page may result in unsaved data. Are you sure?'
      }
    } else {
      window.onbeforeunload = undefined;
    }
  }, [isLoadingAudio, isLoadingImage, isLoading])
  
  useEffect(() => {
    if (account && !isLoading && !isLoadingImage && !isLoadingAudio && currentStep !== 1) {
      setIsLoading(true)
      axios
      .post("/api/nft-type/update-and-fetch", nftData)
      .then((res) => {
        // console.log("success", res.data)
        setNftData(res.data)
        setIsLoading(false)
      })
      .catch(err => {
        console.log(err)
        setIsLoading(false)
      });
    }
  }, [currentStep])

  useEffect(() => {
    user && user.username && setNftData({ ...nftData, artist: user.username });
  }, [user]);

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
      nftData.price === ""  ||
      nftData.imageUrl === "" ||
      nftData.audioUrl === "" ||
      nftData.snnipet === ""
    ) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    console.log("DUR", nftData.dur);
    if (!isComplete()) {
      return;
    }
    let newNftData = { ...nftData, timestamp: moment().format() }; //sets timestamp to right when the /finalize route is called
    // if (curr === "USD") {
    //   newNftData = {
    //     ...nftData,
    //     price: (nftData.price / usdPerEth).toFixed(4),
    //   };
    // }
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
      setIsLoadingAudio(true);
      setIsLoadingImage(true);

      // after nftData has both audio and image references, run this route
      // console.log("newNftData", newNftData);
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
                setNftData({ ...initialNftState, artist: user && user.username  ? user.username : ''})
                setIsLoading(false);
                setIsLoadingAudio(false);
                setIsLoadingImage(false);
                swal
                  .fire({
                    imageUrl: successIcon,
                    imageWidth,
                    imageHeight,
                    title: "NFT Minted!",
                    text: "It can take 2-3 minutes for the new NFT to appear on your profile.",
                  })
                  .then(() => {
                    setCurrentStep(1);
                    hide()
                  });
              }
            ).catch((err) => {
              setIsLoading(false);
              setIsLoadingAudio(false);
              setIsLoadingImage(false);
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
            setIsLoadingAudio(false);
            setIsLoadingImage(false);
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
          setIsLoadingAudio(false);
          setIsLoadingImage(false);
          swal.fire({
            title: "Error",
            background: `#000`,
            boxShadow: `24px 24px 48px -24px #131313`,
            text: "Nft creation failed on the server, please try again.",
          });
        });
    }

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

  const onCloseModal = () => {
    if (isLoadingAudio || isLoadingImage) {
      return swal.fire({
        title: "You are currently uploading files. Are you sure you want to leave?",
        imageUrl: questionIcon,
        imageWidth,
        imageHeight,
        showCancelButton: true     
      }).then(res => 
        !res.isDismissed ? hide() : null
      );
    }
    hide();
  }

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
          <StyledModal currentStep={currentStep} style={{background: "none", border: "none"}}>
            <X src={x} onClick={onCloseModal} currentStep={currentStep} />
            {/* need to change to toggle auction below in the future */}
            <Step1 setCurrentStep={setCurrentStep} /> 
          </StyledModal>
        </SelectContainer>
        <OpaqueFilter onClick={() => width > 776 ? hide() : null} currentStep={currentStep}/>
      </> 
    )
  } else if (isLoading) {
    return (
      <OpaqueFilter>
        <Step1Container>
          <StyledModal style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <img style={{width: "70px", height: "70px"}} src={loading_gif} alt="loading" />
            {isLoading && isLoadingAudio && isLoadingImage ? "Minting NFT! Please do not close this page" : "Loading"}        
          </StyledModal>
        </Step1Container>
      </OpaqueFilter>
    )
  } else {
    return(
      <OpaqueFilter>
        <Step1Container>
          <StyledModal>
            <X src={x} onClick={onCloseModal} />
            <LeftSide>
              {nftData.imageUrl && <Image src={nftData.imageUrl} alt="image" />}
            </LeftSide>
          <RightSide step={currentStep}>
            {steps[currentStep - 2]}
          </RightSide>
          </StyledModal>
          <CreateFormPaginator
            nftData={nftData} 
            currentStep={currentStep} 
            setCurrentStep={setCurrentStep}
            handleSubmit={handleSubmit}
            isLoadingAudio={isLoadingAudio}
            isLoadingImage={isLoadingImage}
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
    width: calc(100% - 465px - 80px);
    padding: 10px 40px;
    @media only screen and (max-width: 776px) {
      width: 100%;
      height: 40vw;
      /* height: calc(100vh / 2); */
      /* justify-content: space-between; */
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
    width: calc(100% - 465px);
    padding: 10px 30px;
    @media only screen and (max-width: 776px) {
      width: 90vw;
      height: calc(100vh / 2);
    }
    color: white;
  `}
`;

const StyledModal = styled.div`
  border-radius: 8px;
  border: solid 1px #181818;
  width: 800px;
  font-size: 16px;
  font-weight: normal;
  display: flex;
  align-items: center;
  position: relative;
  background-color: #181818;
  color: white;

  @media only screen and (max-width: 776px) {
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: center;
    overflow-x: hidden;
    overflow-y: scroll;
  }
`;
// background-color: ${(props) => props.theme.bgColor};


// const getMobileImageDimensions = () => {
//   let height = window.innerHeight;
//   let width = window.innerWidth;
//   if (width > height) {
//     return css`
//       width: 75vh;
//       height: 75vh;
//     `
//   }
//   if (width > (height * 0.60)) {
//     return css`
//       width: 60vh;
//       height: 60vh;
//     `
//   }
//   return css`
//     width: 90vw;
//     height: 90vw;
//   `
// }

// const getMobileModalDimensions = () => {
//   let height = window.innerHeight;
//   let width = window.innerWidth;
//   if (width > height) {
//     return css`
//       width: 75vh;
//     `
//   }
//   return (width > (height * 0.60) && height > 600) ? css`
//     width: 60vh;
//   ` : css`
//     width: 90vw;
//   `
// }

const LeftSide = styled.div`
  display: flex;
  width: 465px;
  height: 465px;
  border-radius: 18px;
  background-color: white;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 776px) {
    width: 90vw;
    height: 90vw;
  }
`

const Image = styled.img`
  width: 465px;
  height: 465px;
  border-radius: 16px;
  border: 1px solid #262626;
  background-color: #1e1e1e;
  object-fit: cover;
  overflow: hidden;
  aspect-ratio: 1;
  background-color: white;
  visibility: ${props => props.src !== "" ? `visibile` : `hidden`};
  @media only screen and (max-width: 776px) {
    width: 90vw;
    height: 90vw;
  }
`;

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
    width: 93vw;
    height: calc(100vh - ${props => props.currentStep === 1 ? 0 : 40}px);
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
    width: 90%;
    height: 100%;
    flex-direction: column;
    align-items: center;
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

const X = styled(IconX)`
  position: absolute;
  right: 2px;
  top: 9px;
  width: 28px;
  height: 28px;
  margin: 0 4px 0 0;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  & path {
    transition: all 0.2s ease-in-out;
    stroke: ${(props) => props.theme.color.gray};
    fill: ${(props) => props.theme.color.gray};
  }
  ${props => props.currentStep === 1 && css`
    @media only screen and (min-width: 776px) {
      display: none;
    }
  `}
`;


export default CreateForm;

// @media only screen and (max-width: 776px) {
//   margin-top: 6px;
//   }
