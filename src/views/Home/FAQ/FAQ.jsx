import React, {useState, useEffect} from "react";
import { Question } from "./Question";

export const FAQ = () => {
  return (
    <div>
      <Question
        question="What are NFTs?"
        answer="NFTs are Non-Fungible Tokens. These are tokens that are unique and cannot be broken down into smaller components. These tokens can hold tidbits of information such as images, video, and audio! NFTs can be held or traded on the open internet."
      />
      <Question
        question="Can NFTs really be music?"
        answer="NFTs can hold anything that you can store as data. The most common formats people use are images and GIFs, but they can store multiple files of different formats."
      />
      <Question
        question="I’m new to crypto, how do I use your platform?"
       answer="Our platform is built on the decentralized web. To use our platform you must first install the extension MetaMask. After that, get some ethereum through a trading platform such as Coinbase. For more in depth instructions, please follow our How To Use NFT FM Guide."
      />
      <Question
        question="How do I upload my music here?"
        answer="While our goal is to expand this platform to allow anyone to use it, we currently only allow verified artists to upload music. Please reach out to our team to get verified."
      />      
      <Question
        question="How do I get my money once a sale has been made?"
        answer="Once a sale has been made the money is immediately deposited in your wallet!"
      />      
    </div>
  );
};