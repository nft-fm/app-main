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


// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   & > h1 {
//     align-self: center;
//   }
// `;
const ContainerTitle = styled.span`
  position: absolute;
  font-weight: 600;
  left: calc(10% + 50px);
  top: ${(props) => (props.faq ? "-8px" : "-8px")};
  padding: 0 12px;
  font: "Compita";
  background-color: ${(props) => props.theme.bgColor};
  font-size: ${(props) => props.theme.fontSizes.sm};
  color: ${(props) => (props.faq ? "#3d3d3d" : props.theme.color.gray)};
  display: flex;
  flex-direction: row;
  display: flex;
  align-items: center;
  b {
    margin-left: 5px;
    // font-size: 18px;
    color: ${(props) => props.theme.color.gray};
    font-size: ${(props) => props.theme.fontSizes.sm};
  }
  b.first {
    margin-left: 0px;
  }
`;

const ContainerOutline = styled.div`
  border-radius: 24px 24px 0 0;
  border: 6px solid #383838;
  border-bottom: none;
  height: 40px;
  width: 80%;
  display: flex;
  flex-direction: row;
`;

// {
/*FAQ
What are NFTs?
NFTs are Non-Fungible Tokens. These are tokens that are unique and cannot be broken down into smaller components. These tokens can hold tidbits of information such as images, video, and audio! NFTs can be held or traded on the open internet.

Can NFTs really be music?
NFTs can hold anything that you can store as data. While the most common formats people use are images and GIFs, we believe NFTs to be the future of music trading and collecting. 

I’m new to crypto, how do I use your platform?
We understand cryptocurrency can be a new sometimes scary concept. That’s okay! Before you buy your first song or album on NFT FM, we would love for you to read our full guide on cryptocurrencies, NFTs, and how they can be used.
However, if you can’t wait to start collecting music of your own, here’s some quick instructions to get you started trading right away:
Our platform is built on the decentralized web. To use our platform, you’ll first have to install the extension MetaMask. MetaMask is a (what is MetaMask to make them feel more comfortable).
Next, purchase enough Ethereum to purchase your favorite music on through a trading platform such as Coinbase. You can see how much Ethereum each song or album costs in the discover page.
Finally, you’re ready to start trading. Navigate back to the Discover page to buy a song, album, or even just to browse. 

What happens when I buy an NFT?
You get a piece of original art that is verifiably yours. Think of it like buying a vinyl record that never loses audio quality and can’t ever be damaged. From there, you can keep your NFT for as long as you want, enjoying the music. However, just like a vinyl record, you also have the option of selling it to somebody else when it appreciates.
 
I have an NFT that I want to trade away.
 NFTs function just like cryptocurrency, except they’re tied to other pieces of media. In this case, music. When selling your NFT becomes a good investment for you, (steps on trading away/placing a sell price)

 Aren’t cryptocurrencies really bad for the environment?
 While cryptocurrency mining and transactions are becoming more efficient every year, it’s important to acknowledge the potential harm they can cause to the environment at the present. At NFT FM, we use the industry leading cryptoart-footprint API to calculate the global emissions caused by all transactions on our platform. At the end of each month, we purchase Carbon Credits equivalent to the calculated CO2 output to offset any potential carbon we produce. If you want to read more on our commitment to environmental protection, you can read more on our (more details on another page)
*/
// }
