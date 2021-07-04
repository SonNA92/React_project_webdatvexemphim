import { baseService } from "./baseService";


export class QuanLyPhimService extends baseService {
    constructor(){
        super();
    }
    layDanhSachPhim = (maNhom) => {
       return this.get(`/api/quanlyphim/laydanhsachphim?maNhom=${maNhom}`);
    }
    layChiTietPhim = (maPhim) => {
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`);
    }
    layChiTietPhongVe = (maLichChieu) => {
        return this.get(`/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`);
    }
    layChiTietPhimTheoNgay = (maNhom) => {
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${maNhom}`)
    }
    themPhim = (data) => {
        return this.post('/api/QuanLyPhim/ThemPhim',data);
    }
    timKiemPhim = (tenPhim) => {
        return this.get2(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01&tenPhim=${tenPhim}`)
    }
}

export const quanLyPhimService = new QuanLyPhimService();