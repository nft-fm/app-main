import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { Question } from "./Question";

export const FAQ = () => {
  return (
    <div>
      <Header>Frequently Asked Questions</Header>
      <Question
        question="What is a wStock?"
        answer="A wrapped stock is a token that is directly backed by the equivalent stock. 
        This is a 1:1 relationship: for every wStock, there is securely held stock which backs it."
      />
      <Question
        question="Can wStocks be exchanged for the underlying stock price?"
        answer="Yes. Anybody that is able to purchase wStocks is also able to exchange wStocks for its 
        current market price."
      />
      <Question
        question="Are there any trading restrictions?"
        answer="For phase 1 the trading platform will start open only during trading hours, with a $3,000 cap. 
        These are in place to reduce risk for us in the early part of phase 1. 
        We plan to expand and quickly remove these restrictions."
      />
      <Question
        question="Who can currently use StonkSwap?"
        answer="At the moment, only Eligible Contract Participants (ECPs) are able to directly purchase wStocks. 
        An ECP is somebody with over $10 million in current investments. We understand this is prohibitive, 
        but we have to do this to remain compliant with US regulation. During phase 2, anybody will be able
        to purchase wStock."
      />
      <Question
        question="When will everybody be eligible to use StonkSwap?"
        answer="Allowing everybody to directly purchase wStocks would require us to be a stock broker. 
        The path to achieving this is expensive, so this will be done in our second phase."
      />
      <Question
        question="Why do you need information for KYC?"
        answer="Know your customer laws are in place to prevent the funding of illicit activity. KYC is 
        required for several different areas including anti-money laundering laws (AML). While we believe 
        this lack of anonymity goes against a primary goal of cryptocurrency, we must collect it to reamin 
        compliant with US regulations."
      />
      <Question
        question="How is this different from Mirrored Assets (mAssets)?"
        answer="While Mirrored Assets generally stay close to the relevant real asset, there's no direct tie. 
        Buying a mAsset does not effect the underlying security whatsoever, since there's no direct connection.
        A wStock is fundamentally different since wStocks are directly backed by the real-world asset. If 10 
        wGME are minted, 10 GME stocks are bought. This means that wStocks have a direct effect on the market."
      />
      <Question
        question="How are stocks chosen to be added to the platform?"
        answer="Our initial basket of stocks has been chosen to be particularly relevent 
        to the average retail investor. Going forward, our plan is for stocks to be 
        chosen by holders of our governance token."
      />
      <Question
        question="What fees are there?"
        answer="Stonk governance tokens will be spent with each trade as a gas fee. These tokens can be purchased during a sale."
      />
      <Question
        question="What is the trading fee used for?"
        answer="The trading fee covers our risk, server costs, and development costs."
      />
      <Question
        question="Who holds all of the backing assets?"
        answer="The backing assets are held directly by StockSwap Inc."
      />
      {/* <Question
        question="StonkSwap is an additional layer between the investor and the underlying security. Why is it necessary?"
        answer="This additional layer allows 24/7 trading, inherently divisible shares, and open international investment."
      /> */}
      <Question
        question="What is planned for stock dividends?"
        answer="Stock dividends currently offset part of the risk taken in trading. In the future, we plan to offer dividends in phase 2."
      />
      <Question
        question="How will you handle voting rights?"
        answer="This is currently undecided. Potentially, a collective decison based upon 
        the wishes of governance token holders will be made."
      />
    </div>
  );
};

const Header = styled.h1`
  margin: 15;
  font-size: 4vw;
  font-family: "PlatNomor";
  color: white;
  @media only screen and (max-width: 1337px) {
    font-size: 8vw;
  }
  @media only screen and (max-width: 991px) {
    font-size: 10vw;
  }
`;
