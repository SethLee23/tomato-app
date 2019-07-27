import { ADD_TODO, INIT_TODO,UPDATE_TODO,EDITING_TODO } from '../actionType'
export default (state: any[]=[], action: any): any => {
  switch (action.type) {
    case ADD_TODO:
      console.log("action.payload")
      console.log(action.payload)
      console.log('state')
      console.log(state)
      return [state,...action.payload];
    case INIT_TODO:
      return [...action.payload]
    case UPDATE_TODO:
      return state.map(i => {
        if(i.id===action.payload.id){
          return action.payload
        }else{
          return i
        }
      })
    case EDITING_TODO:
        return state.map(t=>{
          if(t.id === action.payload){
            return Object.assign({},t,{editing: true})
          }else{
            return Object.assign({},t,{editing: false})
          }
        })
    default:
      return state;
  }

}
