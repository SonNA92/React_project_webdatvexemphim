import React, { Component } from "react";
import Carousel from "../../Component/Carousel/Carousel";
import ListFilm from "../../Component/ListFilms/ListFilm";
import Media from "../../Component/Media/Media";
import MainApp from "../../Component/MainApp/MainApp";
import Footer from "../../Component/Footer/Footer";
import Modal from "../../Component/Modal/Modal";
import './styleHome.css';

export default class Homes extends Component {

    render() {
        return (
            <div id="homePageMovie">
                <Carousel />
                <ListFilm/>
                <Media/>
                <MainApp/>
                <Footer/>
                <Modal/>
     
            </div>
        );
    }
}


