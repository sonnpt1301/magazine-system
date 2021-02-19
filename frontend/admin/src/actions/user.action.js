import { userConstants } from './constants'
import axios from '../helper/axios'
import swal from 'sweetalert';

const token = localStorage.getItem('token')

export const getUsers = () => {
    return async dispatch => {
        dispatch({ type: userConstants.GET_USERS_REQUEST })
        const res = await fetch('http://localhost:5000/api/user/get-users', {
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
    return async dispatch => {
        dispatch({ type: userConstants.ADD_USER_REQUEST })
        const res = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })
        const data = await res.json()
        const { _user, message } = data
        if (res.status === 201) {
            dispatch({
                type: userConstants.ADD_USER_SUCCESS,
                payload: { _user }
            })
            return await swal("Congratulation", "You have been created successfully", "success")
        } else {
            dispatch({
                type: userConstants.ADD_USER_FAILURE,
                payload: { message }
            })
            return await swal("Failed", message, "error")
        }
    }
}

export const updateUser = (params, body) => {
    return async dispatch => {
        dispatch({ type: userConstants.UPDATE_USER_REQUEST })
        const { userId } = params
        const res = await fetch(`http://localhost:5000/api/user/update/${userId}`, {
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
    return async dispatch => {
        dispatch({ type: userConstants.DELETE_USER_REQUEST })
        const { userId } = params
        const res = await fetch(`http://localhost:5000/api/user/delete/${userId}`, {
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