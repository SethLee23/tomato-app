import * as React from 'react';
import { connect } from 'react-redux'
import _ from 'lodash'
import { format } from 'date-fns'
import './Statistics.scss'
import Polygon from './Polygon'
import TodohistoryItem from './todoHistory'
interface IStattisticProps {
	todos: any[],
	tomatoes: any[]
}


class Statistics extends React.Component<IStattisticProps> {

	constructor(props: any) {
		super(props)
		console.log(this.props)
	}
	get FinishedTodos() {
		return this.props.todos.filter(t => t.completed && !t.deleted)
	}
	get dailyTodos() {
        const obj = _.groupBy(this.FinishedTodos, (todos) => {
          return format(todos.updated_at, 'YYYY-MM-D')
        })
        return obj
    }
	render() {
		return (
			<div className="Statistics">
				<ul>
					<li>统计</li>
					<li>目标</li>
					<li>番茄历史</li>
					<li>
						任务历史
                        累计完成{this.FinishedTodos.length}个任务
						<Polygon data={this.dailyTodos}
						totalFinishedCount={this.FinishedTodos.length}/>
				</li>
				</ul>
				<TodohistoryItem className="todoHistory"/>
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