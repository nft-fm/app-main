import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useAccountConsumer } from "../../../contexts/Account";
import { ReactComponent as GiftIcon } from "../../../assets/img/icons/rewards-gift.svg";
import axios from "axios";

const RedeemForm = (props) => {
  const { setFormSubmitted, alreadyRedeemed } = props;

  const { account } = useAccountConsumer();

  const [email, setEmail] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [home, setHome] = useState("");
  const [apt, setApt] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const emailRef = useRef(null);
  const firstRef = useRef(null);
  const lastRef = useRef(null);
  const homeRef = useRef(null);
  const aptRef = useRef(null);
  const cityRef = useRef(null);
  const countryRef = useRef(null);
  const stateRef = useRef(null);
  const zipRef = useRef(null);

  const [complete, setComplete] = useState(false);

  if (
    email !== "" &&
    first !== "" &&
    last !== "" &&
    home !== "" &&
    city !== "" &&
    country !== "" &&
    state !== "" &&
    zip !== "" &&
    !complete
  ) {
    setComplete(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      address: account,
      email: email,
      firstL: first,
      last: last,
      home: home,
      apt: apt,
      city: city,
      country: country,
      state: state,
      zip: zip,
    };
    axios
      .post("/api/user/shipping", formData)
      .then((res) => {
        if (res.status === 200) {
          axios
            .post("/api/user/updateRedeemers", { address: account, nftId: 16 }) //CHANGE THIS TO SAQI's NFT ID!!!!!!!!
            .then((res) => {
              if (res.status === 200) {
                setFormSubmitted(true);
              }
            });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container onSubmit={(e) => !alreadyRedeemed && handleSubmit(e)}>
      <Header>
        <span>Contact Information</span>
      </Header>
      <EmailContainer>
        <InputBoxMedium
          onClick={() => !alreadyRedeemed && emailRef.current.focus()}
        >
          <InputLabel>Email</InputLabel>
          {alreadyRedeemed ? (
            <StyledInput disabled />
          ) : (
            <StyledInput
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              ref={emailRef}
            />
          )}
        </InputBoxMedium>
        <ShippingHeader>Shipping Address</ShippingHeader>
      </EmailContainer>
      <ShippingForm>
        <InputBoxMedium
          onClick={() => !alreadyRedeemed && firstRef.current.focus()}
        >
          <InputLabel>First Name</InputLabel>

          {alreadyRedeemed ? (
            <StyledInput disabled />
          ) : (
            <StyledInput
              type="text"
              onChange={(e) => setFirst(e.target.value)}
              ref={firstRef}
            />
          )}
        </InputBoxMedium>
        <InputBoxMedium
          onClick={() => !alreadyRedeemed && lastRef.current.focus()}
        >
          <InputLabel>Last Name</InputLabel>

          {alreadyRedeemed ? (
            <StyledInput disabled />
          ) : (
            <StyledInput
              type="text"
              onChange={(e) => setLast(e.target.value)}
              ref={lastRef}
            />
          )}
        </InputBoxMedium>
        <InputBoxLarge
          onClick={() => !alreadyRedeemed && homeRef.current.focus()}
        >
          <InputLabel>Address</InputLabel>

          {alreadyRedeemed ? (
            <StyledInput disabled />
          ) : (
            <StyledInput
              type="text"
              onChange={(e) => setHome(e.target.value)}
              ref={homeRef}
            />
          )}
        </InputBoxLarge>
        <InputBoxMedium
          onClick={() => !alreadyRedeemed && aptRef.current.focus()}
        >
          <InputLabel>Apt/Suite/etc. (Optional)</InputLabel>

          {alreadyRedeemed ? (
            <StyledInput disabled />
          ) : (
            <StyledInput
              type="text"
              onChange={(e) => setApt(e.target.value)}
              ref={aptRef}
            />
          )}
        </InputBoxMedium>
        <InputBoxMedium
          onClick={() => !alreadyRedeemed && cityRef.current.focus()}
        >
          <InputLabel>City</InputLabel>

          {alreadyRedeemed ? (
            <StyledInput disabled />
          ) : (
            <StyledInput
              type="text"
              onChange={(e) => setCity(e.target.value)}
              ref={cityRef}
            />
          )}
        </InputBoxMedium>
        <InputBoxSmall
          onClick={() => !alreadyRedeemed && countryRef.current.focus()}
        >
          <InputLabel>Country/Region</InputLabel>

          {alreadyRedeemed ? (
            <StyledInput disabled />
          ) : (
            <StyledInput
              type="text"
              onChange={(e) => setCountry(e.target.value)}
              ref={countryRef}
            />
          )}
        </InputBoxSmall>
        <InputBoxSmall
          onClick={() => !alreadyRedeemed && stateRef.current.focus()}
        >
          <InputLabel>State</InputLabel>

          {alreadyRedeemed ? (
            <StyledInput disabled />
          ) : (
            <StyledInput
              type="text"
              onChange={(e) => setState(e.target.value)}
              ref={stateRef}
            />
          )}
        </InputBoxSmall>
        <InputBoxSmall
          onClick={() => !alreadyRedeemed && zipRef.current.focus()}
        >
          <InputLabel>ZIP code</InputLabel>

          {alreadyRedeemed ? (
            <StyledInput disabled />
          ) : (
            <StyledInput
              type="text"
              onChange={(e) => setZip(e.target.value)}
              ref={zipRef}
            />
          )}
        </InputBoxSmall>
      </ShippingForm>
      <RedeemSection>
        <RedeemButton type="submit" complete={complete}>
          Redeem <Gift complete={complete} />
        </RedeemButton>
      </RedeemSection>
    </Container>
  );
};

const Container = styled.form`
  width: 100%;
  /* height: 800px; */
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  background-color: ${(props) => props.theme.color.box};
  border: 2px solid ${(props) => props.theme.color.boxBorder};
  margin-top: 100px;
  /* padding: 36px 0 40px; */
  @media only screen and (max-width: 776px) {
    margin: 50px 0;
    border-radius: 0px;
  }
`;

const Header = styled.div`
  width: calc(100% - 80px);
  border-bottom: 2px solid ${(props) => props.theme.color.boxBorder};
  padding: 36px 20px;
  & > span {
    color: white;
    font-size: ${(props) => props.theme.fontSizes.lg};
  }
  @media only screen and (max-width: 776px) {
    width: 100%;
  }
`;

const EmailContainer = styled.div`
  width: calc(100% - 80px);
  border-bottom: 2px solid ${(props) => props.theme.color.boxBorder};
  padding: 0px 20px 20px;
  & > div {
    margin-bottom: 20px;
  }
  @media only screen and (max-width: 776px) {
    width: 100%;
  }
`;

const ShippingHeader = styled.span`
  color: white;
  font-size: ${(props) => props.theme.fontSizes.lg};
  padding: 20px 0;
`;

const InputBoxSmall = styled.div`
  width: calc(33% - 40px);
  background-color: #131313;
  padding: 10px 15px 5px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  @media only screen and (max-width: 776px) {
    width: calc(100% - 40px);
  }
`;
const InputBoxMedium = styled.div`
  width: calc(50% - 40px);
  background-color: #131313;
  padding: 10px 15px 5px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  @media only screen and (max-width: 776px) {
    width: calc(100% - 40px);
  }
`;
const InputBoxLarge = styled.div`
  width: calc(100% - 40px);
  background-color: #131313;
  padding: 10px 15px 5px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;
const InputLabel = styled.label`
  color: #7c7c7c;
  font-size: ${(props) => props.theme.fontSizes.xs};
`;

const StyledInput = styled.input`
  outline: none;
  background-color: #131313;
  border: none;
  color: white;
`;

const ShippingForm = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-bottom: 2px solid ${(props) => props.theme.color.boxBorder};
  justify-content: space-between;
  padding: 0 20px 20px;
`;

const RedeemSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

const RedeemButton = styled.button`
  border-radius: 15px;
  background-color: #262626;
  border: solid 1px
    ${(props) => (props.complete ? props.theme.color.red : `#383838`)};
  font-family: Compita;
  font-size: 30px;
  font-weight: 500;
  color: #707070;
  padding: 10px 20px;
  cursor: ${(props) => (props.complete ? "pointer" : "not-allowed")};
`;

const Gift = styled(GiftIcon)`
  width: 25px;
  height: 25px;
  padding-left: 5px;
  margin-bottom: -3px;

  & path {
    fill: ${(props) => props.complete && props.theme.color.red};
  }
`;

export default RedeemForm;
