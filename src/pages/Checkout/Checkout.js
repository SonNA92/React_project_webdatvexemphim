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
import { DAT_GHE, HIDE_MODAL } from '../../action/types/FilmType';
import Footer from '../../Component/Footer/Footer';
import { history } from '../../App';
import { Modal,Button } from 'react-bootstrap';
import "./styleCheckout.css";


export default function Checkout(props) {

    const dispatch = useDispatch();
    const {show} = useSelector(state=>state.UserReducer)
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
        alert('Bạn cần phải đăng nhập để tiếp tục thao tác !');
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

    // xử lí đóng modal
    const handleClose = () => {
        let action = {
            type: HIDE_MODAL
        }
        dispatch(action)
    };


    return (
        <div className="check-out-page" style={{ background: "url(/img/bg-night-home-1.jpg)" }}>
            <div className="container mb-5">
                <div className="row">
                    <div className="col-lg-8 col-sm-12 mt-5">
                        <div className="text-center">
                            {/* <img className="w-100" src="https://tix.vn/app/assets/img/icons/screen.png" alt="movie" /> */}
                            <div className='screen'>SCREEN</div>
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
                    <div className="col-lg-4 col-sm-12 mt-5">
                        <div className="thongTinPhim row mt-5">
                            <div className="col-3">
                                <img className="d-bock w-100 h-100" src={thongTinPhim?.hinhAnh} alt="movie" />
                            </div>
                            <div className="col-9">
                                <p className="checkout-text-info">{thongTinPhim?.tenPhim}</p>
                                <p className="checkout-text-info info-time ">120 phút-2D Digital - 8.3IMDb</p>
                                <span className="checkout-text-info info-time">Ngày chiếu: </span><span className="text-success ml-2">{thongTinPhim?.ngayChieu} - {thongTinPhim?.gioChieu}</span>
                            </div>
                        </div>
                        <div className="my-3 thongTinRap row">
                            <div className="col-12">
                                <p>{thongTinPhim?.tenCumRap}</p>
                                <p className="info-time">{thongTinPhim?.diaChi}</p>
                                <div>
                                    <span className="text-success">{thongTinPhim?.tenRap}</span> -
                                    Ghế: {_.sortBy(danhSachGheDangDat, ['maGhe']).map((gheDangDat, index) => {
                                        return <span key={index} className="text-success ml-2">{gheDangDat.stt} </span>
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="my-3 row thongTinPay">
                            <div className="col-12">
                                <h6 className="text-white text-center">Tổng tiền</h6>
                                <p className="text-success text-center" style={{fontSize:'25px'}}>
                                    {danhSachGheDangDat.reduce((tongTien, gheDD, index) => {
                                        return tongTien += gheDD.giaVe;
                                    }, 0).toLocaleString()} VND
                                </p>
                                <p>email: <span className="checkout-text-info">{userLogin.email}</span></p>
                                <p>phone: <span className="checkout-text-info">{userLogin.soDT}</span></p>
                            </div>
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
                        <div className="checkout-button-buy mt-3" onClick={() => {
                            history.replace(`/useraccount/${userLogin.taiKhoan}`);
                        }}>
                            <div className="display-5 py-2">Xem chi tiết vé đặt</div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <Modal show={show} dialogClassName="modal-login-success" onHide={handleClose} centered>
                <Modal.Body>
                    <p>Chúc mừng bạn đã đặt vé thành công !</p>
                    <div className="img-successful">
                        <img className="w-100" src="/img/img-tich-xanh-3.png" alt="movie" />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="info" onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
