import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import _ from 'lodash'; 
import { history } from '../../App';
import "./styleHeader.css";

export default function Header(props) {

    
    let { userLogin } = useSelector(state => state.UserReducer);
    
    const onSubmit = (e) => {
        e.preventDefault();
        let searchKey = document.getElementById("input-search").value;
        // chuyển đến trang tìm kiếm kèm searchKey(chính là param.id)
        history.replace(`/timkiem/${searchKey}`);
        
    }
    
    return (
        <div className="headerMovie">
        <nav className="navbar navbar-expand-lg">
            <NavLink className="navbar-brand logo-top ml-2" to="/">
                <img height={50} width={50} src="/img/web-logo.png" alt="logo" />
            </NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon">
                    <i className="fa fa-bars"></i>
                </span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav navbar-text mx-lg-auto mt-2 mt-lg-0 ">
                    <li className="nav-item mx-2 active">
                        <NavLink exact activeClassName="text-danger" className="nav-link font-weight-nomal" to="/home">Trang chủ</NavLink>
                    </li>
                    <li className="nav-item mx-2">
                        <a className="nav-link font-weight-nomal" href="#footer">Liên hệ</a>
                    </li>
                    <li className="nav-item mx-2">
                        <a className="nav-link font-weight-nomal" href="#media">Tin tức</a>
                    </li>
                    <li className="nav-item mx-2">
                        <a className="nav-link font-weight-nomal" href="#mainApp">Ứng dụng</a>
                    </li>


                </ul>
                <form className="form-inline my-2 my-lg-0" onSubmit={onSubmit}>
                    <div className="searchMovie mr-2">
                        <input id="input-search" className="input-search form-control mr-sm-2" type="text" placeholder="Nhập tên phim" />
                        <button type="submit" className="btn-search"><i className="fa fa-search"></i></button>
                    </div>
                    {/* kiểm tra đăng nhập, true => hiển thị tên tài khoản */}
                    {
                        _.isEmpty(userLogin) ? <div className="user-login">
                            <div className="btnLog mr-1"><NavLink activeClassName="text-danger" className="nav-link font-weight-nomal text-center" style={{ color: 'white' }} to="/login">Đăng nhập</NavLink></div>
                            <div className="btnLog"><NavLink className="nav-link font-weight-nomal text-center" style={{ color: 'white' }} to="/register">Đăng ký</NavLink></div>
                        </div> : <div className="dropdown ">
                            <NavLink className="user-login-dropdown nav-link font-weight-bold text-danger" to="/" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <div className="img-user-login mr-2">
                                    <img src="https://picsum.photos/50/50" alt="movie" />
                                </div>
                                {userLogin.taiKhoan}
                            </NavLink>
                            {/* các chức năng của người dùng */}
                            <div className="dropdown-menu">
                                <button type="button" className="dropdown-item btn-user-event" onClick={()=>{
                                    history.replace(`/useraccount/${userLogin.taiKhoan}`)
                                }} >Thông tin</button>
                                {/* nếu user là admin thì hiển thị thêm chức năng đi tới trang admin */}
                                {(userLogin.maLoaiNguoiDung === "QuanTri") ? <button type="button" className="dropdown-item btn-user-event" onClick={()=>{
                                    history.replace('/admin');
                                }}>Tới trang Admin</button> : ''}
                                {/* thực hiện chức năng đăng xuất */}
                                <button type="button" className="dropdown-item btn-user-event" onClick={()=>{
                                    localStorage.clear();
                                    history.replace('/');
                                    window.location.reload();
                                }} >Đăng xuất</button>
                            </div>
                        </div>
                    }
                </form>
            </div>
        </nav>
        </div>
       
    )
}
