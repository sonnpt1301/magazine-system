/* eslint-disable import/no-anonymous-default-export */
import { userConstants } from '../actions/constants'

const initState = {
    users: [],
    loading: false,
    error: null,
    message: null
}

let newUser = []

export default (state = initState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case userConstants.GET_USERS_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case userConstants.GET_USERS_SUCCESS:
            state = {
                ...state,
                users: action.payload.user,
                loading: false
            }
            break;
        case userConstants.GET_USERS_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;
        case userConstants.ADD_USER_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case userConstants.ADD_USER_SUCCESS:
            newUser = [...state.users]
            newUser.push(action.payload._user)
            state = {
                ...state,
                users: newUser,
                loading: false
            }
            break;
        case userConstants.ADD_USER_FAILURE:
            state = {
                ...state,
                error: action.payload.errors,
                message: action.payload.message,
                loading: false
            }
            break;
        case userConstants.UPDATE_USER_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case userConstants.UPDATE_USER_SUCCESS:
            newUser = [...state.users]
            const updateUser = newUser.findIndex(user => user._id === action.payload.user._id)
            newUser[updateUser] = action.payload.user
            state = {
                ...state,
                users: newUser,
                loading: false
            }
            break;
        case userConstants.UPDATE_USER_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;
        case userConstants.DELETE_USER_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case userConstants.DELETE_USER_SUCCESS:
            newUser = [...state.users]
            const updateUserArr = newUser.filter(user => user._id !== action.payload.user._id)
            state = {
                ...state,
                users: updateUserArr,
                loading: false
            }
            break;
        case userConstants.DELETE_USER_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;
    }
    return state
}