import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { Table, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getApiFilmAction, timKiemPhimAction, xoaPhimAction } from '../../../action/FilmAction';
import ModalAdminPage from '../../../Component/Modal/ModalAdminPage';

export default function QuanLyPhim(props) {

    const {arrFilm} = useSelector(state=>state.FilmReducer);
    const dispatch = useDispatch();
    useEffect(()=> {
        const action = getApiFilmAction('GP02');
        dispatch(action)
    },[])

    const columns = [
        {
          title: 'Mã phim',
          dataIndex: 'maPhim',
          key: 'maPhim',
          render: (text,film) => <span>{film.maPhim}</span>,
        },
        {
          title: 'Tên phim',
          dataIndex: 'tenPhim',
          key: 'tenPhim',
          render: (text,film) => <span>{film.tenPhim}</span>
        },
        {
          title: 'Hình ảnh',
          dataIndex: 'hinhAnh',
          key: 'hinhAnh',
          render: (text,film) => <img src={film.hinhAnh} alt="movie" width={50} height={50} />
        },
        {
            title: 'Mô tả',
            dataIndex: 'moTa',
            key: 'moTa',
            render: (text,film) => <section>{film.moTa?.length > 50 ? film.moTa.substr(0,50) + '...' : film.moTa}</section>
        },
        {
          title: 'Thao tác',
          key: 'action',
          render: (text,film)=>(
            <Space size="middle">
                <NavLink className="btn btn-adminpage btn-primary" to={`/admin/taolichchieu/${film.maPhim}`}>Tạo lịch chiếu</NavLink>
                <NavLink className="btn btn-adminpage btn-primary" to={`/admin/updatefilm/${film.maPhim}`}>Chỉnh sửa</NavLink>
                <button className="btn btn-adminpage btn-danger" onClick={()=>{
                  // dispatch mã phim lên store
                  dispatch(xoaPhimAction(film.maPhim));
                }} >Xóa</button>

            </Space>
          )      
        }     
    ];
      
    const data = arrFilm;
    // tìm kiếm phim
    const timKiemPhim = (searchKey) => {
      if (searchKey.trim() !== ''){
        dispatch(timKiemPhimAction(searchKey));
      }else{
        dispatch(getApiFilmAction('GP01'));
      }
  } 

    return (
        <div className="container">
            <NavLink className="mb-4 btn btn-adminpage btn-primary" to="/admin/addfilm"> Thêm Phim</NavLink>
            <div className="row mb-4">
              <div className="col-6">
                <input type="search" id="search-film" className="form-control" placeholder="Nhập vào tên phim" onChange={()=>{
                  let searchKey = document.getElementById('search-film').value;
                  timKiemPhim(searchKey);
                }}/>
              </div>
            </div>
            <Table columns={columns} dataSource={data} />
            <ModalAdminPage/>
        </div>
    )
}
