import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { themNguoiDungAction } from '../../../action/UserAction';
import { history } from '../../../App';

export default function ThemNgDung(props) {
    const dispatch = useDispatch();
    // su dung thu vien Formik de lay du lieu
    const formik = useFormik({
        initialValues: { // khai bao cac thuoc tinh input
            taiKhoan: '',
            matKhau: '',
            email: '',
            soDt: '',
            maNhom: '',
            maLoaiNguoiDung: '',
            hoTen: ''
        },
        // su dung thu vien yup de xet validation
        validationSchema: Yup.object().shape({
            taiKhoan: Yup.string().required('tài khoản không được bỏ trống'),
            matKhau: Yup.string().required('mật khẩu không được bỏ trống').min(6, 'mật khẩu tối thiểu 6 kí tự').max(10, 'mật khẩu tối đa 10 kí tự'),
            email: Yup.string().email('email không hợp lệ').required('email không được bỏ trống'),
            soDt: Yup.string().matches(/^[0-9]+$/, 'số điện thoại phải là số'),
            hoTen: Yup.string().required('họ tên không được bỏ trống')
        }),

        onSubmit: (values) => {
            console.log(values)
            // dua du lieu len API
            dispatch(themNguoiDungAction(values));
        }
    })



    return (
        <form className="container" onSubmit={formik.handleSubmit}>
            <h3>Thêm Người Dùng</h3>
            <div className="row">
                <div className="col-6">
                    <div className="form-group">
                        <p>Tài khoản</p>
                        <input name="taiKhoan" className="form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.errors.taiKhoan && formik.touched.taiKhoan && <p className="text text-danger">{formik.errors.taiKhoan}</p>}
                    </div>
                    <div className="form-group">
                        <p>Họ tên</p>
                        <input name="hoTen" className="form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.errors.hoTen && formik.touched.hoTen && <p className="text text-danger">{formik.errors.hoTen}</p>}
                    </div>
                    <div className="form-group">
                        <p>Mật khẩu</p>
                        <input name="matKhau" className="form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.errors.matKhau && formik.touched.matKhau && <p className="text text-danger">{formik.errors.matKhau}</p>}
                    </div>
                    <div className="form-group">
                        <p>Email</p>
                        <input name="email" className="form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.errors.email && formik.touched.email && <p className="text text-danger">{formik.errors.email}</p>}
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <p>Số điện thoại</p>
                        <input name="soDt" className="form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.errors.soDt && formik.touched.soDt && <p className="text text-danger">{formik.errors.soDt}</p>}
                    </div>
                    <div className="form-group">
                        <p>Mã nhóm</p>
                        <select name="maNhom" className="form-control" onChange={formik.handleChange}>
                            <option >Chọn mã nhóm</option>
                            <option value="GP02">Group 1</option>
                            <option value="GP03">Group 2</option>
                            <option value="GP04">Group 3</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <p>Mã loại người dùng</p>
                        <select name="maLoaiNguoiDung" className="form-control" onChange={formik.handleChange}>
                            <option >Chọn loại người dùng</option>
                            <option value="QuanTri">Quản Trị</option>
                            <option value="KhachHang">Khách Hàng</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="form-group d-flex justify-content-center mt-5">
                <button type="button" className="btn btn-update btn-primary mr-5" onClick={()=>{
                    history.goBack();
                }}>Trở về</button>
                <button type="submit" className="btn btn-update btn-success ml-5">Hoàn tất</button>
            </div>
        </form>
    )
}
