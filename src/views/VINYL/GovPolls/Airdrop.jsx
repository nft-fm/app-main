import axios from "axios";
import React, { useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import {airdrop} from "../../../web3/utils";
import swal from "sweetalert2";
import {utils} from "ethers";
import { forEach } from "async";

const Airdrop = () => {
  const [nftIds, setNftIds] = useState([]);
  const [holders, setHolders] = useState({ addresses: [], nftsOwned: [], amountToAirdrop: [], bignumberToAirdrop: []});
  const [nextBatchNum, setNextBatchNum] = useState(null);
  const [parseBatch, setParseBatch] = useState(0);

  const quantityToAirdrop = 2500;

  useEffect(() => {
    axios.get("/api/airdrop/nextBatchNum").then((res) => {
      console.log("next batch", res.data);
      if (res.data.batchNum) {
        setNextBatchNum(res.data.batchNum);
      }
    })
    axios.post("/api/airdrop/getNftIds").then((res) => {
      console.log(res);
      setNftIds(res.data.sort());
    });
  }, []);

  const roundDown = (num) => {
    return (Math.floor(num *= 10**9) * 10**-9);

  }

  const parseHolders = async () => {
    await axios.post("/api/airdrop/getHoldersFromDB", {batch: parseBatch}).then((res) => {
      let arr = [];
      for (let i = 0; i < res.data.length; i++) {
        arr.push(...res.data[i].holders);
      }

      console.log(arr);
      //iterate through array of holders. for each one check if it exists anywhere else in the array
      //if it does, remove it from the array and add quantity to original element's quantity
      arr.map((initialElement, index) => {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] !== arr[index]) {
            if (initialElement.address === arr[i].address) {
              console.log(initialElement, arr[i]);
              arr[index].quantity = arr[index].quantity + arr[i].quantity;
              arr.splice(i, 1);
            }
          }
        }
      });

      let totalNftsOwned = 0;
      for(let i = 0; i < arr.length; i++) {
        totalNftsOwned += arr[i].quantity;
        // console.log("")
      }
      console.log("total", totalNftsOwned);

      let addresses = [];
      let nftsOwned = [];
      let amountToAirdrop = [];
      let bignumberToAirdrop = [];

      arr.map(({ address, quantity }) => {
        addresses.push(address);
        nftsOwned.push(quantity);
        // calcs relative % of pool to airdrop, rounds down
        //  so that airdrop quantity fits within budget
        const toAirdrop = roundDown(((quantity / totalNftsOwned) * quantityToAirdrop)).toFixed(9)
        amountToAirdrop.push(toAirdrop);
        bignumberToAirdrop.push(utils.parseEther(toAirdrop))
      });

      setHolders({addresses, nftsOwned, amountToAirdrop, bignumberToAirdrop});
    });
  };

  const pullHoldersFromOpensea = async () => {
    const timer = ms => new Promise(res => setTimeout(res, ms))

    swal.fire({
      title: "this will create a new batch at this time by pulling from the opensea API",
    showDenyButton: "true"}).then(async (result) => {
      if (result.isConfirmed) {  
      console.log("pull");
        for (let index = 0; index < nftIds.length; index++) {
          axios
          .post("/api/airdrop/getHoldersFromOpenSea", { nftId: index, batch: nextBatchNum })
          .then((res) => {
            console.log("fetched", index, "\n", res.data);
          })
          await timer(3000); 
        }
    }
  })
}

  const fireAirdrop = () => {
    console.log("bignum", holders.bignumberToAirdrop);
    airdrop(holders.addresses, holders.bignumberToAirdrop, () => {
      swal.fire("airdropped!");
    })
  }

  //commented out the make batches function, need to add restriction to that route if the month's airdrop has already been done
  return (
    <Container>
        {(nftIds && nextBatchNum) &&
        <Contained>
          <div>
            Next Batch (to fetch): {nextBatchNum}
          </div>
          <button onClick={() => pullHoldersFromOpensea()}>
          Fetch New Batch {nextBatchNum} (pulls from opensea)
        </button>
        </Contained>
        }
        <br/>
        <Contained>
        <button onClick={() => parseHolders(parseBatch)}>Parse Batch</button>
        <input
          value={parseBatch}
          onChange={e =>setParseBatch(e.target.value)}
        ></input>
      </Contained>
      {holders.bignumberToAirdrop.length > 0 &&
              <Contained>
              <button onClick={() => fireAirdrop()}>AIRDROPPPPP!!!!</button>
            </Contained>
      }
      <br/>
      <Contained>
      <span>Nft Ids:</span>
      <NftIdsHolder>
        {nftIds.map((item) => (
          <NftIdSpan>{item}</NftIdSpan>
          ))}
      </NftIdsHolder>
        </Contained>
      {holders.addresses.length > 0 && (
        <HolderContainer>
          <Side style={{width: "50%"}}>
            Addresses
            {holders.addresses.map((item) => (
              <HolderRow>{item}</HolderRow>
            ))}
          </Side>
          <Side>
            NFTs Owned
            {holders.nftsOwned.map((item) => (
              <HolderRow>{item}</HolderRow>
            ))}
          </Side>
          <Side>
            VINYL drop
            {holders.amountToAirdrop.map((item) => (
              <HolderRow>{item}</HolderRow>
            ))}
          </Side>
        </HolderContainer>
      )}
    </Container>
  );
}

const Contained = styled.div`
`

const HolderContainer = styled.div`
  width: 1000px;
  display: flex;
`;
const Side = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
`;

const HolderRow = styled.div`
  display: flex;
  width: 100%;
`;

const NftIdsHolder = styled.div`
  display: flex;
`;

const NftIdSpan = styled.span`
  cursor: pointer;
  margin: 5px 5px;
  /* :hover {
    color: ${(props) => props.theme.color.blue};
  } */
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  color: white;
`;

const HoldersHolder = styled.div`
  width: 700px;
  height: 500px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
`;

export default Airdrop;
