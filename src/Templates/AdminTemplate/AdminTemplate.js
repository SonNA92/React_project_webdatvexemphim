import React, { useState } from 'react'
import { Route,Redirect,NavLink } from 'react-router-dom';
// su dung thu vien antdesing de lam giao dien trang 
import { Layout, Menu } from 'antd';
import {MenuUnfoldOutlined,MenuFoldOutlined,UserOutlined,VideoCameraOutlined,UploadOutlined,ArrowLeftOutlined
} from '@ant-design/icons';
import {useSelector} from 'react-redux';
import { history } from '../../App';
import "./styleAdminTemplate.css";

const { Header, Sider, Content } = Layout;


export const AdminTemplate = (props) => {

    const {userLogin} = useSelector(state=>state.UserReducer);
    const [state, setState] = useState({
        collapsed: false,
    });
    const toggle = () => {
        setState({
            ...state,
            collapsed: !state.collapsed,
        });
    };
    // kiểm tra quyền truy cập
    if(userLogin.maLoaiNguoiDung !== 'QuanTri'){
        alert('ko co quyen truy cap trang nay');
        return <Redirect to="/" />
    }


    return (
        <Route path={props.path} exact render={(propsRoute) => {
            return <Layout>
                <Sider trigger={null} collapsible collapsed={state.collapsed}>
                    <div className="logo text-center py-2">
                        <img style={{borderRadius:'50%'}} src="https://picsum.photos/50/50" alt="movie" />
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" icon={<VideoCameraOutlined />} >
                            <NavLink to="/admin/films">Quản lý phim</NavLink>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<UserOutlined />} >
                            <NavLink to="/admin/users">Quản lý người dùng</NavLink>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<ArrowLeftOutlined/>} >
                            <NavLink to="/">Về Trang Chủ</NavLink>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background text-white p-2" style={{ padding: 0, fontSize: 16 }}>
                        {React.createElement(state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: toggle,
                        })}
                        <div className="dropdown">
                            <a href="#" className="mr-5 text-white" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Xin chào {userLogin.taiKhoan} <i className="fa fa-angle-down ml-2"></i></a>
                            <div className="dropdown-menu">
                                <button type="button" className="dropdown-item btn-user-event" onClick={()=>{
                                    history.replace(`/useraccount/${userLogin.taiKhoan}`)
                                }} >Thông tin</button>
                                <button type="button" className="dropdown-item btn-user-event" onClick={()=>{
                                    localStorage.clear();
                                    history.replace('/login');
                                    window.location.reload();
                                }} >Đăng xuất</button>
                            </div>
                        </div>
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            
                            padding: 30,
                            minHeight: 280,
                        }}
                    >
                        <props.component {...propsRoute} />
                    </Content>
                </Layout>
            </Layout>
        }} />
    )
}