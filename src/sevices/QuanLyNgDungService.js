import { baseService } from "./baseService";

export class QuanLyNgDungService extends baseService{
    constructor(){
        super();
    }
    layDanhSachNgDung = () => {
        return this.get('/api/QuanLyNguoiDung/LayDanhSachNguoiDung');
    }
    dangKyTaiKhoan = (data) => {
        return this.post2('/api/QuanLyNguoiDung/DangKy',data);
    }
    dangNhapTaiKhoan = (data) => {
        return this.post2('/api/QuanLyNguoiDung/DangNhap',data);
    }
    datVePhim = (data) => {
        return this.post('/api/QuanLyDatVe/DatVe',data);
    }
    layThongTinTaiKhoan = (data) => {
        return this.post('/api/QuanLyNguoiDung/ThongTinTaiKhoan',data);
    }
    capNhatThongTinTaiKhoan = (data) => {
        return this.put('/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung',data);
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