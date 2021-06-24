import { DANG_NHAP } from "../../action/types/FilmType";
import { USER_LOGIN } from "../../util/setting";




let usLogin = {};
if (localStorage.getItem(USER_LOGIN)){
    usLogin = JSON.parse(localStorage.getItem(USER_LOGIN))
}


const stateDefault = {
    userLogin:usLogin
}

export const UserReducer = (state = stateDefault,action) => {
    switch(action.type){
        case DANG_NHAP:{
            state.userLogin = action.userLogin;
            return {...state};

        }
        default : {
            return {...state}
        }
    }
}