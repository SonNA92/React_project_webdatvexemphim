import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getApiFilmAction } from "../../action/FilmAction";
import "./styleListFilm.css";

export default function ListFilm(props) {

    const dispatch = useDispatch();
    const { arrFilm } = useSelector((state) => state.FilmReducer);
    useEffect(() => {
        // lấy danh sách phim về
        const action = getApiFilmAction("GP04");
        dispatch(action);
    },[]);
    // Hàm render phim hiển thị ở trên carousel
    const renderFilmCarousel = (index1, index2) => {
        return arrFilm.slice(index1, index2).map((film, index) => {
            return (
                <div className="col-lg-3 col-sm-12 col-md-6 " key={index}>
                    <div className="card img-animation text-white">
                        <div className="list-item">
                            <img className="card-img-top w-100" src={film.hinhAnh} alt="movie" />
                        </div>
                        <div className="card-body">
                            <p className="card-title">{film.tenPhim.length > 25 ? film.tenPhim.substr(0, 25) + '...' : film.tenPhim}</p>
                            <p>
                                <span className="mr-5">120 phút</span>
                                <span className="film-age ml-5">
                                    18+
                                </span>
                            </p>
                        </div>
                        {/* chuyển tới trang chi tiết bằng mã phim */}
                        <NavLink to={`/detail/${film.maPhim}`}>
                            <div className="animation-overlay">
                                <div className="listfilm-btn-buy btn">
                                    MUA VÉ
                                </div>
                            </div>
                        </NavLink>
                    </div>
                </div>
            )
        })
    }

    // Hàm render hiển thị phim theo Tabpane
    const renderFilmsTabpane = (id) => {
        return <div id={id} className="carousel carousel-fade slide" data-ride="carousel">
            <div className="carousel-inner container">
                <div className="carousel-item active">
                    <div className="row">
                        {renderFilmCarousel(0, 4)}
                    </div>
                    <div className="row mt-5">
                        {renderFilmCarousel(4, 8)}
                    </div>
                </div>
                <div className="carousel-item">
                    <div className="row">
                        {renderFilmCarousel(8, 12)}
                    </div>
                    <div className="row mt-5">
                        {renderFilmCarousel(12, 16)}
                    </div>
                </div>
                <div className="carousel-item">
                    <div className="row">
                        {renderFilmCarousel(16, 20)}
                    </div>
                    <div className="row mt-5">
                        {renderFilmCarousel(20, 24)}
                    </div>
                </div>
            </div>
            <a className="carousel-control-prev" href={`#${id}`} role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href={`#${id}`} role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="sr-only">Next</span>
            </a>
        </div>
    }

    return (
        <div className="listfilms mb-4">
            <div className="container">
                <ul className="nav nav-pills pills-tab-movie mb-5" id="pills-tab-listfilm" role="tablist">
                    <li className="nav-item" role="presentation" onClick={
                        () => {
                            dispatch(getApiFilmAction("GP04"))
                        }
                    }>
                        <a className="nav-link active" id="pills-home-tab-listfilm" data-toggle="pill" href="#pills-home-listfilm" role="tab" aria-controls="pills-home-listfilm" aria-selected="true">
                            Phim đang chiếu
                        </a>
                    </li>
                    <li className="nav-item" role="presentation" onClick={
                        () => {
                            dispatch(getApiFilmAction("GP02"))
                        }
                    }>
                        <a className="nav-link" id="pills-profile-tab-listfilm" data-toggle="pill" href="#pills-profile-listfilm" role="tab" aria-controls="pills-profile-listfilm" aria-selected="false">
                            Phim sắp chiếu
                        </a>
                    </li>
                    <li className="nav-item" role="presentation" onClick={
                        () => {
                            dispatch(getApiFilmAction("GP03"))
                        }
                    }>
                        <a className="nav-link" id="pills-contact-tab-listfilm" data-toggle="pill" href="#pills-contact-listfilm" role="tab" aria-controls="pills-contact-listfilm" aria-selected="false">
                            Phim hot
                        </a>
                    </li>
                </ul>
            </div>
            <div className="tab-content" id="pills-tabContent-listfilm">
                <div className="tab-pane fade show active" id="pills-home-listfilm" role="tabpanel" aria-labelledby="pills-home-tab-listfilm">
                    {renderFilmsTabpane("carouselFilmsTab1")}
                </div>
                <div className="tab-pane fade" id="pills-profile-listfilm" role="tabpanel" aria-labelledby="pills-profile-tab-listfilm">
                    {renderFilmsTabpane("carouselFilmsTab2")}
                </div>
                <div className="tab-pane fade" id="pills-contact-listfilm" role="tabpanel" aria-labelledby="pills-contact-tab-listfilm">
                    {renderFilmsTabpane("carouselFilmsTab3")}
                </div>
            </div>
        </div>
    );
}
