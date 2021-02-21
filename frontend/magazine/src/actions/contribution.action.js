import { contributionConstants } from './constants'
import swal from 'sweetalert';

const token = localStorage.getItem('token')


export const getPublicContribution = () => {
    return async dispatch => {
        dispatch({ type: contributionConstants.GET_PUBLIC_CONTRIBUTION_REQUEST })
        const res = await fetch('http://localhost:5000/api/contribution/get-public-contributions', {
            method: 'GET',
        })
        const data = await res.json()
        const { contributions, error } = data
        if (res.status === 200) {
            dispatch({
                type: contributionConstants.GET_PUBLIC_CONTRIBUTION_SUCCESS,
                payload: { contributions }
            })
        } else {
            dispatch({
                type: contributionConstants.GET_PUBLIC_CONTRIBUTION_FAILURE,
                payload: { error }
            })
        }
    }
}

export const getAllContributions = () => {
    return async dispatch => {
        dispatch({ type: contributionConstants.GET_ALL_CONTRIBUTION_REQUEST })
        const res = await fetch('http://localhost:5000/api/contribution/get-all-contributions', {
            method: 'GET',
        })
        const data = await res.json()
        const { contributions, error } = data
        if (res.status === 200) {
            dispatch({
                type: contributionConstants.GET_ALL_CONTRIBUTION_SUCCESS,
                payload: { contributions }
            })
        } else {
            dispatch({
                type: contributionConstants.GET_ALL_CONTRIBUTION_FAILURE,
                payload: { error }
            })
        }
    }
}

export const getContributionsByFaculty = () => {
    return async dispatch => {
        dispatch({ type: contributionConstants.GET_CONTRIBUTION_BY_FACULTY_REQUEST })
        const res = await fetch('http://localhost:5000/api/contribution/contributions-by-faculty', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await res.json()
        const { contributions, error } = data
        if (res.status === 200) {
            dispatch({
                type: contributionConstants.GET_CONTRIBUTION_BY_FACULTY_SUCCESS,
                payload: { contributions }
            })
        } else {
            dispatch({
                type: contributionConstants.GET_CONTRIBUTION_BY_FACULTY_FAILURE,
                payload: { error }
            })
        }
    }
}

export const publishContribution = (body) => {
    return async dispatch => {
        dispatch({ type: contributionConstants.PUBLISH_CONTRIBUTION_REQUEST })
        const res = await fetch('http://localhost:5000/api/contribution/public-contribution', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })
        const data = await res.json()
        const { publishedContribution, error } = data
        console.log(publishedContribution)
        if (res.status === 200) {
            dispatch({
                type: contributionConstants.PUBLISH_CONTRIBUTION_SUCCESS,
                payload: { publishedContribution }
            })
            return await swal("Congratulation", "You have been published successfully", "success")
        } else {
            dispatch({
                type: contributionConstants.PUBLISH_CONTRIBUTION_FAILURE,
                payload: { error }
            })
            return await swal("Failed", error, "error")
        }

    }
}

export const downloadFile = (params) => {
    return async dispatch => {
        const { contributionId, fileId, fileName } = params
        const res = await fetch(`http://localhost:5000/api/contribution/${contributionId}/download/${fileId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            responseType: 'blob'
        })
        const data = await res.blob()
        let url = window.URL.createObjectURL(data, { type: 'application/zip' });
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName + '.zip');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    }
}

export const addContribution = (form) => {
    return async dispatch => {
        dispatch({ type: contributionConstants.ADD_CONTRIBUTION_REQUEST })
        const res = await fetch('http://localhost:5000/api/contribution//upload-file', {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: form
        })
        const data = await res.json()
        const { contribution, error } = data
        if (res.status === 201) {
            dispatch({
                type: contributionConstants.ADD_CONTRIBUTION_SUCCESS,
                payload: { contribution }
            })
            return await swal("Congratulation", "You have been created successfully", "success")
        } else {
            dispatch({
                type: contributionConstants.ADD_CONTRIBUTION_FAILURE,
                payload: { error }
            })
            return await swal("Failed", error, "error")
        }
    }
}