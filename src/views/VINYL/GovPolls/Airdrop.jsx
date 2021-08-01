import axios from "axios";
import React, { useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";

const Airdrop = () => {
  const [nftIds, setNftIds] = useState([]);
  const [holders, setHolders] = useState({ addresses: [], quantities: []});
  const [nextBatchNum, setNextBatchNum] = useState(null);
  const [parseBatch, setParseBatch] = useState(0);

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
      let holderAdresses = [];
      let holderQuantities = [];

      arr.map(({ address, quantity }) => {
        holderAdresses.push(address);
        holderQuantities.push(quantity);
      });

      setHolders({addresses: holderAdresses, quantities: holderQuantities});
    });
  };

  const pullHoldersFromOpensea = async () => {
    const timer = ms => new Promise(res => setTimeout(res, ms))

    console.log("pull");
      for (let index = 0; index < nftIds.length; index++) {
        axios
        .post("/api/airdrop/getHoldersFromOpenSea", { nftId: index, batch: nextBatchNum })
        .then((res) => {
          console.log("fetched", index, "\n", res.data);
        })
        .catch((err) => console.log(err));
        await timer(3000); 
  }}


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
          <LeftSide>
            Holder Addresses
            {holders.addresses.map((item) => (
              <HolderRow>{item}</HolderRow>
            ))}
          </LeftSide>
          <RightSide>
            Holder Quantities
            {holders.quantities.map((item) => (
              <HolderRow>{item}</HolderRow>
            ))}
          </RightSide>
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
const LeftSide = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
`;
const RightSide = styled.div`
  width: 50%;
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
