import React,{memo} from 'react';
import { NavLink } from 'react-router-dom';
import "../styeUserAccount.css";


function UserHistory(props) {
    
    // render Trang chi tiết lịch sử đặt vé
    const renderVeDaDat = () => {
        return props.thongTinTaiKhoanUpdate.thongTinDatVe?.map((item, index) => {
            // do không có đủ dữ liệu từ API nên hình ảnh và địa chỉ sẽ được render tĩnh
            return <div className="row mb-4" key={index}>
                <div className="col-3">
                    <div className="img-animation">
                        <img className="card-img-top w-100" src="https://picsum.photos/100/100" alt="movie" />
                        <h6 className="text-white text-center mt-3">{item.tenPhim}</h6>
                        <NavLink to="/">
                            <div className="animation-overlay"></div>
                        </NavLink>
                    </div>
                </div>
                <div className="col-8 chiTietRap">
                    {item.danhSachGhe.map((chiTietVe, index) => {                                           
                        return <div key={index} className="mb-3 ml-3">
                            <div className="row">
                                <div className="col-1 mr-3">    
                                    <img src="https://picsum.photos/50/50" alt="movie" />
                                </div>
                                <div className="col-9">
                                    <h6 className="text-white">{chiTietVe.tenHeThongRap}</h6>
                                    <p className="text-white">Địa chỉ</p> 
                                </div>
                            </div>
                            <div className="ngayDat">
                                <p>Ngày đặt: {item.ngayDat?.slice(0, 10)} - Giờ chiếu: {item.ngayDat?.slice(12, 16)} - {chiTietVe.tenRap} - Ghế: {chiTietVe.tenGhe}</p>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        })
    }

    return (
        <div className="chiTietVe">
            {renderVeDaDat()}
        </div>
    )
}

// sử dụng memo tối ưu perfomance
export default memo(UserHistory);
