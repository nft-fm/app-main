import React from "react";
import styled from "styled-components";
import { ReactComponent as IconHeart } from "../../assets/img/icons/heart.svg";
import { ReactComponent as IconShare } from "../../assets/img/icons/share.svg";
import { useAccountConsumer } from "../../contexts/Account";
import axios from "axios";
import Swal from "sweetalert2";
import loading from "../../assets/img/loading.gif";
import {
  FacebookShareButton,
  TwitterShareButton,
  TwitterIcon,
  FacebookIcon,
} from "react-share";

const LikeShare = ({ nft, liked, setLiked, likeCount, isLoading, setLikeCount, updateShareCount, setIsShareOpen }) => {
  const { account } = useAccountConsumer();

  const url = `https://beta.fanfare.fm/market/${nft.chain}/${nft.nftId}`;
  const message = `${nft.title} by ${nft.artist}\nAvailable at: `;

  const newShare = () => {
    axios.post("/api/nft-type/newShare", nft);
    updateShareCount();
  };

  const like = async (e) => {
    e.stopPropagation();
    if (account) {
      setLikeCount(liked ? likeCount - 1 : likeCount + 1);
      setLiked(!liked);
      await axios
        .post(`/api/user/like-nft`, { address: account, nft: nft._id })
        .then((res) => { })
        .catch((err) => {
          console.log("here", err);
        });
    } else {
      Swal.fire("Connect a wallet");
    }
  };

  return (
    <Side>
      <IconArea>
        <TwitterShareButton
          title={message}
          url={url}
          hashtags={["NFTFM", "NFTs", "NFTCommunity", "NFTart", "nftmusic"]}
        >
          <TwitterIcon onClick={() => newShare()} size={25} borderRadius={"10px"} />
        </TwitterShareButton>
      </IconArea>
      <Spacer />
      <IconArea>
        <FacebookShareButton
          quote={message}
          url={url}
        >
          <FacebookIcon onClick={() => newShare()} size={25} borderRadius={"10px"} />
        </FacebookShareButton>
      </IconArea>
      <Spacer />
      <IconArea>
        {isLoading ? (
          <img src={loading} alt="likes loading" />
        ) : (
          <LikeButton
            onClick={(e) => like(e)}
            aria-pressed={liked}
            aria-label="like button"
          >
            {liked ? (
              <LikedHeart aria-hidden="true" />
            ) : (
              <Heart aria-hidden="true" />
            )}
          </LikeButton>
        )}
        {likeCount}
      </IconArea>
    </Side>
  );
};



const ShareText = styled.div`
margin-left: 5px;
`

const ShareButton = styled.div`
  background-color: transparent;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  border: none;
  width: min-content;
  height: min-content;
  margin: 0px 4px 0 0;
`;

const LikeButton = styled.button`
  background-color: transparent;
  padding: 0px;
  border: none;
  width: min-content;
  height: min-content;
  margin: 0px 4px 0 0;
`;

const Spacer = styled.div`
  width: 8px;
`;

const Share = styled(IconShare)`
  width: 20px;
  height: 20px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  & path {
    transition: all 0.2s ease-in-out;
    fill: ${(props) => props.theme.color.gray};
  }

`;

const LikedHeart = styled(IconHeart)`
  width: 25px;
  height: 25px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  & path {
    stroke: ${(props) => props.theme.color.pink};
  }
`;

const Heart = styled(IconHeart)`
  width: 25px;
  height: 25px;
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
  font-size: 20px;
  height: 100%;
  align-items: center;
  img {
    width: 18px;
    height: 18px;
    margin-right: 6px;
  }
`;

export default LikeShare;
