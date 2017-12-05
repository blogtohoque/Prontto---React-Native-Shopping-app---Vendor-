import createReducer from '../createReducer'
import * as types from '../actions/types'

export const userInfo = createReducer({},{
    [types.SET_USER_DATA](state, action){
        return action.data
    }
})