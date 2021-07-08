import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { timKiemPhimAction } from '../../action/FilmAction';
import { NavLink } from 'react-router-dom';
import Footer from '../../Component/Footer/Footer';
import "./styleSearch.css";


export default function Search(props) {

    const dispatch = useDispatch();
    let { arrFilm } = useSelector(state => state.FilmReducer);
    let searchKey = props.match.params.id;
    useEffect(() => {

        // đưa lên API
        dispatch(timKiemPhimAction(searchKey));
    })
    // render danh sách phim tìm thấy
    const renderPhimSearch = () => {
        return arrFilm?.map((item, index) => {
            return <div className="col-6 mb-4" key={index}>
                <div className="row">
                    <div className="col-6">
                        <div className="img-animation">
                            <img className="card-img-top w-100 h-100" src={item.hinhAnh} alt="movie" />
                            <NavLink to={`/detail/${item.maPhim}`}>
                                <div className="animation-overlay"></div>
                            </NavLink>
                        </div>
                    </div>
                    <div className="col-6 pt-5">
                        <h6 className="">{item.tenPhim}</h6>
                        <p className="">Khởi chiếu: {item.ngayKhoiChieu.slice(0, 10)}</p>
                    </div>
                </div>
            </div>
        })
    }

    return (
        <>
            <div id="listFilmSearch" className="listFilmSearch pt-5">
                <div className="search-content container">
                    <h5 id="text-notice-search" className="text-danger">Có {arrFilm.length} kết quả tìm thấy cho từ khóa: {searchKey}</h5>
                    <div className="row mt-4">
                        {renderPhimSearch()}
                    </div>
                </div>
            </div>
            <Footer/>
        </>

    )
}
