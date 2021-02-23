import { facultyConstants } from './constants';
import swal from 'sweetalert';



export const getFaculty = () => {
    return async dispatch => {
        const token = localStorage.getItem('token')
        dispatch({ type: facultyConstants.GET_FACULTY_REQUEST })
        const res = await fetch('http://localhost:5000/api/faculty/getFaculty', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        const data = await res.json()
        const { faculty, error } = data
        if (res.status === 200) {
            dispatch({
                type: facultyConstants.GET_FACULTY_SUCCESS,
                payload: { faculty }
            })
        } else {
            dispatch({
                type: facultyConstants.GET_FACULTY_FAILURE,
                payload: { error }
            })
        }
    }
}

export const addFaculty = (body) => {
    return async dispatch => {
        const token = localStorage.getItem('token')

        dispatch({ type: facultyConstants.ADD_FACULTY_REQUEST })
        const res = await fetch('http://localhost:5000/api/faculty/createFaculty', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })
        const data = await res.json()
        const { faculty, message } = data
        if (res.status === 201) {
            dispatch({
                type: facultyConstants.ADD_FACULTY_SUCCESS,
                payload: { faculty }
            })
            console.log(data.faculty)
            return await swal("Congratulation", "You have been created successfully", "success")
        } else {
            dispatch({
                type: facultyConstants.ADD_FACULTY_FAILURE,
                payload: { message }
            })
            return await swal("Failed", message, "error")
        }

    }
}

export const updateFaculty = (params, body) => {
    return async dispatch => {
        const token = localStorage.getItem('token')

        dispatch({ type: facultyConstants.UPDATE_FACULTY_REQUEST })
        const { facultyId } = params
        const res = await fetch(`http://localhost:5000/api/faculty/updateFaculty/${facultyId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })
        const data = await res.json()
        const { faculty, message } = data
        if (res.status === 200) {
            dispatch({
                type: facultyConstants.UPDATE_FACULTY_SUCCESS,
                payload: { faculty }
            })
            return await swal("Congratulation", "You have been updated successfully", "success")
        } else {
            dispatch({
                type: facultyConstants.UPDATE_FACULTY_FAILURE,
                payload: { message }
            })
            return await swal("Failed", message, "error")
        }
    }
}

export const deleteFaculty = (params) => {
    const token = localStorage.getItem('token')

    return async dispatch => {
        dispatch({ type: facultyConstants.DELETE_FACULTY_REQUEST })
        const { facultyId } = params
        const res = await fetch(`http://localhost:5000/api/faculty/deleteFaculty/${facultyId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await res.json()
        const { faculty, message } = data
        if (res.status === 200) {
            dispatch({
                type: facultyConstants.DELETE_FACULTY_SUCCESS,
                payload: { faculty, message }
            })
            return await swal("Congratulation", "You have been deleted successfully", "success")
        } else {
            dispatch({
                type: facultyConstants.DELETE_FACULTY_FAILURE,
                payload: { message }
            })
            return await swal("Failed", message, "error")
        }
    }
}