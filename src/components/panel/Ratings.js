import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Image, Row, Tab, Tabs } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import Swal from "sweetalert2";

import { fetchConToken } from "../../helpers/fetch";
import { SummaryModal } from "../cart/summary/SummaryModal";
import { CSSTransition, TransitionGroup } from "react-transition-group";


export const Ratings = () => {

    const navigate = useNavigate();

    const { uid } = useSelector(state => state.auth);

    const [valorados, setValorados] = useState();
    const [noValorados, setNovalorados] = useState();
    const [checking, setChecking] = useState(false);
    const [modalShowValorados, setModalShowValorados] = useState(false);
    const [modalShowNoValorados, setModalShowNoValorados] = useState(false);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    useEffect(() => {
        async function fetchData() {
            try {
                const resp = await fetchConToken(`productos/valoraciones/${uid}`);
                const body = await resp.json();
                if (body.msg) {
                    return Swal.fire('Error', body.msg, 'error');
                } else {
                    setValorados(body.valorados);
                    setNovalorados(body.noValorados);
                    setChecking(true);
                }
            } catch (error) {
                console.log(error);
                return Swal.fire('Error', error, 'error');
            }
        }
        fetchData();
    }, [modalShowValorados, modalShowNoValorados, uid]);

    const handleDelete = (idProducto, idComentario) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Eliminado',
                    'El comentario ha sido eliminado',
                    'success'
                )
                async function fetchData() {
                    try {
                        const resp = await fetchConToken(`productos/valoraciones/${uid}`, { idProducto, idComentario }, 'DELETE');
                        const body = await resp.json();
                        if (body.msg) {
                            return Swal.fire('Error', body.msg, 'error');
                        }
                    } catch (error) {
                        console.log(error);
                        return Swal.fire('Error', error, 'error');
                    }
                }
                fetchData();
                setModalShowNoValorados(!modalShowNoValorados);
            }
        })
    }

    return (
        checking && <div className="mt-4">
            {
                console.log("noValorados", noValorados)
            }
            {
                console.log("valorados", valorados)
            }
            <h3 className="mb-4">Mis Valoraciones</h3>
            <Tabs defaultActiveKey="sinvalorar" id="uncontrolled-tab" className="mb-5">
                <Tab eventKey="sinvalorar" title={`Sin valorar (${noValorados.length})`}>
                    {
                        noValorados.length <= 0
                            ? <div className="centrar">
                                <b>No hay productos disponibles para valorar</b>
                                <div>De momento no tienes ningún producto por</div>
                                <div>valorar, pero te animamos a ver nuestro</div>
                                <div>catálogo de productos y valorar después de tu</div>
                                <div>compra.</div>
                                <Button className="mt-3" variant="warning" onClick={() => navigate(`/`)}>Ver el catálogo</Button>
                            </div>
                            : <TransitionGroup className="todo-list">
                                {
                                    noValorados.map(op => (
                                        <CSSTransition
                                            key={op._id}
                                            timeout={500}
                                            classNames="item"
                                        >
                                            <Row className="mt-4">
                                                <Col xs={1} sm={1} md={1}>
                                                </Col>
                                                <Col xs={3} sm={3} md={2}>
                                                    <Image src={op.img} fluid="true" />
                                                </Col>
                                                <Col xs={8} sm={8} md={9} className="d-flex flex-column align-self-center">
                                                    <Link className="linkProducto mb-1" style={{ "fontSize": "20px" }} to={`/${op.categoria.nombre}/${op.subcategoria.nombre}/${op.nombre.replace(/\s+/g, "-")}`}>{op.nombre}</Link>
                                                    <span>
                                                        <Rating
                                                            className="me-2"
                                                            style={{ "pointerEvents": "none" }}
                                                            size={20}
                                                            ratingValue={op.rating}
                                                            allowHover={false}
                                                        />
                                                        {` ${op.opinion.length} Valoraciones`}
                                                    </span>
                                                    <div>
                                                        <Button
                                                            className="mt-3"
                                                            variant="outline-secondary"
                                                            size="sm"
                                                            onClick={() => setModalShowNoValorados(op._id)}
                                                        >
                                                            Escribir una opinión sobre el producto
                                                        </Button>
                                                    </div>
                                                </Col>
                                                <hr className="mt-5" />
                                                <SummaryModal
                                                    id={op._id}
                                                    setModalShow={setModalShowNoValorados}
                                                    show={modalShowNoValorados === op._id}
                                                    onHide={() => setModalShowNoValorados("")}
                                                />
                                            </Row>
                                        </CSSTransition>
                                    ))
                                }
                            </TransitionGroup>
                    }
                </Tab>
                <Tab eventKey="valorados" title={`Valorados (${valorados.length})`}>
                    {
                        valorados.length <= 0
                            ? <div className="centrar">
                                <b>No hay productos valorados</b>
                                <div>No has valorado ningún producto, pero</div>
                                <div>puedes visitar cualquier producto y dejar tu</div>
                                <div>valoración para ayudar al resto de usuarios.</div>
                                <Button className="mt-3" variant="warning" onClick={() => navigate(`/`)}>Ver el catálogo</Button>
                            </div>
                            : <TransitionGroup className="todo-list">
                                {
                                    valorados.map(op => (
                                        <CSSTransition
                                            key={op.opinion[0]._id}
                                            timeout={500}
                                            classNames="item"
                                        >
                                            <Row className="mt-4 d-flex align-items-center">
                                                <Col xs={1} sm={1} md={1}>
                                                </Col>
                                                <Col xs={3} sm={3} md={2}>
                                                    <Image src={op.img} fluid="true" />
                                                </Col>
                                                <Col xs={8} sm={8} md={3}>
                                                    <Link className="linkProducto" style={{ "fontSize": "20px" }} to={`/${op.categoria.nombre}/${op.subcategoria.nombre}/${op.nombre.replace(/\s+/g, "-")}`}>{op.nombre}</Link>
                                                    <Button
                                                        className="mt-2"
                                                        variant="outline-secondary"
                                                        size="sm"
                                                        onClick={() => setModalShowValorados(op._id)}
                                                    >
                                                        Editar opinión del producto
                                                    </Button>
                                                    <Button
                                                        className="mt-3"
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => handleDelete(op._id, op.opinion[0]._id)}
                                                    >
                                                        Eliminar opinión
                                                    </Button>
                                                </Col>
                                                <Col xs={12} sm={12} md={6} className="mt-3">
                                                    <div className="comentarios">
                                                        <Rating
                                                            style={{ "pointerEvents": "none", "marginRight": "8px" }}
                                                            size={20}
                                                            ratingValue={op.opinion[0].rating}
                                                            allowHover={false}
                                                        />
                                                        <div style={{ "fontSize": "18px" }}>{`${op.opinion[0].titulo}`}</div>
                                                    </div>
                                                    <div style={{ "fontSize": "14px" }}>{`${new Date(op.opinion[0].fecha).toLocaleDateString("es-ES", options)}`}</div>
                                                    <div className="mt-3">{`${op.opinion[0].comentario}`}</div>
                                                </Col>
                                                <hr className="mt-5" />
                                                <SummaryModal
                                                    id={op._id}
                                                    setModalShow={setModalShowValorados}
                                                    show={modalShowValorados === op._id}
                                                    onHide={() => setModalShowValorados("")}
                                                    oldTitulo={op.opinion[0]?.titulo || null}
                                                    oldComentario={op.opinion[0]?.comentario || null}
                                                    oldRating={op.opinion[0]?.rating || null}
                                                />
                                            </Row>
                                        </CSSTransition>
                                    ))
                                }
                            </TransitionGroup>
                    }
                </Tab>
            </Tabs>
        </div>
    );
};