import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import _ from 'lodash'

export default function Header() {

    const { userLogin } = useSelector(state => state.UserReducer)



    return (
        <nav className="navbar navbar-expand-sm bg-white">
            <a className="navbar-brand logo-top ml-2" href="#">
                <img height={50} width={50} src="./img/web-logo.png" alt="logo" />
            </a>
            <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation" />
            <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav navbar-text mx-auto mt-2 mt-lg-0 ">
                    <li className="nav-item mx-2 active">
                        <NavLink exact activeClassName="text-danger" className="nav-link font-weight-nomal" style={{ color: 'black' }} to="/home">Trang chủ</NavLink>
                    </li>
                    <li className="nav-item mx-2">
                        <a className="nav-link font-weight-nomal" href="#contact">Liên hệ</a>
                    </li>
                    <li className="nav-item mx-2">
                        <a className="nav-link font-weight-nomal" href="#new">Tin tức</a>
                    </li>
                    <li className="nav-item mx-2">
                        <a className="nav-link font-weight-nomal" href="#app">Ứng dụng</a>
                    </li>


                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="text" style={{ borderRadius: '20px' }} placeholder="Nhập tên phim" />
                    {/* kiem tra dang nhap */}
                    {
                        _.isEmpty(userLogin) ? <div className="user-login">
                            <div className="btnLog mr-1"><NavLink activeClassName="text-danger" className="nav-link font-weight-bold text-center" style={{ color: 'black' }} to="/login">Đăng nhập</NavLink></div>
                            <div className="btnLog"><NavLink className="nav-link font-weight-bold text-center" style={{ color: 'black' }} to="/register">Đăng ký</NavLink></div>
                        </div> : <div class="dropdown btn-user">
                            <NavLink class=" nav-link font-weight-bold text-danger" to="/" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {userLogin.taiKhoan}
                            </NavLink>
                            <div class="dropdown-menu">
                                <button type="button" class="dropdown-item" >Thông tin</button>
                                <button type="button" class="dropdown-item" >Đăng xuất</button>
                            </div>
                        </div>
                    }
                </form>
            </div>
        </nav>
    )
}
