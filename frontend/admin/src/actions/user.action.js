import { userConstants } from './constants'
import axios from '../helper/axios'

export const getUsers = () => {
    return async dispatch => {
        dispatch({ type: userConstants.GET_USERS_REQUEST })
        const res = await axios.get('user/get-users')
        if (res.status === 200) {
            const { user } = res.data
            dispatch({
                type: userConstants.GET_USERS_SUCCESS,
                payload: { user }
            })
        }
        if (res.status === 400) {
            dispatch({
                type: userConstants.GET_USERS_FAILURE,
                payload: { error: res.data.error }
            })
        }
    }
}

export const addUser = (body) => {
    return async dispatch => {
        dispatch({ type: userConstants.ADD_USER_REQUEST })
        const res = await axios.post('/auth/register', body)
        const { _user, error } = res.data
        if (res.status === 201) {
            dispatch({
                type: userConstants.ADD_USER_SUCCESS,
                payload: { _user }
            })
        }
        if (res.status === 400) {
            dispatch({
                type: userConstants.ADD_USER_FAILURE,
                payload: { error }
            })
        }
    }
}