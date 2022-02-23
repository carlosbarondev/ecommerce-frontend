import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { Button, Col, FormControl, FormGroup, FormLabel, FormText, Image, ListGroup, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { normalizeText, normalizeWhiteSpaces } from 'normalize-text';

import { fetchConToken } from '../../../helpers/fetch';
import { imageUpload } from '../../../helpers/imageUpload';
import { CategoriesModal } from './CategoriesModal';


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
                return Swal.fire('Error', error, 'error');
            }
        }
        fetchData();
    }, [CategoriaNombre]);

    const handleDelete = async () => {
        try {
            if (categoria.estado) {
                const resp = await fetchConToken(`categorias/${categoria._id}`, {}, 'DELETE');
                const body = await resp.json();
                setCategoria(body);
                Swal.fire('Categoría deshabilitada', "", 'success');
            } else {
                const resp = await fetchConToken(`categorias/${categoria._id}`, { estado: true }, 'PUT');
                const body = await resp.json();
                setCategoria(body);
                Swal.fire('Categoría habilitada', "", 'success');
            }
        } catch (error) {
            console.log(error);
            return Swal.fire('Error', error, 'error');
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

    const handleSubDelete = async (id, estado) => {
        try {
            if (estado) {
                const resp = await fetchConToken(`categorias/subcategoria/${id}`, {}, 'DELETE');
                const body = await resp.json();
                const newSub = [...subcategorias];
                newSub[newSub.findIndex(sub => sub._id === body._id)].estado = false;
                setSubCategorias(newSub);
                Swal.fire('Subcategoría deshabilitada', "", 'success');
            } else {
                const resp = await fetchConToken(`categorias/subcategoria/${id}`, { estado: true }, 'PUT');
                const body = await resp.json();
                const newSub = [...subcategorias];
                newSub[newSub.findIndex(sub => sub._id === body._id)].estado = true;
                setSubCategorias(newSub);
                Swal.fire('Subcategoría habilitada', "", 'success');
            }
        } catch (error) {
            console.log(error);
            return Swal.fire('Error', error, 'error');
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
                        .max(1000, 'Must be 1000 characters or less')
                        .required('Requerido'),
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
                        <Col xs={12} lg={4} className='centrarImagen'>
                            <div className='text-center'>
                                <Image src={categoria.img ? categoria.img : "/assets/no-image.png"} fluid />
                            </div>
                        </Col>
                    </Row>
                    <h5 className='mt-4'>Subcategorías</h5>
                    <ListGroup variant="flush">
                        {
                            categoria.subcategorias.map(sub =>
                                <ListGroup.Item key={sub._id}>
                                    <Row>
                                        <Col xs={3} sm={3} md={4}>
                                            {sub.nombre}
                                        </Col>
                                        <Col xs={2} sm={2} md={4}>
                                            {
                                                sub.estado ? <span className="text-success">Activa</span> : <span className="text-danger">Deshabilitada</span>
                                            }
                                        </Col>
                                        <Col xs={7} sm={7} md={4}>
                                            <div>
                                                <Button
                                                    className="me-1"
                                                    style={{ "width": "80px" }}
                                                    variant="outline-secondary"
                                                    size="sm"
                                                    onClick={() => setModalShow(sub._id)}
                                                >
                                                    Editar
                                                </Button>
                                                <Button
                                                    style={{ "width": "80px" }}
                                                    variant="outline-secondary"
                                                    size="sm"
                                                    onClick={() => handleSubDelete(sub._id, sub.estado)}
                                                >
                                                    {
                                                        sub.estado ? "Eliminar" : "Habilitar"
                                                    }
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                    <CategoriesModal
                                        subcategoria={sub}
                                        subcategorias={subcategorias}
                                        setSubCategorias={setSubCategorias}
                                        setModalShow={setModalShow}
                                        show={modalShow === sub._id}
                                        onHide={() => setModalShow("")}
                                    />
                                </ListGroup.Item>
                            )
                        }
                    </ListGroup>
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
        </div>
    );
}