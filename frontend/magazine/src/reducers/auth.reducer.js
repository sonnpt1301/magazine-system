/* eslint-disable import/no-anonymous-default-export */
import { authConstants } from '../actions/constants'
import { userConstants } from '../actions/constants'

const initState = {
    token: null,
    user: {
        firstName: '',
        lastName: '',
        email: '',
        profilePicture: '',
    },
    authenticate: false,
    authenticating: false,
    error: null,
    message: '',
    loading: false
}

export default (state = initState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case authConstants.LOGIN_REQUEST:
            state = {
                ...state,
                authenticating: true
            }
            break;
        case authConstants.LOGIN_SUCCESS:
            state = {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                authenticate: true,
                authenticating: false
            }
            break;
        case authConstants.LOGIN_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                authenticate: false,
                authenticating: false
            }
            break;
        case authConstants.LOGOUT_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case authConstants.LOGOUT_SUCCESS:
            state = {
                ...initState
            }
            break;
        case authConstants.LOGOUT_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;

        case userConstants.UPDATE_USER_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case userConstants.UPDATE_USER_SUCCESS:
            state = {
                ...state,
                user: action.payload.user,
                loading: false,
            }
            break;
        case userConstants.UPDATE_USER_FAILURE:
            state = {
                ...state,
                loading: true,
            }
            break;
    }
    return state
}