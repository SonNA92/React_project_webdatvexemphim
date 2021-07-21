import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { dangNhapAction } from '../../action/UserAction';
import { history } from '../../App';
import { NavLink } from 'react-router-dom';
import { Modal,Button } from 'react-bootstrap';
import "./styleLogin.css";
import { HIDE_MODAL } from '../../action/types/FilmType';
// import LoginFacebook from './LoginFacebook';




export default function Login(props) {

    const dispatch = useDispatch();
    const {show} = useSelector(state=>state.UserReducer)
    const formik = useFormik({
        initialValues: {
            taiKhoan: '',
            matKhau: ''
        },
        onSubmit: (values) => {
            // gui thong tin dang nhap ve backend
            dispatch(dangNhapAction(values));

        }
    })
    // xử lí đóng modal
    const handleClose = () => {
        dispatch({type:HIDE_MODAL})
        // khi đóng modal quay về trang trước đó
        history.goBack();
    };
    // xử lí Modal phụ
    let [showModal,setShowModal] = useState(false)
    const handleClick = () => {
       setShowModal(true)
    }
    const handleClickClose = () => {
        setShowModal(false)
    }
    

    return (
        <div className="container" style={{ paddingTop: '80px', width: '400px' }}>
            <form className="formLog" onSubmit={formik.handleSubmit} >
                <NavLink to="/">
                    <img title="Đóng" className="log-icon-x" src="/img/x-icon.jpg" alt="iconX" />
                </NavLink>
                <NavLink to="/">
                    <img className="imgLogo" src="/img/logo-login.png" alt="logo" />
                </NavLink>

                <div className="form-group">
                    <input type="text" className="form-control" name="taiKhoan" placeholder="Tài khoản" onChange={formik.handleChange} />

                </div>
                <div className="form-group">
                    <input type="password" className="form-control" name="matKhau" placeholder="Mật khẩu" onChange={formik.handleChange} />
                </div>
                <div className="form-group form-check text-left mb-0">
                    <div className="row">
                        <div className="col-7">
                            <input type="checkbox" className="form-check-input" id="saveAccount" />
                            <label className="form-check-label" htmlFor="saveAccount">Nhớ mật khẩu</label>
                        </div>
                        <div className="col-5">
                            <NavLink to="/" className="forgotPassword">Quên mật khẩu ?</NavLink>
                        </div>
                    </div>
                </div>
                <div className="form-group mt-4">
                    <button type="submit" className="btnLog mb-2 mr-2" style={{width:'100%',fontSize:'16px',fontWeight:'bold'}}>Đăng nhập</button>
                    <p className="text-notice-register" style={{cursor:'pointer'}} onClick={()=>{
                        history.replace('/register');
                    }}>Bạn chưa có tài khoản ? <span className="text-warning">Đăng ký ngay</span></p>
                </div>
                <div className="social-Log mt-5" onClick={handleClick}>
                    <img className="img-social-log" src="/img/login-facebook.png" alt="login" />
                </div>
                <div className="social-Log my-2" onClick={handleClick}>
                    <img className="img-social-log" src="/img/login-zalo.png" alt="login" />
                </div>
                <div className="social-Log" onClick={handleClick}>
                    <img className="img-social-log" src="/img/login-google.png" alt="login" />
                </div>
            </form>
            {/* Modal bật lên khi đăng nhập thành công */}
            <Modal show={show} dialogClassName="modal-login-success" onHide={handleClose} centered>
                <Modal.Body>
                    <p>Chúc mừng bạn đã đăng nhập thành công !</p>
                    <div className="img-successful">
                        <img className="w-100" src="/img/img-tich-xanh-3.png" alt="movie" />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="info" onClick={handleClose}>
                        Tiếp tục
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showModal} dialogClassName="modal-admin-success" onHide={handleClickClose} centered>
                <Modal.Body>
                    <p>Xin lỗi hiện tại chức năng này chưa có !
                        Vui lòng đăng ký tài khoản !
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="info" onClick={handleClickClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
