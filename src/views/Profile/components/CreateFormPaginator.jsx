import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import ReactToolTip from "react-tooltip";
import swal from "sweetalert2";
import { errorIcon, warningIcon, questionIcon, imageWidth, imageHeight } from "../../../utils/swalImages";
import { ReactComponent as rightArrow } from "../../../assets/img/homepage_assets/right-arrow-3.svg";

const PaginatorButton = ({ children, currentStep, prev, onClick }) => 
  <StyledAccountButton currentStep={currentStep} prev={prev} onClick={onClick}>
    {prev ? <RightArrow prev={prev} /> : null}
    <Button type="button">
      {children}
    </Button>
    {!prev ? <RightArrow /> : null}
  </StyledAccountButton>

const CreateFormPaginator = ({ 
  currentStep,
  setCurrentStep, 
  handleSubmit, 
  nftData,
  isLoadingAudio,
  isLoadingImage
}) => {
  // checking for completion
  // const [step2, setStep2] = useState(false);
  // const [step3, setStep3] = useState(false);
  // const [step4, setStep4] = useState(false);
  const [step2, setStep2] = useState(true);
  const [step3, setStep3] = useState(true);
  const [step4, setStep4] = useState(true);
  const { 
    imageUrl, audioUrl,
    producer, title, genre,  description,
    price, numMinted,
  } = nftData;

  const onClickDotNavigate = (step) => {
    if (isLoadingAudio || isLoadingImage) return;
    if (step === 1 || currentStep > step) return setCurrentStep(step);
    if ((step2 && step === 2) || 
    (step3 && step === 3) || 
    (step4 && step === 4)) {
      return setCurrentStep(step);
    } else {
      return ;
    }
  }

  const confirmSubmit = () => 
    swal.fire({
      title: "Are you sure you want this NFT?",
      text: "This action cannot be reversed",
      imageUrl: warningIcon,
      imageWidth,
      imageHeight,
      showCancelButton: true     
    }).then(res => !res.isDismissed ? handleSubmit() : null);
  

  const paginateNext = () => {
    if (isLoadingAudio || isLoadingImage) return;
    if (currentStep === 1 || (step2 && currentStep === 2) || 
    (step3 && currentStep === 3)) {
      return setCurrentStep(currentStep + 1);
    } else if (currentStep === 4) {
      if (imageUrl === "" || audioUrl === "") {
        return swal.fire({
          title: "Music + image, or an video file must be available to continue.",
          timer: 5000,
          imageUrl: errorIcon,
          imageWidth,
          imageHeight      
        });
      }
      if (!producer || !title || !genre || !description ||
        producer === "" || title === "" || genre === "Select" || description === "") {
        return swal.fire({
          title: "You must fill out the required artist fields.",
          timer: 5000,
          imageUrl: errorIcon,
          imageWidth,
          imageHeight      
        });
      }
      if (price <= 0 || numMinted <= 0) {
        return swal.fire({
          title: "Price and Quantity must be greater than 0",
          timer: 5000,
          imageUrl: errorIcon,
          imageWidth,
          imageHeight      
        });
      }
      return setCurrentStep(currentStep + 1);
    } else if (currentStep === 2) {
      return swal.fire({
        title: "Music + image, or an video file must be available to continue.",
        timer: 5000,
        imageUrl: errorIcon,
        imageWidth,
        imageHeight      
      });
    } else if (currentStep === 3) {
      return swal.fire({
        title: "You must fill out the required artist fields.",
        timer: 5000,
        imageUrl: errorIcon,
        imageWidth,
        imageHeight      
      });
    }
  }

  const paginateBack = () => {
    if (!isLoadingAudio && !isLoadingImage)
      setCurrentStep(currentStep - 1)
  }

  useEffect(() => {
    if (imageUrl !== "" && audioUrl !== "")
      setStep2(true)
    if (producer !== "" && title !=="" && genre !== "Select a genre" && description !== "") 
      setStep3(true)
    if (price > 0 && numMinted > 0) 
      setStep4(true)
  }, [imageUrl, audioUrl, producer, title, genre, price, numMinted, description])
  
  return (
    <PaginatorContainer>
      <PaginatorButton prev currentStep={currentStep} onClick={() => paginateBack()}>
        Back
      </PaginatorButton>
      <DotContainer>
        <Dot 
          id="saleorauction" 
          data-tip 
          data-for="saleorauction" 
          step={1} 
          currentStep={currentStep}
          onClick={() => onClickDotNavigate(1)}
          color="dodgerblue"
        />
        <Dot 
          id="upload-assets" 
          data-tip data-for="upload-assets" 
          step={2} 
          currentStep={currentStep} 
          onClick={() => onClickDotNavigate(2)}
          completed={step2 === true}
          color="gold"
        />
        <Dot 
          id="artist-info" 
          data-tip 
          data-for="artist-info" 
          step={3} 
          currentStep={currentStep} 
          onClick={() => onClickDotNavigate(3)}
          completed={step3 === true}
          color="yellowgreen"
        />
        <Dot 
          id="sale-options"
          data-tip data-for="sale-options"
          step={4}
          currentStep={currentStep}
          onClick={() => onClickDotNavigate(4)}
          completed={step4 === true} 
          color="tomato"
        />
        <ReactToolTip id="saleorauction" place="bottom" effect="solid">
          Auction or Sale
        </ReactToolTip>
        <ReactToolTip id="upload-assets" place="bottom" effect="solid">
          Upload Assets
        </ReactToolTip>
        <ReactToolTip id="artist-info" place="bottom" effect="solid">
          Artist Info
        </ReactToolTip>
        <ReactToolTip id="sale-options" place="bottom" effect="solid" >
          Sale Options
        </ReactToolTip>
      </DotContainer>
      {currentStep === 5 ?
        <PaginatorButton 
          currentStep={currentStep} 
          onClick={() => confirmSubmit()}
        >
          Submit
        </PaginatorButton> : 
        <PaginatorButton 
          currentStep={currentStep} 
          onClick={() => paginateNext()}
        >
          Next
        </PaginatorButton>
      }
    </PaginatorContainer>
  )
}

