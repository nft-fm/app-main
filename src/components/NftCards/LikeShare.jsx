import React from "react";
import styled from "styled-components";
import { ReactComponent as IconHeart } from "../../assets/img/icons/heart.svg";
import { ReactComponent as IconShare } from "../../assets/img/icons/share.svg";
import { useAccountConsumer } from "../../contexts/Account";
import axios from "axios";
import Swal from "sweetalert2";
import loading from "../../assets/img/loading.gif";

const LikeShare = (props) => {
  const { account } = useAccountConsumer();
  const { nft, liked, setLiked, likeCount, isLoading, setLikeCount, shareCount } = props;
  const like = async () => {
    if (account) {
      setLikeCount(liked ? likeCount - 1 : likeCount + 1);
      setLiked(!liked);
      await axios
        .post(`/api/user/like-nft`, { address: account, nft: nft._id })
        .then((res) => {})
        .catch((err) => {
          console.log("here", err);
        });
    } else {
      Swal.fire("Connect a wallet");
    }
  };

  const share = () => {
    props.setIsShareOpen();
  };
  
  return (
    <Side>
      <IconArea>
        {isLoading ? 
        <img src={loading}/> :
        liked ? (
          <LikedHeart onClick={() => like()} />
        ) : (
          <Heart onClick={() => like()} />
        )}
        {likeCount}
      </IconArea>
      <Spacer/>
      <IconArea>
        <Share onClick={() => share()} />
        {/* {shareCount?.count ? shareCount.count : nft.shareCount} */}
      </IconArea>
    </Side>
  );
};

const Spacer = styled.div`
width: 8px;
`

const Share = styled(IconShare)`
  width: 16px;
  height: 16px;
  margin: 0 4px 0 0;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  & path {
    transition: all 0.2s ease-in-out;
    fill: ${(props) => props.theme.color.gray};
  }
  &:hover {
    & path {
      fill: #20a4fc;
    }
  }
`;

const LikedHeart = styled(IconHeart)`
  width: 20px;
  height: 20px;
  margin: -3px 4px 0 0;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  & path {
    stroke: ${(props) => props.theme.color.pink};
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
    stroke: ${(props) => props.theme.color.gray};
  }
  &:hover {
    & path {
      stroke: ${(props) => props.theme.color.pink};
    }
  }
`;

const Side = styled.div`
  display: flex;
  align-items: center;
`;

const IconArea = styled.div`
  /* margin: 0 8px; */
  display: flex;
  font-size: 14px;
  height: 100%;
  align-items: center;
  img {
    width: 18px;
    height: 18px;
    margin-right: 6px;
  }
`;

export default LikeShare;
