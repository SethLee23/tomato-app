import * as React from 'react';
// import _ from 'lodash'
import { format } from 'date-fns'
import './todoHistoryItem.scss'
import { connect } from 'react-redux'
import {updateTodo} from '../../../redux/actions'
import axios from '../../../config/axios'

interface ITodoHistoryProps {
    todo: any,
    itemType: string,
    // id: number,
    updateTodo: (payload:any)=> any;
}
class TodoHistoryItem extends React.Component<ITodoHistoryProps> {

    constructor(props: any) {
        super(props)
    }
    update = async (params: any) => {
        
        try {
            const response = await axios.put(`todos/${this.props.todo.id}`, params)
            this.props.updateTodo(response.data.resource)
        } catch (e) {
            throw new Error(e)
        }

    }
    render() {
        let action
        let todoTime
        let formatTime
        if (this.props.itemType === 'finished') {
            todoTime = this.props.todo.updated_at
            formatTime = 'H:mm'
            action = (
                <div className="actions">
                    <span onClick={e => this.update({ deleted: true })}>删除</span>
                    <span onClick={e => this.update({ completed: false })}>恢复</span>
                </div>
            )
        } else if (this.props.itemType === 'deleted') {
            todoTime = this.props.todo.created_at
            formatTime = 'YYYY-MM-DD'
            action = (
                <div className="actions">
                    <span onClick={e => this.update({ completed: false, deleted: false })}>恢复</span>
                </div>
            )
        }
        return (
            <div className="Statistics">
                <div className="TodohistoryItem">
                    <div className="text" >
                        <span className="time">{format(todoTime, formatTime)}</span>
                        <span className="description">{this.props.todo.description}</span>
                    </div>
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
	updateTodo
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoHistoryItem);
