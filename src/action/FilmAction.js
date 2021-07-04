import axios from 'axios'
import { quanLyPhimService } from '../sevices/QuanLyPhimService';
import { ACCESSTOKEN } from '../util/setting';
import { displayLoadingActon, hideLoadingActon } from './LoadingAction';
import { SET_CHI_TIET_PHIM_THEO_NGAY, SET_CHI_TIET_PHONG_VE, SET_FILM, SET_FILM_DETAIL,TIM_KIEM_PHIM } from './types/FilmType';
import { history } from '../App';


export const getApiFilmAction = (maNhom) =>{
    return async (dispatch) =>{
        try {
            var result = await quanLyPhimService.layDanhSachPhim(maNhom);
            // sau khi lay du lieu tu API ve dua len redux
            const action = {
                type:SET_FILM,
                dataFilms: result.data
            }
            dispatch(action)
        } catch (errors) {
            console.log('errors', errors.response?.data);
        }
    }
}


export const getFilmDetailAction = (maPhim) => {
    return async dispatch => {
        try{
            const result = await quanLyPhimService.layChiTietPhim(maPhim);    
            // dua du lieu len redux
            dispatch({
                type:SET_FILM_DETAIL,
                thongTinChiTiet:result.data
            })

        }catch(err){
            console.log(err.response?.data)
        }
    }
}

export const layChiTietPhongVe = (maLichChieu) => {
    return async dispatch => {
        try {
            const result = await quanLyPhimService.layChiTietPhongVe(maLichChieu);
            // dua du lieu len redux
            dispatch({
                type: SET_CHI_TIET_PHONG_VE,
                chiTietPhongVe:result.data
            })   
        }catch (err){
            console.log(err.response?.data);
        }
    }
}

export const layChiTietLichChieuNgay = (maNhom) => {
    return async dispatch => {
        try {
            const result = await quanLyPhimService.layChiTietPhimTheoNgay(maNhom);
            // dua du lieu len redux
            dispatch({
                type: SET_CHI_TIET_PHIM_THEO_NGAY,
                thongTinLichChieuNgay:result.data
            })   
        }catch (err){
            console.log(err.response?.data);
        }
    }
}

export const themPhimAction = (formData) =>{
    return async dispatch =>{
        try{
            const result = await quanLyPhimService.themPhim(formData);
            alert('Thêm phim thành công !');
            // history.replace("/admin/films");
        }catch (err){
            console.log(err.response?.data)
        }
    }
}

export const timKiemPhimAction = (tenPhim) => {
    return async dispatch => {
        try{
            const result = await quanLyPhimService.timKiemPhim(tenPhim);
            
            // đưa dữ liệu lên redux
            dispatch({
                type:TIM_KIEM_PHIM,
                danhSachPhimTimKiem: result.data
            })
           

        }catch (err){
            alert(err.response?.data)
        }
    }
}