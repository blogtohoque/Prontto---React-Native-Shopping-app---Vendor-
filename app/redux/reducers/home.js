import createReducer from '../createReducer'
import * as types from '../actions/types'

export const welcome = createReducer('loading...',{
    [types.WELCOME](state, action){
        return 'Welcome to Pronto!';
    }
})