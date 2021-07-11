import React from 'react';
import { NavLink } from 'react-router-dom';
import "./styleMainApp.css";

export default function MainApp(props) {

    return (
        <div className="mainApp" id="mainApp">
            <div className="container">
                <div className="app-movie row">
                    <div className="app-content col-lg-6 col-md-6 col-xs-12">
                        <h2 className="text-white">Ứng dụng tiện lợi dành cho người yêu điện ảnh</h2>
                        <h6 className="text-white mt-4">Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp và đổi quà hấp dẫn.</h6>
                        <div className="app-btn btn btn-success mt-4">
                            {/*... đường dẫn tới trang tải App */}
                            <NavLink to="/">
                                <h4 className="text-white mb-1">App miễn phí - Tải về ngay !</h4>
                            </NavLink>
                        </div>
                        <h6 className="text-white mt-4">VIE có 2 phiên bản dành cho <a className="text-danger" href="#mainApp">iOS</a> và <a className="text-danger" href="#mainApp">Android</a></h6>

                    </div>
                    {/* <div className="col-lg-1 col-md-0"></div> */}
                    <div className="app-slide col-lg-6 col-md-6 col-xs-12">
                        <div className="app-slide-content">
                            <div id="carouselAppSlidesOnly" className="carousel slide" data-ride="carousel" data-touch="true">
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img src="/img/app-slide1.jpg" className="d-block w-100" alt="movie" />
                                    </div>
                                    <div className="carousel-item">
                                        <img src="/img/app-slide2.jpg" className="d-block w-100" alt="movie" />
                                    </div>
                                    <div className="carousel-item">
                                        <img src="/img/app-slide3.jpg" className="d-block w-100" alt="movie" />
                                    </div>
                                    <div className="carousel-item">
                                        <img src="/img/app-slide4.jpg" className="d-block w-100" alt="movie" />
                                    </div>
                                    <div className="carousel-item">
                                        <img src="/img/app-slide5.jpg" className="d-block w-100" alt="movie" />
                                    </div>
                                    <div className="carousel-item">
                                        <img src="/img/app-slide6.jpg" className="d-block w-100" alt="movie" />
                                    </div>
                                    <div className="carousel-item">
                                        <img src="/img/app-slide7.jpg" className="d-block w-100" alt="movie" />
                                    </div>
                                    <div className="carousel-item">
                                        <img src="/img/app-slide8.jpg" className="d-block w-100" alt="movie" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
