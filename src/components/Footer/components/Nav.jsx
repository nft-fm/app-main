import React from 'react'
import styled from 'styled-components'
import twitter from "../../../assets/img/social_twitter.png";
import medium from "../../../assets/img/social_medium.png";
import telegram from "../../../assets/img/social_telegram.png";
import discord from "../../../assets/img/social_discord.png";

function isMobile() {
  if (window.innerWidth < window.innerHeight) return true;
  return false
}

const Nav = () => {
  return (
    <StyledFooterInner>
      <StyledContact>
        <ContactTop>
          For questions, partnership ideas and private investment opportunities...
        </ContactTop>
        <ContactBottom>
          {/* INFO@BLOCKDUELERS.COM */}
          reach out on Telegram!
        </ContactBottom>
      </StyledContact>

      <StyledNav>
        <StyledLink href="https://twitter.com/Blockduelers" target="_blank"
          rel="noopener noreferrer">
          <SocialIcon src={twitter} />
            Twitter</StyledLink>
        <StyledLink href="https://discord.com/invite/7ww5YaYfWC" target="_blank"
          rel="noopener noreferrer">
          <SocialIcon src={discord} />
            Discord</StyledLink>
        <StyledLink href="https://medium.com/@blockduelers" target="_blank"
          rel="noopener noreferrer">
          <SocialIcon src={medium} />
              Medium</StyledLink>
        <StyledLink href="https://t.me/BlockDuelers" target="_blank"
          rel="noopener noreferrer">
          <SocialIcon src={telegram} />
                Telegram
                </StyledLink>
      </StyledNav>
    </StyledFooterInner>

  )
}

const SocialIcon = styled.img`
height: 30px;
width: 30px;
margin-right: 10px;
`

const ContactTop = styled.div`
font-family: Bangers;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-align: center;
  color: #fef9ed;
  margin-bottom: 10px;
`


const ContactBottom = styled.div`
font-family: Bangers;
  font-size: 30px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.67;
  letter-spacing: normal;
  text-align: center;
  color: #fef9ed;
`

const StyledContact = !isMobile() ? styled.div`
display: flex;
flex-direction: column;
align-items: center;
` : styled.div`
display: none;
`

const StyledFooterInner = styled.div`
width: 1400px;
max-width: 90vw;
margin: auto;
display: flex;
justify-content: space-between;
`


const StyledNav = !isMobile() ? styled.nav`
  align-items: center;
  display: flex;
` : styled.nav`
align-items: center;
display: flex;
flex-wrap: wrap;
justify-content: space-around;
`

const StyledLink = !isMobile() ? styled.a`
font-family: "Bangers";
font-size: 20px;
font-stretch: normal;
font-style: normal;
line-height: 1;
text-decoration: underline;
letter-spacing: normal;
display: flex;
align-items: center;
transition: all 0.2s ease-in-out;

color: #ffffff;
opacity: 1;
  padding-left: ${props => props.theme.spacing[3]}px;
  padding-right: ${props => props.theme.spacing[3]}px;

  &:hover {
    color: #ffcb46;
    }
` : styled.a`
font-family: "Bangers";
font-size: 20px;
font-stretch: normal;
font-style: normal;
line-height: 1;
text-decoration: underline;
letter-spacing: normal;
display: flex;
align-items: center;
transition: all 0.2s ease-in-out;
color: #ffffff;
width: 100px;
margin-bottom: 20px;
margin-top: -10px;
opacity: 1;
  padding-left: ${props => props.theme.spacing[3]}px;
  padding-right: ${props => props.theme.spacing[3]}px;

  &:hover {
    color: #ffcb46;
    }
`

export default Nav