import { facultyConstants } from './constants';
import axios from '../helper/axios'

export const getFaculty = () => {
    return async dispatch => {
        dispatch({ type: facultyConstants.GET_FACULTY_REQUEST })
        const res = await axios.get('/faculty/getFaculty')
        const { faculty, error } = res.data
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
        dispatch({ type: facultyConstants.ADD_FACULTY_REQUEST })
        const res = await axios.post('/faculty/createFaculty', body)
        const { faculty, error } = res.data
        if (res.status === 201) {
            dispatch({
                type: facultyConstants.ADD_FACULTY_SUCCESS,
                payload: { faculty }
            })
        } else {
            dispatch({
                type: facultyConstants.ADD_FACULTY_FAILURE,
                payload: { error }
            })
        }
    }
}

export const updateFaculty = (params, body) => {
    return async dispatch => {
        dispatch({ type: facultyConstants.UPDATE_FACULTY_REQUEST })
        const { facultyId } = params
        const res = await axios.put(`/faculty/updateFaculty/${facultyId}`, body)
        const { faculty, error } = res.data
        if (res.status === 200) {
            dispatch({
                type: facultyConstants.UPDATE_FACULTY_SUCCESS,
                payload: { faculty }
            })
        }
        if (res.status === 400) {
            dispatch({
                type: facultyConstants.UPDATE_FACULTY_FAILURE,
                payload: { error }
            })
        }
    }
}

export const deleteFaculty = (params) => {
    return async dispatch => {
        dispatch({ type: facultyConstants.DELETE_FACULTY_REQUEST })
        const { facultyId } = params
        const res = await axios.put(`/faculty/deleteFaculty/${facultyId}`)
        const { message, faculty, error } = res.data
        if (res.status === 200) {
            dispatch({
                type: facultyConstants.DELETE_FACULTY_SUCCESS,
                payload: { faculty, message }
            })
        }
        if (res.status === 400) {
            dispatch({
                type: facultyConstants.DELETE_FACULTY_FAILURE,
                payload: { error }
            })
        }
    }
}