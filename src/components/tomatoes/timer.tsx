import * as React from 'react';
import './timer.scss'

interface ITimerProps {
    duration: number,
    timer: number,
    onFinished: () => void,
}
interface ITimerState {
    clock: number,
}
let timerId:NodeJS.Timeout
class Timer extends React.Component<ITimerProps, ITimerState> {
    constructor(props) {
        super(props)
        this.state = {
            clock: props.timer
        }
    }
    get time() {
        const minutes = Math.floor((this.state.clock % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((this.state.clock % (1000 * 60)) / 1000);
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
    }
    componentDidMount() {
        timerId = setInterval(() => {
            this.setState({
                clock: this.state.clock - 1000
            })
            document.title = `${this.time}番茄闹钟`
            if (this.state.clock < 1000) {
                this.props.onFinished()
                clearInterval(timerId)
                document.title = "番茄闹钟"
            }
        }, 1000)

    }
    componentWillUnmount(){
        clearInterval(timerId)
        document.title= '番茄闹钟'
      }
    public render() {
       const percent = 1-this.state.clock/this.props.duration
        return (
            <div className="timer" id="timer">
                <span className="restTime"> {this.time}</span>
				<div className="progress" style={{width: `${percent*100}%`}}/>
            </div>
        );
    }
}

export default Timer;