// MODAL GLOBAL
import React,{useState} from 'react';
import { Modal } from 'antd';

export default function Modal(props) {
    
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handelClickButton = () => {
        setIsVideoPlaying(true)
        setIsModalVisible(true)
    }

    const handelResetTrailer = () => {
        setIsVideoPlaying(false)
    }
    
    const handleOk = () => {
        setIsModalVisible(false)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }
    
    return (
        <div className="modalMovie">
            {isVideoPlaying && <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} afterClose={handelResetTrailer}>
                {
                    <iframe style={{ width: '100%', height: '525px' }} src="" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                }
            </Modal>}
        </div>
    )
}
