import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { capNhatThongTinTaiKhoan, layThongTinAction } from '../../../action/UserAction';
import { history } from '../../../App';

export default function UpdateNgDung(props) {

    const dispatch = useDispatch();
    const {thongTinTaiKhoan} = useSelector(state => state.UserReducer);
    delete thongTinTaiKhoan.loaiNguoiDung; // do API bị lỗi trường này nên bỏ ra
    const thongTinTaiKhoanUpdate = { ...thongTinTaiKhoan, maLoaiNguoiDung:""};
    const [number, setNumber] = useState(1);
    const [state,setState] = useState({
        values:{
            taiKhoan:'',
            matKhau:'',
            hoTen:'',
            email:'',
            soDT:'',
            maNhom:'',
            maLoaiNguoiDung:''
        },
        errors:{
            taiKhoan:'',
            matKhau:'',
            hoTen:'',
            email:'',
            soDT:'',
            maNhom:'',
            maLoaiNguoiDung:''
        }
    })
    useEffect(()=>{
        // lấy mã phim từ url
        const action = props.match.params.id;
        dispatch(layThongTinAction(action)); 
    },[])

    const handleChange = (e) => {
        let {name,value} = e.target;
        let newValues = {...state.values};
        newValues = {...newValues,[name]:value}

        let newErrors = { ...state.errors };
        let errorMessage = '';
        if (newValues[name].trim() === '') {
            errorMessage = name + ' không được bỏ trống'
        }
        // validation email
        let typeEmail = e.target.getAttribute('typeemail');
        let reEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (typeEmail === 'email') {
            if (!reEmail.test(newValues[name])) {
                errorMessage = 'email không đúng định dạng';
            }
        }
        // validation họ tên
        let typeHoTen = e.target.getAttribute('typehoten');
        const reHoTen = new RegExp("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$"
        );
        if (typeHoTen === 'hoTen') {
            if (!reHoTen.test(newValues[name]) || newValues[name].length > 30) {
                errorMessage = 'Họ tên chỉ chứa chữ cái, dấu cách và không quá 30 ký tự';
            }
        }
        // validation mật khẩu
        let typeMatKhau = e.target.getAttribute('typematkhau');
        const reMatKhau = /^(?=.*\d)(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/;
        if (typeMatKhau === 'matKhau') {
            if (!reMatKhau.test(newValues[name])) {
                errorMessage = 'Mật khẩu chứa ít nhất 1 chữ cái in hoa, 1 chữ số, 1 ký tự đặc biệt, từ 6-10 ký tự';
            }
        }
        // validation số điện thoại
        let typeSoDT = e.target.getAttribute('typesodt');
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

    const handleSubmit = (e) => {
        e.preventDefault();
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
        // đưa dữ liệu lên store
        dispatch(capNhatThongTinTaiKhoan(values));
        history.goBack();
        

    }
    // gán giá trị state khi click vào thay đổi
    useEffect(() => {
        setState({          
            values: thongTinTaiKhoanUpdate
        })
    }, [number]);


    return (
        <form className="container form-admin-page" onSubmit={handleSubmit}>
            <h3 className="mb-4">Chỉnh Sửa Thông Tin</h3>
            <div className="row">
                <div className="col-6">
                    <div className="form-group">
                        <p>Tài khoản</p>
                        <input name="taiKhoan" className="form-control" value={state.values.taiKhoan} onChange={handleChange} disabled  />
                        
                    </div>
                    <div className="form-group">
                        <p>Họ tên</p>
                        <input name="hoTen" typehoten="hoTen" className="form-control" value={state.values.hoTen} onChange={handleChange}  />
                        <p className="text text-warning text-danger">{state.errors?.hoTen}</p>
                    </div>
                    <div className="form-group">
                        <p>Mật khẩu</p>
                        <input name="matKhau" typematkhau="matKhau" className="form-control" value={state.values.matKhau} onChange={handleChange}  />
                        <p className="text text-warning text-danger">{state.errors?.matKhau}</p>
                    </div>
                    <div className="form-group">
                        <p>Email</p>
                        <input name="email" typeemail="email" className="form-control" value={state.values.email} onChange={handleChange}  />
                        <p className="text text-warning text-danger">{state.errors?.email}</p>
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <p>Số điện thoại</p>
                        <input name="soDT" typesodt="soDT" className="form-control" value={state.values.soDT} onChange={handleChange}  />
                        <p className="text text-warning text-danger">{state.errors?.soDT}</p>
                    </div>
                    <div className="form-group">
                        <p>Mã nhóm</p>
                        <select name="maNhom" className="form-control" value={state.values.maNhom} onChange={handleChange}>
                            <option >Chọn mã nhóm</option>
                            <option value="GP01">Group 1</option>
                            <option value="GP02">Group 2</option>
                            <option value="GP03">Group 3</option>
                        </select>
                        <p className="text text-warning text-danger">{state.errors?.maNhom}</p>
                    </div>
                    <div className="form-group">
                        <p>Mã loại người dùng</p>
                        <select name="maLoaiNguoiDung" className="form-control" value={state.values.maLoaiNguoiDung} onChange={handleChange}>
                            <option >Chọn loại người dùng</option>
                            <option value="QuanTri">Quản Trị</option>
                            <option value="KhachHang">Khách Hàng</option>
                        </select>
                        <p className="text text-warning text-danger">{state.errors?.maLoaiNguoiDung}</p>
                    </div>
                </div>
            </div>
            <div className="form-group d-flex justify-content-center mt-5">
                <button type="button" className="btn btn-update btn-primary mx-4" onClick={()=>{
                    history.goBack();
                }}>Trở về</button>
                <button type="button" className="btn btn-update btn-success mx-4" onClick={()=>{
                    setNumber({
                        number : number + 1
                    })
                }}>Chỉnh sửa</button>
                <button type="submit" className="btn btn-update btn-success mx-4">Hoàn tất</button>   
            </div>
            <p className="text-danger text-center">* Nhấp vào Chỉnh sửa để hiện thông tin và Hoàn tất khi kết thúc ! </p>
        </form>
    )
}
