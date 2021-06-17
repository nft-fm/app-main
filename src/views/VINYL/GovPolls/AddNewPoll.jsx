import React, { useCallback, useEffect, useState } from "react"
import styled from 'styled-components'
import axios from 'axios'
import swal from "sweetalert2";
import { require } from "../../../web3/utils";
import { useWallet } from 'use-wallet'

const NewOptionForm = ({ index, option, options, setOptions }) => {
  const onChange = e => {
    let optionsCopy = [...options]
    optionsCopy[index] = e.target.value
    setOptions(optionsCopy)
  }
  return (
    <>
      <p>Option {index}:</p>
      <input
        type="text"
        placeholder="choose poll option"
        name="option"
        value={option}
        onChange={onChange}
      />
    </>
  )
}

const AddNewPoll = () => {
  const { account } = useWallet();
  const [question, setQuestion] = useState('')
  const [endTime, setEndTime] = useState('')
  const [options, setOptions] = useState(['', ''])

  const onChange = e => setQuestion(e.target.value)

  const createOption = () => setOptions([...options, ''])

  const deleteOption = i => setOptions(options.filter((_, index) => index !== i))

  const onChangeDate = e => setEndTime(e.target.value)

  const checkInput = () => {
    if (!question.length) return `question can't be empty`
    if (!endTime.length) return `Date needs to have a value`
    for (let option of options) {
      if (option === '') 
        return `cannot have an empty option`
    }
  }

  const submitPoll = async (e) => {
    e.preventDefault();
    const error = checkInput()

    if (error) {
      return swal.fire({ title: error })
    }
    swal.fire({
      title: `Are you sure you want to submit this poll?`,
      showCancelButton: true,
    }).then(async (res) => {
      if (res.isDismissed) return;
      const { provider } = await require();
      const signer = provider.getSigner();
      const sig = await signer.signMessage(
        JSON.stringify({
          address: account,
          question,
          endTime,
          options
        })
      );
      axios
        .post(`/api/admin-poll/add-poll`, {
          address: account,
          sig,
          question,
          endTime,
          options
        })
        .then((res) => {
          swal.fire({
            title: `Success`,
            text: `Poll has been successfully created`,
            icon: `success`,
          });
        })
        .catch((err) => {
          console.log(err.response);
          swal.fire({
            title: `Error: ${err.response ? err.response.status : 404}`,
            text: `${err.response ? err.response.data : "server error"}`,
            icon: "error",
          });
        });
    });

  };

  return (
    <Container>
      <FormGroup>
        <p>Question:</p>
        <input
          type="text"
          placeholder="question"
          name="question"
          value={question}
          onChange={onChange}
        />
      </FormGroup>
      <DateFormGroup>
        <p>End Date:</p>
        <input
          type="datetime-local"
          name="endTime"
          value={endTime}
          onChange={onChangeDate}
        />
      </DateFormGroup>
      {options.map((option, index)=> {
        var index = index += 1
        return (
          <FormGroup>
            <NewOptionForm
              key={index - 1}
              index={index - 1}
              option={option}
              options={options}
              setOptions={setOptions}
            />
            <DeleteButton onClick={() => deleteOption(index - 1)}>Delete</DeleteButton>
          </FormGroup>
          )
        })
      }
      <StyledButton onClick={createOption}>Add Option</StyledButton>
      <StyledButton onClick={submitPoll}>Submit Poll</StyledButton>
    </Container>
  )
}


const DeleteButton = styled.button`
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

  height: 45px;
`

const StyledButton = styled.button`
  font-family: "Compita";
  height: 60px;
  font-size: 24px;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  text-decoration: none;
  letter-spacing: normal;
  display: flex;
  flex: 1;
  justify-content: center; 
  transition: all 0.2s ease-in-out;
  color: black;
    text-transform: uppercase;
    background: url('data:image/svg+xml;utf8,<svg width="100" height="100" transform="rotate(25)" opacity="0.3" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="%23250E17"><circle cx="25" cy="25" r="12.5" /><circle cx="75" cy="75" r="12.5" /><circle cx="75" cy="25" r="12.5" /><circle cx="25" cy="75" r="12.5" /></g></svg>'),
      #fff;
    background-size: 12px, 100%;
    border: 4px solid #000;
    position: relative;
    box-shadow:6px 6px 0 #222;
  &:hover {
    font-size:26px;
    cursor: pointer;
  }
  margin-top: 30px;
  padding: 10px;
  width: 300px;
`

const FormGroup = styled.div`
  color: white;
  margin: 30px;
  display: flex;
  height: 50px;
  justify-content: center;
  align-items: center;
  p {
    padding-right: 20px;
  }
  input {
    width: ${props => props.picture ? "260px" : "300px"};
    height: 40px;
    font-family: "Comic Book";
  }
`
const DateFormGroup = styled(FormGroup)`
  margin-left: 20px;
  input {
    margin-left: 20px;
    width: 300px;
  }
`

const Container = styled.div`
  flex-direction: column;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`

export default AddNewPoll


  // const getSignature = async () => {
  //   try {
  //     const { provider } = await require();
  //     const signer = provider.getSigner();
  //     const sig = await signer.signMessage(JSON.stringify(formData))
  //     return sig;
  //   } catch (error) {
  //     throw error
  //   }
  // }