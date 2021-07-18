import React, { useState } from 'react';
import { Modal, Carousel } from 'antd';
import './styleCarousel.css';

export default function CarouselMovie(props) {

    const [trailerCarousel, setTrailerCarousel] = useState({});
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const arrCarousel = [
        { id: 1, img: '/img/lat-mat-48h.png', trailer: 'https://www.youtube.com/embed/kBY2k3G6LsM' },
        { id: 2, img: '/img/ban-tay-diet-quy.png', trailer: 'https://www.youtube.com/embed/phhQ6pYYk5w' },
        { id: 3, img: '/img/trang-ti.jpg', trailer: 'https://www.youtube.com/embed/l2XBzUZidig' }
    ]

    const handelClickCarousel = (id) => {
        const result = arrCarousel.find(item => item.id === id);
        setTrailerCarousel(result);
        setIsVideoPlaying(true)
    }

    const handelResetTrailer = () => {
        setIsVideoPlaying(false)
    }

    const showModal = () => {
        setIsModalVisible(true)
    }

    const handleOk = () => {
        setIsModalVisible(false)
    }
    
    const handleCancel = () => {
        setIsModalVisible(false)
    }


    return (
        <div className="carouselMovie">
            <div id="carouselMovieControls">
                <Carousel autoplay draggable={true} fade={true}>
                    {arrCarousel.map((item, index) => {
                        return <div key={index}>
                            <div className="carousel-item" onClick={() => { handelClickCarousel(item.id) }}>
                                <img src={item.img} className="w-100 h-100" alt="movie" />
                                <div className="carousel-caption">
                                    <button className="icon-play" type="button" onClick={showModal}>
                                        <img src="/img/play-video.png" alt="movie" />
                                    </button>
                                </div>
                                {isVideoPlaying && <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} afterClose={handelResetTrailer}>
                                    {
                                        <iframe title="VideoMovieTrailer" src={trailerCarousel?.trailer} style={{ width: '100%', height: '525px' }} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                    }
                                </Modal>}
                            </div>
                        </div>
                    })}
                </Carousel>

            </div>
        </div>
    )
}
