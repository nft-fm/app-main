import React from "react";
import { Question } from "./Question";

export const FAQ = () => {
  return (
    <div style={{ marginTop: "15px" }}>
      <Question
        question="Did someone say Airdrops?!"
        answer="Yes! We are going to be airdropping 30% of the unburned $VINYL supply over 4 years! This comes to 2,500 $VINYL at the start of every month beginning July 2021 
        and ending June 2025. These tokens will be airdropped equally to all holders of FANFARE NFTs. Each NFT represents a percentage of the tokens to be received. So holding multiple NFTs = more airdrop!"
      />
      <Question
        question="Governance and Proposals"
        answer="Our governance board is composed of a reddit-style commenting and voting system. Each month we will publish an article directly addressing the top three highest voted proposals. In addition to that, we have a community polling system where we will be asking the community more direct yes/no style questions on topics such as features, collaborations, and how resources should be allocated. 
        The FANFARE team will do it’s best to ensure that the results of polls and community desires are respected and pursued. We will be publishing a history log of the polls taken and the resulting actions taken by FANFARE."
      />
      {/* <Question
        question="NFT Farming"
        answer="In early July, we plan to release two new staking pools. These pools will be for $VINYL staking, and $VINYL-LP staking. Staking $VINYL or $VINYL-LP will
         earn you BITTUNES points which grow towards redeemable mystery boxes. What will be in those boxes you ask?"
      />
      <Question
        question="Artist Launchpad"
        answer="We are starting a new artist launchpad program. The goal of this is to introduce rising artists to our community while also giving NFTs from these 
        musicians to our community for FREE! Any $VINYL holder or $VINYL liquidity provider can stake their tokens and race to redeem these free monthly NFTs. 
        We will be featuring a new artist every month and each artist launch will be accompanied by a blog post about their music."
      /> */}
    </div>
  );
};
