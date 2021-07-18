import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { HIDE_MODAL } from '../../action/types/FilmType';
import './styleModal.css';




export default function ModalAdminPage(props) {

    const dispatch = useDispatch();
    const { show } = useSelector(state => state.UserReducer);
    const handleClose = () => {
        dispatch({ type: HIDE_MODAL })
    };


    return (
        <Modal show={show} dialogClassName="modal-admin-success" onHide={handleClose} centered>
            <Modal.Body>
                <p>Thành công !</p>
                <div className="img-successful">
                    <img className="w-100" src="/img/img-tich-xanh-3.png" alt="movie" />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="info" onClick={handleClose}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
