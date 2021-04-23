import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import CreatedNftModal from "../NftModals/CreatedNftModal";
import { ReactComponent as IconHeart } from "../../assets/img/icons/heart.svg";
import { ReactComponent as IconShare } from "../../assets/img/icons/share.svg";
import { ReactComponent as IconCart } from "../../assets/img/icons/cart.svg";
import { ReactComponent as IconEth } from "../../assets/img/icons/ethereum.svg";
import { ReactComponent as IconUsd } from "../../assets/img/icons/dollar.svg";
import { useAccountConsumer } from "../../contexts/Account";
import axios from "axios";

const LikeShare = (props) => {
  const {account } = useAccountConsumer();
  const { nft, liked, setLiked, likeCount, setLikeCount } = props;

  const like = async () => {
    if (account) {
      setLikeCount(liked ? likeCount - 1 : likeCount + 1)
      setLiked(!liked);
      await axios.post(`api/user/like-nft`,{ address: account, nft: nft._id})
        .then(res => {
        })
        .catch(err => {console.log(err)})
    }
  }

  const share = () => {
    //${!}
  }
  return (
        <Side>
          <IconArea>
            {liked ?
              <LikedHeart onClick={() => like()}/> :
              <Heart onClick={() => like()} />
            }
            {likeCount}
          </IconArea>
          <IconArea>
            <Share onClick={() => share()} />
            {nft.shareCount}
          </IconArea>
        </Side>
  );
};

const Share = styled(IconShare)`
width: 16px;
height: 16px;
margin: 0 4px 0 0;
cursor: pointer;
transition: all 0.2s ease-in-out;
 & path {
    transition: all 0.2s ease-in-out;
     fill: ${props => props.theme.color.gray};
    }
&:hover {
  & path {
    fill: #20a4fc;
  }
}
`

const LikedHeart = styled(IconHeart)`
  width: 20px;
  height: 20px;
  margin: -3px 4px 0 0;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  & path {
    stroke: ${props => props.theme.color.pink};
  }
`;

const Heart = styled(IconHeart)`
width: 20px;
height: 20px;
margin: -3px 4px 0 0;
cursor: pointer;
transition: all 0.2s ease-in-out;
 & path {
    transition: all 0.2s ease-in-out;
     stroke: ${props => props.theme.color.gray};
    }
&:hover {
  & path {
    stroke: ${props => props.theme.color.pink};
  }
}
`

const Side = styled.div`
display: flex;
align-items: center;
`

const IconArea = styled.div`
  margin: 0 8px;
  display: flex;
  font-size: 14px;
  height: 100%;
  align-items: center;
`

export default LikeShare;
