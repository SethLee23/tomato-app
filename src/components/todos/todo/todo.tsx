import * as React from 'react';
import Inputtodo from 'src/components/todos/todoInput/todoInput'
import Todoitem from 'src/components/todos/todoItem/todoItem'
import axios from 'src/config/axios'
import { connect } from "react-redux";
import { initTodo,updateTodo } from '../../../redux/action'

class Todo extends React.Component<any> {
    constructor(props) {
        super(props)
    }
    getTodo = async() => {
        try {
            const response = await axios.get('todos')
			const todos = response.data.resources.map(t=>Object.assign({},t,{editing: false}))
			this.props.initTodo(todos)
		}catch (e) {
			throw new Error(e)
		}
    }
   
     componentDidMount(){
      this.getTodo()  
    } 
    get uncompleted(){
        return this.undeleted.filter(i => !i.completed)
    }
    get completed(){
        return this.undeleted.filter(i => i.completed)
    }
    get undeleted(){
        return this.props.todos.filter(i => !i.deleted)
    }
    render() {
        return (
			<div className="Todos" id="Todos">
				<Inputtodo/>
				<div className="todoLists">
					{
						this.uncompleted.map(t=>
							<Todoitem key={t.id}  {...t}/>)
					}
					{
						this.completed.map(t=>
							<Todoitem key={t.id}  {...t}/>)
					}
				</div>
			</div>
		);
    }
   
}
// 注意名字
const mapStateToProps = (state, ownProps) => ({
	todos: state.todos,
	...ownProps
})

const mapDispatchToProps = {
    initTodo,
    updateTodo
}

export default connect(mapStateToProps,mapDispatchToProps)(Todo);