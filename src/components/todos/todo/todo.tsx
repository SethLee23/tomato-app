import * as React from 'react';
import Inputtodo from 'src/components/todos/todoInput/todoInput'
import Todoitem from 'src/components/todos/todoItem/todoItem'
import axios from 'src/config/axios'
import { connect } from "react-redux";
import {addTodo} from '../../../redux/action'

class Todo extends React.Component<{}, { todos: any[] }> {
    constructor(props: any) {
        super(props)
        this.state = {
            todos: [],
        }
    }
    addTodo = async(para:any) => {
        const {todos} = this.state
        try {
            const response = await axios.post('todos',{description: para})
            // 注意
           this.setState({todos: [response.data.resource,...todos]})
            console.log('add',response.data)
		}catch (e) {
			throw new Error(e)
		}
    }
    getTodo = async() => {
        try {
            const response = await axios.get('todos')
            const todos = response.data.resources.map(t=>Object.assign({},t,{editing: false}))
            this.setState({todos})
		}catch (e) {
			throw new Error(e)
		}
    }
    updateTodo = async(id:number,params: any) => {
        console.log('update')
        const {todos} = this.state
        try{
            const response = await axios.put(`todos/${id}`,params)
            console.log(response)
            const newState = todos.map(i => {
                if(id === i.id){
                    return response.data.resource
                }else{
                   return i 
                }
            })
            this.setState({todos: newState})
        }catch(e){throw new Error(e)}
    }
    editTodo = (id:number) => {
        const {todos} = this.state
      const newTodo =  todos.map(i => {
            if(id === i.id){
                return Object.assign({},i,{editing: true})
            }else{
                return Object.assign({},i,{editing: false})
            }
        })
        this.setState({todos: newTodo})
    }
     componentDidMount(){
      this.getTodo()  
    } 
    get uncompletd(){
        return this.undeleted.filter(i => !i.completed)
    }
    get completd(){
        return this.undeleted.filter(i => i.completed)
    }
    get undeleted(){
        return this.state.todos.filter(i => !i.deleted)
    }
    render() {
        return (
                <div className="Todos">
                    <Inputtodo addTodo={(para)=>{this.addTodo(para)}}/>
                    {this.uncompletd.map((i) => {
                        return <Todoitem key={i.id} {...i}
                         updateTodo={this.updateTodo}
                         editTodo = {this.editTodo}/>
                    })}
                    {this.completd.map((i) => {
                        return <Todoitem key={i.id} {...i}
                         updateTodo={this.updateTodo}
                         editTodo = {this.editTodo}/>
                    })}
                </div>
        );
    }
   
}
// state
const mapStateProps = (state, ownProps) => ({
    todos: state.todos,
    ...ownProps 
 })
//  action
 const mapDispatchToProps = (state, ownProps) => ({
    addTodo,
 })
export default connect(mapStateProps, mapDispatchToProps )(Todo)