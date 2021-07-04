import { DANG_NHAP, THONG_TIN_TAI_KHOAN } from "../../action/types/FilmType";
import { USER_LOGIN } from "../../util/setting";




let usLogin = {};
if (localStorage.getItem(USER_LOGIN)){
    usLogin = JSON.parse(localStorage.getItem(USER_LOGIN))
}


const stateDefault = {
    userLogin:usLogin,
    thongTinTaiKhoan:{}
}

export const UserReducer = (state = stateDefault,action) => {
    switch(action.type){
        case DANG_NHAP:{
            state.userLogin = action.userLogin;
            return {...state};

        }
        case THONG_TIN_TAI_KHOAN:{
            state.thongTinTaiKhoan = action.thongTinTaiKhoan;
            return {...state};
        }
        
        default : {
            return {...state}
        }
    }
}