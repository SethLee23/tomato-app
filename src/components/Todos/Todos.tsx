import * as React from 'react';
import { connect } from 'react-redux';
import { updateTodo } from "../../redux/actions";
import TodoInput from 'src/components/Todos/TodoInput'
import TodoItem from 'src/components/Todos/TodoItem'
// import axios from 'src/config/axios'
import './Todos.scss'
import { Collapse } from 'antd';

const { Panel } = Collapse;
class Todos extends React.Component<any> {
	constructor(props) {
		super(props)
	}

	get unDeletedTodos() {
		return this.props.todos.filter(t => !t.deleted)
	}

	get unCompletedTodos() {
		return this.unDeletedTodos.filter(t => !t.completed)
	}

	get completedTodos() {
		return this.unDeletedTodos.filter(t => t.completed)
	}


	public render() {
		return (

			<div className="Todos" id="Todos">
				<TodoInput />
				<div className="todoLists">
					{
						this.unCompletedTodos.map(t =>
							<TodoItem key={t.id} {...t} />)
					}
					<Collapse defaultActiveKey={['1']} bordered={false}>
						<Panel header="最近完成任务" key="1">
							{
								this.completedTodos.map(t =>
									<TodoItem key={t.id} {...t} />)
							}
						</Panel>
					</Collapse>

				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	todos: state.todos,
	...ownProps
})

const mapDispatchToProps = {
	updateTodo
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos);