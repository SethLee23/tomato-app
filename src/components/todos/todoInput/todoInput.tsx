import * as React from 'react';
// import { Link } from "react-router-dom";
import { Input, Icon} from 'antd'

// import axios from 'src/config/axios'

// import './todoInput.scss'
interface ITodoInputState {
    description: string;
}

class Todoinput extends React.Component<any, ITodoInputState> {
    constructor(props) {
        super(props)
        this.state = {
            description: ''
        }
    }
    postTodo =  ()=>{
        this.props.addTodo(this.state.description)
        this.setState({description: ''})
	}
    submit = (e) => {
        //    this.props.addTodo()
        if (e.keyCode === 13 && this.state.description !== '') {
            this.props.addTodo(this.state.description)
            this.setState({description: ''})
        }
    }
    public render() {
        const { description } = this.state;
        const suffix = description ? <Icon type="enter" onClick={this.postTodo} /> : <span />;
        return (
            <div className="todo">
                <Input placeholder="添加新任务"
                    suffix={suffix}
                    onKeyUp={this.submit}
                    value={description}
                    onChange={(e) => this.setState({ description: e.target.value })}
                />
            </div>
        );
    }
}

export default Todoinput