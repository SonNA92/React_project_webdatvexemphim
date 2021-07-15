import React, { Component } from "react";
import CarouselMovie from "../../Component/Carousel/Carousel";
import ListFilm from "../../Component/ListFilms/ListFilm";
import Media from "../../Component/Media/Media";
import MainApp from "../../Component/MainApp/MainApp";
import Footer from "../../Component/Footer/Footer";
import './styleHome.css';


export default class Homes extends Component {

    render() {
        return (
            <div id="homePageMovie">
                <CarouselMovie/>
                <ListFilm/>
                <Media/>
                <MainApp/>
                <Footer/>
     
            </div>
        );
    }
}


