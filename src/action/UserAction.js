import axios from 'axios';
import {history} from '../App';
import { ACCESSTOKEN, USER_LOGIN, DOMAIN } from '../util/setting';
import { layChiTietPhongVe } from './FilmAction';
import { displayLoadingActon, hideLoadingActon } from './LoadingAction';
import { quanLyPhimService } from '../sevices/QuanLyPhimService';
import { DANG_NHAP, XOA_DANH_SACH_GHE_DANG_DAT } from './types/FilmType';





export const dangKyAction = (thongTinNguoiDung) => {


    return async dispatch => {

        try {
            const result = await axios({
                url:'https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy',
                method:'POST',
                data:thongTinNguoiDung
            });
            history.push('/'); // chuyen ve trang chu

        }catch (err) {
            alert(err.response.data);
            dispatch(hideLoadingActon);
        }
    }
}

export const dangNhapAction = (thongTinDangNhap) => {

    return async dispatch => {
        try {
            const result = await axios({
                url:`${DOMAIN}/api/QuanLyNguoiDung/DangNhap`,
                method:'POST',
                data:thongTinDangNhap
            })
            // dua len Reducer
            dispatch({
                type:DANG_NHAP,
                userLogin:result.data
            })
            // luu du lieu vao LocalStorage
            localStorage.setItem(USER_LOGIN,JSON.stringify(result.data));
            localStorage.setItem(ACCESSTOKEN,result.data.accessToken);
            // dong thoi quay lai trang truoc do
            history.goBack();
            

        }catch (err) {
            console.log(err.response?.data);
            alert(err.response?.data)

        }
    }
}

export const datVeAction = (thongTinDatVe) =>{
    return async dispatch => {
        // hien thi loading khi bam nut dat ve
        dispatch(displayLoadingActon);
        try{
            const result = await axios({
                url:`${DOMAIN}/api/QuanLyDatVe/DatVe`,
                method:'POST',
                data:thongTinDatVe,

                // phan nay de API xac nhan da dang nhap
                headers:{
                    'Authorization':`Bearer ${localStorage.getItem(ACCESSTOKEN)}`
                }
            });
            // goi Action xoa ghe
            await dispatch({
                type:XOA_DANH_SACH_GHE_DANG_DAT
            });
            
            // sau khi dat ve xong goi lai action load lai phong ve, va tat loading di
            await dispatch(layChiTietPhongVe(thongTinDatVe.maLichChieu));
            dispatch(hideLoadingActon);
            console.log(result);

        }catch (err) {
            console.log(err.response?.data);
            dispatch(hideLoadingActon);
        }
    }
}