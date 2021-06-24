import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from "axios";
import {getApiFilmAction} from '../../action/FilmAction'
import { NavLink } from 'react-router-dom';

class Homes extends Component {
    render() {
        return (
            <div className="container">
                <div className="row mt-5">
                    {this.props.arrFilm.map((film,index)=>{
                        return <div className="col-4" key={index}>
                        <div className="card text-white bg-primary">
                            <img className="card-img-top w-100" src={film.hinhAnh} alt />
                            <div className="card-body">
                                <h4 className="card-title">{film.tenPhim}</h4>
                            </div>
                            <NavLink className="btn btn-success" to={`/detail/${film.maPhim}`}>Dat ve</NavLink>
                        </div>
        
                    </div>
                    })}
                </div>
                <div id="new">ádasđ</div>
                
            </div>
        )
    }
    componentDidMount() {
        const action = getApiFilmAction('GP01');
        this.props.dispatch(action);
    }
}
const mapStateToProps = state => {
    return {
        arrFilm: state.FilmReducer.arrFilm
    }
}


export default connect(mapStateToProps)(Homes)