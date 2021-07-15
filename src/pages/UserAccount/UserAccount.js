import React, { useEffect, useState,useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { capNhatThongTinTaiKhoan, layThongTinAction } from '../../action/UserAction';
import Footer from '../../Component/Footer/Footer';
import UserHistory from './UserHistory/UserHistory';
import "./styeUserAccount.css";


export default function UserAccount(props) {

    const dispatch = useDispatch();
    const { thongTinTaiKhoan, userLogin } = useSelector(state => state.UserReducer);
    const [number, setNumber] = useState(1);
    const [click,setClick] = useState(1);
    const [state, setState] = useState({
        values: {
            email: userLogin.email,
            hoTen: userLogin.hoTen,
            soDT: userLogin.soDT,
            taiKhoan: userLogin.taiKhoan,
            matKhau: '******',
            maLoaiNguoiDung: userLogin.maLoaiNguoiDung

        },
        errors: {
            email: '',
            hoTen: '',
            soDT: '',
            matKhau: '',
        }

    });
    delete thongTinTaiKhoan.loaiNguoiDung; // do API bị lỗi trường này nên bỏ ra
    const thongTinTaiKhoanUpdate = { ...thongTinTaiKhoan, maLoaiNguoiDung: userLogin.maLoaiNguoiDung }; // thêm vào trường MLND lấy giá trị từ userLogin để update
    // dùng useCallback để chỉ render lại trang useHistory khi người dùng click vào xem
    const callBackThongTinTaiKhoanUpdate = useCallback(thongTinTaiKhoanUpdate,[click]);
    
    useEffect(() => {
        dispatch(layThongTinAction(props.match.params.id));
    }, [])

    useEffect(() => {
        setState({
            values: thongTinTaiKhoanUpdate
        })
    }, [number])

    // hàm onChange
    const handleChangeInput = (event) => {
        let { value, name } = event.target;
        let newValues = { ...state.values };
        newValues = { ...newValues, [name]: value };

        let newErrors = { ...state.errors };
        let errorMessage = '';
        if (newValues[name].trim() === '') {
            errorMessage = name + ' không được bỏ trống'
        }
        // validation email
        let typeEmail = event.target.getAttribute('typeemail');
        let reEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (typeEmail === 'email') {
            if (!reEmail.test(newValues[name])) {
                errorMessage = 'email không đúng định dạng';
            }
        }
        // validation họ tên
        let typeHoTen = event.target.getAttribute('typehoten');
        const reHoTen = new RegExp("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$"
        );
        if (typeHoTen === 'hoTen') {
            if (!reHoTen.test(newValues[name]) || newValues[name].length > 30) {
                errorMessage = 'Họ tên chỉ chứa chữ cái, dấu cách và không quá 30 ký tự';
            }
        }
        // validation mật khẩu
        let typeMatKhau = event.target.getAttribute('typematkhau');
        const reMatKhau = /^(?=.*\d)(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/;
        if (typeMatKhau === 'matKhau') {
            if (!reMatKhau.test(newValues[name])) {
                errorMessage = 'Mật khẩu chứa ít nhất 1 chữ cái in hoa, 1 chữ số, 1 ký tự đặc biệt, từ 6-10 ký tự';
            }
        }
        // validation số điện thoại
        let typeSoDT = event.target.getAttribute('typesodt');
        const reSoDT = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        if (typeSoDT === 'soDT') {
            if (!reSoDT.test(newValues[name]) || newValues[name].length > 10) {
                errorMessage = 'Số điện thoại ko đúng định dạng (ex: 0987654321)';
            }
        }

        newErrors[name] = errorMessage;
        // cap nhat lai state khi nguoi dung nhap lieu
        setState({
            ...state,
            values: newValues,
            errors: newErrors
        })
    }

    // hàm Submit
    const handleSubmit = (event) => {
        // kiem tra Submit
        // Form hop le khi tat ca input khong duoc de trong va hop le
        let { values, errors } = state;
        let valid = true;
        for (let keyName in errors) {
            if (errors[keyName] !== '') {
                // co 1 truong hien thi bi loi
                valid = false;
            }
        }
        if (!valid) {
            alert(' Dữ liệu không hợp lệ');
            return
        }

        // Dua du lieu len Redux
        dispatch(capNhatThongTinTaiKhoan(values));
    }
    

    return (
        <div className="user-account-page">
            <div className="user-account" style={{ background: 'url(/img/bg-login.jpg) 100% 100%' }}>
                <div className="container pb-5">
                    <ul className="nav nav-pills pills-tab-movie mb-4" id="pills-tab-user" role="tablist">
                        <li className="nav-item" role="presentation">
                            <a className="nav-link active" id="pills-home-tab-user" data-toggle="pill" href="#pills-home-user" role="tab" aria-controls="pills-home-user" aria-selected="true">Thông tin cá nhân</a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a className="nav-link" id="pills-profile-tab-user" data-toggle="pill" href="#pills-profile-user" role="tab" aria-controls="pills-profile-user" aria-selected="false" onClick={()=>{
                                setClick(click + 1);
                            }}>Lịch sử đặt vé</a>
                        </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent-user">
                        <div className="tab-pane fade show active" id="pills-home-user" role="tabpanel" aria-labelledby="pills-home-tab-user">
                            <form className="form">
                                <div className="row mb-3">
                                    <div className="col-lg-6 col-sm-12">
                                        <div className="row">
                                            <div className="col-4"><p className="text-input">Email</p></div>
                                            <div className="col-8">
                                                <input typeemail="email" id="changeInput1" className="form-control" name="email" value={state.values.email} onChange={handleChangeInput} disabled />
                                                <p className="text text-warning text-danger">{state.errors?.email}</p>
                                            </div>

                                        </div>
                                        <div className="row">
                                            <div className="col-4"><p className="text-input">Họ tên</p></div>
                                            <div className="col-8">
                                                <input typehoten="hoTen" id="changeInput2" className="form-control" name="hoTen" value={state.values.hoTen} onChange={handleChangeInput} disabled />
                                                <p className="text text-warning text-danger">{state.errors?.hoTen}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-4"><p className="text-input">Số điện thoại</p></div>
                                            <div className="col-8">
                                                <input typesodt="soDT" id="changeInput3" className="form-control" name="soDT" value={state.values.soDT} onChange={handleChangeInput} disabled />
                                                <p className="text text-warning text-danger">{state.errors?.soDT}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-sm-12">
                                        <div className="row">
                                            <div className="col-4"><p className="text-input">Tài khoản</p></div>
                                            <div className="col-8">
                                                <input className="form-control" name="taiKhoan" value={state.values.taiKhoan} onChange={handleChangeInput} disabled />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-4"><p className="text-input">Mật khẩu</p></div>
                                            <div className="col-8">
                                                <input typematkhau="matKhau" id="changeInput4" className="form-control" name="matKhau" value={state.values.matKhau} onChange={handleChangeInput} disabled />
                                                <p className="text text-warning text-danger">{state.errors?.matKhau}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-4"><p className="text-input">Loại Tài Khoản</p></div>
                                            <div className="col-8">
                                                <input className="form-control" name="maLoaiNguoiDung" value={(state.values.maLoaiNguoiDung === 'KhachHang') ? "Khách Hàng" : "Quản Trị"} disabled onChange={handleChangeInput} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div className="row justify-content-center mb-5">
                                <p id="text-notice" className="text-danger"></p>
                            </div>
                            <div className="row justify-content-center">
                                <button type="button" className="btn-update btn btn-success mr-3" onClick={() => {
                                    setNumber(number + 1);
                                    document.getElementById("text-notice").innerHTML = "- Tài khoản và Loại tài khoản không thể thay đổi ! -";
                                    document.getElementById("changeInput1").removeAttribute("disabled");
                                    document.getElementById("changeInput2").removeAttribute("disabled");
                                    document.getElementById("changeInput3").removeAttribute("disabled");
                                    document.getElementById("changeInput4").removeAttribute("disabled");

                                }}>Sửa thông tin</button>
                                <button type="button" className="btn-update btn btn-success ml-3" onClick={() => {
                                    { handleSubmit() }
                                }}>Hoàn tất</button>
                            </div>
                            <p className="text-danger text-center mt-5"> <span className="bg-white p-1">* Nhấp vào Sửa thông tin để thay đổi và Hoàn tất để cập nhật thay đổi ! </span></p>
                        </div>
                        {/* phần lịch sử đặt vé */}
                        <div className="tab-pane fade" id="pills-profile-user" role="tabpanel" aria-labelledby="pills-profile-tab-user">
                            <UserHistory thongTinTaiKhoanUpdate={callBackThongTinTaiKhoanUpdate} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}


