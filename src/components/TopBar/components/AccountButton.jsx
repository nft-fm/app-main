import React, { useCallback, useEffect } from "react";
import ReactGA from "react-ga";
import styled from "styled-components";
import { useWallet } from "use-wallet";
import buttonBG from "../../../assets/img/unlock_wallet_bubble.png";
import useModal from "../../../hooks/useModal";
import isMobile from "../../../utils/isMobile";
import WalletProviderModal from "../../WalletProviderModal";
import axios from "axios";



const AccountButton = (props) => {
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />);

  const { account, connect } = useWallet();

  const fetchAccount = async () => {
    // axios.post(`api/gov/get-account`,
    //   { address: account, }).then(res => {
    //     console.log("user", res.data)
    //   }).catch(err => {
    //     console.log(err);
    //   })
  }

  // const hasIamAccount = () => {
  //   var AWS = require('aws-sdk');
  //   AWS.config.update({ region: 'us-west-2' });
  //   AWS.config.credentials = new AWS.CognitoIdentityCredentials({ IdentityPoolId: 'us-west-2:ec88c42c-41e1-4538-9833-50949bad4738' });

  //   var iam = new AWS.IAM({ apiVersion: '2010-05-08' });
  //   //TODO use wallet address as username
  //   var params = {
  //     UserName: "foo"
  //   };
  //   iam.getUser(params, function (err, data) {
  //     if (err && err.code === 'NoSuchEntity') {
  //       console.log("no such entity");
  //       // iam.createUser(params, function(err, data) {
  //       //   if (err) {
  //       //     console.log("Error", err);
  //       //   } else {
  //       //     console.log("Success", data);
  //       //   }
  //       // });
  //     } else {
  //       console.log("err, data", err, data);
  //       // console.log("User " + process.argv[2] + " already exists", data.User.UserId);
  //     }
  //   });
  // }

  const getS3Bucket = async () => {
    console.log("account: ", account);
    // await axios.post(`/api/user/getNftFolder/${account}`);

  }

  const handleUnlockClick = useCallback(() => {
    if (isMobile()) {
      // connect('injected');
      connect("walletconnect").then(() => { getS3Bucket() });
    } else {
      connect("injected").then(() => { getS3Bucket() });
      // onPresentWalletProviderModal()
    }
    fetchAccount();
  }, [onPresentWalletProviderModal, connect]);

  if (account) {
    ReactGA.set({
      userId: account,
      // any data that is relevant to the user session
      // that you would like to track with google analytics
    });
  }

  return (
    <StyledAccountButton>
      {!account ? (
        <Button onClick={handleUnlockClick}>Unlock Wallet</Button>
      ) : (
        <StyledAccountInfo>
          {/* <Oval /> */}
          {isMobile() ?
            <StyledA
              href={`https://etherscan.io/address/${account}`}
              target={`_blank`}
              style={{ marginLeft: "-5px" }}
            >
              <div>
                {

                  account.substring(0, 6)
                }
              </div>
              <div>
                {
                  "..." +
                  account.substring(account.length - 4)}
              </div>
            </StyledA> :
            <StyledA
              href={`https://etherscan.io/address/${account}`}
              target={`_blank`}
            >
              {account.substring(0, 6) +
                "..." +
                account.substring(account.length - 4)}
            </StyledA>
          }
        </StyledAccountInfo>
      )}
    </StyledAccountButton>
  );
};

const Button = styled.button`
      border: none;
      background-color: rgba(0, 0, 0, 0);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
color: white;
      @media only screen and (max-width: 767px) {
        font-size: 14px;
        font-weight: normal;
        margin-top: 0px;
        padding: 5px 0px 10px 5px;
      }
    `

const StyledAccountButton = styled.div`
      width: 200px;
      /* height: 70px; */
      cursor: pointer;
      transition: all 0.1s ease-in-out;
      display: flex;
      /* align-items: center; */
      justify-content: center;
      &:hover {
        transform: scale(1.1);
      }
      @media only screen and (max-width: 767px) {
        background-size: 100% 100%;
        width: 100px;
        margin-left: -15px;
      }
    `

const Oval = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 5px;
  background-color: #7dca46;
  margin-right: 10px;
`;

const StyledAccountInfo = styled.div`
  padding-bottom: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;

`;

const StyledA = styled.a`
  font-family: "Bangers";
  font-size: 20px;
  line-height: 1;
  text-decoration: none !important;
  color: #ffb700;
  transition: all 0.1s linear;
  opacity: 0.85;
  &:hover {
    opacity: 1;
  }
`;

export default AccountButton;
