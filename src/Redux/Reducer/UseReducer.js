import { DANG_NHAP, SET_USER, THONG_TIN_TAI_KHOAN, TIM_KIEM_USER } from "../../action/types/FilmType";
import { USER_LOGIN } from "../../util/setting";



// lấy user từ Local lên
let usLogin = {};
if (localStorage.getItem(USER_LOGIN)){
    usLogin = JSON.parse(localStorage.getItem(USER_LOGIN))
}


const stateDefault = {
    userLogin:usLogin,
    thongTinTaiKhoan:{},
    arrUsers:[]
}

export const UserReducer = (state = stateDefault,action) => {
    switch(action.type){
        case SET_USER:{
            state.arrUsers = action.dataUsers;
            return {...state};
        }
        case DANG_NHAP:{
            state.userLogin = action.userLogin;
            return {...state};

        }
        case THONG_TIN_TAI_KHOAN:{
            state.thongTinTaiKhoan = action.thongTinTaiKhoan;
            return {...state};
        }
        case TIM_KIEM_USER:{
            state.arrUsers = action.danhSachNguoiDungTimKiem;
            return {...state};
        }
        
        default : {
            return {...state}
        }
    }
}