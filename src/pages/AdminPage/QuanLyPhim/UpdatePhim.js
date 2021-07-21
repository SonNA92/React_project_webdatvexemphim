import React, { useEffect } from 'react';
import "../styleAdmin.css";
import { useDispatch, useSelector } from 'react-redux';
import { capNhatPhimAction, getFilmDetailAction } from '../../../action/FilmAction';
import { useState } from 'react';

 

export default function UpdateFilms(props) {

    const dispatch = useDispatch();
    const { thongTinChiTiet } = useSelector(state => state.FilmReducer);
    const [state, setState] = useState({
        values:{
            maPhim: '',
            tenPhim: '',
            biDanh: '',
            trailer: '',
            moTa: '',
            hinhAnh: '',
            maNhom:'GP01',
            ngayKhoiChieu: '',
            danhGia:10
        },
        errors:{
            tenPhim: '',
            biDanh: '',
            trailer: '',
            moTa: '',
            hinhAnh: '',
            ngayKhoiChieu: '' 
        }
        
    });
    const [number, setNumber] = useState(1);
    // lấy dữ liệu phim từ redux về
    useEffect(() => {
        // lấy mã phim từ url
        const action = props.match.params.id;
        dispatch(getFilmDetailAction(action));

    }, [])  

    const handelChange = (e) => {
        
        let {name,value} = e.target;
        let newValues = {...state.values};
        newValues = {...newValues,[name]:value};
        let newErrors = { ...state.errors };
        let errorMessage = '';
        if (newValues[name].trim() === '') {
            errorMessage = name + ' không được bỏ trống'
        }
       
        if (name ==="hinhAnh"){
            newValues[name] = e.target.files[0];
        } 
        else {
            newValues[name] = e.target.value;
        }
        
        newErrors[name] = errorMessage;
        setState({
            ...state,
            values:newValues,
            errors:newErrors
        })

    }
    
    const handelSubmit = (e) => {
        e.preventDefault();
        console.log(state.values)
        let valid = true;
        for (let keyName in state.errors) {
            if (state.errors[keyName] !== '') {
                // co 1 truong hien thi bi loi
                valid = false;
            }
        }
        if (!valid) {
            alert(' Dữ liệu không hợp lệ');
            return
        }
        let formData = new FormData();
        for (let key in state.values){
            formData.append(key,state.values[key]);
        }
        dispatch(capNhatPhimAction(formData));
        
    }
    // gán giá trị state khi click vào thay đổi
    useEffect(() => {
        setState({          
            values: thongTinChiTiet
        })
    }, [number]);



    return (
        <form id="formUpdateFilms" className="container form-admin-page" onSubmit={handelSubmit} >
            <h3 className="mb-4">Cập Nhật Phim</h3>
            <div className="row">
                <div className="col-6">
                    <div className="form-group">
                        <p>Mã phim</p>
                        <input className="form-control" name="maPhim" value={state.values.maPhim} disabled onChange={handelChange} />
                    </div>
                    <div className="form-group">
                        <p>Tên phim</p>
                        <input className="form-control" name="tenPhim" value={state.values.tenPhim} onChange={handelChange}/>
                        <p className="text text-warning text-danger">{state.errors?.tenPhim}</p>
                    </div>
                    <div className="form-group">
                        <p>Bí danh</p>
                        <input className="form-control" name="biDanh" value={state.values.biDanh} onChange={handelChange} />
                        <p className="text text-warning text-danger">{state.errors?.biDanh}</p>
                    </div>
                    <div className="form-group">
                        <p>Mô tả</p>
                        <input className="form-control" name="moTa" value={state.values.moTa} onChange={handelChange} />
                        <p className="text text-warning text-danger">{state.errors?.moTa}</p>
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <p>Ngày khởi chiếu</p>
                        <input type="date" className="form-control" name="ngayKhoiChieu" onChange={handelChange} />
                        <p className="text-warning">Ngày khởi chiếu hiện tại: {thongTinChiTiet.ngayKhoiChieu}</p>
                        <p className="text text-warning text-danger">{state.errors?.ngayKhoiChieu}</p>
                    </div>
                    <div className="form-group">
                        <p>Trailer</p>
                        <input className="form-control" name="trailer" value={state.values.trailer} onChange={handelChange} />
                        <p className="text text-warning text-danger">{state.errors?.trailer}</p>
                    </div>
                    <div className="form-group">
                        <p>Hình ảnh</p>
                        <input className="form-control" name="hinhAnh" type="file" style={{ height: '45px' }} onChange={handelChange} />
                        <p className="text-warning">Hình ảnh hiện tại: {thongTinChiTiet.hinhAnh}</p>
                        <p className="text text-warning text-danger">{state.errors?.hinhAnh}</p>
                    </div>
                </div>
            </div>
            <div className="form-group d-flex justify-content-center mt-5">
                <button type="button" className="btn btn-update btn-primary mx-4" onClick={() => {
                    props.history.goBack();
                }}> Trở về</button>
                <button type="button" className="btn btn-update btn-success mx-4" onClick={()=>{
                    setNumber({
                        number : number + 1
                    })
                }}>Chỉnh sửa</button>
                <button type="submit" className="btn btn-update btn-success mx-4">Hoàn tất</button>
            </div>
            <p className="text-danger text-center mt-5"> <span className="bg-white p-1">* Nhấp vào Chỉnh sửa để hiện thông tin và Hoàn tất khi kết thúc ! </span></p>
        </form>
    )
}
