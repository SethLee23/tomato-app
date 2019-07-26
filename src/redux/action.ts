import {ADD_TODO } from './actionType'

export const addTodo = (payload:any) => {
    return {
        type: ADD_TODO,
        payload
    }
}