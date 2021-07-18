import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilmDetailAction } from "../../action/FilmAction";
import TabMenu from "./TabMenu";
import Footer from "../../Component/Footer/Footer";
import { Modal } from "antd";
import "./styleDetail.css";

export default function Detail(props) {

    const dispatch = useDispatch();
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { thongTinChiTiet } = useSelector((state) => state.FilmReducer);
    // lay du lieu load ra giao dien khi trang vua load xong
    useEffect(() => {
        const action = getFilmDetailAction(props.match.params.postId);
        dispatch(action);
    }, []);

    const handelClickButton = () => {
        setIsVideoPlaying(true)
        setIsModalVisible(true)
    }

    const handelResetTrailer = () => {
        setIsVideoPlaying(false)
    }
    
    const handleOk = () => {
        setIsModalVisible(false)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }



    // Do API thiếu 1 số trường như thời lượng, đạo diễn, diễn viên,... nên set cứng minh họa
    return (
        <div className="film-Detail" style={{ background: "url(/img/bg-night-home-2.jpg) center center" }}>
            <div className="container pt-5 pb-4">
                <div className="row">
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="img-detailFilm">
                            <img className="w-100 h-100" src={thongTinChiTiet.hinhAnh} alt="movie" />
                        </div>
                    </div>
                    <div className="film-detail-content col-lg-7 col-md-7 col-sm-12 p-3">
                        <div className="row mb-3">
                            <div className="col-12">
                                <h2 className="text-white mb-0">{thongTinChiTiet.tenPhim}</h2>
                                <span>120 phút - 8.3IMDb</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4">Ngày công chiếu</div>
                            <div className="col-8">
                                {thongTinChiTiet.ngayKhoiChieu?.slice(0, 10)}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4">Đạo diễn</div>
                            <div className="col-8">Ngô Thanh Vân</div>
                        </div>
                        <div className="row">
                            <div className="col-4">Diễn viên</div>
                            <div className="col-8">Trấn Thành, Lý Hải</div>
                        </div>
                        <div className="row">
                            <div className="col-4">Nội dung</div>
                            <div className="col-8 text-justify">{thongTinChiTiet.moTa?.length > 50 ? thongTinChiTiet.moTa.substr(0, 250) + '...' : thongTinChiTiet.moTa}</div>
                        </div>
                        <div className="row">
                            <div className="col-4">Thể loại</div>
                            <div className="col-8">Hành động/Viễn tưởng</div>
                        </div>
                        <div className="row">
                            <div className="col-4">Định dạng</div>
                            <div className="col-8">2D/Digital</div>
                        </div>
                        <button type="button" className="btn btn-update btn-warning mt-4" onClick={()=>{
                            handelClickButton()
                        }} >Xem Trailer</button>
                    </div>
                </div>

                {/* Phần hiển thị lịch chiếu phim & reviews*/}
                <div className="mt-5 mb-3">
                    <ul className="nav nav-pills pills-tab-movie mb-5 ml-4" id="pills-tab-detail" role="tablist">
                        <li className="nav-item mr-2" role="presentation">
                            <a className="nav-link active" id="pills-home-tab-detail" data-toggle="pill" href="#pills-home-detail" role="tab" aria-controls="pills-home-detail" aria-selected="true">
                                Lịch Chiếu Phim
                            </a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a className="nav-link" id="pills-profile-tab-detail" data-toggle="pill" href="#pills-profile-detail" role="tab" aria-controls="pills-profile-detail" aria-selected="false">
                                Reviews
                            </a>
                        </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent-detail">
                        <div className="tab-pane fade show active" id="pills-home-detail" role="tabpanel" aria-labelledby="pills-home-tab-detail">
                            <div className="cine-detail">
                                <TabMenu heThongRapChieu={thongTinChiTiet.heThongRapChieu} />
                            </div>
                        </div>
                        <div className="tab-pane fade" id="pills-profile-detail" role="tabpanel" aria-labelledby="pills-profile-tab-detail">
                            <div className="detail-reviews ml-4 mb-3">
                                <p>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt fugiat consequuntur maiores ipsum nulla. Perferendis aliquid doloribus quisquam porro eum mollitia beatae fuga, necessitatibus provident ad delectus nihil eos. Eos.
                                </p>
                            </div>
                            <hr style={{backgroundColor:'white',width:'10%'}} />
                            <div className="detail-reviews ml-4 mb-3">
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut maiores voluptas architecto, perspiciatis voluptates recusandae.
                                </p>
                            </div>
                            <hr style={{backgroundColor:'white',width:'10%'}} />
                            <div className="detail-reviews ml-4">
                                <p>
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis, et!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
            {isVideoPlaying && <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} afterClose={handelResetTrailer}>
                {
                    <iframe style={{ width: '100%', height: '525px' }} src={thongTinChiTiet.trailer} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                }
            </Modal>}
        </div>
    );
}
