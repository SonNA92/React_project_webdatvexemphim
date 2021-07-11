import React,{Fragment} from 'react';
import { useSelector } from 'react-redux';
import "./styleLoading.css";

export default function Loading(props) {

    const {isLoading} = useSelector(state=>state.LoadingReducer)


    return (
        <Fragment>
            {isLoading ? <div className="loading">Chờ chút nhé ^ ^...</div> : ''}
        </Fragment>
    )
}
