/* eslint-disable import/no-anonymous-default-export */
import { userConstants } from '../actions/constants'

const initState = {
    users: [],
    loading: false,
    error: null
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
    }
    return state
}