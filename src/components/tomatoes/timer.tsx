import * as React from 'react';


interface ITimerProps {
    timer: number,
}
interface ITimerState {
    clock: number,
}

class Timer extends React.Component<ITimerProps, ITimerState> {
    constructor(props) {
        super(props)
        this.state = {
            clock: props.timer
        }
    }
    componentDidMount() {
        const tomatoTimer = setInterval(() => {
            this.setState({
                clock: this.state.clock - 1000
            })
            if (this.state.clock <= 0) {
                clearInterval(tomatoTimer)
                // 告诉父组件完成倒计时
            }
        }, 1000)

    }
    public render() {
        const minutes = Math.floor((this.state.clock % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((this.state.clock % (1000 * 60)) / 1000);
        const time = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
        return (
            <div className="timer" id="timer">
                {time}
            </div>
        );
    }
}

export default Timer;