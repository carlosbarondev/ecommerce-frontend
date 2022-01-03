import { Button, Modal } from 'react-bootstrap';

import { ShippingForm } from './ShippingForm';


export const ShippingModal = ({ uid, setdireccion, direccionesenvio, setdireccionesenvio, ...props }) => {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ShippingForm uid={uid} setdireccion={setdireccion} direccionesenvio={direccionesenvio} setdireccionesenvio={setdireccionesenvio} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}