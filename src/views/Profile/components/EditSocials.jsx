import React from "react";
import styled from "styled-components";
import ModalSm from "../../../components/Modal/Modalsm";
import Modal from "../../../components/Modal/Modal";
import ModalTitle from "../../../components/ModalTitle";

const EditSocials = ({
  editSM,
  setEditSM,
  insta,
  setInsta,
  twitter,
  setTwitter,
  spotify,
  setSpotify,
  audius,
  setAudius,
}) => {
  return (
    <Wrapper editSM={editSM}>
      <Modal>
        <ModalSm>
          {/* <CloseModal onDismiss={editSM} /> */}
          <Content>
            <ModalTitle>Edit Social Media</ModalTitle>

            <SocialRow>
              <span>Instagram:</span>
              <SocialsInput
                placeholder="Instagram"
                type="input"
                value={insta}
                onChange={(e) => setInsta(e.target.value)}
              />
            </SocialRow>

            <SocialRow>
              <span>Twitter:</span>
              <SocialsInput
                placeholder="Twitter"
                type="input"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
              />
            </SocialRow>
            <SocialRow>
              <span>Spotify:</span>
              <SocialsInput
                placeholder="Spotify"
                type="input"
                value={spotify}
                onChange={(e) => setSpotify(e.target.value)}
              />
            </SocialRow>
            <SocialRow>
              <span>Audius:</span>
              <SocialsInput
                placeholder="Audius"
                type="input"
                value={audius}
                onChange={(e) => setAudius(e.target.value)}
              />
            </SocialRow>
            <DoneButton onClick={() => setEditSM(false)}>
              Done Editing
            </DoneButton>
          </Content>
        </ModalSm>
      </Modal>
    </Wrapper>
  );
};
const DoneButton = styled.button`
  width: 140px;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${(props) => props.theme.color.red};
  font-size: ${(props) => props.theme.fontSizes.xs};
  height: 32px;
  border-radius: 20px;
  font-family: "Compita";
  color: white;
  background-color: #181818;
  margin-top: 20px;
  padding: 10px;
  &:hover {
    background-color: rgba(256, 256, 256, 0.2);
  }
`;

const Wrapper = styled.div`
  display: ${(props) => (props.editSM ? "block" : "none")};
  z-index: 100;
`;

const SocialRow = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 15px;
  /* @media only screen and (max-width: 1337px) {
    flex-direction: column;
  } */
`;
const SocialsInput = styled.input`
  background-color: rgba(0, 0, 0, 0);
  width: 100%;
  border: none;
  border-bottom: 2px solid ${(props) => props.theme.color.gray};
  color: white;
  text-align: left;
  margin-bottom: 2px;
  height: 24px;
  font-size: 16px;

  &:focus {
    outline: none;
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
const Content = styled.div`
  width: 100%;
  height: 75%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
`;

export default EditSocials;
