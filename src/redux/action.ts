import {ADD_TODO, INIT_TODO, UPDATE_TODO, EDITING_TODO } from './actionType'

export const addTodo = (payload:any)=>{
	return {
		type: ADD_TODO,
		payload
	}
}

export const initTodo = (payload:any[]) => {
    return {
        type: INIT_TODO,
        payload
    }
}
export const updateTodo = (payload:any) => {
    return {
        type: UPDATE_TODO,
        payload
    }
}
export const editingTodo = (payload:any[]) => {
    return {
        type: EDITING_TODO,
        payload
    }
}