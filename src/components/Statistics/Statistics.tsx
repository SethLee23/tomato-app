import * as React from 'react';
import { connect } from 'react-redux'
import Rect from './rect'
import _ from 'lodash'
import { format } from 'date-fns'
import './Statistics.scss'
import Polygon from './Polygon'
// import TodohistoryItem from './todoHistory/todoHistory'
import Todohistory from './todoHistory/todoHistory'
import classNames from 'classnames';
interface IStattisticProps {
	todos: any[],
	tomatoes: any[]
}
interface IState {
	activeId: number
	liWidth: number
	type: string
	tab: any[]
	curIndex: number
}

class Statistics extends React.Component<IStattisticProps,IState> {
	liNode: HTMLLIElement | null;
	constructor(props: any) {
		super(props)
		this.state = {
			activeId: -1,
			liWidth: this.liNode?this.liNode.offsetWidth-2 : 0,
			type: 'todo',
			tab: ['已完成的任务','已删除的任务'],
			curIndex: 0
		  }
	}
	updateSize = ()=>{
		const liWidth = this.liNode? this.liNode.offsetWidth-2: 0
		if(this.state.liWidth !==liWidth){this.setState({ liWidth })}
	  }
	componentDidMount(){
		this.updateSize()
		window.addEventListener('resize', this.updateSize);
	  }
	  componentWillUnmount(){
		window.removeEventListener('resize', this.updateSize);
	  }
	get FinishedTodos() {
		return this.props.todos.filter(t => t.completed && !t.deleted)
	}
	get FinishedTomatoes() {
		return this.props.tomatoes.filter(t => t.description && t.ended_at && !t.aborted)
	}
	get dailyTodos() {
		const obj = _.groupBy(this.FinishedTodos, (todos) => {
			return format(todos.updated_at, 'YYYY-MM-D')
		})
		return obj
	}
	get dailyTomatoes() {
		return  _.groupBy(this.FinishedTomatoes, (tomatoes) => {
			return format(tomatoes.ended_at, 'YYYY-MM-D')
		})
	}
	showTomato = (e) => {
		this.setState({type: 'tomato', tab: ['已完成的番茄','打断记录'],curIndex:2})
	}
	showTodo = () => {
		console.log("todo")
		this.setState({type: 'todo',tab: ['已完成的任务','已删除的任务'],curIndex:3})
	}
	showTask = () => {
		console.log("showTask")
	}
	render() {
		const activeClass3 = classNames({
			active: this.state.curIndex===3,
		})
		const activeClass2 = classNames({
			active: this.state.curIndex===2,
		})
		return (
			<div className="Statistics">
				<ul className="statisticPart">
					<li >
					<div className="desc"><span className="title">统计</span>
						<span className="subtitle">一周累计</span>
						<span className="quantity">{this.FinishedTodos.length}</span>
						</div>
						<Rect data={this.dailyTodos}
								totalFinishedCount={this.FinishedTodos.length} 
								width={this.state.liWidth}/>
					</li>
					<li onClick={(e)=>{this.showTomato(e)}} className={activeClass2}>
					<div className="desc"><span className="title">番茄历史</span>
						<span className="subtitle">累计完成番茄</span>
						<span className="quantity">{this.FinishedTomatoes.length}</span>
						</div>
							<Polygon data={this.dailyTomatoes}
								totalFinishedCount={this.FinishedTomatoes.length} 
								width={this.state.liWidth}/>
					</li>
					<li ref={li=>this.liNode=li} onClick={this.showTodo} className={activeClass3}>
						<div className="desc"><span className="title">任务历史</span>
						<span className="subtitle">累计完成任务</span>
						<span className="quantity">{this.FinishedTodos.length}</span>
						</div>
							<Polygon data={this.dailyTodos}
								totalFinishedCount={this.FinishedTodos.length} 
								width={this.state.liWidth}/>
						
					</li>
				</ul>
				<Todohistory className="todoHistory" type={this.state.type} tab={this.state.tab}/>
			</div>
		);
	}
}
const mapStateToProps = (state, ownProps) => ({
	...ownProps,
	todos: state.todos,
	tomatoes: state.tomatoes,
})


export default connect(mapStateToProps)(Statistics);