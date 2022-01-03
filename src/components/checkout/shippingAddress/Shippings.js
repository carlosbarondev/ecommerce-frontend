import { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { uiChange } from '../../../actions/ui';
import { ShippingModal } from './ShippingModal';


export const Shippings = ({ uid, setdireccion, direccionesenvio, setdireccionesenvio }) => {

    const dispatch = useDispatch();
    const [modalShow, setModalShow] = useState(false);

    const handleSave = () => {
        const id = document.querySelector("input[name=check]:checked").id;
        const direccion = direccionesenvio.find(element => element._id === id);
        setdireccion(direccion);
        localStorage.setItem('step', 3);
        dispatch(uiChange(3));
    }

    return (
        <>
            <Form>
                <fieldset>
                    <Form.Group as={Row} className="mb-3">
                        <Col sm={10}>
                            <h3>Direcciones de envío</h3>
                            {
                                direccionesenvio.map(direccion => (
                                    <Form.Check
                                        type="radio"
                                        label={direccion.nombre}
                                        name="check"
                                        id={direccion._id}
                                        key={direccion._id}
                                        checked
                                    />
                                ))
                            }
                            <Button variant="primary" onClick={() => setModalShow(true)}>
                                Añadir otra dirección
                            </Button>
                        </Col>
                    </Form.Group>
                </fieldset>
                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 10, offset: 2 }}>
                        <Button onClick={handleSave}>Guardar y continuar</Button>
                    </Col>
                </Form.Group>
            </Form>
            <ShippingModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                uid={uid}
                setdireccion={setdireccion}
                direccionesenvio={direccionesenvio}
                setdireccionesenvio={setdireccionesenvio}
            />
        </>
    );
}