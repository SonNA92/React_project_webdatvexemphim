import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { layChiTietPhongVe } from '../../action/FilmAction';
// su dung thu vien lodash
import _ from 'lodash';
import { USER_LOGIN } from '../../util/setting';
import { Redirect } from 'react-router';
import { datVeAction } from '../../action/UserAction';
// su dung thu vien icon cua antdesign
import { UserAddOutlined } from '@ant-design/icons'
import { DAT_GHE } from '../../action/types/FilmType';
import Footer from '../../Component/Footer/Footer';
import { history } from '../../App';
import "./styleCheckout.css";


export default function Checkout(props) {

    const dispatch = useDispatch();
    const { chiTietPhongVe, danhSachGheDangDat } = useSelector(state => state.FilmReducer);
    // lấy User đăng nhập từ redux về
    const { userLogin } = useSelector(state => state.UserReducer)
    const { thongTinPhim, danhSachGhe } = chiTietPhongVe;
    useEffect(() => {

        // lấy id từ url
        let maLichChieu = props.match.params.id;
        const action = layChiTietPhongVe(maLichChieu);
        dispatch(action);

    }, [])

    // kiểm tra đăng nhập rồi mới cho thao tác
    if (!localStorage.getItem(USER_LOGIN)) {
        alert('ban can phai dang nhap');
        return <Redirect to='/login' />
    }

    // render ra hệ thống ghế ngồi
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
    <div className="check-out-page">
        <div className="container mb-5">
            <div className="row">
                <div className="col-8 mt-5">
                    <div className="text-center">
                        <img className="w-100" src="https://tix.vn/app/assets/img/icons/screen.png" alt="movie" />
                        {renderGhe()}
                    </div>
                    <div className="row ml-2 mt-4">
                        <div className="col-3">
                            <button className="ghe gheDaDat align-middle"></button>
                            <span>Ghế đã đặt</span>
                        </div>
                        <div className="col-3">
                            <button className="ghe gheVip align-middle"></button>
                            <span>Ghế VIP</span>
                        </div>
                        <div className="col-3">
                            <button className="ghe gheDangDat align-middle"></button>
                            <span>Ghế đang chọn</span>
                        </div>
                        <div className="col-3">
                            <button className="ghe gheMinhDat align-middle"></button>
                            <span>Ghế đã chọn</span>
                        </div>
                    </div> 
                    <div className="row ml-2 mt-2">
                        <div className="col-6">
                            <button className="ghe align-middle"></button>
                            <span>Ghế chưa đặt</span>
                        </div>
                    </div> 
                </div>
                <div className="col-4 mt-5">
                    <div className="text-success text-center display-4">{danhSachGheDangDat.reduce((tongTien, gheDD, index) => {
                        return tongTien += gheDD.giaVe;
                    }, 0).toLocaleString()} VND</div>
                    <hr />
                    <div className="thongTinPhim">
                        <p>Tên phim: <span className="checkout-text-info">{thongTinPhim?.tenPhim}</span> </p>
                        <p>Địa điểm: <span className="checkout-text-info">{thongTinPhim?.diaChi} - {thongTinPhim?.tenCumRap}</span> </p>
                        <p>Ngày chiếu: <span className="checkout-text-info">{thongTinPhim?.ngayChieu} - {thongTinPhim?.gioChieu}</span> </p>
                    </div>
                    <hr />
                    <div className="my-2">
                        <div className="row">
                            <div className="col-12">
                                Ghế: {_.sortBy(danhSachGheDangDat, ['maGhe']).map((gheDangDat, index) => {
                                    return <span key={index} className="checkout-text-info">{gheDangDat.stt} </span>
                                })}
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="my-2">
                        <p>email: <span className="checkout-text-info">{userLogin.email}</span></p>
                        <hr />
                        <p>Điện thoại: <span className="checkout-text-info">{userLogin.soDT}</span></p>
                    </div>
                    <hr />
                    <div className="checkout-button-buy" onClick={() => {
                        let thongTinDatVe = {
                            'maLichChieu': props.match.params.id,
                            'danhSachVe': danhSachGheDangDat,
                            'taiKhoanNguoiDung': userLogin.taiKhoan
                        }
                        dispatch(datVeAction(thongTinDatVe));
                    }}>
                        <div className="display-5 py-2" >ĐẶT VÉ</div>
                    </div>
                    <div className="checkout-button-buy mt-3" onClick={()=>{
                        history.replace(`/useraccount/${userLogin.taiKhoan}`);
                    }}>
                        <div className="display-5 py-2">Xem chi tiết vé đặt</div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
    )
}
