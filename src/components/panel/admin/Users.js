import { useEffect, useState } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import Swal from "sweetalert2";

import { fetchConToken } from "../../../helpers/fetch";
import { UsersModal } from "./UsersModal";


export const Users = () => {

    const [usuarios, setUsuarios] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [checking, setChecking] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const resp = await fetchConToken(`usuarios`);
                const body = await resp.json();
                setUsuarios(body.usuarios);
                setChecking(true);
            } catch (error) {
                console.log(error.message);
                return Swal.fire('Error', error.message, 'error');
            }
        }
        fetchData();
    }, []);

    const handleDelete = async (id, estado, desactivar) => {
        if (desactivar) {
            try {
                if (estado) {
                    const resp = await fetchConToken(`usuarios/${id}`, {}, 'DELETE');
                    const body = await resp.json();
                    const newUsuarios = [...usuarios];
                    newUsuarios[usuarios.findIndex(user => user._id === body.usuario._id)].estado = false;
                    setUsuarios(newUsuarios);
                    Swal.fire('Usuario deshabilitado', "", 'success');
                } else {
                    const resp = await fetchConToken(`usuarios/${id}`, { estado: true }, 'PUT');
                    const body = await resp.json();
                    const newUsuarios = [...usuarios];
                    newUsuarios[usuarios.findIndex(user => user._id === body._id)].estado = true;
                    setUsuarios(newUsuarios);
                    Swal.fire('Usuario habilitado', "", 'success');
                }
            } catch (error) {
                console.log(error.message);
                return Swal.fire('Error', error.message, 'error');
            }
        } else {
            Swal.fire('Usuario bloqueado', "El webmaster ha bloqueado este usuario", 'info');
        }
    }

    return (
        checking && <div className="animate__animated animate__fadeIn mt-4 mb-5">
            <h3>Gestión de Usuarios</h3>
            <Card className="mt-4">
                <Card.Header>
                    <Row className="align-items-center">
                        <Col xs={6} sm={5} md={3}>
                            Correo
                        </Col>
                        <Col xs={0} sm={3} md={3} className="disable-card-header2">
                            Nombre
                        </Col>
                        <Col xs={0} sm={0} md={3} className="disable-card-header">
                            Estado
                        </Col>
                        <Col xs={6} sm={4} md={3}>
                        </Col>
                    </Row>
                </Card.Header>
                <ListGroup variant="flush">
                    {
                        usuarios.map(user =>
                            <ListGroup.Item key={user._id}>
                                <Row className="align-items-center">
                                    <Col xs={6} sm={5} md={3}>
                                        {user.correo}
                                    </Col>
                                    <Col xs={0} sm={3} md={3} className="disable-card-header2">
                                        {user.nombre}
                                    </Col>
                                    <Col xs={0} sm={0} md={3} className="disable-card-header">
                                        {
                                            user.estado ? <span className="text-success">Activo</span> : <span className="text-danger">Deshabilitado</span>
                                        }
                                    </Col>
                                    <Col xs={6} sm={4} md={3}>
                                        <div className="d-flex">
                                            <Button
                                                className="me-1 flex-grow-1"
                                                variant="outline-primary"
                                                size="sm"
                                                onClick={() => setModalShow(user._id)}
                                            >
                                                Editar
                                            </Button>
                                            <Button
                                                className="flex-grow-1"
                                                variant={user.estado ? "outline-danger" : "outline-success"}
                                                size="sm"
                                                onClick={() => handleDelete(user._id, user.estado, user.desactivar)}
                                            >
                                                {
                                                    user.estado ? "Eliminar" : "Habilitar"
                                                }
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                                <UsersModal
                                    id={user._id}
                                    correo={user.correo}
                                    nombre={user.nombre}
                                    usuarios={usuarios}
                                    setUsuarios={setUsuarios}
                                    setModalShow={setModalShow}
                                    show={modalShow === user._id}
                                    onHide={() => setModalShow("")}
                                />
                            </ListGroup.Item>
                        )
                    }
                </ListGroup>
            </Card>
        </div>
    )
}