import React from "react";
import styled from "styled-components";

const Stakers = ({ stakers }) => {
    console.log(stakers)
  return (
    <StyledTable>
      <tr>
        <th>Address</th>
        <th>Email</th>
      </tr>
      {stakers.map((item) => {
          console.log(item)
        return (
          <tr>
            <td>{item.address}</td>
            <td>{item.email ? item.email : "-"}</td>
          </tr>
        );
      })}
    </StyledTable>
  );
};

const StyledTable = styled.table`
  width: 85%;
  display: flex;
  flex-direction: column;

  border-radius: 24px;
  border: 6px solid #383838;
  & > tr {
    width: 100%;
    display: flex;
    padding: 5px 0;
      border-bottom: 2px solid #383838;
    & > th {
      width: 50%;
    }

    & > td {
      width: 50%;
      text-align: center;
    }
  }
`;

export default Stakers;
