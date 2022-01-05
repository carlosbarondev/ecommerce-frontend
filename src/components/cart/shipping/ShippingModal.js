import { Button, Modal } from 'react-bootstrap';

import { ShippingForm } from './ShippingForm';


export const ShippingModal = ({ uid, setdireccion, direccionesenvio, setdireccionesenvio, facturacion, setfacturacion, ...props }) => {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Añadir dirección de envío
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ShippingForm
                    uid={uid}
                    setdireccion={setdireccion}
                    direccionesenvio={direccionesenvio}
                    setdireccionesenvio={setdireccionesenvio}
                    facturacion={facturacion}
                    setfacturacion={setfacturacion}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    );
}