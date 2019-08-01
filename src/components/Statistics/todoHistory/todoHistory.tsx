import * as React from 'react';
import { connect } from 'react-redux'
import _ from 'lodash'
import { format } from 'date-fns'
import { Tabs } from 'antd';
import './todoHistory.scss'
// import Polygon from './Polygon'
import TodohistoryItem from './TodohistoryItem'
interface ITodoHistoryProps {
    todos: any[], 
    tomatoes: any[]
}
const { TabPane } = Tabs;
// const TodohistoryItem = (props) => {
//     return (
//         <div className="TodohistoryItem">
//             <span className="time">{format(props.updated_at, 'H:mm')}</span>
//             <span className="description">{props.description}</span>
//         </div>
//     )
// }
class Todohistory extends React.Component<ITodoHistoryProps> {

    constructor(props: any) {
        super(props)
    }
    get finishedTodos() {
        return this.props.todos.filter(t => !t.deleted && t.completed)
    }
    get deletedTodos() {
        return this.props.todos.filter(t => t.deleted)
    }
    get dates() {
        return Object.keys(this.dailyFinishedTodos).sort((a, b) => Date.parse(b) - Date.parse(a))
    }
    get deleteDates() {
        return Object.keys(this.dailyDeletedTodos).sort((a, b) => Date.parse(b) - Date.parse(a))
    }
    get dailyFinishedTodos() {
        return _.groupBy(this.finishedTodos, (todo) => {
            return format(todo.updated_at, 'YYYY-MM-D')
        })
    }
    get dailyDeletedTodos() {
        return _.groupBy(this.deletedTodos, (todo) => {
            return format(todo.updated_at, 'YYYY-MM-D')
        })
    }
    callback = (key) => {
        console.log(key);
    }
    render() {
        const todoList = (this.dates.map(d => {
            return (
                <div key={d} className="dailyTodo">
                    <div className="summary">
                        <div className="date">
                            <span>{d}</span>
                            <span className="weekday">周五</span>
                        </div>
                        <div className="finishedCount">完成{this.dailyFinishedTodos[d].length}个任务</div>
                    </div>
                    <div className="todoListHistory">
                        {
                            this.dailyFinishedTodos[d].map(t => {
                                return <TodohistoryItem key={t.id} todo={...t} itemType="finished"/>
                            })
                        }
                    </div>
                </div>
            )
        }))
        const deletedList = (this.deleteDates.map(d => {
            return (
                <div key={d}  className="dailyTodo">
                    <div className="summary">
                        <div className="date">
                            <span>{d}</span>
                            <span className="weekday">周五</span>
                        </div>
                        <div className="finishedCount">删除{this.dailyDeletedTodos[d].length}个任务</div>
                    </div>
                    <div className="todoListHistory">
                        {this.dailyDeletedTodos[d].map(t => {
                            return <TodohistoryItem key={t.id} todo={...t} itemType="deleted"/>
                        })}
                    </div>
                </div>
            )
        }))
        return (
            <div>
                <Tabs defaultActiveKey="1" onChange={this.callback} type="card">
                    <TabPane tab="已完成的任务" key="1">
                        {todoList}
                    </TabPane>
                    <TabPane tab="已删除的任务" key="2">
                        {deletedList}
                    </TabPane>
                </Tabs>

            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    todos: state.todos
})


export default connect(mapStateToProps)(Todohistory);