import React, { useCallback, useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import axios from "axios";
import swal from "sweetalert2";
import editIcon from "../../assets/img/profile_page_assets/profile_edit.png"
import ProfileTopBG from "../../assets/img/profile_page_assets/profile_top.png"
import { TwitterPicker } from "react-color";
import Picker from 'emoji-picker-react';
import { require } from "../../web3/utils";

function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = event => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);
      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },
    [ref, handler]
  );
}

const Profile = ({ user, fetchAccount }) => {
  const { account, connect } = useWallet()
  const [editing, setEditing] = useState(false);
  const [editingPicture, setEditingPicture] = useState(false);
  const [editingColor, setEditingColor] = useState(false);
  const [newNickname, setNewNickname] = useState("");
  const [newPicture, setNewPicture] = useState("");
  const [newColor, setNewColor] = useState("");
  const colorRef = useRef()
  const pictureRef = useRef()
  useOnClickOutside(colorRef, () => setEditingColor(false));
  useOnClickOutside(pictureRef, () => setEditingPicture(false));

  useEffect(() => {
    setNewColor(user.pictureColor || "#002450");
    setNewNickname(user.nickname);
    setNewPicture(user.picture);
  }, [user])

  const submitEdits = async () => {
    if (newPicture === user.picture && newNickname === user.nickname && newColor === user.pictureColor) {
      cancelEdits();
      return;
    }

    const { provider } = await require();
    const signer = provider.getSigner();
    const sig = await signer.signMessage(JSON.stringify({
      address: account,
      nickname: newNickname,
      picture: newPicture,
      pictureColor: newColor,
    }))

    axios.post(`api/user/update-account`, {
      address: account,
      picture: newPicture,
      pictureColor: newColor,
      nickname: newNickname,
      sig,
    }).then(res => {
      fetchAccount();
      setEditing(false);
      swal.fire("successfully updated account");
    }).catch(err => {
      console.log(err.response);
      swal.fire({
        icon: 'error',
        title: `Error: ${err.response.status}`,
        text: 'Something went wrong!'
      })
    })
  }

  const cancelEdits = () => {
    setNewNickname(user.nickname);
    setNewPicture(user.picture);
    setNewColor(user.pictureColor || "#002450");
    setEditingPicture(false);
    setEditingColor(false);
    setEditing(false);
  }

  const handleChange = (e) => {
    if (e.target.value.length > 12) return;
    setNewNickname(e.target.value);
  }

  const PictureEditor = () => {
    const onEmojiClick = (e, emojiObject) => {
      setNewPicture(emojiObject.emoji);
    }
    return (
      <PictureEditModal ref={pictureRef}>
        <Picker disableAutoFocus={true} disableSearchBar={true} groupNames={{ smileys_people: "PEOPLE" }} onEmojiClick={onEmojiClick} />
      </PictureEditModal>
    )
  }

  const ColorEditor = () => {
    const setPickerColor = (pickerColor) => {
      console.log("color", pickerColor)
      setNewColor(pickerColor.hex);
    }
    return (
      <ColorEditModal ref={colorRef}>
        <TwitterPicker color={newColor} onChangeComplete={setPickerColor} />
      </ColorEditModal>
    )
  }

  if (editing) {
    return (
      <Container>
        <EditingButtons>
          <XButton onClick={() => cancelEdits()}>
            ✘
          </XButton>
          <CheckButton onClick={() => submitEdits()}>
            ✔
          </CheckButton>
        </EditingButtons>
        <ColorEditButton onClick={() => setEditingColor(true)} style={{ backgroundColor: newColor }} >
        </ColorEditButton>
        {editingColor && <ColorEditor />}
        <EditProfilePicContainer style={{ backgroundColor: newColor }} onClick={() => setEditingPicture(true)}>
          {newPicture}
          {editingPicture && <PictureEditor />}
        </EditProfilePicContainer>
        <ProfileRight>
          <ProfileTitle>
            Nickname
        </ProfileTitle>
          <EditNickName placeholder={user.nickname ? user.nickname : "None, set yourself a nickname!"} onChange={(e) => handleChange(e)} value={newNickname} maxlength="12" />
          <ProfileTitle>
            Address
        </ProfileTitle>
          <Address>
            {account}
          </Address>
        </ProfileRight>
      </Container>
    )
  }

  return (
    <Container>
      <EditButton src={editIcon} onClick={() => setEditing(true)} />
      <ProfilePicContainer style={{ backgroundColor: newColor }}>
        {newPicture}
      </ProfilePicContainer>
      <ProfileRight>
        <ProfileTitle>
          Nickname
        </ProfileTitle>
        <Nickname>
          {newNickname ? newNickname : "None, set yourself a nickname!"}
        </Nickname>
        <ProfileTitle>
          Address
        </ProfileTitle>
        <Address>
          {account}
        </Address>
      </ProfileRight>
    </Container>
  )
}

