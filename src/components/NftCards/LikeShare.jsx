import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton
} from "react-share";
import styled from "styled-components";
import Swal from "sweetalert2";
import { ReactComponent as IconHeart } from "../../assets/img/icons/heart.svg";
import { ReactComponent as IconShare } from "../../assets/img/icons/share.svg";
import loading from "../../assets/img/loading.gif";
import { useAccountConsumer } from "../../contexts/Account";

const LikeShare = (props) => {
  const { account } = useAccountConsumer();
  const [sharing, setSharing] = useState(null)

  const { nft, liked, setLiked, likeCount, isLoading, setLikeCount } = props;
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

  const share = (e) => {
    e.stopPropagation();
    props.setIsShareOpen();
  };

  const url = `https://beta.fanfare.fm/`;
  const message = `Check out my new NFT, ${nft.title}, available now on Fanfare!\nAvailable only at: `;

  const newShare = (e, social) => {
    e.stopPropagation();
    setSharing(social)
  };

  useEffect(() => {
    if (sharing) {
      axios.post("/api/nft-type/newShare", nft);
      const shareUrl = 
        sharing === 'Facebook' ? 
        `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${message}` 
        :
        `https://twitter.com/intent/tweet?url=${url}&text=${message}`
      window.open(shareUrl, sharing, "height=500, width=500")
      setSharing(null)
    }
  }, [nft, sharing, url, message])

  return (
    <Side>
      <IconArea>
      <Buttons>
        <TwitterShareButton title={message} url={url}>
          <ButtonHolder onClick={(e) => newShare(e, 'Twitter')}>
            <TwitterIcon size={25} borderRadius={"10px"} />
          </ButtonHolder>
        </TwitterShareButton>
        <FacebookShareButton quote={message} url={url}>
          <ButtonHolder onClick={(e) => newShare(e, 'Facebook')}>
            <FacebookIcon size={25} borderRadius={"10px"} />
          </ButtonHolder>
        </FacebookShareButton>
      </Buttons>
        {/* <ShareButton onClick={(e) => share(e)} aria-label="share button">
          <Share />
          <ShareText>Share</ShareText>
        </ShareButton> 
        */}
        {/* {shareCount?.count ? shareCount.count : nft.shareCount} */}
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
  width: 17px;
  height: 17px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  & path {
    transition: all 0.2s ease-in-out;
    fill: ${(props) => props.theme.color.gray};
  }

`;

const LikedHeart = styled(IconHeart)`
  width: 20px;
  height: 20px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  & path {
    stroke: ${(props) => props.theme.color.pink};
  }
`;

const Heart = styled(IconHeart)`
  width: 20px;
  height: 20px;
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

const ButtonHolder = styled.div`
  background-color: ${(props) => props.theme.color.box};
  border-radius: ${(props) => props.theme.borderRadius}px;
  /* border: 1px solid ${(props) => props.theme.color.boxBorder}; */
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  padding: 5px;
  /* padding: 5px 5px 0px 5px; */
  margin-left: auto;
  margin-right: auto;
  & > span {
    color: white;
    font-size: ${(props) => props.theme.fontSizes.sm};
    margin-left: 10px;
  }
  transition: 0.1s ease-in-out;
  :hover {
    background-color: ${(props) => props.theme.color.gray};
  }
`;

const Buttons = styled.div`
  z-index: 5;
  justify-content: space-evenly;
`;

export default LikeShare;
