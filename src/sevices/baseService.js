import axios from "axios"
import { ACCESSTOKEN, DOMAIN } from "../util/setting"

export class baseService {
    constructor(){

    }
    get = (url) => {
        let promise = axios({
            url:`${DOMAIN}${url}`,
            method:'GET',
            headers:{
                'Authorization':`Bearer ${localStorage.getItem(ACCESSTOKEN)}`
            }
        });
        return promise;
    }
    // get2: ko cần xác thực đăng nhập
    get2 = (url) => {
        let promise = axios({
            url:`${DOMAIN}${url}`,
            method:'GET',
        });
        return promise;
    }
    post = (url,data) => {
        let promise = axios({
            url:`${DOMAIN}${url}`,
            method:'POST',
            data:data,
            headers:{
                'Authorization':`Bearer ${localStorage.getItem(ACCESSTOKEN)}`
            }
        }); 
        return promise;
    }
    put = (url,data) => {
        let promise = axios({
            url:`${DOMAIN}${url}`,
            method:'PUT',
            data:data,
            headers:{
                'Authorization':`Bearer ${localStorage.getItem(ACCESSTOKEN)}`
            }
        });
        return promise;
    }
    delete = (url) => {
        let promise = axios({
            url:`${DOMAIN}${url}`,
            method:'DELETE',
            headers:{
                'Authorization':`Bearer ${localStorage.getItem(ACCESSTOKEN)}`
            }
        });
        return promise;
    }
}