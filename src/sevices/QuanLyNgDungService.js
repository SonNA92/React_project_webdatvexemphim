import { baseService } from "./baseService";

export class QuanLyNgDungService extends baseService{
    constructor(){
        super();
    }
    layDanhSachNgDung = () => {
        return this.get('/api/QuanLyNguoiDung/LayDanhSachNguoiDung');
    }
    themNguoiDung = (data) => {
        return this.post('/api/QuanLyNguoiDung/ThemNguoiDung',data);
    }
    xoaNguoiDung = (taiKhoan) => {
        return this.delete(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`);
    }
    timKiemNguoiDung = (searchKey) => {
        return this.get2(`/api/QuanLyNguoiDung/TimKiemNguoiDung?tuKhoa=${searchKey}`);
    }


}


export const quanLyNgDungService = new QuanLyNgDungService();