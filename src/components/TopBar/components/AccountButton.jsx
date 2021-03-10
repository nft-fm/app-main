import React, {useCallback, useEffect} from "react";
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
    axios.post(`api/gov/get-account`,
      { address: account, }).then(res => {
      console.log("user", res.data)
    }).catch(err => {
      console.log(err);
    })
  }

  const handleUnlockClick = useCallback(() => {
    if (isMobile()) {
      // connect('injected');
      connect("walletconnect");
    } else {
      connect("injected");
      // onPresentWalletProviderModal()
    }
    fetchAccount()
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
          <Oval />
          {isMobile() ? 
                    <StyledA
                    href={`https://etherscan.io/address/${account}`}
                    target={`_blank`}
                    style={{marginLeft: "-5px"}}
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
      font-family: "Comic Book";
      padding-bottom: 10px;
      @media only screen and (max-width: 767px) {
        font-size: 14px;
        font-weight: normal;
        margin-top: 0px;
        padding: 5px 0px 10px 5px;
      }
    `

const StyledAccountButton = styled.div`
      background-image: url(${buttonBG});
      width: 200px;
      height: 70px;
      background-size: contain;
      background-repeat: no-repeat;
      font-family: "Comic Book";
      cursor: pointer;
      transition: all 0.1s ease-in-out;
      display: flex;
      align-items: center;
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
