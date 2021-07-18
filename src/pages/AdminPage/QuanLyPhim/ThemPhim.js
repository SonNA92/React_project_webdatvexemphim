import React from 'react';
import {useFormik} from 'formik';
import { DatePicker } from 'antd';
import { useDispatch } from 'react-redux';
import { themPhimAction } from '../../../action/FilmAction';
import "../styleAdmin.css";


export default function ThemPhim(props) {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues:{
            maPhim: 0,
            tenPhim:'',
            biDanh:'',
            trailer:'',
            moTa:'',
            hinhAnh:'',
            maNhom:'GP01',
            ngayKhoiChieu:'',
            danhGia: 0
        },
        onSubmit:(values)=>{
            // bien doi JSON thanh form data
            let formData = new FormData();
            for (let key in values){
                formData.append(key,values[key]);     
            }
            dispatch(themPhimAction(formData));
        }
    });

    const changeFile = (e)=>{
        // lay du lieu duoi dang file
        let file = e.target.files[0];
        formik.setFieldValue('hinhAnh',file)
    }
    // chuyển date qua string
    const changeDate = (values,dateString)=>{
        formik.setFieldValue('ngayKhoiChieu',dateString)
    }
    // đổi string qua number
    const changeMaPhim = (e) => {
        let {maPhim,value} = e.target;
        formik.setFieldValue('maPhim',parseInt(value));
    }
    return (
        <form id="formAddFilms" className="container form-admin-page" onSubmit={formik.handleSubmit}>
            <h3 className="mb-4">Thêm Phim</h3>
            <div className="row">
                <div className="col-6">
                    <div className="form-group">
                        <p>Mã phim</p>
                        <input className="form-control" name="maPhim" onChange={changeMaPhim} />
                    </div>
                    <div className="form-group">
                        <p>Tên phim</p>
                        <input className="form-control" name="tenPhim" onChange={formik.handleChange} />
                    </div>
                    <div className="form-group">
                        <p>Bí danh</p>
                        <input className="form-control" name="biDanh" onChange={formik.handleChange} />
                    </div>
                    <div className="form-group">
                        <p>Mô tả</p>
                        <input className="form-control" name="moTa" onChange={formik.handleChange} />
                    </div>
                </div>
                <div className="col-6">
                <div className="form-group">
                        <p>Ngày khởi chiếu</p>
                        <DatePicker className="form-control" name="ngayKhoiChieu" onChange={changeDate} format={'DD/MM/YYYY'} />
                    </div>
                    <div className="form-group">
                        <p>Trailer</p>
                        <input className="form-control" name="trailer" onChange={formik.handleChange} />
                    </div>
                    <div className="form-group">
                        <p>Hình ảnh</p>
                        <input className="form-control" name="hinhAnh" type="file" style={{height:'45px'}} onChange={changeFile} />
                    </div>  
                      
                </div>
            </div>
            <div className="form-group d-flex justify-content-center mt-5">
                <button type="button" className="btn btn-update btn-primary mr-4" onClick={()=>{
                    props.history.goBack();
                }}> Trở về</button>
                <button type="submit" className="btn btn-update btn-success ml-4">Thêm phim</button>
            </div>
        </form>
    )
}

