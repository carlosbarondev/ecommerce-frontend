import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { Button, Col, FormControl, FormGroup, FormLabel, FormText, Image, ListGroup, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { normalizeText, normalizeWhiteSpaces } from 'normalize-text';

import { fetchConToken } from '../../../helpers/fetch';
import { imageUpload } from '../../../helpers/imageUpload';
import { SubUpdateModal } from './SubUpdateModal';
import { SubAddModal } from './SubAddModal';


const MyTextInput = ({ label, type, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <FormGroup className="mt-2">
            <FormLabel as="h5" htmlFor={props.id || props.name}>{label}</FormLabel>
            <FormControl as={type} {...field} {...props} />
            {meta.touched && meta.error ? (
                <FormText className='text-danger'>{meta.error}</FormText>
            ) : null}
        </FormGroup>
    );
};

export const CategoryDetail = () => {

    const { CategoriaNombre } = useParams();
    const navigate = useNavigate();

    const [categoria, setCategoria] = useState();
    const [subcategorias, setSubCategorias] = useState();
    const [fileUpload, setFileUpload] = useState();
    const [modalShow, setModalShow] = useState(false);
    const [modalShowAdd, setModalShowAdd] = useState(false);
    const [checking, setChecking] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const resp = await fetchConToken(`categorias/${CategoriaNombre.replace(/-/g, " ")}`);
                const body = await resp.json();
                setCategoria(body.categoria);
                setSubCategorias(body.categoria.subcategorias);
                setChecking(true);
            } catch (error) {
                console.log(error);
                return Swal.fire('Error', error.message, 'error');
            }
        }
        fetchData();
    }, [CategoriaNombre]);

    const handleDelete = async () => {
        if (categoria.desactivar) {
            try {
                if (categoria.estado) {
                    const resp = await fetchConToken(`categorias/${categoria._id}`, {}, 'DELETE');
                    const body = await resp.json();
                    setCategoria(body);
                    window.location.reload();
                } else {
                    const resp = await fetchConToken(`categorias/${categoria._id}`, { estado: true }, 'PUT');
                    const body = await resp.json();
                    setCategoria(body);
                    window.location.reload();
                }
            } catch (error) {
                console.log(error);
                return Swal.fire('Error', error.message, 'error');
            }
        } else {
            Swal.fire('Categoría bloqueada', "El webmaster ha bloqueado esta categoría", 'info');
        }
    }

    const handleSubmit = async (values) => {
        if (categoria.nombre !== values.nombre) {
            const enviar = await fetchConToken(`categorias/${categoria._id}`, {
                oldNombre: categoria.nombre,
                nombre: normalizeWhiteSpaces(values.nombre),
            }, 'PUT');
            const body = await enviar.json();

            if (body.msg) { // Si hay errores
                Swal.fire('Error', body.msg, 'error');
            } else {
                setCategoria(body);
                Swal.fire('Nombre actualizado', "", 'success');
                navigate(`/panel/categorias/${normalizeText(body.nombre.replace(/\s+/g, '-'))}`, { replace: true });
                window.location.reload();
            }
        }
    }

    const handleUploadImage = () => {
        if (fileUpload) {
            imageUpload(fileUpload, categoria._id, "categorias")
                .then((data) => {
                    if (data.msg) {
                        Swal.fire('Error', data.msg, 'error')
                    } else {
                        setCategoria(data);
                        Swal.fire('Imagen actualizada', "", 'success');
                    }
                })
                .catch(error => Swal.fire('Error', error, 'error'));
        }
    }

    const handleSubDelete = async (id, estado, desactivar) => {
        if (desactivar) {
            try {
                if (estado) {
                    const resp = await fetchConToken(`categorias/subcategoria/${id}`, {}, 'DELETE');
                    const body = await resp.json();
                    const newSub = [...subcategorias];
                    newSub[newSub.findIndex(sub => sub._id === body._id)].estado = false;
                    setSubCategorias(newSub);
                    window.location.reload();
                } else {
                    const resp = await fetchConToken(`categorias/subcategoria/${id}`, { estado: true }, 'PUT');
                    const body = await resp.json();
                    const newSub = [...subcategorias];
                    newSub[newSub.findIndex(sub => sub._id === body._id)].estado = true;
                    setSubCategorias(newSub);
                    window.location.reload();
                }
            } catch (error) {
                console.log(error);
                return Swal.fire('Error', error, 'error');
            }
        } else {
            Swal.fire('Subcategoría bloqueada', "El webmaster ha bloqueado esta subcategoría", 'info');
        }
    }

    return (
        checking && <div className="animate__animated animate__fadeIn mt-4 mb-5">
            <Formik
                initialValues={{
                    nombre: categoria.nombre,
                }}
                validationSchema={Yup.object({
                    nombre: Yup.string()
                        .min(2, '2 caracteres como mínimo')
                        .max(23, '23 caracteres como máximo')
                        .required('El nombre es obligatorio'),
                })}
                onSubmit={handleSubmit}
            >
                <Form>
                    <h3 className="mb-3">Editar Categoría</h3>
                    <Row>
                        <Col xs={12} lg={8}>
                            <Row>
                                <Col xs={8} className='mt-auto'>
                                    <MyTextInput
                                        label="Nombre"
                                        name="nombre"
                                    />
                                </Col>
                                <Col xs={4} className='mt-auto'>
                                    <Button type="submit">
                                        Actualizar
                                    </Button>
                                </Col>
                            </Row>
                            <Row className='mb-4 mb-lg-0'>
                                <Col xs={8} className='mt-auto'>
                                    <FormGroup id="fileUpload" controlId="formFile" className="mt-4">
                                        <FormLabel style={{ "marginBottom": "-1px" }}><h5>Imagen</h5></FormLabel>
                                        <FormControl
                                            type="file"
                                            accept="image/*"
                                            onChange={(event) => setFileUpload(event)}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col xs={4} className='mt-auto'>
                                    <Button onClick={() => handleUploadImage()}>
                                        Actualizar
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12} lg={4} className="d-flex justify-content-center align-items-center">
                            <div style={{ "height": "14rem" }}>
                                <Image className="mh-100" src={categoria.img ? categoria.img : "/assets/no-image.png"} />
                            </div>
                        </Col>
                    </Row>
                    <h5 className='mt-4'>Subcategorías</h5>
                    <ListGroup variant="flush">
                        {
                            categoria.subcategorias.length !== 0
                                ? categoria.subcategorias.map(sub =>
                                    <ListGroup.Item key={sub._id}>
                                        <Row className="align-items-center">
                                            <Col xs={5} sm={5} md={4}>
                                                <Link
                                                    className="linkProducto"
                                                    to={`/${normalizeText(categoria.nombre.replace(/\s+/g, "-"))}/${normalizeText(sub.nombre.replace(/\s+/g, "-"))}`}>
                                                    {sub.nombre}
                                                </Link>
                                            </Col>
                                            <Col xs={0} sm={0} md={3} className="disable-card-header">
                                                {
                                                    sub.estado ? <span className="text-success">Activa</span> : <span className="text-danger">Deshabilitada</span>
                                                }
                                            </Col>
                                            <Col xs={7} sm={7} md={5}>
                                                <div className="d-flex">
                                                    <Button
                                                        className="me-1 flex-grow-1"
                                                        variant="outline-primary"
                                                        size="sm"
                                                        onClick={() => setModalShow(sub._id)}
                                                    >
                                                        Editar
                                                    </Button>
                                                    <Button
                                                        className="flex-grow-1"
                                                        variant={sub.estado ? "outline-danger" : "outline-success"}
                                                        size="sm"
                                                        onClick={() => handleSubDelete(sub._id, sub.estado, sub.desactivar)}
                                                    >
                                                        {
                                                            sub.estado ? "Eliminar" : "Habilitar"
                                                        }
                                                    </Button>
                                                </div>
                                            </Col>
                                        </Row>
                                        <SubUpdateModal
                                            subcategoria={sub}
                                            subcategorias={subcategorias}
                                            setSubCategorias={setSubCategorias}
                                            setModalShow={setModalShow}
                                            show={modalShow === sub._id}
                                            onHide={() => setModalShow("")}
                                        />
                                    </ListGroup.Item>
                                )
                                : <ListGroup.Item key={categoria._id}>
                                    No tiene subcategorías
                                </ListGroup.Item>
                        }
                    </ListGroup>
                    <Button className="mt-2 mb-2" onClick={() => setModalShowAdd("openSub")}>
                        Agregar Subcategoría
                    </Button>
                    <h5 className="mt-4 mb-2">Estado: {
                        categoria.estado ? <span className="text-success">Activa</span> : <span className="text-danger">Deshabilitada</span>
                    }</h5>
                    <Button
                        variant={categoria.estado ? "danger" : "success"}
                        onClick={() => handleDelete()}
                    >
                        {
                            categoria.estado ? "Eliminar" : "Activar"
                        }
                    </Button>
                </Form>
            </Formik>
            <SubAddModal
                categoria={categoria}
                setCategoria={setCategoria}
                subcategorias={subcategorias}
                setSubCategorias={setSubCategorias}
                setModalShowAdd={setModalShowAdd}
                show={modalShowAdd === "openSub"}
                onHide={() => setModalShowAdd("")}
            />
        </div>
    );
}