import { ADD_TOMATOES } from '../actionTypes'

export default (state:any[] = [], action:any):any => {
	switch (action.type){
		case ADD_TOMATOES:
			return [action.payload,...state];
		default:
			return state
	}
}

