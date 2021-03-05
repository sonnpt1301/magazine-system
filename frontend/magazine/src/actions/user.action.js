import { userConstants } from './constants'
import swal from 'sweetalert'
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
        console.log(body)
        const data = await res.json()
        const { user, error } = data
        console.log(user)
        if (res.status === 200) {
            localStorage.setItem('user', JSON.stringify(user))
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

export const uploadAvatar = (params, form) => {
    const token = localStorage.getItem('token')

    return async dispatch => {
        dispatch({ type: userConstants.UPDATE_USER_REQUEST })
        const { userId } = params
        const res = await fetch(`${api}/user/uploadAvatar/${userId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: form
        })
        const data = await res.json()
        const { user, error } = data
        console.log(user)
        if (res.status === 200) {
            localStorage.setItem('user', JSON.stringify(user))
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