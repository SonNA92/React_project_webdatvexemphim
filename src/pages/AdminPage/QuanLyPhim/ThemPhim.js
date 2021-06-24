import React from 'react';
import {useFormik} from 'formik';
import { DatePicker, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { themPhimAction } from '../../../action/FilmAction';

export default function ThemPhim(props) {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues:{
            maPhim:'',
            tenPhim:'',
            trailer:'',
            moTa:'',
            hinhAnh:'',
            maNhom:'GP01',
            ngayKhoiChieu:'',
            danhGia:'10'
        },
        onSubmit:(values)=>{
            console.log(values);
            // bien doi JSON thanh form data
            let formData = new FormData();
            for (let key in values){
                if (key === 'hinhAnh'){
                    formData.append('File',values[key],values[key].name)
                }else{
                    formData.append(key,values[key])
                }
               
            }
            dispatch(themPhimAction(formData));
            // formData.forEach((value,key)=>{

            // })
        }
    });

    const changeFile = (e)=>{
        // lay du lieu duoi dang file
        let file = e.target.files[0];
        formik.setFieldValue('hinhAnh',file)
    }

    const changeDate = (values,dateString)=>{
        formik.setFieldValue('ngayKhoiChieu',dateString)
    }
    return (
        <form className="container" onSubmit={formik.handleSubmit}>
            <h3>Them phim</h3>
            <div className="row">
                <div className="col-6">
                    <div className="form-group">
                        <p>Ma Phim</p>
                        <input className="form-control" name="maPhim" onChange={formik.handleChange} />
                    </div>
                    <div className="form-group">
                        <p>Ten Phim</p>
                        <input className="form-control" name="tenPhim" onChange={formik.handleChange} />
                    </div>
                    <div className="form-group">
                        <p>Mo ta</p>
                        <input className="form-control" name="moTa" onChange={formik.handleChange} />
                    </div>
                </div>
                <div className="col-6">
                <div className="form-group">
                        <p>Ngay Khoi Chieu</p>
                        <DatePicker className="form-control" onChange={changeDate} format={'DD/MM/YYYY'} />
                    </div>
                    <div className="form-group">
                        <p>Trailer</p>
                        <input className="form-control" name="trailer" onChange={formik.handleChange} />
                    </div>
                    <div className="form-group">
                        <p>Hinh anh</p>
                        <input className="form-control" name="hinhAnh" type="file" onChange={changeFile} />
                    </div>  
                    <div className="form-group">
                        <button type="submit" className="btn btn-success">Them phim</button>
                    </div>  
                </div>
            </div>

            <button className="btn btn-primary" onClick={()=>{
                props.history.goBack();
            }}> Tro ve</button>
        </form>
    )
}
