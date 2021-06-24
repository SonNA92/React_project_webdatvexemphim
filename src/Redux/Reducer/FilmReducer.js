import { DAT_GHE, SET_CHI_TIET_PHONG_VE, SET_FILM, SET_FILM_DETAIL, XOA_DANH_SACH_GHE_DANG_DAT } from "../../action/types/FilmType";

const stateDefault = {
    arrFilm:[{maPhim:1,tenPhim:'ABC',hinhAnh:'https://picsum.photos/200/200'}],
    thongTinChiTiet:{},
    chiTietPhongVe:{},
    danhSachGheDangDat:[]
}

export const FilmReducer = (state = stateDefault,action) => {
    switch(action.type){
        case SET_FILM:{
            state.arrFilm = action.dataFilms    
            return {...state};
        }
        case SET_FILM_DETAIL:{
            state.thongTinChiTiet= action.thongTinChiTiet;
            return {...state};
        }
        case SET_CHI_TIET_PHONG_VE:{
            state.chiTietPhongVe = action.chiTietPhongVe
            return {...state};
        }
        case DAT_GHE:{
            let danhSachGheCapNhat = [...state.danhSachGheDangDat];
            let index = danhSachGheCapNhat.findIndex(gheDD=>gheDD.maGhe === action.ghe.maGhe);
            // tim action ghe gui len co ghe dang dat ko,co thi xoa di, ko co thi them vao
            if (index !== -1){
                danhSachGheCapNhat.splice(index,1);
            }else{
                danhSachGheCapNhat.push(action.ghe);
            }
            state.danhSachGheDangDat = danhSachGheCapNhat;
            return {...state};
        }
        case XOA_DANH_SACH_GHE_DANG_DAT:{
            state.danhSachGheDangDat = [];
            return {...state};
        }

        default: return state;
    }
}