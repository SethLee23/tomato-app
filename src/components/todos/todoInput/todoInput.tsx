import * as React from 'react';
import { Input, Icon} from 'antd'
import axios from 'src/config/axios'
import { connect } from "react-redux";
import { addTodo } from '../../../redux/action'
// import store from 'src/redux/store'
interface ITodoInputState {
    description: string;
}
interface ITodoInputProps {
    addTodo: (payload:any) => any;
}

class Todoinput extends React.Component<ITodoInputProps, ITodoInputState> {
    constructor(props) {
        super(props)
        this.state = {
            description: ''
        }
    }
    postTodo =  async() => {
        try {
			const response = await axios.post('todos',{description: this.state.description})
            this.props.addTodo(response.data.resource)
		}catch (e) {
			throw new Error(e)
		}
		this.setState({description: ''})
	}
    submit = (e) => {
        if (e.keyCode === 13 && this.state.description !== '') {
            this.postTodo()
        }
    }
    
    public render() {
        const { description } = this.state;
        const suffix = description ? <Icon type="enter" onClick={this.postTodo} /> : <span />;
        return (
            <div className="todo" id="TodoInput">
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
const mapStateToProps = (state, ownProps) => ({
	...ownProps
})

const mapDispatchToProps = {
	addTodo
}

export default connect(mapStateToProps,mapDispatchToProps)(Todoinput);
