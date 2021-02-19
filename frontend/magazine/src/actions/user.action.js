import { userConstants } from './constants'
import axios from '../helper/axios'

export const getUsers = () => {
    return async dispatch => {
        try {
            dispatch({ type: userConstants.GET_USERS_REQUEST })
            const res = await axios.get('user/get-users')
            if (res.status === 200) {
                const { user } = res.data
                dispatch({
                    type: userConstants.GET_USERS_SUCCESS,
                    payload: { user }
                })
            } else {
                dispatch({
                    type: userConstants.GET_USERS_FAILURE,
                    payload: { error: res.data.error }
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const addUser = (body) => {
    return async dispatch => {
        try {
            dispatch({ type: userConstants.ADD_USER_REQUEST })
            const res = await axios.post('/auth/register', body)
            console.log(res)
            const { _user } = res.data
            if (res.status === 201) {
                dispatch({
                    type: userConstants.ADD_USER_SUCCESS,
                    payload: { _user }
                })
            } else {
                if (res.status === 400) {
                    const { error } = res.data
                    dispatch({
                        type: userConstants.ADD_USER_FAILURE,
                        payload: { error }
                    })
                }
            }

        } catch (error) {
            console.log(error)
        }
    }
}

export const updateUser = (params, body) => {
    return async dispatch => {
        try {
            dispatch({ type: userConstants.UPDATE_USER_REQUEST })
            const { userId } = params
            const res = await axios.put(`user/update/${userId}`, body)
            console.log(res)
            const { user, error } = res.data
            if (res.status === 200) {
                dispatch({
                    type: userConstants.UPDATE_USER_SUCCESS,
                    payload: { user }
                })
            } else {
                dispatch({
                    type: userConstants.UPDATE_USER_FAILURE,
                    payload: { error }
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const deleteUser = (params) => {
    return async dispatch => {
        try {
            dispatch({ type: userConstants.DELETE_USER_REQUEST })
            const { userId } = params
            const res = await axios.put(`user/delete/${userId}`)
            console.log(res)
            const { user, message, error } = res.data
            if (res.status === 200) {
                dispatch({
                    type: userConstants.DELETE_USER_SUCCESS,
                    payload: { message, user }
                })
            } else {
                dispatch({
                    type: userConstants.DELETE_USER_FAILURE,
                    payload: { error }
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}