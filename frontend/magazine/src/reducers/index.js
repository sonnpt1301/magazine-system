import { combineReducers } from 'redux'
import authReducer from './auth.reducer'
import contributionReducer from './contribution.reducer'
import messageReducer from './chat.reducer'
import userReducer from './user.reducer'
import facultyReducer from './faculty.reducer'
const rootReducer = combineReducers({
    auth: authReducer,
    faculty: facultyReducer,
    contribution: contributionReducer,
    message: messageReducer,
    user: userReducer
})

export default rootReducer