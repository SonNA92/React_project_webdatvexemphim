import {history} from '../App';
import { ACCESSTOKEN, USER_LOGIN } from '../util/setting';
import { layChiTietPhongVe } from './FilmAction';
import { displayLoadingActon, hideLoadingActon } from './LoadingAction';
import { DANG_NHAP, SET_USER, SHOW_MODAL, THONG_TIN_TAI_KHOAN, TIM_KIEM_USER, XOA_DANH_SACH_GHE_DANG_DAT } from './types/FilmType';
import { quanLyNgDungService } from '../sevices/QuanLyNgDungService';




export const layDanhSachNgDungAction = () =>{
    return async (dispatch) =>{
        try {
            const result = await quanLyNgDungService.layDanhSachNgDung();
            // sau khi lay du lieu tu API ve dua len redux
            const action = {
                type:SET_USER,
                dataUsers: result.data
            }
            dispatch(action)
        } catch (errors) {
            console.log('errors', errors.response?.data);
        }
    }
}

export const dangKyAction = (thongTinNguoiDung) => {
    return async dispatch => {
        try {
            const result = await quanLyNgDungService.dangKyTaiKhoan(thongTinNguoiDung);
            dispatch({
                type: SHOW_MODAL
            })
            
        }catch (err) {
            alert(err.response.data);
        }
    }
}

export const dangNhapAction = (thongTinDangNhap) => {
    return async dispatch => {
        try {
            const result = await quanLyNgDungService.dangNhapTaiKhoan(thongTinDangNhap);
            // dua len Reducer
            dispatch({
                type:DANG_NHAP,
                userLogin:result.data
            })

            // luu du lieu vao LocalStorage
            localStorage.setItem(USER_LOGIN,JSON.stringify(result.data));
            localStorage.setItem(ACCESSTOKEN,result.data.accessToken);
            
            // dong thoi quay lai trang truoc do
            // history.goBack();
        
        }catch (err) {
            alert( " Vui lòng nhập đúng tài khoản hoặc mật khẩu ! ")
        }
    }
}

export const datVeAction = (thongTinDatVe) =>{
    return async dispatch => {
        // hien thi loading khi bam nut dat ve
        dispatch(displayLoadingActon);
        try{
            const result = await quanLyNgDungService.datVePhim(thongTinDatVe);
            // goi Action xoa ghe
            await dispatch({
                type:XOA_DANH_SACH_GHE_DANG_DAT
            });
            // sau khi dat ve xong goi lai action load lai phong ve, va tat loading di
            await dispatch(layChiTietPhongVe(thongTinDatVe.maLichChieu));
            await dispatch(hideLoadingActon);
            // mở modal đặt vé thành công
            dispatch({
                type:SHOW_MODAL
            })
           

        }catch (err) {
            alert("Lỗi: ",err.response?.data);
            dispatch(hideLoadingActon);
        }
    }
}

export const layThongTinAction = (taiKhoan)=>{
    return async dispatch => {
        dispatch(displayLoadingActon);
        try{
            const result = await quanLyNgDungService.layThongTinTaiKhoan({taiKhoan:taiKhoan});
            // gửi thông tin lên redux
            await dispatch({
                type:THONG_TIN_TAI_KHOAN,
                thongTinTaiKhoan:result.data
            });
            dispatch(hideLoadingActon);

        }catch (err){
            console.log(err.response.data)
            alert("Lỗi: input không hợp lệ");
        }   
    }
}

export const capNhatThongTinTaiKhoan = (thongTinTaiKhoan) => {
    return async dispatch => {
        try{
            const result = await quanLyNgDungService.capNhatThongTinTaiKhoan(thongTinTaiKhoan);
            // load lai trang
            await dispatch(layThongTinAction(thongTinTaiKhoan.taiKhoan));
            dispatch({
                type: SHOW_MODAL
            })

        }catch (err){
            
            alert(err.response?.data);
        }
    }
}

export const themNguoiDungAction = (data) => {
    return async dispatch => {
        try{
            const result = await quanLyNgDungService.themNguoiDung(data);
            await dispatch({
                type: SHOW_MODAL
            })
            // quay về trang user
            history.replace('/admin/users');

        }catch (err) {
            alert(err.response.data)
        }
    }
}

export const timKiemNguoiDungAction = (searchKey) => {
    return async dispatch => {
        try{
            const result = await quanLyNgDungService.timKiemNguoiDung(searchKey);
            // đưa dữ liệu lên store
            dispatch({
                type: TIM_KIEM_USER,
                danhSachNguoiDungTimKiem: result.data
            })

        }catch (err){
            alert (err.response.data)
        }
    }
}

export const xoaNguoiDungAction = (taiKhoan) => {
    return async dispatch => {
        try{
            const result = await quanLyNgDungService.xoaNguoiDung(taiKhoan);
            await dispatch({
                type: SHOW_MODAL
            })
            // load lai trang
            dispatch(layDanhSachNgDungAction());

        }catch (err){
            alert(err.response.data);
        }
    }
}