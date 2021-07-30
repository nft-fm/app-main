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
  // let holders = []
  const getAllNftIds = async () => {
    await axios.post("/api/airdrop/getNftIds").then((res) => {
      console.log(res);
      setNftIds(res.data.sort());
    });
  };
  useEffect(() => {
    getAllNftIds();
  }, []);
  const [holders, setHolders] = useState([]);
  const parseHolders = async () => {
    await axios.post("/api/airdrop/getHolders").then((res) => {
      console.log(res);
      let arr = []
      for (let i = 0; i < res.data.length; i++) {
          arr.push(...res.data[i].holders)
      }
      setHolders(arr)
    //   res.data.map((item) => {
    //     setHolders([...holders, ...item.holders]);
    //   });
    });
  };
  console.log('holders', holders)
  return (
    <Container>
      <span>Nft Ids:</span>
      <NftIdsHolder>
        {nftIds.map((item) => (
          <NftIdSpan>{item}</NftIdSpan>
        ))}
        <button onClick={() => nftIds.length > 0 && setMakeBatches(true)}>
          Click me to make airdrop batches!
        </button>
        <button onClick={() => parseHolders()}>Parse Holders</button>
        {makeBatches && (
          <MakeBatches nftIds={nftIds} setMakeBatches={setMakeBatches} />
        )}
      </NftIdsHolder>
    </Container>
  );
};

const HolderRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
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
