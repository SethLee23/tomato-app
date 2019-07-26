import * as React from 'react';
import { Menu, Icon, Dropdown } from 'antd'
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'src/config/axios'
import './index.scss'
import Inputtodo from 'src/components/todos/todoInput/todoInput'
import Todoitem from 'src/components/todos/todoItem/todoItem'
import history from 'src/config/history'

interface IRouter {
    history: any;
}

interface IUser {
    todos: any[],
    user: any,
    
}
const logout = ()=>{
	localStorage.setItem('x-token','')
	history.push('/login')
}

const menu = (
    <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="0" className="menuItem">
            <Icon type="user" />个人设置
        </Menu.Item>
        <Menu.Divider />                    
        <Menu.Item key="1" onClick={logout}>
            <Icon type="enter" />注销
        </Menu.Item>
    </Menu>
);
class Index extends React.Component<IRouter, IUser> {
    constructor(props: any) {
        super(props)
        this.state = {
            todos: [],
            user: {}
        }
    }
    async componentWillMount() {
        await this.getMe()
    }
    getMe = async () => {
        const response = await axios.get('me');
        this.setState({ user: response.data })
    }
    handleMenuClick = (e) => {
        if (e.key === "0") {
            console.log(0)
        }
        if (e.key === "1") {
            localStorage.setItem('x-token', '')
            this.props.history.push('/login')
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
    render() {
        return (
            <div className="index">
                <header>
                    <span className="logo">Logo</span>
                    <Dropdown overlay={menu} trigger={['click']} className="dropMenu">
                        <a className="ant-dropdown-link" href="#">
                            {this.state.user && this.state.user.account} <Icon type="down" />
                        </a>
                    </Dropdown>
                </header>
                <main>
                    <Inputtodo addTodo={(para)=>{this.addTodo(para)}}/>
                    {this.state.todos.map((i) => {
                        return <Todoitem key={i.id} {...i}
                         updateTodo={this.updateTodo}
                         editTodo = {this.editTodo}/>
                    })}
                </main>
            </div>
        );
    }
}
export default Index