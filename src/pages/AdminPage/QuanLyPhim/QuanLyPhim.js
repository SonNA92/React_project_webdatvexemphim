import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { Table, Tag, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getApiFilmAction } from '../../../action/FilmAction';

export default function QuanLyPhim(props) {

    const {arrFilm} = useSelector(state=>state.FilmReducer);
    const dispatch = useDispatch();
    useEffect(()=> {
        const action = getApiFilmAction('GP01');
        dispatch(action)
    })

    const columns = [
        {
          title: 'Ma phim',
          dataIndex: 'maPhim',
          key: 'maPhim',
          render: (text,film) => <span>{film.maPhim}</span>,
        },
        {
          title: 'Ten phim',
          dataIndex: 'tenPhim',
          key: 'tenPhim',
          render: (text,film) => <span>{film.tenPhim}</span>
        },
        {
          title: 'Hinh anh',
          dataIndex: 'hinhAnh',
          key: 'hinhAnh',
          render: (text,film) => <img src={film.hinhAnh} alt="" width={50} height={50} />
        },
        {
            title: 'Mo ta',
            dataIndex: 'moTa',
            key: 'moTa',
            render: (text,film) => <section>{film.moTa?.length > 50 ? film.moTa.substr(0,50) + '...' : film.moTa}</section>
        },
        {
          title: 'Action',
          key: 'action',
          render: (text,record)=>(
            <Space size="middle">
                <NavLink to="/">Tao lich chieu</NavLink>
                <NavLink to="/">Chinh sua</NavLink>
            </Space>
          )      
        }     
    ];
      
    const data = arrFilm;
      

    return (
        <div className="container">
            <NavLink className="mb-2 btn btn-primary" to="/admin/addfilm"> Them Phim</NavLink>
            <Table columns={columns} dataSource={data} />
        </div>
    )
}
