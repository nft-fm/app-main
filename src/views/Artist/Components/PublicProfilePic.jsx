import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import swal from "sweetalert2";
import Loading from "../../../assets/img/loading.gif";
import upload_icon from "../../../assets/img/profile_page_assets/upload_icon.svg";
import { useAccountConsumer } from "../../../contexts/Account";
import { errorIcon, imageHeight, imageWidth } from "../../../utils/swalImages";



const PublicProfilePic = (props) => {
  const { account, user, setUser } = useAccountConsumer();
  const { profilePic, setProfilePic, edit } = props;
  const [imageFile, setImageFile] = useState(null);
  // const [imageUploadError, setImageUploadError] = useState(false);
  const [loading, setLoading] = useState(false);
  const hiddenImageInput = useRef(null);

  const handleImage = () => {
    hiddenImageInput.current.click();
  };

  const handleImageChange = (e) => {
    if (e.target.files[0].size > 60 * 1024 * 1024) {
      return swal.fire({
        title: `Error: Image files must be under 60MB`,
        imageUrl: errorIcon,
        imageWidth,
        imageHeight,
      })
    }
    setImageFile(e.target.files[0]);
    const picUrl =
      "https://nftfm-profilepic.s3-us-west-1.amazonaws.com/" +
      account +
      "/" +
      e.target.files[0].name;
    setProfilePic(picUrl);
    setUser({
      ...user,
      profilePic: picUrl,
    });
  };
  
  useEffect(() => {
    if (imageFile) {
      setLoading(true);
      const imageFormData = new FormData();
      imageFormData.append("user", account);
      imageFormData.append("imageFile", imageFile);

      axios
        .post("/api/user/uploadProfilePicS3", imageFormData)
        .then((res) => {
          setLoading(false);
          setProfilePic(res.data.location);
          setImageFile(null);
          props.setEdit(false);
        })
        .catch((err) => {
          setImageFile(null);
          // setImageUploadError(true);
          setLoading(false);
          swal.fire({
            title: "Error",
            background: `#000`,
            boxShadow: `24px 24px 48px -24px #131313`,
            text: "Couldn't upload image, please try again.",
          });
        });
    }
  }, [imageFile]);
  return (
    <ProfilePicHolder imageUrl={profilePic}>
      {loading && edit && (
        <EditProfilePic>
          <img src={Loading} alt="loading"/>
        </EditProfilePic>
      )}
      {!loading && edit && (
        <EditProfilePic onClick={handleImage}>
          <div>Change</div>
          <div>Picture</div>
          <img src={upload_icon} alt="upload-file-icon" />
        </EditProfilePic>
      )}
      {edit && (
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.gif"
          ref={hiddenImageInput}
          onChange={handleImageChange}
          style={{ display: "none" }}
          defaultValue={imageFile !== "" ? imageFile : null}
        />
      )}
    </ProfilePicHolder>
  );
};

const EditProfilePic = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: ${(props) => props.theme.fontColor.gray};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: rgba(24, 24, 24, 0.9);
  border-radius: 75px;
  img {
    width: 20px;
  }

  :hover {
    font-size: calc(${(props) => props.theme.fontSizes.xs} + 1px);
    img {
      width: 21px;
    }
  }
`;

const ProfilePicHolder = styled.div`
  position: relative;
  background-image: url("${(props) => props.imageUrl}");
  background-color: ${(props) => props.theme.color.lightgray};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-width: 4px;
  border-color: ${(props) => props.theme.color.lightgray};
  border-style: solid;
  border-radius: 75px;
  width: 100px;
  height: 100px;
  overflow: hidden;
`;

export default PublicProfilePic;
