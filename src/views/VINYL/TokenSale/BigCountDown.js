import React from "react";
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
    // let diffTime = 1621357200 - moment.utc();
    let diffTime = this.props.launchDate - moment.utc();
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
    }, 1000);
  }

  render() {
    return (
      <Timer>
        <Spacer />
        <CountDownText>Private Sale Coming Soon</CountDownText>
        {/* <CountDownText>Are You Ready for the Next Frontier?</CountDownText> */}
        {this.state.milliseconds > 0 &&  (
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
      margin-top: 20px;
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

      font-stretch: normal;
      font-style: normal;
      line-height: 80px;
      letter-spacing: 2px;
      color: #ffffff;
    `;

const Timer = !isMobile()
  ? styled.div`
  margin-top: 200px;
      /* width: 600px; */
      margin: 0 auto;
	  height: 163px;
    `
  : styled.div`
      width: 90vw;
      height: 50%;
      margin: auto;
      margin-top: 1vh;
    `;

const Spacer = styled.div`
  height: 200px;
`;
export default CountDown;
