import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Card, Row } from "react-bootstrap";
import Swal from "sweetalert2";

import { fetchConToken } from "../../helpers/fetch";


export const Wishes = () => {

    const navigate = useNavigate();

    const { uid } = useSelector(state => state.auth);

    const [deseos, setDeseos] = useState();
    const [checking, setChecking] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const resp = await fetchConToken(`usuarios/deseos/${uid}`);
                const body = await resp.json();
                if (body.msg) {
                    return Swal.fire('Error', body.msg, 'error');
                } else {
                    setDeseos(body.productos);
                    setChecking(true);
                }
            } catch (error) {
                console.log(error);
                return Swal.fire('Error', error, 'error');
            }
        }
        fetchData();
    }, [checking, uid]);

    const handleDelete = async (idDeseo) => {
        try {
            const resp = await fetchConToken(`usuarios/deseos/${uid}`, { idDeseo }, 'DELETE');
            const body = await resp.json();
            if (body.msg) {
                return Swal.fire('Error', body.msg, 'error');
            } else {
                setChecking(false);
            }
        } catch (error) {
            console.log(error);
            return Swal.fire('Error', error, 'error');
        }
    }

    return (
        checking && <div className="mt-4">
            <h3>Lista de deseos</h3>
            {
                deseos.length === 0
                    ? <div className="centrar">
                        <b>No hay productos disponibles para valorar</b>
                        <div>De momento no tienes ningún producto por</div>
                        <div>valorar, pero te animamos a ver nuestro</div>
                        <div>catálogo de productos y valorar después de tu</div>
                        <div>compra.</div>
                        <Button className="mt-3" variant="warning" onClick={() => navigate(`/`)}>Ver el catálogo</Button>
                    </div>
                    : <Row xs={1} md={4} className="g-4">
                        {
                            deseos.map(wish => (
                                <Card key={wish._id}>
                                    <Card.Img variant="top" src={wish.img} />
                                    <Card.Body>
                                        <Card.Title>{wish.nombre}</Card.Title>
                                        <Card.Text>{wish.descripcion}</Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <small className="text-muted">{wish.precio}</small>
                                    </Card.Footer>
                                    <Button onClick={() => handleDelete(wish._id)}>Eliminar</Button>
                                </Card>
                            ))
                        }
                    </Row>
            }
        </div>
    )
};