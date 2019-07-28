import * as React from 'react';
import { Button, Input, Icon } from 'antd'
import axios from 'src/config/axios'
import './tomatoes.scss'
import Timer from './timer'
interface ITomatoesProps {
    startTomatoes: () => void,
    uncompleted: any
    updateTomatoes: (params:any) => any
}
interface ITomatoesState {
    description: string
}

class TomatoesButton extends React.Component<ITomatoesProps, ITomatoesState> {
    constructor(props) {
        super(props)
        this.state = {
            description: '',
        }
    }
    keyUp = (e) => {
        if (e.keyCode === 13 && this.state.description !== '') {
            this.addDesciption()
        }
    }
    addDesciption = async () => {
        try {
            const response = await axios.put(`tomatoes/${this.props.uncompleted.id}`,
                { description: this.state.description,
                    ended_at: new Date() 
                })
            this.props.updateTomatoes(response.data.resource)
            this.setState({ description: '' })
        } catch (e) { console.error(e) }
    }
    public render() {

        let html = <div />

        if (this.props.uncompleted === undefined) {
            html = <Button className="startbutton" onClick={() => { this.props.startTomatoes() }}>开始番茄</Button>
        } else {
            const started = Date.parse(this.props.uncompleted.started_at)
            const duration = this.props.uncompleted.duration
            const nowTime = Date.parse(new Date().toUTCString())
            if (nowTime - started > duration) {
                html = <div>
                    <Input value={this.state.description}
                placeholder="请输入完成的任务"
                    onKeyUp={e => { this.keyUp(e) }}
                    onChange={(e) => { this.setState({ description: e.target.value }) }} />
                    <Icon type="close" />
                    </div>
            } else if (nowTime - started < duration) {
                const timer = duration - (nowTime - started)
                html = <Timer timer={timer} />
            }
        }
        return (
            <div className="tomatoesButton" id="tomatoesButton">
                {html}
            </div>
        );
    }
}

export default TomatoesButton;