import React,{Fragment} from 'react'
import { useSelector } from 'react-redux'

export default function Loading(props) {

    const {isLoading} = useSelector(state=>state.LoadingReducer)


    return (
        <Fragment>
            {isLoading ? <div className="loading">Loading...</div> : ''}
        </Fragment>
    )
}
