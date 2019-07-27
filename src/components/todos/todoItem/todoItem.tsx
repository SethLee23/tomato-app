import * as React from 'react';
import { Input, Checkbox, Icon } from 'antd'
import './todoItem.scss'
import classNames from 'classnames';
import axios from 'src/config/axios'
import { connect } from "react-redux";
import {  editingTodo, updateTodo} from '../../../redux/action'

interface ITodoItemProps {
    completed: boolean,
    description: string,
    editing: boolean,
    id: number,
    updateTodo: (payload:any)=> any,
    editingTodo: (id: number) => any
}
interface ITodoItemState {
    editText: any
}
class Todoitem extends React.Component<ITodoItemProps,ITodoItemState>{
    constructor(props) {
        super(props)
        this.state = {
         editText: this.props.description
        }
    }
    keyUpHandler = (e) =>{
        if (e.keyCode === 13 && this.state.editText !== '') {
            this.updateTodo({description:this.state.editText})
        }
    }
    editTodo = () => {
        this.props.editingTodo(this.props.id)
    }
    updateTodo = async(params: any) => {
        try{
            const response = await axios.put(`todos/${this.props.id}`,params)
            this.props.updateTodo(response.data.resource)
        }catch(e){throw new Error(e)}
    }
    public render() {
        const InputMessage = (
            <div className="editing">
                <Input value={this.state.editText} type="text" 
                onChange = {(e => {this.setState({editText:e.target.value})})}
                onKeyUp = {(e)=>{this.keyUpHandler(e)}}/>
                <div className="iconWrapper">
                    <Icon type="enter" 
                    onClick = {e => {this.updateTodo({description:this.state.editText})}}/>
                    <Icon type="delete" 
                       onClick={e => this.updateTodo({deleted: true})}
                    />
                </div>
            </div>)
        const todoText = (
            <span className="text" onDoubleClick={this.editTodo}>
                <span >{this.props.description}</span>
            </span>
        )
        const todoItemClass = classNames({
            completed: this.props.completed,
            editing: this.props.editing,
			TodoItem: true,
		})
        return (
            
            <div className={todoItemClass} id="TodoItem">
                <Checkbox onChange={(e) => { this.updateTodo({ completed: e.target.checked }) }} 
                checked={this.props.completed} />
                {this.props.editing? InputMessage : todoText}
            </div>


        );
    }
}
// 注意名字
const mapStateToProps = (state, ownProps) => ({
	todos: state.todos,
	...ownProps
})

const mapDispatchToProps = {
    editingTodo,
    updateTodo,
}

export default connect(mapStateToProps,mapDispatchToProps)(Todoitem);