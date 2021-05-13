import { LinearProgress } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

const proposedStocks = [
  {
    ticker: "VOO",
    desc: "This is a low expense ratio index fund which matches the S&P 500",
  },
  {
    ticker: "SPY",
    desc: "This is a low expense ratio index fund which matches the S&P 500",
  },
];

const Stock = (props) => {
  return (
    <StockCard>
      <h3>{props.ticker}</h3>
      <div style={{ margin: "10px", textAlign: "center" }}>{props.desc}</div>
      <div>123 / 500</div>
      <LinearProgress
        style={{ width: "90%", height: "10px" }}
        variant="determinate"
        value={20}
      />
      <Button type="submit" onClick={(e) => console.log("yera")}>
        Vote for {props.ticker}
      </Button>
    </StockCard>
  );
};

export const StockVoting = (props) => {
  return (
    <StockContainer>
      {proposedStocks.map((stock) => {
        return (
          <Stock key={stock.ticker} ticker={stock.ticker} desc={stock.desc} />
        );
      })}
    </StockContainer>
  );
};

const StockContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 24px;
  line-height: 1;
  color: #ffffff;
  text-align: left;
  color: white;
  padding: 20px;
  @media only screen and (max-width: 991px) {
    flex-direction: column;
  }
`;

const StockCard = styled.div`
  margin: 15px;
  border: 2px solid rgba(256, 256, 256, 0.5);
  border-radius: 2px;
  background-color: rgba(180, 180, 180, 0.3);
  color: white;
  padding: 20px 0px;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  position: relative;
  font-size: 20px;
`;

const Button = styled.button`
  align-items: center;
  cursor: pointer;
  width: 90%;
  height: 30px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  -webkit-transition: all 0.2s linear;
  transition: all 0.2s linear;
  margin: 10px;
`;
