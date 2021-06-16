import styled from "styled-components";
import React from 'react'

const Label = ({ active }) => {
  // if (active)
    return <LabelGreen>ACTIVE</LabelGreen>
  // return <LabelRed>INACTIVE</LabelRed>
}

const LabelGreen = styled.div`
  color: #fff;
  background: #4caf50;
  border-color: #3d8b40;
  display: inline-block;
  padding: 1px .35em;
  border: 1px solid ;
  border-radius: 0px;
  font-size: 80%;
  line-height: 1.26;
  text-decoration: none;

  text-align: left;

  font-weight: 700;

  white-space: nowrap;
  word-wrap: normal;
  margin-right: 15px;
`

const LabelRed = styled.div`
  color: #fff;
  background: #b72100;
  border-color: #3d8b40;
  display: inline-block;
  padding: 1px .35em;
  border: 1px solid ;
  border-radius: 0px;
  font-size: 80%;
  line-height: 1.26;
  text-decoration: none;

  text-align: left;

  font-weight: 700;

  white-space: nowrap;
  word-wrap: normal;
  margin-right: 15px;
`


export default Label
