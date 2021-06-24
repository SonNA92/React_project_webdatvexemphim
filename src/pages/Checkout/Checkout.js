import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { layChiTietPhongVe } from '../../action/FilmAction';
import './Checkout.css';
// su dung thu vien lodash
import _ from 'lodash';
import { USER_LOGIN } from '../../util/setting';
import { Redirect } from 'react-router';
import { datVeAction } from '../../action/UserAction';
// su dung thu vien icon cua antdesign
import { UserAddOutlined } from '@ant-design/icons'
import { DAT_GHE } from '../../action/types/FilmType';


export default function Checkout(props) {

    const dispatch = useDispatch();
    const { chiTietPhongVe, danhSachGheDangDat } = useSelector(state => state.FilmReducer);
    // lay User dang dang nhap tu redux ve
    const { userLogin } = useSelector(state => state.UserReducer)
    const { thongTinPhim, danhSachGhe } = chiTietPhongVe;
    useEffect(() => {

        // lay id tu url
        let maLichChieu = props.match.params.id;
        const action = layChiTietPhongVe(maLichChieu);
        dispatch(action);

    }, [])
    console.log(chiTietPhongVe);

    if (!localStorage.getItem(USER_LOGIN)) {
        alert('ban can phai dang nhap');
        return <Redirect to='/login' />
    }

    const renderGhe = () => {
        return danhSachGhe?.map((ghe, index) => {

            let classGheVip = ghe.loaiGhe === 'Vip' ? 'gheVip' : '';
            let classGheDaDat = ghe.daDat === true ? 'gheDaDat' : '';
            // moi lan render ra 1 ghe dem kiem tra xem cos trung voi ghe dang dat ko
            let classGheDangDat = '';
            let classGheMinhDat = '';
            if (ghe.taiKhoanNguoiDat === userLogin.taiKhoan) {
                classGheMinhDat = 'gheMinhDat';
            }

            let indexGheDD = danhSachGheDangDat.findIndex(gheDD => gheDD.maGhe === ghe.maGhe);
            if (indexGheDD !== -1) {
                classGheDangDat = 'gheDangDat';
            }

            return <Fragment key={index}>
                <button onClick={() => {
                    const action = { type: DAT_GHE, ghe: ghe };
                    dispatch(action);
                }} disabled={ghe.daDat} className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheMinhDat}`}>
                    {classGheMinhDat === '' ? ghe.stt : <UserAddOutlined />}
                </button>
                {(index + 1) % 16 === 0 ? <br /> : ''}
            </Fragment>
        })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-8 mt-5">
                    <div className="text-center">
                        <img className="w-100" src="https://tix.vn/app/assets/img/icons/screen.png" alt="" />
                        {renderGhe()}
                    </div>
                </div>
                <div className="col-4">
                    <div className="text-success text-center display-4">{danhSachGheDangDat.reduce((tongTien, gheDD, index) => {
                        return tongTien += gheDD.giaVe;
                    }, 0).toLocaleString()} VND</div>
                    <hr />
                    <div className="thongTinPhim">
                        <p>ten phim: {thongTinPhim?.tenPhim}</p>
                        <p>dia diem: {thongTinPhim?.diaChi} - {thongTinPhim?.tenCumRap}</p>
                        <p>ngay chieu: {thongTinPhim?.ngayChieu} - {thongTinPhim?.gioChieu}</p>
                    </div>
                    <hr />
                    <div className="my-2">
                        <div className="row">
                            <div className="col-9">
                                ghe: {_.sortBy(danhSachGheDangDat, ['maGhe']).map((gheDangDat, index) => {
                                    return <span key={index} className="text-danger">{gheDangDat.stt} </span>
                                })}
                            </div>
                            <div className="text-success font-weight-bold">
                                {danhSachGheDangDat.reduce((tongTien, gheDD, index) => {
                                    return tongTien += gheDD.giaVe;
                                }, 0).toLocaleString()} VND
                            </div>

                        </div>
                    </div>
                    <hr />
                    <div className="my-2">
                        <p>email:abc@gmail.com</p>
                        <hr />
                        <p>phone: 01224324</p>
                    </div>
                    <div onClick={() => {
                        let thongTinDatVe = {
                            'maLichChieu': props.match.params.id,
                            'danhSachVe': danhSachGheDangDat,
                            'taiKhoanNguoiDung': userLogin.taiKhoan
                        }
                        dispatch(datVeAction(thongTinDatVe));
                    }} style={{ cursor: 'pointer' }} className="w-full bg-success text-white text-center">
                        <div className="display-4 py-2" >DAT VE</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
