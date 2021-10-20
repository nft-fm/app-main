import React, { useState } from "react";
import moment from "moment";
import styled from "styled-components";
import isMobile from "../../../utils/isMobile";

class CountDown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      milliseconds: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  componentDidMount() {
    let diffTime = 1629392400000 - moment.utc();
    let duration = moment.duration(diffTime);
    setInterval(() => {
      duration = moment.duration(duration - 1000);
      this.setState({
        milliseconds: duration._milliseconds,
        days: duration.days(),
        hours: duration.hours(),
        minutes: duration.minutes(),
        seconds: duration.seconds(),
      });

      this.state.milliseconds <= 0 && this.props.setTimedOut(true);
    }, 1000);
  }

  render() {
    return (
      <Timer timedOut={this.state.milliseconds <= 0}>
        {this.state.milliseconds > 0 && (
          <Countdown>
            <Item>
              {this.state.days.toLocaleString("en-US", {
                minimumIntegerDigits: 2,
                useGrouping: false,
              })}
              <TimerText>Days</TimerText>
            </Item>
            <div>:</div>
            <Item>
              {this.state.hours.toLocaleString("en-US", {
                minimumIntegerDigits: 2,
                useGrouping: false,
              })}
              <TimerText>Hours</TimerText>
            </Item>
            <div>:</div>
            <Item>
              {this.state.minutes.toLocaleString("en-US", {
                minimumIntegerDigits: 2,
                useGrouping: false,
              })}
              <TimerText>Minutes</TimerText>
            </Item>
            <div>:</div>
            <Item>
              {this.state.seconds.toLocaleString("en-US", {
                minimumIntegerDigits: 2,
                useGrouping: false,
              })}
              <TimerText>Seconds</TimerText>
            </Item>
          </Countdown>
        )}
      </Timer>
    );
  }
}

const CountDownText = styled.div`
  margin-bottom: 20px;
  width: 100%;
  font-family: "Compita";
  font-size: 80px;
  text-align: center;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #ffffff;

  @media only screen and (max-width: 1200px) {
    font-size: 65px;
  }
  @media only screen and (max-width: 776px) {
    font-size: 45px;
  }
`;

const Item = styled.div`
  text-align: center;
  width: 120px;
  color: white;
`;

const TimerText = styled.div`
  text-align: center;
  width: 100%;
  margin-top: 1vh;
  font-family: "Compita";
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #ffffff;
`;

const Countdown = !isMobile()
  ? styled.div`
      display: flex;
      margin-top: 80px;
      flex-direction: row;
      justify-content: space-evenly;
      font-family: "Compita";
      font-size: 90px;
      color: white;
      font-stretch: normal;
      font-style: normal;
      line-height: 80px;
      letter-spacing: 2px;
      color: rgb(255, 204, 74);
    `
  : styled.div`
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      font-family: "Compita";
      font-size: 60px;
      margin-top: 80px;

      font-stretch: normal;
      font-style: normal;
      line-height: 80px;
      letter-spacing: 2px;
      color: #ffffff;
    `;

const Timer = !isMobile()
  ? styled.div`
      /* margin-top: 80px; */
      display: ${(props) => (props.timedOut ? "none" : "block")};
      height: 312px;
      width: 820px;
      position: absolute;
      backdrop-filter: blur(5px);
      border-radius: 15px;
    `
  : styled.div`
      display: ${(props) => (props.timedOut ? "none" : "block")};
      width: 100vw;
      height: 101vw;
      margin: auto;
      position: absolute;
      backdrop-filter: blur(5px);
    `;

const Spacer = styled.div`
  height: 200px;
`;
export default CountDown;
