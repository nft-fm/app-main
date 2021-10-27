import moment from 'moment'
import React from 'react'
import styled from 'styled-components'

export class CountDown extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      inBetween: false,
      date: '',
    }
  }

  componentDidMount() {
    setInterval(() => {
      const endTime = this.props.endTime
      const diffTime = moment.utc(endTime) - moment.utc()
      const duration = moment.duration(diffTime - 1000)
      this.setState({
        days: duration.days(),
        hours: duration.hours(),
        minutes: duration.minutes(),
        seconds: duration.seconds(),
        date: moment.utc().toDate(),
      })
    }, 1000)
  }

  render() {
    return (

      <Countdown>

        {this.state.days > 0 && (
          <>
            <Item>
              {this.state.days.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false,
              })}
            </Item>
            <div>:</div>
          </>
        )}
        <Item>
          {this.state.hours.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
        </Item>
        <div>:</div>
        <Item>
          {this.state.minutes.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
        </Item>
        <div>:</div>
        <Item>
          {this.state.seconds.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
        </Item>
      </Countdown>
    )
  }
}

const Wrapper = styled.div`
  margin: 23px 20px 20px;
`

const Item = styled.div`
  text-align: center;
  margin-left: 5px;
  margin-right: 5px;
`

const Countdown = styled.div`
  display: flex;
  /* color: white; */
  align-items: center;
  margin-top: 5px;
  margin-right: 5px;
  font-family: SophiaNubian-Bold, sans-serif;
`

const MarketInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 15px;
  font-size: 16px;
  color: #c1c1c1;
`


const CountdownCard = styled.div`
  background-color: rgba(26, 26, 30, 255);

  border: 1px solid #2d2d34;
  border-radius: 1px;
  box-sizing: border-box;
`
