import { Tabs } from 'antd';
import React from 'react';
import {NavLink} from 'react-router-dom';
import "./styleDetail.css";

const { TabPane } = Tabs;

export default class TabMenu extends React.Component {

    renderHeThongRap = () => {
        return this.props.heThongRapChieu?.map((htr, index) => {
            return <TabPane tab={<div>
                <div className="row align-items-center">
                    <div className="col-4">
                        <img className="img-logo-cinema" src={htr.logo} width={50} height={50} alt="movie" />
                    </div>
                    <div className="col-8 detail-tenHTR">
                        <h6 className="text-white">{htr.tenHeThongRap}</h6>
                    </div>
                </div>
            </div>} key={index}>
                {htr.cumRapChieu.map((cumRap, index) => {
                    return <div key={index}>
                        <div className="d-flex flex-row mt-2 ml-2">
                            <div>
                                <img src="https://picsum.photos/100/100" style={{width:'50px',height:'50px',borderRadius:'50%'}} alt="movie" />
                            </div>
                            <div className="ml-4 text-white">
                                <p>{cumRap.tenCumRap}</p>
                                <p>{cumRap.lichChieuPhim[index]?.ngayChieuGioChieu?.slice(0,10)}</p>
                            </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mt-2 ml-2">
                            <div>
                                <img className="" src='/img/img-2Dfilm.jpg' style={{width:'50px',height:'50px',borderRadius:'50%'}} alt="movie"/>
                            </div>
                            <div className= "showtime-detail py-2">
                                <div className="row ml-2">
                                {/* chi hien thi 6 phan tu  */}
                                    {cumRap.lichChieuPhim.slice(0,6).map((lichChieu,index)=>{
                                        return <div className="col-lg-3 col-sm-4 col-6 " key={index}>
                                            <NavLink className="btn btn-time btn-warning mb-1" to ={`/checkout/${lichChieu.maLichChieu}`}>{lichChieu.ngayChieuGioChieu.slice(11,16)}
                                            </NavLink>
                                        </div>
                                    })}
                                </div>
                            </div>
                        </div>  
                    </div>
                })}
            </TabPane>
        })
    }

    render() {
        return (
            <>  
                <Tabs tabPosition={'left'}>
                    {this.renderHeThongRap()}

                </Tabs>
            </>
        );
    }
}

