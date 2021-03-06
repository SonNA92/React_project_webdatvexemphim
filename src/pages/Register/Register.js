import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { useDispatch,useSelector } from 'react-redux';
import { dangKyAction } from '../../action/UserAction';
import { NavLink } from 'react-router-dom';
import { Modal,Button } from 'react-bootstrap';
import "./styleRegister.css";
import { history } from '../../App';
import { HIDE_MODAL } from '../../action/types/FilmType';


export default function Register(props) {

    const dispatch = useDispatch();
    const {show} = useSelector(state=>state.UserReducer)
    // su dung thu vien Formik de lay du lieu nguoi dung
    const formik = useFormik({
        initialValues: { // khai bao cac thuoc tinh input
            taiKhoan: '',
            matKhau: '',
            email: '',
            soDt: '',
            maNhom: '',
            hoTen: ''
        },
        // su dung thu vien yup de xet validation
        validationSchema: Yup.object().shape({
            taiKhoan: Yup.string().required('tài khoản không được bỏ trống'),
            matKhau: Yup.string().required('mật khẩu không được bỏ trống').min(6, 'mật khẩu tối thiểu 6 ký tự').max(32, 'mật khẩu tối đa 32 ký tự'),
            email: Yup.string().email('email không hợp lệ').required('email không được bỏ trống'),
            soDt: Yup.string().matches(/^[0-9]+$/, 'số điện thoại chỉ chứa số').required('số điện thoại không được bỏ trống'),
            hoTen: Yup.string().required('họ tên không được bỏ trống')
            
        }),
        onSubmit: (values) => {
            
            // dua du lieu len API
            const action = dangKyAction(values);
            dispatch(action);
        }
    })

    const handleClose = () => {
        dispatch({type:HIDE_MODAL})
        // khi đóng modal quay về trang login
        history.replace('/login');
    };



    return (
        <div className="container" style={{ paddingTop: '100px', width: '600px' }}>
            <form className="formLog" onSubmit={formik.handleSubmit}>
                <NavLink to="/">
                    <img title="Đóng" className="log-icon-x" src="/img/x-icon.jpg" alt="iconX" />
                </NavLink>
                <NavLink to="/">
                    <img className="imgLogo" src="/img/logo-login.png" alt="logo" />
                </NavLink>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <input name="taiKhoan" className="form-control" placeholder="Nhập tên tài khoản" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {formik.errors.taiKhoan && formik.touched.taiKhoan && <p className="text text-danger">{formik.errors.taiKhoan}</p>}
                        </div>
                        <div className="form-group">
                            <input name="hoTen" className="form-control" placeholder="Nhập Họ và Tên" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {formik.errors.hoTen && formik.touched.hoTen && <p className="text text-danger">{formik.errors.hoTen}</p>}
                        </div>
                        <div className="form-group">
                            <input name="matKhau" className="form-control" placeholder="Nhập mật khẩu" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {formik.errors.matKhau && formik.touched.matKhau && <p className="text text-danger">{formik.errors.matKhau}</p>}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <input name="email" className="form-control" placeholder="Nhập địa chỉ email" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {formik.errors.email && formik.touched.email && <p className="text text-danger">{formik.errors.email}</p>}
                        </div>
                        <div className="form-group">
                            <input name="soDt" className="form-control" placeholder="Nhập số điện thoại" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {formik.errors.soDt && formik.touched.soDt && <p className="text text-danger">{formik.errors.soDt}</p>}
                        </div>
                        <div className="form-group">
                            <select name="maNhom" className="maNhom form-control" onChange={formik.handleChange}>
                                <option value="0">Chọn mã nhóm</option>
                                <option value="GP01">Group 1</option>
                                <option value="GP02">Group 2</option>
                                <option value="GP03">Group 3</option>
                                <option value="GP04">Group 4</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <button type="submit" className="btnLog mt-5 mb-4" style={{width:'80%',height:'50px',fontSize:'18px',fontWeight:'bold'}}>Đăng ký</button><br />
                    <p className="text-notice-register" style={{cursor:'pointer'}} onClick={()=>{
                        history.replace('/login');
                    }}>Bạn đã có tài khoản ? <span className="text-warning">Đăng nhập ngay</span></p>
                </div>
            </form>
            {/* Modal show khi đăng ký thành công */}
            <Modal show={show} dialogClassName="modal-login-success" onHide={handleClose} centered>
                <Modal.Body>
                    <p>Chúc mừng bạn đã đăng ký thành công ! Xin mời đăng nhập</p>
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
        </div>
    )
}
