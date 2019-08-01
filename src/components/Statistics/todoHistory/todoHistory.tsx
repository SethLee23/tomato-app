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
    tomatoes: any[],
    type: string,
    tab: any[]
}
const { TabPane } = Tabs;
class Todohistory extends React.Component<ITodoHistoryProps> {

    constructor(props: any) {
        super(props)
    }
    get finishedTodos() {
        return this.props.todos.filter(t => !t.deleted && t.completed)
    }
    get completedTomatoes() {
        return this.props.tomatoes.filter(t => t.description && t.ended_at && !t.aborted)
    }
    get deletedTodos() {
        return this.props.todos.filter(t => t.deleted)
    }
    get abortedTomatoes() {
        return this.props.tomatoes.filter(t => t.aborted)
    }
    get dates() {
        return Object.keys(this.dailyFinishedTodos).sort((a, b) => Date.parse(b) - Date.parse(a))
    }
    get tomatoDates() {
        return Object.keys(this.dailyCompletedTomatoes).sort((a, b) => Date.parse(b) - Date.parse(a))
    }
    get deleteDates() {
        return Object.keys(this.dailyDeletedTodos).sort((a, b) => Date.parse(b) - Date.parse(a))
    }
    get abortedDates() {
        return Object.keys(this.dailyAbortedTomatoes).sort((a, b) => Date.parse(b) - Date.parse(a))
    }
    get dailyFinishedTodos() {
        return _.groupBy(this.finishedTodos, (todo) => {
            return format(todo.updated_at, 'YYYY-MM-D')
        })
    }
    get dailyCompletedTomatoes() {
        return _.groupBy(this.completedTomatoes, (tomato) => {
            return format(tomato.ended_at, 'YYYY-MM-D')
        })
    }
    get dailyDeletedTodos() {
        return _.groupBy(this.deletedTodos, (todo) => {
            return format(todo.updated_at, 'YYYY-MM-D')
        })
    }
    get dailyAbortedTomatoes() {
        return _.groupBy(this.abortedTomatoes, (tomato) => {
            return format(tomato.created_at, 'YYYY-MM-D')
        })
    }
    callback = (key) => {
        console.log(key);
    }
    render() {
        const weekArray = new Array("日", "一", "二", "三", "四", "五", "六")
        const todoList = (this.dates.map(d => {
            return (
                <div key={d} className="dailyTodo">
                    <div className="summary">
                        <div className="date">
                            <span>{d}</span>
                            <span className="weekday">周{weekArray[new Date(d).getDay()]}</span>
                        </div>
                        <div className="finishedCount">完成{this.dailyFinishedTodos[d].length}个任务</div>
                    </div>
                    <div className="todoListHistory">
                        {
                            this.dailyFinishedTodos[d].map(t => {
                                return <TodohistoryItem key={t.id} todo={...t} itemType="finished" type={this.props.type}/>
                            })
                        }
                    </div>
                </div>
            )
        }))
        const tomatoesList = (this.tomatoDates.map(d => {
            return (
                <div key={d} className="dailyTodo">
                    <div className="summary">
                        <div className="date">
                            <span>{d}</span>
                            <span className="weekday">周五</span>
                        </div>
                        <div className="finishedCount">完成{this.dailyCompletedTomatoes[d].length}个番茄</div>
                    </div>
                    <div className="todoListHistory">
                        {
                            this.dailyCompletedTomatoes[d].map(t => {
                                return <TodohistoryItem key={t.id} todo={...t} itemType="finished" type={this.props.type}/>
                            })
                        }
                    </div>
                </div>
            )
        }))
        const deletedList = (this.deleteDates.map(d => {
            return (
                <div key={d} className="dailyTodo">
                    <div className="summary">
                        <div className="date">
                            <span>{d}</span>
                            <span className="weekday">周五</span>
                        </div>
                        <div className="finishedCount">删除{this.dailyDeletedTodos[d].length}个任务</div>
                    </div>
                    <div className="todoListHistory">
                        {this.dailyDeletedTodos[d].map(t => {
                            return <TodohistoryItem key={t.id} todo={...t} itemType="deleted" type={this.props.type}/>
                        })}
                    </div>
                </div>
            )
        }))
        const abortedList = (this.abortedDates.map(d => {
            return (
                <div key={d} className="dailyTodo">
                    <div className="summary">
                        <div className="date">
                            <span>{d}</span>
                            <span className="weekday">周五</span>
                        </div>
                        <div className="finishedCount">删除{this.dailyAbortedTomatoes[d].length}个番茄</div>
                    </div>
                    <div className="todoListHistory">
                        {this.dailyAbortedTomatoes[d].map(t => {
                            return <TodohistoryItem key={t.id} todo={...t} itemType="deleted" type={this.props.type}/>
                        })}
                    </div>
                </div>
            )
        }))
        let list
        if (this.props.type === 'todo') {
            list = todoList
        } else if (this.props.type === 'tomato') {
            list = tomatoesList
        }
        let deleteAndAbort
        if (this.props.type === 'todo') {
            deleteAndAbort =  deletedList
        } else if (this.props.type === 'tomato') {
            deleteAndAbort = abortedList
        }
        return (
            <div>
                <Tabs defaultActiveKey="1" onChange={this.callback} type="card">
                    <TabPane tab={this.props.tab[0]} key="1">
                        {/* {tomatoesList} */}
                     {list}
                    </TabPane>
                    <TabPane tab={this.props.tab[1]} key="2">
                        {deleteAndAbort}
                    </TabPane>
                </Tabs>

            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    todos: state.todos,
    tomatoes: state.tomatoes,
})


export default connect(mapStateToProps)(Todohistory);