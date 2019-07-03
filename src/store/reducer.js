import * as constants from './actionTypes'

const defaultState = {
    listData: []
};

export default (state = defaultState, action)=>{
    if(action.type === constants.INIT_LIST_DATA){
        const newState = JSON.parse(JSON.stringify(state));
        newState.listData = action.listData;
        return newState;
    }
    return state;
}