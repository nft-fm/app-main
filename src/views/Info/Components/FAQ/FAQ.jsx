import React from "react";
import { Question } from "./Question";

import styled from "styled-components";
export const FAQ = () => {
  return (
    <Container>
      {/* <ContainerTitle>FAQ</ContainerTitle>
      <ContainerOutline /> */}
      <Question
        question="What are NFTs?"
        // answer={<h1>hi</h1>}
        answer="NFTs are Non-Fungible Tokens. These are tokens that are unique and cannot be broken down into smaller components. These tokens can hold tidbits of information such as images, video, and audio! NFTs can be held or traded on the open internet."
      />
      <Question
        question="Can NFTs really be music?"
        answer="NFTs can hold anything that you can store as data. The most common formats people use are images and GIFs, but they can store multiple files of different formats."
      />
      <Question
        question="I’m new to crypto, how do I use your platform?"
        answer="Our platform is built on the decentralized web. To use our platform you must first install the extension MetaMask. After that, get some ethereum through a trading platform such as Coinbase. We will have a guide on how to use our platform shortly."
      />
      <Question
        question="How do I upload my music here?"
        answer="While our goal is to expand this platform to allow anyone to use it, we currently only allow verified artists to upload music. Please reach out to our team to get verified."
      />
      <Question
        question="What happens when I buy an NFT?"
        answer="You get a piece of original art that is verifiably yours. Think of it like buying a vinyl record that never loses audio quality and can’t ever be damaged. From there, you can keep your NFT for as long as you want, enjoying the music. However, just like a vinyl record, you also have the option of selling it to somebody else when it appreciates."
      />
      <Question
        question="How do I get my money once a sale has been made?"
        answer="Once a sale has been made the money is immediately deposited in your wallet!"
      />
      <Question
        question="Can a NFT Platform be Carbon Neutral?"
        answer="While cryptocurrency mining and transactions are becoming more efficient every year, it’s important to acknowledge the potential harm they can cause to the environment at the present. At NFT FM, we use the industry leading cryptoart-footprint API to calculate the global emissions caused by all transactions on our platform. At the end of each month, we purchase Carbon Credits equivalent to the calculated CO2 output to offset any potential carbon we produce."
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
