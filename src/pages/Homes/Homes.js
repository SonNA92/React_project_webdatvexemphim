import React from "react";
import CarouselMovie from "../../Component/Carousel/Carousel";
import ListFilm from "../../Component/ListFilms/ListFilm";
import Media from "../../Component/Media/Media";
import MainApp from "../../Component/MainApp/MainApp";
import Footer from "../../Component/Footer/Footer";
import './styleHome.css';




export default function Homes(props) {

    return (
        <div id="homePageMovie" style={{ background: "url(/img/bg-night-home-2.jpg)" }}>
            <CarouselMovie/>
            <ListFilm/>
            <Media/>
            <MainApp/>
            <Footer/>

        </div>
    )
}




