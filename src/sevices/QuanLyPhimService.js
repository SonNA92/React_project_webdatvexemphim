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
    timKiemPhim = (tenPhim) => {
        return this.get2(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01&tenPhim=${tenPhim}`)
    }
    themPhim = (data) => {
        return this.post('/api/QuanLyPhim/ThemPhimUploadHinh',data);
    }
    layThongTinCumRapTheoHeTHong = (maHeThongRap) => {
        return this.get(`/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`)
    }
    themLichChieu = (data) => {
        return this.post('/api/QuanLyDatVe/TaoLichChieu',data);
    }
    xoaPhim = (maPhim) => {
        return this.delete(`/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
    }
    capNhatPhim = (formData) => {
        return this.post('/api/QuanLyPhim/CapNhatPhimUpload',formData);
    }
}

export const quanLyPhimService = new QuanLyPhimService();