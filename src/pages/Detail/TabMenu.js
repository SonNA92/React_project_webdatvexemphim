import { Tabs, Radio, Space } from 'antd';
import React from 'react';
import moment from 'moment';
import {NavLink} from 'react-router-dom';

const { TabPane } = Tabs;

export default class TabMenu extends React.Component {

    renderHeThongRap = () => {
        return this.props.heThongRapChieu?.map((htr, index) => {
            return <TabPane tab={<div>
                <img src={htr.logo} width={50} height={50} />
            </div>} key={index}>
                {htr.cumRapChieu.map((cumRap, index) => {
                    return <div key={index}>
                        <div className="d-flex flex-row mt-4 ml-2">
                            <div>
                                <img src="https://picsum.photos/50/50" alt="" />
                            </div>
                            <div className="ml-2">
                                <p>{cumRap.tenCumRap}</p>
                            </div>
                        </div>
                        <div className="mt-2">
                            <div className="row">
                                {/* chi hien thi 12 phan tu  */}
                                {cumRap.lichChieuPhim.slice(0,12).map((lichChieu,index)=>{
                                    return <div className="col-3 mt-2" key={index}>
                                        {/* format ngay gio bang thu vien moment */}
                                        <NavLink to ={`/checkout/${lichChieu.maLichChieu}`}>{moment(lichChieu.gioChieuNgayChieu).format('hh:mm A')}</NavLink>
                                    </div>
                                })}
                            </div>
                        </div>  
                    </div>
                })}
            </TabPane>
        })
    }

    render() {
        console.log('props', this.props.heThongRapChieu);
        return (
            <>
                <Tabs tabPosition={'left'}>
                    {this.renderHeThongRap()}

                </Tabs>
            </>
        );
    }
}

// ReactDOM.render(<Demo />, mountNode);