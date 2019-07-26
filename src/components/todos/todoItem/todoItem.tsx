import * as React from 'react';
import { Input, Checkbox, Icon } from 'antd'
import './todoItem.scss'


interface ITodoItemProps {
    completed: boolean,
    description: string,
    editing: boolean,
    id: number,
    updateTodo: (id: number, params: any) => void
    editTodo: (id: number) => void
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
    onChange = (id, params:any) => {
        this.props.updateTodo(id, params)
    }
    editTodo = (editing) => {
        this.props.editTodo(this.props.id)
    }
    keyUpHandler = (e) =>{
        if (e.keyCode === 13 && this.state.editText !== '') {
           this.enter()
        }
    }
    enter = () => {
        this.props.updateTodo(this.props.id,{description:this.state.editText})
    }
    public render() {

        const { description, editing } = this.props
        const InputMessage = (
            <div className="contentWrapper">
                <Input value={this.state.editText} type="text" 
                onChange = {(e => {this.setState({editText:e.target.value})})}
                onKeyUp = {(e)=>{this.keyUpHandler(e)}}/>
                <div className="iconWrapper">
                    <Icon type="enter" 
                    onClick = {this.enter}/>
                    <Icon type="delete" 
                     onClick={(e) => { this.onChange(this.props.id, {deleted: true}) }}
                    />
                </div>
            </div>)
        const todoText = (
            <div>
                <Checkbox onChange={(e) => { this.onChange(this.props.id, { completed: e.target.checked }) }} checked={this.props.completed} />
                <span onDoubleClick={this.editTodo}>{description}</span>
            </div>
        )
        return (
            <div className="todoText">
                {editing ? InputMessage : todoText}
            </div>


        );
    }
}

export default Todoitem