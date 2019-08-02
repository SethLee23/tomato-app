import * as React from 'react';
// import _ from 'lodash'
import { format } from 'date-fns'
import './todoHistoryItem.scss'
import { connect } from 'react-redux'
import { updateTodo, updateTomatoes } from '../../../redux/actions'
import axios from '../../../config/axios'

interface ITodoHistoryProps {
    todo: any,
    itemType: string,
    // id: number,
    updateTodo: (payload: any) => any,
    type: string,
    updateTomatoes: (payload: any) => any
}
class TodoHistoryItem extends React.Component<ITodoHistoryProps> {

    constructor(props: any) {
        super(props)
    }
    updateTodo = async (params: any) => {
        try {
            const response = await axios.put(`todos/${this.props.todo.id}`, params)
            this.props.updateTodo(response.data.resource)
        } catch (e) {
            throw new Error(e)
        }

    }
    updateTomatoes = async (params: any) => {
        try {
            const response = await axios.put(`tomatoes/${this.props.todo.id}`, params)
            this.props.updateTomatoes(response.data.resource)
        } catch (e) { console.error(e) }
    }
    render() {
        const type = this.props.type
        let action
        let todoTime
        let formatTime
        let time
        if (this.props.itemType === 'finished') {
            if (type === 'tomato') {
                time = (<span className="time">{format(this.props.todo.started_at, 'H:mm')}--{format(this.props.todo.ended_at, 'H:mm')}</span>)
                action = (
                    <div className="actions">
                        <span onClick={e => this.updateTomatoes({ aborted: true })}>删除</span>
                    </div>
                )
            } else {
                todoTime = this.props.todo.updated_at
                formatTime = 'H:mm'
                time = format(todoTime, formatTime)
                action = (
                    <div className="actions">
                        <span onClick={e => this.updateTodo({ deleted: true })}>删除</span>
                        <span onClick={e => this.updateTodo({ completed: false })}>恢复</span>
                    </div>
                )
            }
        } else if (this.props.itemType === 'deleted') {
            todoTime = this.props.todo.created_at
            formatTime = 'YYYY-MM-DD'
            time = format(todoTime, formatTime)
            if (type === 'tomato') {
                action = (
                    <span />
                )
            } else if (type === 'todo') {
                action = (
                    <div className="actions">
                        <span onClick={e => this.updateTodo({ completed: false, deleted: false })}>恢复</span>
                    </div>
                )
            }
        }
        const descriptionList = this.props.todo
        console.log(descriptionList.manually_created)
        let description
        if(descriptionList.manually_created){
            description = (<span>{this.props.todo.description }<span className="addPotato">（补打）</span></span>)
        }else{
            description = this.props.todo.description
        }
        const text = (
            <div className="text" >
                <span className="time">{time}</span>
                <span className="description">{this.props.todo.description ? description : '描述为空'}</span>
            </div>
        )
        return (
            <div className="Statistics">
                <div className="TodohistoryItem">
                    {text}
                    <div >
                        {action}
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => ({
    ...ownProps
})

const mapDispatchToProps = {
    updateTodo,
    updateTomatoes
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoHistoryItem);
