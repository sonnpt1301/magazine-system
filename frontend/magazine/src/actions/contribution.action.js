import { contributionConstants } from './constants'
import swal from 'sweetalert';


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

export const addContribution = (form) => {
    return async dispatch => {
        const token = localStorage.getItem('token')

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

export const updateContribution = (params, form) => {
    const token = localStorage.getItem('token')

    return async dispatch => {
        dispatch({ type: contributionConstants.UPDATE_CONTRIBUTION_REQUEST })
        const { id } = params
        const res = await fetch(`http://localhost:5000/api/contribution/update-contribution/${id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: form
        })
        const data = await res.json()
        const { contribution, error } = data
        if (res.status === 200) {
            dispatch({
                type: contributionConstants.UPDATE_CONTRIBUTION_SUCCESS,
                payload: { contribution }
            })
            return await swal("Congratulation", "You have been updated successfully", "success")
        } else {
            dispatch({
                type: contributionConstants.UPDATE_CONTRIBUTION_FAILURE,
                payload: { error }
            })
            return await swal("Failed", error, "error")
        }
    }
}

export const publishContribution = (body) => {
    const token = localStorage.getItem('token')

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
    const token = localStorage.getItem('token')

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

export const addComment = (params, body) => {
    const token = localStorage.getItem('token')

    return async dispatch => {
        dispatch({ type: contributionConstants.ADD_COMMENT_REQUEST })
        const { contributionId } = params
        const res = await fetch(`http://localhost:5000/api/contribution/${contributionId}/comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })
        const data = await res.json()
        const { comment, error } = data
        if (res.status === 201) {
            dispatch({
                type: contributionConstants.ADD_COMMENT_SUCCESS,
                payload: { comment }
            })
        } else {
            dispatch({
                type: contributionConstants.ADD_COMMENT_FAILURE,
                payload: { error }
            })
        }
    }
}

export const listComment = () => {
    return async dispatch => {
        dispatch({ type: contributionConstants.GET_COMMENT_REQUEST })
        const res = await fetch('http://localhost:5000/api/contribution/list-comment', {
            method: 'GET',
        })
        const data = await res.json()
        const { listComment, error } = data
        if (res.status === 200) {
            dispatch({
                type: contributionConstants.GET_COMMENT_SUCCESS,
                payload: { listComment }
            })
        } else {
            dispatch({
                type: contributionConstants.GET_ALL_CONTRIBUTION_FAILURE,
                payload: { error }
            })
        }
    }
}