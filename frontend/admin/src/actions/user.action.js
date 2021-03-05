import { userConstants } from './constants'
import swal from 'sweetalert';
import { api } from '../urlConfig'

export const getUsers = () => {
    const token = localStorage.getItem('token')

    return async dispatch => {
        dispatch({ type: userConstants.GET_USERS_REQUEST })
        const res = await fetch(`${api}/user/get-users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        const data = await res.json()
        const { user, error } = data
        if (res.status === 200) {
            dispatch({
                type: userConstants.GET_USERS_SUCCESS,
                payload: { user }
            })
        } else {
            dispatch({
                type: userConstants.GET_USERS_FAILURE,
                payload: { error }
            })
        }
    }
}

export const addUser = (body) => {
    const token = localStorage.getItem('token')

    return async dispatch => {
        dispatch({ type: userConstants.ADD_USER_REQUEST })
        const res = await fetch(`${api}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })
        const data = await res.json()
        const { _user, errors, message } = data
        if (res.status === 201) {
            dispatch({
                type: userConstants.ADD_USER_SUCCESS,
                payload: { _user }
            })
            return swal("Congratulation", "You have been created successfully", "success")
        } else {
            dispatch({
                type: userConstants.ADD_USER_FAILURE,
                payload: { errors, message }
            })
            if (errors) {
                return swal("Failed", errors, "error")
            }
            if (message) {
                return swal("Failed", message, "error")
            }
        }
    }
}

export const updateUser = (params, body) => {
    const token = localStorage.getItem('token')

    return async dispatch => {
        dispatch({ type: userConstants.UPDATE_USER_REQUEST })
        const { userId } = params
        const res = await fetch(`${api}/user/update/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })
        const data = await res.json()
        const { user, error } = data
        if (res.status === 200) {
            dispatch({
                type: userConstants.UPDATE_USER_SUCCESS,
                payload: { user }
            })
            return await swal("Congratulation", "You have been updated successfully", "success")
        } else {
            dispatch({
                type: userConstants.UPDATE_USER_FAILURE,
                payload: { error }
            })
            return await swal("Failed", error, "error")
        }

    }
}

export const deleteUser = (params) => {
    const token = localStorage.getItem('token')

    return async dispatch => {
        dispatch({ type: userConstants.DELETE_USER_REQUEST })
        const { userId } = params
        const res = await fetch(`${api}/user/delete/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await res.json()
        const { user, message, error } = data
        if (res.status === 200) {
            dispatch({
                type: userConstants.DELETE_USER_SUCCESS,
                payload: { message, user }
            })
            return await swal("Congratulation", "You have been deleted successfully", "success")
        } else {
            dispatch({
                type: userConstants.DELETE_USER_FAILURE,
                payload: { error }
            })
            return await swal("Failed", error, "error")
        }

    }
}