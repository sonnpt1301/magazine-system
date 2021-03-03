import { combineReducers } from 'redux'
import authReducer from './auth.reducer'
import facultyReducer from './faculty.reducer'
import userReducer from './user.reducer'
import termReducer from './term.reducer'
import contributionReducer from './contribution.reducer'

const rootReducer = combineReducers({
    auth: authReducer,
    faculty: facultyReducer,
    user: userReducer,
    term: termReducer,
    statistic: contributionReducer,
})

export default rootReducer