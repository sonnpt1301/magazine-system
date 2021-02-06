import { userConstants } from './constants'
import axios from '../helper/axios'

export const getProfile = () => {
    return async dispatch => {
        dispatch({ type: userConstants.GET_PROFILE_REQUEST })
        const res = await axios.get('user/profile')
        if (res.status === 200) {
            const { user } = res.data
            dispatch({
                type: userConstants.GET_PROFILE_SUCCESS,
                payload: { user }
            })
        }
        if (res.status === 400) {
            dispatch({
                type: userConstants.GET_PROFILE_FAILURE,
                payload: { error: res.data.error }
            })
        }
    }
}