const ProfileTitle = styled.div`
margin: 0 0 5px 5px;
font-family: "Bangers";
font-size: 16px;
color: white;
text-align: left;
`

const ProfileRight = styled.div`
display: flex;
flex-direction: column;
padding-left: 40px;
width: calc(100% - 40px);
justify-content: center;
z-index: 20;
`

const Address = styled.div`
font-family: "Comic Book";
font-size: 24px;
text-align: left;
font-stretch: normal;
font-style: normal;
line-height: 1;
letter-spacing: normal;
color: #ffffff;
`



const Container = styled.div`
  display: flex;
  width: calc(100% - 44px);
  padding: 20px;
  background-position: center;
  border-radius: 2px;
  border: 2px solid black;
  margin-bottom: 20px;
  position: relative;
::before {
  content: "";
position: absolute;  
  top: 0px;
  right: 0px;
  left: 0px;
  bottom: 0px;
  filter: grayscale(.7) brightness(110%);
  background-image: url(${ProfileTopBG});
  background-repeat: no-repeat;
background-position: center;
background-size: cover;
}
`

const ColorEditButton = styled.div`
position: absolute;
width: 25px;
height: 25px;
border-radius: 50%;
border: 2px solid white;
cursor: pointer;`


const PictureEditModal = styled.div`
display: flex;
flex-direction: column;
position: absolute;
margin-top: 560px;
z-index: 20;`

const ColorEditModal = styled.div`
display: flex;
flex-direction: column;
position: absolute;
margin-top: 45px;
margin-left: -7px;
z-index: 21;
`

const EditNickName = styled.input`
height: 30px;
border: none;
text-align: left;
background: none;
max-width: 630px;
border-bottom: 1px dashed rgba(256,256,256,0.5);
font-size: 24px;
font-family: "Comic Book";
color: white;
margin-bottom: 20px;
&:focus {
  outline: none;
}
&:active {
  outline: none;
}
`

const Nickname = styled.div`
font-family: "Comic Book";
font-size: 24px;
font-stretch: normal;
font-style: normal;
line-height: 1;
text-align: left;
letter-spacing: normal;
margin-bottom: 20px;
color: #ffffff;
height: 30px;
padding: 1px 0 2px 0;
`

const EditProfilePicContainer = styled.div`
width: 200px;
min-width: 200px;
height: 200px;
background-color: #002450;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
font-size: 120px;
user-select: none;
z-index: 20;
border: solid 10px rgba(256,256,256,0.3);
&:hover {
  cursor: pointer;
}
`

const ProfilePicContainer = styled.div`
width: 200px;
min-width: 200px;
height: 200px;
background-color: #002450;
border-radius: 50%;
display: flex;
align-items: center; 
justify-content: center;
font-size: 120px;
user-select: none;
border: solid 10px rgba(256,256,256,0.3);
z-index: 20;
`

const CheckButton = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 20px;
font-size: 22px;
display: flex;
align-items: center;
justify-content: center;
color: white;
cursor: pointer;
transition: all .1s linear;
&:hover {
  font-size: 24px;
}`

const XButton = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 20px;
font-size: 18px;
display: flex;
align-items: center;
justify-content: center;
color: white;
cursor: pointer;
transition: all .1s linear;
&:hover {
  font-size: 20px;
}`

const EditingButtons = styled.div`
width: 46px;
height: 16px;
display: flex;
justify-content: space-between;
position: absolute;
right: 20px;
top: 20px;
z-index: 100;
`

const EditButton = styled.img`
position: absolute;
right: 20px;
top: 20px;
width: 16px;
height: 16px;
cursor: pointer;
transition: all .1s linear;
z-index: 100;
&:hover {
  width: 18px;
  height: 18px;
}`

export default Profile