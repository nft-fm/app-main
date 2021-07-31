import axios from "axios";
import React, { useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useAccountConsumer } from "../../../contexts/Account";

const MakeBatches = ({ nftIds, setMakeBatches }) => {
  const index = useRef(1);

  useEffect(() => {
    const interval = setInterval(() => {
      if (index.current <= nftIds[nftIds.length - 1]) {
        axios
          .post("/api/airdrop/airdrop", { nftId: index.current })
          .then((res) => {
            console.log(res.data);
            index.current++;
          })
          .catch((err) => console.log(err));
      } else {
        return () => clearInterval(interval);
      }
    }, 10000);
  }, [nftIds]);
  return <div>Making batches...</div>;
};

const Airdrop = () => {
  const [nftIds, setNftIds] = useState([]);
  const [makeBatches, setMakeBatches] = useState(false);
  const [holders, setHolders] = useState({ addresses: [], quantities: []});

  const getAllNftIds = async () => {
    await axios.post("/api/airdrop/getNftIds").then((res) => {
      console.log(res);
      setNftIds(res.data.sort());
    });
  };
  useEffect(() => {
    getAllNftIds();
  }, []);
  const parseHolders = async () => {
    await axios.post("/api/airdrop/getHoldersFromDB").then((res) => {
      let arr = [];
      for (let i = 0; i < res.data.length; i++) {
        arr.push(...res.data[i].holders);
      }

      console.log(arr);
      //iterate through array of holders. for each one check if it exists anywhere else in the array
      //if it does, remove it from the array and add quantity to original element's quantity
      arr.map((initialElement, index) => {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] != arr[index]) {
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
  //commented out the make batches function, need to add restriction to that route if the month's airdrop has already been done
  return (
    <Container>
      <span>Nft Ids:</span>
      <NftIdsHolder>
        {nftIds.map((item) => (
          <NftIdSpan>{item}</NftIdSpan>
        ))}
        {/* <button onClick={() => nftIds.length > 0 && setMakeBatches(true)}>
          Click me to make airdrop batches!
        </button> */}
        <button onClick={() => parseHolders()}>Parse Holders</button>
        {makeBatches && (
          <MakeBatches nftIds={nftIds} setMakeBatches={setMakeBatches} />
        )}
      </NftIdsHolder>
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
};
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
