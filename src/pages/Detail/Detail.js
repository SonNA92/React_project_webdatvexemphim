import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFilmDetailAction } from '../../action/FilmAction';
import TabMenu from './TabMenu';


export default function Detail(props) {
    const dispatch = useDispatch();
    const {thongTinChiTiet} = useSelector(state=>state.FilmReducer);
    console.log(thongTinChiTiet);

    // lay du lieu load ra giao dien khi trang vua load xong
    useEffect(()=>{
        const action = getFilmDetailAction(props.match.params.postId);
        dispatch(action);

    },[])

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-6">
                    <img className="w-100" src={thongTinChiTiet.hinhAnh} alt="" />
                </div>
                <div className="col-6">
                    <table className="table">
                        <thead>
                            <tr>
                                <th style={{verticalAlign:'middle'}}>Ten phim</th>
                                <th style={{verticalAlign:'middle'}}>{thongTinChiTiet.tenPhim}</th>
                            </tr>
                            <tr>
                                <th style={{verticalAlign:'middle'}}>Noi dung</th>
                                <th>{thongTinChiTiet.moTa}</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div className="mt-5">
                    <h3>Thong tin lich chieu</h3>
                    <TabMenu heThongRapChieu={thongTinChiTiet.heThongRapChieu}/>
                </div>
            </div>
            
        </div>
    )
}
