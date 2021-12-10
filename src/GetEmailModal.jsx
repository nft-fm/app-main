import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { AccountProvider, useAccountConsumer } from "./contexts/Account";
import { ReactComponent as XIcon } from "./assets/img/icons/x.svg";
import { ReactComponent as IconShare } from "./assets/img/icons/share.svg";
import { ReactComponent as CheckIcon } from "./assets/img/icons/check_circle.svg";
import swal from 'sweetalert2'
import metamaskLogo from "./assets/img/metamask_fox.svg";

const GetEmailModal = () => {
  const [open, setOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false)
  const { account, user, connect } = useAccountConsumer();

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
      setSubmitted(true);
    }

    console.log("user", user, user?.email === "", storedEmail);
    if (user && user?.email === "" && storedEmail) {
      axios.post("/api/user/add-email", { email: storedEmail, address: user.address })
        .then(() => {
        })
        .catch((err) => console.error(err));
      //save email to user
    }
  }, [user, submitted, account])

  function getMetaMaskLink() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(userAgent)) {
      return {
        title: "Open in App Store",
        link: "https://metamask.app.link/bxwkE8oF99",
      };
    }
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return {
        title: "Open in App Store",
        link: "https://metamask.app.link/skAH3BaF99",
      };
    }
    return {
      title: "Open Instructions",
      link: "https://metamask.io/download.html",
    };
  }

  const handleUnlockClick = () => {
    if (window.ethereum) {
      connect("injected")
    }
    else
      openMetamaskAlert();
  }

  const openMetamaskAlert = async () => {
    if (account) return;
    const { title, link } = getMetaMaskLink();
    swal
      .fire({
        title: "You need to install metamask.",
        confirmButtonText: title,
        imageUrl: metamaskLogo,
        imageWidth: 100,
      })
      .then(({ isConfirmed }) => {
        if (isConfirmed) {
          window.open(link, "_blank").focus();
        }
      });
  };

  const submitEmail = (e) => {
    e.preventDefault()
    if (!account)
      handleUnlockClick()

    let validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!validEmail.test(email)) {
      setError(true);
      return;
    }
    axios.post("/api/user/add-to-email-list", { email })
      .then(() => {
        setSubmitted(true);
        localStorage.setItem('email', email);
      })
      .catch((err) => console.error(err));
  }


  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(`https://beta.fanfare.fm/?utm_source=referral&utm_campaign=airdrop_1&utm_content=${account}`).then(() => setCopied(true))
  }

  const openIfClosed = () => {
    if (!open) {
      setOpen(true);
    }
  }


  return (
    <Modal open={true}>
      <ModalContents>
        <Half>
          Sign up for our Full Release and <br /> earn a <span style={{ color: "#20A4FC", fontWeight: "600" }}>free NFT!</span>
        </Half>
        <LearnMoreLink target="_blank"
            rel="noopener noreferrer" href={`https://fanfare.fm/?source=beta&campaign=email_signup`}>
            VISIT FULL SITE
          </LearnMoreLink>
      </ModalContents>
    </Modal>
  );
}

const LearnMoreLink = styled.a`
margin-bottom: 4px;
text-decoration: underline;
    color: rgb(240, 240, 240);
    font-size: 18px;
    background-color: rgba(0, 0, 0, 0);
    border: none;
    cursor: pointer;
    margin-top: 10px;
`

const ModalContents = styled.div`
width: 100%;
height: 100%;
display: flex;
justify-content: space-between;
flex-direction: column;
overflow: hidden;
`

const Confirm = styled.div`
display: flex;
flex-direction: row;
align-items: center;
margin: 5px;
`

const ReferInput = styled.input`
outline: none;
  padding: 5px 8px 3px 8px;
  height: 20px;
  font: "Compita";
  background-color: ${(props) => props.theme.color.boxBorder};
  font-size: ${(props) => props.theme.fontSizes.xs};
  color: white;
  border: 4px solid #383838;
  border-radius: 20px;
  display: flex;
  margin-left: 10px;
  width: ${props => props.width}px;
  cursor: pointer;
  user-select: none;
  pointer-events: none;
  `

const Submit = styled.button`
  cursor: pointer;
  background-color: #131313;
    border: 1px solid transparent;
    margin-left: 10px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content:center;
    box-shadow: 1px 1px 1px #383838;
    transition: all 0.1s ease-in-out;
    &:hover {
  background-color: #1f1f1f;
      &>svg {
        & path {
        fill: ${(props) => props.theme.color.green};
      }
      }}
`

const Share = styled(IconShare)`
  cursor: pointer;
  width: 18px;
  height: 18px;
  transition: all 0.1s ease-in-out;
  & path {
    fill: ${(props) => props.theme.color.white};
  }
`;

const Check = styled(CheckIcon)`
  cursor: pointer;
  width: 24px;
  height: 24px;
  transition: all 0.1s ease-in-out;
  & path {
    fill: ${(props) => props.theme.color.white};
  }
`;

const X = styled(XIcon)`
  cursor: pointer;
  width: 22px;
  height: 22px;
  & path {
    fill: ${(props) => props.theme.color.white};
  }
  position: absolute;
  top: 2px;
  right: 2px;
`;

const Input = styled.input`
width: calc(100% - 8px);
text-align: center;
color: white;
background-color: #131313;
border: 1px solid ${props => props.error ? "red" : "transparent"};
border-bottom: 1px solid ${props => props.error ? "red" : "#383838"};
height: 30px;
font-size: 16px;
border-radius: 4px;
&:focus {
}
`

const Half = styled.div`
font-size: 16px;
line-height: 18px;
font-weight: 300;
letter-spacing: .5px;
`

const ReferSection = styled.div`
font-size: 16px;
line-height: 22px;
font-weight: 300;
letter-spacing: .5px;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
`

const Bottom = styled.div`
font-size: 16px;
line-height: 22px;
font-weight: 300;
letter-spacing: .5px;
display: flex;
flex-direction: row;
width: 100%;
justify-content: space-between;
`

const Modal = styled.div`
height: ${props => props.open ? "80px" : "40px"};
width: ${props => props.open ? "280px" : "40px"};
padding: ${props => props.open ? "16px" : "0px"};
max-width: 85vw;
transition: all 0.1s ease-in-out;
position: fixed;
display: flex;
align-items: center;
justify-content: center;
text-align: center;
cursor: ${props => props.open ? "default" : "pointer"};
top: 75px;
right: 10px;
border: 1px solid  ${(props) => props.theme.color.boxBorder};
background: ${props => props.theme.color.box};
color: white;
/* border-radius: 0 0 0 20px; */
border-radius: ${(props) => props.theme.borderRadius}px;
z-index: 101;
@media only screen and (max-width: 776px) {
  margin-top: 150px;
}
`

export default GetEmailModal;
