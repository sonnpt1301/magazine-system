import { combineReducers } from 'redux'
import authReducer from './auth.reducer'
import contributionReducer from './contribution.reducer'
import messageReducer from './chat.reducer'
import userReducer from './user.reducer'

const rootReducer = combineReducers({
    auth: authReducer,
    contribution: contributionReducer,
    message: messageReducer,
    user: userReducer
})

export default rootReducer