import * as React from 'react';
import { Button, Input, Icon, Modal } from 'antd'
import axios from 'src/config/axios'
import './tomatoesButton.scss'
import Timer from './timer'

interface ITomatoesProps {
    finished: boolean,
    onFinished: () => void,
    startTomatoes: () => void,
    uncompleted: any
    updateTomatoes: (params: any) => any,

}
interface ITomatoesState {
    description: string,
    
}
const { confirm } = Modal;
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
    addDesciption =  () => {
        this.updateTomato( {
            description: this.state.description,
            ended_at: new Date()
        })
        this.setState({ description: '' })
    }
    confirmDelete = () => {
        this.showConfirm()
    }
    showConfirm = ()=>  {
        confirm({
          title: '确定删除番茄吗?',
          onOk:() => {
            this.abortTomato()
            
          },
          onCancel:()=>  {
            console.log("否")
          },
          okText: '是',
          cancelText: '否'
        });
      }
    abortTomato =  () => {
        this.updateTomato( {
            aborted: true
        })
    }
    updateTomato = async (params: any) => {
        try {
            const response = await axios.put(`tomatoes/${this.props.uncompleted.id}`, params)
            this.props.updateTomatoes(response.data.resource)
        } catch (e) { console.error(e) }
    }
    
    get html(){
        let html = <div />
        if (this.props.uncompleted === undefined) {
          return <Button className="startbutton" onClick={() => { this.props.startTomatoes() }}>开始番茄</Button>
        } else {
            const started = Date.parse(this.props.uncompleted.started_at)
            const duration = this.props.uncompleted.duration
            const nowTime = new Date().getTime()
            if (nowTime - started > duration || this.props.finished) {
                html = <div className="inputWrapper">
                    <Input value={this.state.description}
                        placeholder="请输入完成的任务"
                        onKeyUp={e => { this.keyUp(e) }}
                        onChange={(e) => { this.setState({ description: e.target.value }) }} />
                    <Icon type="close-circle" className="abort" onClick={this.confirmDelete}/>
                </div>
            } else if (nowTime - started < duration) {
                const timer = duration - nowTime + started
                
                
                html = (
                    <div className="timerWrapper">
                        <Timer timer={timer} onFinished={this.props.onFinished} duration={this.props.uncompleted.duration}/>
                        <Icon type="close-circle" className="abort" onClick={this.confirmDelete}/>
                    </div>
                )
            }
        }
        return html
    }
    public render() {
        return (
            <div className="tomatoesButton" id="tomatoesButton">
                {this.html}
            </div>
        );
    }
}

export default TomatoesButton;