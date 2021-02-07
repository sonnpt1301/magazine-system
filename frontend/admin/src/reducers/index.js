import { combineReducers } from 'redux'
import authReducer from './auth.reducer'
import facultyReducer from './faculty.reducer'

const rootReducer = combineReducers({
    auth: authReducer,
    faculty: facultyReducer
})

export default rootReducer