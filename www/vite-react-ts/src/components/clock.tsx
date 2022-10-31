import React from 'react';
import { render } from 'react-dom';

function Timer(props: any) {
  return (
    <div className='clock'>
      <h2>当前时间: {props.time}</h2>
    </div>
  );
}

interface ClockProps {}
interface ClockState {
  time: Date;
}

class Clock extends React.Component<ClockProps, ClockState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      time: new Date(),
    };
  }

  ticker() {
    setTimeout(() => {
      this.setState({ time: new Date() });
      // console.log('time: ', this.state.time);
    }, 1000);
  }

  render() {
    this.ticker();
    const { time } = this.state;
    const formatTime = `${time.toLocaleDateString()} ${time.toLocaleTimeString()}`;
    return <Timer time={formatTime} />;
  }
}

export { Clock };
