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
  timer: number | undefined;
  constructor(props: {}) {
    super(props);
    this.state = {
      time: new Date(),
    };
  }

  componentDidMount(): void {
    this.timer = setInterval(() => this.tick(), 1000);
  }

  componentWillMount(): void {
    clearInterval(this.timer);
  }

  tick() {
    this.setState({ time: new Date() });
    console.log('time: ', this.state.time);
  }

  render() {
    const { time } = this.state;
    const formatTime = `${time.toLocaleDateString()} ${time.toLocaleTimeString()}`;
    return (
      <div className=''>
        <Timer time={formatTime} />
        <p>{formatTime}</p>
      </div>
    );
  }
}

export { Clock };
