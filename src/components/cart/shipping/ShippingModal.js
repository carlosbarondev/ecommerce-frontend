import { Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { ShippingForm } from './ShippingForm';
import { ShippingFormBilling } from './ShippingFormBilling';


export const ShippingModal = (props) => {
    console.log('ShippingModal');

    const { elegirShippingModal } = useSelector(state => state.ui);

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
                {
                    elegirShippingModal
                        ? <ShippingForm />
                        : <ShippingFormBilling />
                }
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    );
}