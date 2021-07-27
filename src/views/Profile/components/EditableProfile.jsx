import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import ProfilePic from "./ProfilePic";
import { useAccountConsumer } from "../../../contexts/Account";
import cog from "../../../assets/img/icons/cog.svg";
import default_pic from "../../../assets/img/profile_page_assets/default_profile.png";
import swal from "sweetalert2";
import Loading from "../../../assets/img/loading.gif";

const EditableProfile = () => {
  const { account, user, setUser } = useAccountConsumer();
  const [edit, setEdit] = useState(false);
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [newPic, setNewPic] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    user.profilePic && setProfilePic(user.profilePic);
  }, [user]);
  useEffect(() => {
    edit && inputRef.current.focus();
  }, [edit]);

  const saveDetails = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (newPic && imageFile) {
      username === ""
        ? setUser({ ...user, profilePic: profilePic })
        : setUser({ ...user, username: username, profilePic: profilePic });
      setUser({ ...user, profilePic: profilePic });
      const imageFormData = new FormData();
      imageFormData.append("user", account);
      imageFormData.append("imageFile", imageFile);

      await axios
        .post("/api/user/uploadProfilePicS3", imageFormData)
        .then((res) => {
          setNewPic(false);
          setProfilePic(res.data.location);
          setImageFile(null);
          if (username === "") {
            setLoading(false);
            setEdit(false);
          } else {
            axios
              .post("/api/user/update-account", {
                address: account,
                username: username,
              })
              .then((res) => {
                setLoading(false);
                setEdit(false);
                setUser(res.data);
              })
              .catch((err) => {
                setLoading(false);
                setEdit(false);
                swal.fire({
                  title: "Error",
                  background: `#000`,
                  boxShadow: `24px 24px 48px -24px #131313`,
                  text: "That name is already in use, please try another or contact NFT FM if this is a mistake.",
                });
              });
          }
        })
        .catch((err) => {
          setImageFile(null);
          setLoading(false);
          swal.fire({
            title: "Error",
            background: `#000`,
            boxShadow: `24px 24px 48px -24px #131313`,
            text: "Couldn't upload image, please try again.",
          });
        });
    } else if (username != "" && !newPic) {
      setUser({ ...user, username: username });
      await axios
        .post("/api/user/update-account", {
          address: account,
          username: username,
        })
        .then((res) => {
          setLoading(false);
          setEdit(false);
          setUser(res.data);
        })
        .catch((err) => {
          setLoading(false);
          setEdit(false);
          swal.fire({
            title: "Error",
            background: `#000`,
            boxShadow: `24px 24px 48px -24px #131313`,
            text: "That name is already in use, please try another or contact NFT FM if this is a mistake.",
          });
        });
    } else {
      setLoading(false);
      setUsername("");
      user.profilePic ? setProfilePic(user.profilePic) : setProfilePic("");
      setEdit(false);
      return;
    }
  };
  const cancelEdits = () => {
    setLoading(false);
    setEdit(false);
    setUsername("");
  };

  return (
    <ProfileHeading>
      <Side />
      <ProfileHolder
      // onKeyDown={(e) => e.key === "Escape" && setEdit(false)}
      // tabIndex="-1"
      >
        <Cog
          src={cog}
          alt="edit icon"
          onClick={account ? () => setEdit(!edit) : null}
          isEdit={edit}
        />
        <EditingButtons isEdit={edit}>
          {loading ? (
            <img src={Loading} alt="loading gif" />
          ) : (
            <>
              <XButton onClick={() => cancelEdits()}>✗</XButton>
              <CheckButton onClick={(e) => saveDetails(e)}>
                &#x2713;
              </CheckButton>
            </>
          )}
        </EditingButtons>
        <ProfilePic
          profilePic={
            profilePic && profilePic !== "" ? profilePic : default_pic
          }
          setProfilePic={setProfilePic}
          imageFile={imageFile}
          setImageFile={setImageFile}
          newPic={newPic}
          setNewPic={setNewPic}
          edit={edit}
          setEdit={setEdit}
          loading={loading}
        />
        <ProfileInfoHolder>
          {edit ? (
            <form onSubmit={(e) => saveDetails(e)}>
              <StyledInput
                type="text"
                placeholder="Enter Username"
                defaultValue={user?.username}
                onChange={(e) => setUsername(e.target.value)}
                ref={inputRef}
              />
            </form>
          ) : (
            <Username>
              {user && user.username !== "" ? user.username : "No username"}
            </Username>
          )}
          <Divider />

          <AddressSpan>
            {user
              ? user.address.substring(0, 10) +
                "..." +
                user.address.substring(user.address.length - 4)
              : " "}
          </AddressSpan>
        </ProfileInfoHolder>
      </ProfileHolder>
      <Side />
    </ProfileHeading>
  );
};

const CheckButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  font-size: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all 0.1s linear;
  &:hover {
    font-size: 30px;
  }
`;
const XButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all 0.1s linear;
  &:hover {
    font-size: 25px;
  }
`;
const EditingButtons = styled.div`
  width: 60px;
  height: 20px;
  display: ${(props) => (props.isEdit ? "flex" : "none")};
  justify-content: space-between;
  position: absolute;
  right: 20px;
  top: 20px;
  z-index: 100;
  margin-top: -20px;
  @media only screen and (max-width: 776px) {
    right: -60px;
  }
`;

const ProfileInfoHolder = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Side = styled.div`
  width: calc(100% / 3);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  & > span:nth-child(1) {
    margin-top: 40px;
  }
`;

const ProfileHolder = styled.div`
  position: relative;
  width: calc(100% / 3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  :focus {
    outline: none;
  }
`;

const ProfileHeading = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  height: 200px;
  /* margin-top: 80px; */
  color: ${(props) => props.theme.fontColor.white};
  width: 100%;
  justify-content: space-between;
  @media only screen and (max-width: 776px) {
    width: 90%;
  }
`;

const StyledInput = styled.input`
  background-color: ${(props) => props.theme.bgColor};
  font-size: ${(props) => props.theme.fontSizes.md};
  border: none;
  outline: none;
  color: white;
  text-align: center;
  font-family: ${(props) => props.theme.fontFamily};
`;

const Username = styled.span`
  font-size: ${(props) => props.theme.fontSizes.md};
  white-space: nowrap;
  margin-bottom: 1px;
`;

const AddressSpan = styled.span`
  color: ${(props) => props.theme.color.gray};
  display: flex;
  /* align-items: center;s */
  position: relative;
  height: 20px;
`;
const Cog = styled.img`
  display: ${(props) => (props.isEdit ? "none" : "block")};
  width: 15px;
  right: 45px;
  position: absolute;
  cursor: pointer;
  :hover {
    animation: rotation 4s infinite linear;
  }
  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
  @media only screen and (max-width: 776px) {
    top: 0px;
    right: -25px;
  }
`;

const Divider = styled.div`
  width: 200px;
  height: 1px;
  background-color: ${(props) => props.theme.fontColor.gray};
  margin-bottom: 6px;
`;
export default EditableProfile;
