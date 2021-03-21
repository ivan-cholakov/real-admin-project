import { client } from '../../../../../core/client';


export const setStockist = (payload) => {
    return (dispatch) => {
        return dispatch({
            type: 'SET_STOCKIST',
            payload,
        })
    }
}

export const getStockist = (id) => {
    return(dispatch) => {
        return dispatch({
            type:'GET_STOCKIST_BY_ID',
            payload: client.stockist.get(id)
        })
    }
}

