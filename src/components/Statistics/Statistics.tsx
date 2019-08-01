import * as React from 'react';
import { connect } from 'react-redux'
import Rect from './rect'
import _ from 'lodash'
import { format } from 'date-fns'
import './Statistics.scss'
import Polygon from './Polygon'
import TodohistoryItem from './todoHistory/todoHistory'
interface IStattisticProps {
	todos: any[],
	tomatoes: any[]
}
interface IState {
	activeId: number
	liWidth: number
	// ulWidth: number
}

class Statistics extends React.Component<IStattisticProps,IState> {
	liNode: HTMLLIElement | null;
	// ulNode: HTMLUListElement | null;
	constructor(props: any) {
		super(props)
		console.log(this.props)
		this.state = {
			activeId: -1,
			liWidth: this.liNode?this.liNode.offsetWidth-2 : 0,
			// ulWidth: this.ulNode?this.ulNode.offsetWidth-2 :0
		  }
	}
	updateSize = ()=>{
		const liWidth = this.liNode? this.liNode.offsetWidth-2: 0
		// let ulWidth = this.ulNode? this.ulNode.offsetWidth-66: 0
		//   if(ulWidth<0){
		// 	  ulWidth = 0
		//   }
		if(this.state.liWidth !==liWidth){this.setState({ liWidth })}
		// if(this.state.ulWidth !==ulWidth){this.setState({ ulWidth })}
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
	render() {
		return (
			<div className="Statistics">
				<ul className="statisticPart">
					<li>
					<div className="desc"><span className="title">统计</span>
						<span className="subtitle">一周累计</span>
						<span className="quantity">{this.FinishedTodos.length}</span>
						</div>
						<Rect data={this.dailyTodos}
								totalFinishedCount={this.FinishedTodos.length} 
								width={this.state.liWidth}/>
					</li>
					<li>
					<div className="desc"><span className="title">番茄历史</span>
						<span className="subtitle">累计完成番茄</span>
						<span className="quantity">{this.FinishedTomatoes.length}</span>
						</div>
							<Polygon data={this.dailyTomatoes}
								totalFinishedCount={this.FinishedTomatoes.length} 
								width={this.state.liWidth}/>
					</li>
					<li ref={li=>this.liNode=li}>
						<div className="desc"><span className="title">任务历史</span>
						<span className="subtitle">累计完成任务</span>
						<span className="quantity">{this.FinishedTodos.length}</span>
						</div>
							<Polygon data={this.dailyTodos}
								totalFinishedCount={this.FinishedTodos.length} 
								width={this.state.liWidth}/>
						
					</li>
				</ul>
				<TodohistoryItem className="todoHistory" />
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