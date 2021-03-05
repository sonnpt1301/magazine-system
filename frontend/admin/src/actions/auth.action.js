import { authConstants } from './constants';
import axios from '../helper/axios'
import swal from 'sweetalert';
import { Redirect } from 'react-router-dom';
import { api } from '../urlConfig'

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
        dispatch({ type: authConstants.LOGIN_REQUEST })
        const res = await fetch(`${api}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
        const data = await res.json()
        if (res.status === 200) {
            const { token, user } = data
            if (user.role === 'admin') {
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
                    payload: { error: 'Failed to login' }
                })
                swal('Failed', 'Access denied', 'error')
                return <Redirect to={`/login`} />
            }
        } else {
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: { error: data.message }
            })
            return swal('Failed', data.message, 'error')
        }
    }
}

export const signOut = () => {
    return async dispatch => {
        try {
            dispatch({
                type: authConstants.LOGOUT_REQUEST
            })
            const res = await axios.post(`${api}/auth/logout`)
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