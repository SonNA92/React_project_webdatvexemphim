import { quanLyPhimService } from '../sevices/QuanLyPhimService';
import { SET_CHI_TIET_CUM_RAP, SET_CHI_TIET_PHIM_THEO_NGAY, SET_CHI_TIET_PHONG_VE, SET_FILM, SET_FILM_DETAIL,SHOW_MODAL,TIM_KIEM_PHIM } from './types/FilmType';
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
            alert('errors: ' + errors.response?.data);
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
            alert('errors: ' + err.response?.data)
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
            alert('errors: ' + err.response?.data);
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
            alert('errors: ' + err.response?.data);
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
            alert('errors: ' + err.response?.data)
        }
    }
}

export const themPhimAction = (formData) =>{
    return async dispatch =>{
        try{
            const result = await quanLyPhimService.themPhim(formData);
            await dispatch({
                type:SHOW_MODAL
            })
            // quay về trang phim
            history.replace("/admin/films");
            // load lại trang
            dispatch(getApiFilmAction("GP01"));
        }catch (err){
            alert('errors: ' + err.response?.data)
        }
    }
}


export const xoaPhimAction = (maPhim) => {
    return async dispatch =>{
        try{
            const result = await quanLyPhimService.xoaPhim(maPhim);
            await dispatch({
                type:SHOW_MODAL
            })
            // load lại trang
            dispatch(getApiFilmAction("GP01"));
        }catch (err){
            alert('errors: ' + err.response?.data)
        }
    }
}

export const layThongTinCumRapTheoHeThong = (maHeThongRap) => {
    return async dispatch => {
        try{
            const result = await quanLyPhimService.layThongTinCumRapTheoHeTHong(maHeThongRap);
            dispatch({
                type: SET_CHI_TIET_CUM_RAP,
                danhSachHeThongRap: result.data
            })
        }catch(error){
            alert('errors: ' + error.response?.data);
        }
    }

}

export const themLichChieuAction = (formData) =>{
    return async dispatch => {
        try{
            const result = await quanLyPhimService.themLichChieu(formData);  
            await dispatch({
                type:SHOW_MODAL
            })

            // load lại danh sách lịch chiếu mới
            dispatch(getFilmDetailAction(formData.maPhim))
        }catch(error){
            alert('errors: ' + error.response?.data);
        }
    }
}   

export const capNhatPhimAction = (formData) => {
    return async dispatch =>{
        try{
            const result = await quanLyPhimService.capNhatPhim(formData);
            await dispatch({
                type:SHOW_MODAL
            })
            // quay lại quản lý phim
            history.replace("/admin/films");
            // load lại trang
            dispatch(getApiFilmAction("GP01"));
        }catch (err){
            alert('errors: ' + err.response?.data);
        }
    }
}