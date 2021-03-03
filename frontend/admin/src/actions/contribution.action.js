import { contributionConstants } from '../actions/constants'

export const getStatistic = () => {
    return async dispatch => {
        dispatch({ type: contributionConstants.GET_STATISTIC_REQUEST })
        const token = localStorage.getItem('token')
        const res = await fetch('http://localhost:5000/api/contribution/statistic', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await res.json()
        const { statistic, error } = data
        if (res.status === 200) {
            dispatch({
                type: contributionConstants.GET_STATISTIC_SUCCESS,
                payload: { statistic }
            })
        } else {
            dispatch({
                type: contributionConstants.GET_STATISTIC_FAILURE,
                payload: { error }
            })
        }
    }
}