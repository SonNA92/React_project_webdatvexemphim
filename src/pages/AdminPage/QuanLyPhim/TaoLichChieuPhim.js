import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { DatePicker } from 'antd';
import { layThongTinCumRapTheoHeThong, themLichChieuAction } from "../../../action/FilmAction";
import ModalAdminPage from '../../../Component/Modal/ModalAdminPage';



export default function ThemLichChieu(props) {
    const { danhSachHeThongRap } = useSelector(state => state.FilmReducer);
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            maPhim: parseInt(props.match.params.id),
            ngayChieuGioChieu: '',
            maRap: 0,
            giaVe: 0

        },
        onSubmit: (values) => {
            dispatch(themLichChieuAction(values));
        }
    });

    const changeDate = (values, dateString) => {
        formik.setFieldValue('ngayChieuGioChieu', dateString);
    }

    const changeGiaVe = (e) => {
        let { name, value } = e.target;
        formik.setFieldValue('giaVe', parseInt(value));
    }
    const changeHTRap = (e) => {
        let { name, value } = e.target;
        dispatch(layThongTinCumRapTheoHeThong(value));
    }

    const renderRap = () => {
        return danhSachHeThongRap.map((dsRap, index) => {
            return dsRap.danhSachRap.map((rap, index) => {
                return <option value={rap.maRap} key={index}> {dsRap.tenCumRap} -  {rap.tenRap}</option>
            })
        })
    }

    const handleChangeSelect = (e) => {
        let { name, value } = e.target;
        formik.setFieldValue('maRap', parseInt(value));
    }


    return (
        <form className="container form-admin-page" onSubmit={formik.handleSubmit}>
            <h3 className="mb-4">Thêm Lịch Chiếu</h3>
            <div className="row">
                <div className="col-6">
                    <div className="form-group">
                        <p>Mã phim</p>
                        <input className="form-control" name="maPhim" value={props.match.params.id} disabled />
                    </div>
                    <div className="form-group">
                        <p>Chọn hệ thống rạp</p>
                        <select className="form-control" name="HTRap" onChange={changeHTRap}>
                            <option >Chọn hệ thống rạp</option>
                            <option value="CGV" >CGV</option>
                            <option value="Cinestar" >Cinestar</option>
                            <option value="Galaxy" >Galaxy</option>
                            <option value="LotteCinema" >LotteCinema</option>
                            <option value="MegaGs" >MegaGs</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <p>Chọn mã rạp</p>
                        <select onChange={handleChangeSelect} name="maRap" className="form-control">
                            <option value="none">Chọn mã rạp</option>
                            {renderRap()}
                        </select>
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <p>Ngày chiếu - Giờ chiếu</p>
                        <DatePicker showTime className="form-control" onChange={changeDate} name="ngayChieuGioChieu" format="DD/MM/YYYY HH:mm:ss" />
                    </div>
                    <div className="form-group">
                        <p>Giá vé</p>
                        <input className="form-control" name="giaVe" onChange={changeGiaVe} />
                    </div>
                </div>

            </div>
            <div className="form-group d-flex justify-content-center mt-5">
                <button className="btn btn-update btn-primary mr-4" onClick={() => {
                    props.history.goBack();
                }}> Trở về</button>
                <button type="submit" className="btn btn-update btn-success ml-4">Thêm lịch chiếu</button>
            </div>
            <ModalAdminPage/>
        </form>
    )
}
