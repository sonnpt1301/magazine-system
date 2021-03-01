import { chatConstants } from './constants'

export const getMessage = () => {
    const token = localStorage.getItem('token')
    return async dispatch => {
        dispatch({ type: chatConstants.GET_MESSAGES_REQUEST })
        const res = await fetch('http://localhost:5000/api/chat/get-message', {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        const data = await res.json()
        const { message } = data
        if (res.status === 200) {
            dispatch({
                type: chatConstants.GET_MESSAGES_SUCCESS,
                payload: { message }
            })
        } else {
            dispatch({
                type: chatConstants.GET_MESSAGES_FAILURE,
                payload: { error: 'Xử lí thêm ở backend đê' }
            })
        }
    }
}

export const afterSendMessage = (msg) => {
    return async dispatch => {
        dispatch({
            type: chatConstants.GET_MESSAGE_AFTER_SEND,
            payload: { msg }
        })
    }
}