import { combineReducers } from 'redux'
import authReducer from './auth.reducer'
import contributionReducer from './contribution.reducer'

const rootReducer = combineReducers({
    auth: authReducer,
    contribution: contributionReducer,
})

export default rootReducer