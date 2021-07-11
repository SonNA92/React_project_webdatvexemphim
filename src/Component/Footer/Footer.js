import React from 'react'
import { NavLink } from 'react-router-dom';
import "./styleFooter.css";

export default function Footer() {

    let arrImgPartner = [{ src: "/img/cgv.png", path: "/" }, { src: "/img/bhd.png", path: "/" }, { src: "/img/galaxy.png", path: "/" }, { src: "/img/cinestar.png", path: "/" }, { src: "/img/cnx.jpg", path: "/" }, { src: "/img/lotte.png", path: "/" }, { src: "/img/megags.png", path: "/" }, { src: "/img/payoo.jpg", path: "/" }, { src: "/img/VCB.png", path: "/" }, { src: "/img/zalopay.png", path: "/" }]
    // hàm render hình ảnh đối tác
    const renderPartner = () => {
        return arrImgPartner.map((item, index) => {
            return <div className="col-3 mb-3" key={index}>
                <div className="img-animation">
                    <img className="img-partner" src={item.src} alt="movie" />
                    <NavLink to={item.path}>
                        <div className="animation-overlay"></div>
                    </NavLink>
                </div>
            </div>
        })
    }

    return (
        <div className="footer" id="footer">
            <div className="container">
                <div className="row infoMovie pb-3">
                    <div className="col-lg-3 col-sm-6 mb-2">
                        <h6>Giới thiệu</h6>
                        <ul>
                            <li><a href="#footer">FAQ</a></li>
                            <li><a href="#footer">Thỏa thuận sử dụng</a></li>
                            <li><a href="#footer">Chính sách bảo mật</a></li>
                            <li><a href="#footer">Nhận diện thương hiệu</a></li>
                        </ul>
                    </div>
                    <div className="col-lg-4 col-sm-6 mb-2">
                        <h6>Đối tác</h6>
                        <div className="row">
                            {renderPartner()}
                        </div>
                    </div>
                    <div className="col-lg-1"></div>
                    <div className="col-lg-2 col-sm-6 mb-2">
                        <h6>Mobile App</h6>
                        <div className="row">
                            <div className="col-3">
                                <div className="img-animation">
                                    <img className="img-partner" src="/img/apple-logo2.png" alt="movie" />
                                    <NavLink to="/">
                                        <div className="animation-overlay"></div>
                                    </NavLink>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="img-animation">
                                    <img className="img-partner" src="/img/android-logo2.png" alt="movie" />
                                    <NavLink to="/">
                                        <div className="animation-overlay"></div>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2 col-sm-6 mb-2">
                        <h6>Social</h6>
                        <div className="row">
                            <div className="col-3">
                                <div className="img-animation">
                                    <img className="img-partner" src="/img/facebook-logo2.png" alt="movie" />
                                    <NavLink to="/">
                                        <div className="animation-overlay"></div>
                                    </NavLink>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="img-animation">
                                    <img className="img-partner" src="/img/zalo-logo2.png" alt="movie" />
                                    <NavLink to="/">
                                        <div className="animation-overlay"></div>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-lg-3 col-md-5 col-sm-12">
                        <NavLink to="/">
                            <img className="footer-logo" src="/img/logo-login.png" alt="movie" />
                        </NavLink>
                    </div>
                    <div className="col-lg-8 col-md-7 col-sm-12">
                        <h6 className="mb-0">VIE CINEMA @</h6>
                        <p>Địa chỉ: 22 Đường số 30, Phường 2, Quận Tân Bình, Tp. Hồ Chí Minh, Việt Nam</p>
                        <p>Giấy chứng nhận đăng ký kinh doanh số: 0123456789</p>
                        <p>Số Điện Thoại (Hotline): 0888 555 114</p>
                        <a href="#footer">Email: support@viecinema.vn</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
