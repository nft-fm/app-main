import Button from "../../components/Button";
import styled from 'styled-components'
import React from "react";
import { useMyNfts } from "../../contexts/MyNfts";
import loading from "../../assets/img/loading.gif";

const CollectionBox = () => {
    const { myNfts, hasNfts } = useMyNfts();
    return (
        <Box>
            <Header>
                Collection
            </Header>
            <Collection>
                {hasNfts ?
                    myNfts?.length > 0 ?
                        myNfts.map(nft =>
                            <NftPicture key={nft.nftId} src={nft.picture} />
                        )
                        :
                        <LoadingContainer>
                            <Loading src={loading} />
                        </LoadingContainer>
                    :
                    <LoadingContainer>
                        empty
            </LoadingContainer>
                }
            </Collection>
        </Box>
    )
}

const Loading = styled.img`
  height: 50px;
  width: auto;
	position: relative;
`

const LoadingContainer = styled.div`
height: 100%;
width: 100%;
display: flex;
align-items: center;
justify-content: center;
`

const NftPicture = styled.img`
width: 46%;
height: auto;
margin-bottom: 10px;
`

const Collection = styled.div`
width: calc(100% - 40px);
padding: 20px;
display: flex;
align-items: flex-start;
justify-content: space-between;
flex-wrap: wrap;
overflow-y: scroll;
height: 100%;
`

const Box = styled.div`
  position: absolute;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  font-family: Bangers;
  font-size: 20px;
  color: white;
  border: solid 5px #27292b;
  background-color: rgba(41, 41, 41, 0.71);
//   transform: skewX(15deg);
bottom: 18vh;
  right: 5vw;
  width: 300px;
  height: 50vh;
`;

const Header = styled.div`
    width: 100%;
    height: 30px;

    border: 0px;
    background-image: linear-gradient(
            to right,
            #b72100,
            #b72100 34%,
            #1a8eb2 68%,
            #1a8eb2
    );
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export default CollectionBox;