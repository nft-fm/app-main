import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { AccountProvider, useAccountConsumer } from "./contexts/Account";
import { ReactComponent as XIcon } from "./assets/img/icons/x.svg";
import { ReactComponent as CheckIcon } from "./assets/img/icons/check_circle.svg";

const GetEmailModal = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false)
  const { account, user } = useAccountConsumer();

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
      setSubmitted(true);
    }
    if (account) {
      setOpen(true)
    }
    console.log("user", user, user?.email === "", storedEmail);
    if (user && user?.email === "" && storedEmail) {
      axios.post("/api/user/add-email", { email: storedEmail, address: user.address })
        .then(() => {
        })
        .catch((err) => console.error(err));
      //save email to user
    }
  }, [user, submitted])

  const submitEmail = (e) => {
    e.preventDefault()

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

  if (open) {
    return (
      <Modal>
        <X onClick={() => setOpen(false)} />
        {!submitted &&
          <Half>
            Sign up for our new<br />
            platform to earn a <span style={{ color: "#20A4FC", fontWeight: "600" }}>free NFT!</span>
          </Half>
        }
        <Half>
          <form onSubmit={(e) => submitEmail(e)}>
            {!submitted ?
              <Bottom>
                <Input
                  error={error}
                  name="email"
                  placeholder="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                >
                </Input>
                <Submit type="submit">
                  <Check />
                </Submit>
              </Bottom>
              :
              <Half>
                Thanks! Please share with your friends<br />
                for <span style={{ color: "#20A4FC", fontWeight: "600" }}>100 VINYL</span> whenever someone joins! <br />
              </Half>
            }
          </form>
        </Half>
        {submitted &&
          <ReferSection>
            <ReferInput width={copied ? 200 : 300} value={`https://beta.fanfare.fm/?utm_source=referral&utm_campaign=airdrop_1&utm_content=${account}`} onClick={copyToClipboard} /> {copied && <Confirm><Check />copied!</Confirm>}
          </ReferSection>
        }
      </Modal>
    );
  }
  return null;
}

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

const Thanks = styled.div`
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-image: linear-gradient(to right, #20a4fc, #fde404 35%, #68c12f 68%, #fa423e);
  width: 254px;
  height: 32px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-weight: 600;
`

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
  top: 0;
  right: 0px;
`;


// const Exit = styled.div`
// position: absolute;
// top: 0;
// right: 0;
// width: 20px;
// `

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
  outline: ${props => props.error ? "none" : "1px solid white"};
}
`

const Half = styled.div`
font-size: 16px;
line-height: 22px;
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
height: 100px;
    width: 340px;
display: flex;
justify-content: space-between;
flex-direction: column;
position: absolute;
text-align: center;
/* height: 20px; */
/* width: 200px; */
padding: 16px;
top: 110px;
right: 10px;
border: 1px solid  ${(props) => props.theme.color.boxBorder};
background: ${props => props.theme.color.box};
color: white;
/* border-radius: 0 0 0 20px; */
border-radius: 2px;
z-index: 100;
@media only screen and (max-width: 776px) {
  margin-top: 150px;
}
`

export default GetEmailModal;
