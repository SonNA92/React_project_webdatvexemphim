import React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { dangNhapAction } from '../../action/UserAction';
import { history } from '../../App';
import { NavLink } from 'react-router-dom';
import "./styleLogin.css";




export default function Login(props) {

    const dispatch = useDispatch();
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

    return (
        <div className="container" style={{ paddingTop: '100px', width: '400px' }}>
            <form className="formLog" onSubmit={formik.handleSubmit} >
                <NavLink to="/">
                    <img className="imgLogo" src="./img/logo-login.png" alt="logo" />
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
                    <button type="submit" className="btnLog mr-2">Đăng nhập</button>
                    <button type="button" className="btnLog mr-2" onClick={() => {
                        history.replace('/register');
                    }}>Đăng ký</button>
                </div>
                <div className="social-Log mt-5">
                    <img className="img-social-log" src="./img/login-facebook.png" alt="login" />
                </div>
                <div className="social-Log my-2">
                    <img className="img-social-log" src="./img/login-zalo.png" alt="login" />
                </div>
                <div className="social-Log">
                    <img className="img-social-log" src="./img/login-google.png" alt="login" />
                </div>
            </form>
        </div>
    )
}
