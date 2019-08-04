import * as React from 'react';
import { connect } from 'react-redux'
import _ from 'lodash'
import { format } from 'date-fns'
import { Tabs, Switch, Pagination } from 'antd';
import './todoHistory.scss'
// import Polygon from './Polygon'
import TodohistoryItem from './TodohistoryItem'
import Addtomato from '../tomatoHistory/addTomato'
import classNames from 'classnames';
interface ITodoHistoryProps {
    todos: any[],
    tomatoes: any[],
    type: string,
    tab: any[],

}
interface ITodoHistoryState {
    current: number
    showCanlendar: boolean
    page: number
    paneType: string
}
const { TabPane } = Tabs;
const weekArray = new Array("日", "一", "二", "三", "四", "五", "六")
class Todohistory extends React.Component<ITodoHistoryProps, ITodoHistoryState> {

    constructor(props: any) {
        super(props)
        this.state = {
            showCanlendar: true,
            page: 1,
            current: 1,
            paneType: 'completed',
        }
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
    get todoList() {
        return (this.dates.splice(this.state.page-1, 1).map(d => {
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
                                return <TodohistoryItem key={t.id} todo={...t} itemType="finished" type={this.props.type} />
                            })
                        }
                    </div>
                </div>
            )
        }))
    }
    get tomatoesList() {
        return (this.tomatoDates.splice(this.state.page-1, 1).map(d => {
            return (
                <div key={d} className="dailyTodo">
                    <div className="summary">
                        <div className="date">
                            <span>{d}</span>
                            <span className="weekday">周{weekArray[new Date(d).getDay()]}</span>
                        </div>
                        <div className="finishedCount">完成{this.dailyCompletedTomatoes[d].length}个番茄</div>
                    </div>
                    <div className="todoListHistory">
                        {
                            this.dailyCompletedTomatoes[d].map(t => {
                                return <TodohistoryItem key={t.id} todo={...t} itemType="finished" type={this.props.type} />
                            })
                        }
                    </div>
                </div>
            )
        }))
    }
    get deletedList() {
        return (this.deleteDates.splice(this.state.page-1, 1).map(d => {
            return (
                <div key={d} className="dailyTodo">
                    <div className="summary">
                        <div className="date">
                            <span>{d}</span>
                            <span className="weekday">周{weekArray[new Date(d).getDay()]}</span>
                        </div>
                        <div className="finishedCount">删除{this.dailyDeletedTodos[d].length}个任务</div>
                    </div>
                    <div className="todoListHistory">
                        {this.dailyDeletedTodos[d].map(t => {
                            return <TodohistoryItem key={t.id} todo={...t} itemType="deleted" type={this.props.type} />
                        })}
                    </div>
                </div>
            )
        }))
    }
    get abortedList() {
        return (this.abortedDates.splice(this.state.page-1, 1).map(d => {
            return (
                <div key={d} className="dailyTodo">
                    <div className="summary">
                        <div className="date">
                            <span>{d}</span>
                            <span className="weekday">周{weekArray[new Date(d).getDay()]}</span>
                        </div>
                        <div className="finishedCount">删除{this.dailyAbortedTomatoes[d].length}个番茄</div>
                    </div>
                    <div className="todoListHistory">
                        {this.dailyAbortedTomatoes[d].map(t => {
                            return <TodohistoryItem key={t.id} todo={...t} itemType="deleted" type={this.props.type} />
                        })}
                    </div>
                </div>
            )
        }))
    }
    callback = (key) => {
        if (key === '1') {
            this.setState({
                paneType: 'completed',
            })
        } else if (key === '2') {
            this.setState({
                paneType: 'deleted',
            })
        }
        this.changePagination(1)
    }
    onChange = (checked) => {
        this.setState({ showCanlendar: checked })
    }
    changePagination = (page) => {
        console.log(page)
        this.setState({ page, current: page, })
    }
    get list() {
        const active = classNames({
            cactive: this.state.showCanlendar,
            chide: !this.state.showCanlendar,
            dailyTodo: true
        })
        let list
        if (this.props.type === 'todo') {
            list = this.todoList
        } else if (this.props.type === 'tomato') {
            list = (<div><div className={active}><Addtomato /></div>{this.tomatoesList}</div>)
        }
        return list
    }
    get deleteAndAbort() {
        let deleteAndAbort
        if (this.props.type === 'todo') {
            deleteAndAbort = this.deletedList
        } else if (this.props.type === 'tomato') {
            deleteAndAbort = this.abortedList
        }
        return deleteAndAbort
    }
    get total() {
        let total
        if (this.props.type === 'todo') {
            if (this.state.paneType === 'completed') {
                total = +this.dates.length || 1
            } else {
                total = +this.deleteDates.length  || 1
            }
        } else if (this.props.type === 'tomato') {
            if (this.state.paneType === 'completed') {
                total = this.tomatoDates.length  || 1
            } else {
                total = this.abortedDates.length  || 1
            }
        }

        return total * 10
    }
    render() {
  
        const total = this.total
        const historyList = (<div>
            <div className="todohistoryContainer">
                {this.props.type === 'tomato' ? <div className="ant-switch-wrapper"><Switch defaultChecked={true} onChange={this.onChange} /></div> : <span />}
                <Tabs defaultActiveKey="1" onChange={this.callback} type="card">
                    <TabPane tab={this.props.tab[0]} key="1">
                        {this.list}
                    </TabPane>
                    <TabPane tab={this.props.tab[1]} key="2">
                        {this.deleteAndAbort}
                    </TabPane>
                </Tabs>
            </div>
            <Pagination simple={true} total={total} current={this.state.current} onChange={this.changePagination} />
        </div>)
        return (
            historyList
        );
    }
}
const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    todos: state.todos,
    tomatoes: state.tomatoes,
})


export default connect(mapStateToProps)(Todohistory);