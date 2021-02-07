import { combineReducers } from 'redux'
import authReducer from './auth.reducer'
import facultyReducer from './faculty.reducer'
import userReducer from './user.reducer'

const rootReducer = combineReducers({
    auth: authReducer,
    faculty: facultyReducer,
    user: userReducer
})

export default rootReducer