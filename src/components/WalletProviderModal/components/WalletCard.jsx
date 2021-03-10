import React from 'react'
import Button from '../../Button'
import CardContent from '../../CardContent'
import CardIcon from '../../CardIcon'
import CardTitle from '../../CardTitle'
import styled from 'styled-components'

const WalletCard = ({ icon, onConnect, title }) => (
  <StyledCard>
    <CardContent>
      <CardIcon>{icon}</CardIcon>
      <CardTitle text={title} />
      <div style={{ margin: "auto" }}>
        <Button onClick={onConnect} text="Connect" textColor="black" />
      </div>
    </CardContent>
  </StyledCard>
)
const StyledCard = styled.div`
width: 30%;
margin: auto;
min-width: 200px;
  border-radius: 8px;
    border: solid 2px rgba(255, 183, 0, 0.3);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
font-family: "Bangers";
  font-size: 25px;
  
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #ffffff;
  margin-bottom: 40px;
`
export default WalletCard
