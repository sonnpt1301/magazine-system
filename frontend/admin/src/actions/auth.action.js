import { authConstants } from './constants';
import axios from '../helper/axios'


export const isUserLoggedIn = () => {
    return async dispatch => {
        try {
            const token = localStorage.getItem('token')
            if (token) {
                const user = JSON.parse(localStorage.getItem('user'))
                dispatch({
                    type: authConstants.LOGIN_SUCCESS,
                    payload: {
                        token, user
                    }
                })
            } else {
                dispatch({
                    type: authConstants.LOGIN_FAILURE,
                    payload: { error: 'Failed to login' }
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const login = (user) => {
    return async dispatch => {
        try {
            dispatch({ type: authConstants.LOGIN_REQUEST })
            const res = await axios.post('auth/login', { ...user })
            if (res.status === 200) {
                const { token, user } = res.data
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                dispatch({
                    type: authConstants.LOGIN_SUCCESS,
                    payload: {
                        token, user
                    }
                })
            } else {
                dispatch({
                    type: authConstants.LOGIN_FAILURE,
                    payload: { error: res.data.error }
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const signOut = () => {
    return async dispatch => {
        try {
            dispatch({
                type: authConstants.LOGOUT_REQUEST
            })
            const res = await axios.post('auth/logout')
            if (res.status === 200) {
                localStorage.clear()
                dispatch({ type: authConstants.LOGOUT_SUCCESS })
            } else {
                dispatch({
                    type: authConstants.LOGOUT_FAILURE,
                    payload: { error: res.data.error }
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}