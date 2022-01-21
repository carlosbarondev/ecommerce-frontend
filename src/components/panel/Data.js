import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Col, ListGroup, Row } from "react-bootstrap";
import Swal from "sweetalert2";

import { fetchConToken } from "../../helpers/fetch";


export const Data = () => {

    const navigate = useNavigate();

    const { uid } = useSelector(state => state.auth);

    const [total, setTotal] = useState();
    const [checking, setChecking] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const resp = await fetchConToken(`pedidos/${uid}`);
                const body = await resp.json();
                if (body.msg) {
                    Swal.fire('Error', body.msg, 'error');
                } else {
                    setTotal(body.total);
                    setChecking(true);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [uid]);

    return (
        checking && <>
            <h3>Mis Datos</h3>
            <div className="centrar">
                <div className="list-group">
                    <button className="list-group-item list-group-item-action border-0 listaFondo" onClick={() => navigate("/panel/pedidos")}>
                        <h5>PEDIDOS</h5>
                        <div className="fs-1 text-center">{total}</div>
                    </button>
                </div>
            </div>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <h5>Datos de mi cuenta</h5>
                    <Row>
                        <Col md={4}>

                        </Col>
                        <Col md={4}>

                        </Col>
                        <Col md={4}>

                        </Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <h5>Contraseña</h5>
                </ListGroup.Item>
                <ListGroup.Item>
                    <h5>Dirección de envío</h5>
                </ListGroup.Item>
                <ListGroup.Item>
                    <h5>Datos de facturación</h5>
                </ListGroup.Item>
            </ListGroup>
        </>
    )
};
