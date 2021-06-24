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
    themPhim = (data) => {
        return this.post(`/api/QuanLyPhim/ThemPhim`,data);
    }
}

export const quanLyPhimService = new QuanLyPhimService();