const RightArrow = styled(rightArrow)`
  width: 18px;
  height: 18px;
  & path {
    fill: white;
    font-weight: 900;
  }
  ${props => props.prev && css` 
    transform: rotate(180deg);
  `}
`;

const PaginatorContainer = styled.div`
  display: flex;
  padding: 0 20px;
  width: calc(100% - 40px);
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 10px;
  z-index: 502;
  @media only screen and (max-width: 776px) {
    width: calc(95% - 40px);
  }
`

const Button = styled.button`
  border: none;
  background-color: transparent;
  font-size: ${(props) => props.theme.fontSizes.xs};
  display: flex;
  letter-spacing: 1px;
  align-items: center;
  font-weight: 600;
  cursor: pointer;
  color: white;
  @media only screen and (max-width: 776px) {
    display: none;
  }
`;

const StyledAccountButton = styled.div`
  width: 100px;
  padding: 8px 15px;
  display: flex;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  /* border: 1px solid ${(props) => props.theme.color.red}; */
  height: 24px;
  border-radius: 8px;
  font-family: "Compita";
  background-color: ${props => props.prev ? "#181818" : props.theme.color.blue };
  &:hover {
    background-color: rgba(256, 256, 256, 0.2);
  }
  ${props => (props.currentStep === 1 && props.prev) && css`
    visibility: hidden;
  `}
  @media only screen and (max-width: 776px) {
    width: 50px;
  }
`;

const DotContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Dot = styled.span`
  height: 15px;
  width: 15px;
  margin: 20px 5px;
  background-color: ${
    props => (props.color && props.currentStep >= props.step ) || props.completed ? props.color : "#181818"
  };
  border-radius: 50%;
  display: inline-block;

  ${props => (props.currentStep === props.step) 
  && css`
    border: 2px solid white;
  `}

  ${props => (props.currentStep > props.step) 
  && css`
    cursor: pointer;
  `}
`


export default CreateFormPaginator;