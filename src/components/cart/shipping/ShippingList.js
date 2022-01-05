import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Row, Col } from 'react-bootstrap';

import { stepChange } from '../../../actions/ui';
import { ShippingModal } from './ShippingModal';
import { fetchConToken } from '../../../helpers/fetch';


export const ShippingList = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [modalShow, setModalShow] = useState(false);

    const { uid } = useSelector(state => state.auth);
    const [direccionesEnvio, setDireccionesEnvio] = useState([]);
    const [facturacion, setFacturacion] = useState({});
    const [checking, setChecking] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const resp = await fetchConToken(`usuarios/envio/${uid}`);
            const { envio } = await resp.json();
            setDireccionesEnvio(envio);
            const resp2 = await fetchConToken(`usuarios/facturacion/${uid}`);
            const { facturacion } = await resp2.json();
            setFacturacion(facturacion);
            setChecking(true);
        }
        fetchData();
    }, [uid]);

    const handleSave = () => {
        const id = document.querySelector("input[name=check]:checked").id;
        const direccion = direccionesEnvio.find(element => element._id === id);
        dispatch(stepChange(3));

        navigate("/cart/payment", {
            state: {
                direccion: direccion,
                facturacion: facturacion
            }
        });
    }

    return (
        <>
            {
                checking &&
                <Form>
                    <fieldset>
                        <Form.Group as={Row} className="mb-3">
                            <Col sm={10}>
                                <h3>Direcciones de envío</h3>
                                {
                                    direccionesEnvio.map(direccion => (
                                        <Form.Check
                                            type="radio"
                                            label={direccion.direccion.poblacion}
                                            name="check"
                                            id={direccion._id}
                                            key={direccion._id}
                                        />
                                    ))
                                }
                                <Button variant="primary" onClick={() => setModalShow(true)}>
                                    Añadir otra dirección
                                </Button>
                            </Col>
                        </Form.Group>
                    </fieldset>
                    <fieldset>
                        <Form.Group as={Row} className="mb-3">
                            <Col sm={10}>
                                <h3>Direccion de facturación</h3>
                                {
                                    (facturacion)
                                        ?
                                        <Form.Check
                                            type="radio"
                                            label={facturacion.poblacion}
                                            name="check_fact"
                                            id={facturacion._id}
                                            key={facturacion._id}
                                        />
                                        :
                                        <Button variant="primary" onClick={() => setModalShow(true)}>
                                            Añadir otra dirección
                                        </Button>
                                }
                            </Col>
                        </Form.Group>
                    </fieldset>
                    <Form.Group as={Row} className="mb-3">
                        <Col sm={10}>
                            <Button onClick={handleSave}>Guardar y continuar</Button>
                        </Col>
                    </Form.Group>
                    <ShippingModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                </Form>
            }
        </>
    );
}