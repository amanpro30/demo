import { updateObject } from '../utility';
import * as actionTypes from '../actions/actionTypes';

const intialState = {
    items : [],
    linkError: '',
  };
  
const addItem = (state,action) => {
    const len = (state.items.length+1).toString();
    if(action.items.startsWith('https') && action.items.includes('www.youtube.com') && action.items.includes('watch?v=')){
        return updateObject(state, {
            items: [...state.items, {'id':len, 'content': action.items}],
        });
    }
    else{
        return updateObject(state, {
            linkError: "Invalid Link",
        });
    }
}  

const delItem = (state,action) => {
    for( var i = 0; i < state.items.length; i++){ 
        if ( state.items[i].id === action.id) {
          state.items.splice(i, 1); 
        }
    }
    return updateObject(state, {
       items: [...state.items] 
    });
}

const reorderItem = (state, action) => {
    return updateObject(state,{
        items: action.items,
    });
}

const reducer = (state = intialState, action) => {
    switch(action.type){
      case actionTypes.ADD_ITEM: return addItem(state,action);
      case actionTypes.DEL_ITEM: return delItem(state,action);
      case actionTypes.REORDER_ITEM: return reorderItem(state, action);
      default:
        return state;
    }
}

export default reducer;