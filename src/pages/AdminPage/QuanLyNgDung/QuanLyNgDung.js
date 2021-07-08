import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { Table, Tag, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachNgDungAction, timKiemNguoiDung, timKiemNguoiDungAction, xoaNguoiDungAction } from '../../../action/UserAction';

export default function QuanLyNgDung(props) {

    const {arrUsers} = useSelector(state=>state.UserReducer);
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(layDanhSachNgDungAction());
    },[])

    const columns = [
        // {
        //   title: 'STT',
       
        
        //   render: (text,index) => <span>{index}</span>,
        // },
        {
          title: 'Tài khoản',
          dataIndex: 'taiKhoan',
          key: 'taiKhoan',
          render: (text,user) => <span>{user.taiKhoan}</span>
        },
        {
          title: 'Mật khẩu',
          dataIndex: 'matKhau',
          key: 'matKhau',
          render: (text,user) => <span>{user.matKhau}</span>
        },
        {
            title: 'Họ tên',
            dataIndex: 'hoTen',
            key: 'hoTen',
            render: (text,user) => <span>{user.hoTen}</span>
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text,user) => <span>{user.email}</span>
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'soDT',
            key: 'soDT',
            render: (text,user) => <span>{user.soDt}</span>
        },
        {
          title: 'Thao tác',
          key: 'action',
          render: (text,user)=>(
            <Space size="middle">
                <NavLink className="btn btn-adminpage btn-primary" to={`/admin/updateuser/${user.taiKhoan}`}>Chỉnh sửa</NavLink>
                <button className="btn btn-adminpage btn-danger" onClick={()=>{
                  // dispatch mã phim lên store
                  dispatch(xoaNguoiDungAction(user.taiKhoan));
                }} >Xóa</button>

            </Space>
          )      
        }     
    ];
      
    const data = arrUsers; 
    // tìm kiếm người dùng
    const timKiemUser = (searchKey) => {
        if (searchKey.trim() !== ''){
          dispatch(timKiemNguoiDungAction(searchKey));
        }else{
          dispatch(layDanhSachNgDungAction());
        }
    }

    return (
        <div className="container">
            <NavLink className="mb-4 btn btn-adminpage btn-primary" to="/admin/adduser"> Thêm Người Dùng</NavLink>
            <div className="row mb-4">
              <div className="col-6">
                <input type="search" id="search-user" className="form-control" placeholder="Nhập vào tài khoản hoặc họ tên người dùng" onChange={()=>{
                  let searchKey = document.getElementById('search-user').value;
                  timKiemUser(searchKey);
                }}/>
              </div>
            </div>
            <Table columns={columns} dataSource={data} />
        </div>
    )
}
