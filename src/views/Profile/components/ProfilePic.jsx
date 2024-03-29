import React, { useRef, useState } from "react";
import styled from "styled-components";
import swal from 'sweetalert2';
import Loading from "../../../assets/img/loading.gif";
import { ReactComponent as upload_icon } from "../../../assets/img/profile_page_assets/upload_icon.svg";
import { useAccountConsumer } from "../../../contexts/Account";
import {
  errorIcon,
  imageHeight,
  imageWidth
} from "../../../utils/swalImages";

const ProfilePic = (props) => {
  const { account, user, setUser } = useAccountConsumer();
  const {
    profilePic,
    setProfilePic,
    edit,
    imageFile,
    setImageFile,
    newPic,
    setNewPic,
    loading,
  } = props;
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
    setNewPic(true);
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

  const [isHovering, setIsHovering] = useState("#888");
  return (
    <ProfilePicHolder imageUrl={profilePic}>
      {loading && (
        <EditProfilePic>
          <img src={Loading} alt="loading-gif" />
        </EditProfilePic>
      )}
      {edit && (
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.gif"
          ref={hiddenImageInput}
          onChange={(e) => handleImageChange(e)}
          style={{ display: "none" }}
          defaultValue={imageFile !== "" ? imageFile : null}
        />
      )}
      {/* if newpic, makes it so that the new pic is displayed while still editing profile info */}
      {!loading && edit && newPic && <> </>}
      {!loading && edit && !newPic && (
        <EditProfilePic
          onClick={handleImage}
          onMouseEnter={() => setIsHovering("#20a4fc")}
          onMouseLeave={() => setIsHovering("#666")}
        >
          <div>Change</div>
          <div>Picture</div>
          <Upload isHovering={isHovering} />
        </EditProfilePic>
      )}
    </ProfilePicHolder>
  );
};

const Upload = styled(upload_icon)`
  margin-top: 5px;
  width: 20px;
  & path {
    transition: all 0.2s ease-in-out;
    fill: ${(props) => props.isHovering};
  }
`;

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

export default ProfilePic;
