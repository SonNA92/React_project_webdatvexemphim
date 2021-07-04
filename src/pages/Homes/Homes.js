import React, { Component } from "react";
import { connect } from "react-redux";
import { getApiFilmAction } from "../../action/FilmAction";
import { NavLink } from "react-router-dom";
import Carousel from "../../Component/Carousel/Carousel";
import ListFilm from "../../Component/ListFilms/ListFilm";
// import Showtimes from "../../Component/Showtimes/Showtimes";
import Media from "../../Component/Media/Media";
import MainApp from "../../Component/MainApp/MainApp";
import Footer from "../../Component/Footer/Footer";
import Modal from "../../Component/Modal/Modal";

export default class Homes extends Component {
    render() {
        return (
            <div>
                <Carousel />
                <ListFilm/>
                {/* <Showtimes/> */}
                <Media/>
                <MainApp/>
                <Footer/>
                <Modal/>
            </div>
        );
    }
}



