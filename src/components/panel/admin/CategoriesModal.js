import { useState } from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { Button, Col, FormControl, FormGroup, FormLabel, FormText, Image, Modal, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { normalizeWhiteSpaces } from 'normalize-text';

import { fetchConToken } from '../../../helpers/fetch';
import { imageUpload } from '../../../helpers/imageUpload';


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

export const CategoriesModal = ({ subcategoria, subcategorias, setSubCategorias, setModalShow, ...props }) => {

    const [fileUpload, setFileUpload] = useState();

    const handleSubmit = async (values) => {

        if (subcategoria.nombre !== values.nombre) {
            const enviar = await fetchConToken(`categorias/subcategoria/${subcategoria._id}`, {
                oldNombre: subcategoria.nombre,
                nombre: normalizeWhiteSpaces(values.nombre),
            }, 'PUT');
            const bodyEnviar = await enviar.json();

            if (bodyEnviar.msg) { // Si hay errores
                Swal.fire('Error', bodyEnviar.msg, 'error');
            } else {
                const newSub = [...subcategorias];
                newSub[newSub.findIndex(sub => sub._id === bodyEnviar._id)].nombre = bodyEnviar.nombre;
                setSubCategorias(newSub);
            }
        }

        handleUploadImage();

        setModalShow("");

    }

    const handleUploadImage = () => {
        if (fileUpload) {
            imageUpload(fileUpload, subcategoria._id, "subcategorias")
                .then((data) => {
                    if (data.msg) {
                        Swal.fire('Error', data.msg, 'error')
                    } else {
                        const newSub = [...subcategorias];
                        newSub[newSub.findIndex(sub => sub._id === data._id)].img = data.img;
                        setSubCategorias(newSub);
                    }
                })
                .catch(error => Swal.fire('Error', error, 'error'));
        }
    }

    return (
        <Formik
            initialValues={{
                nombre: subcategoria.nombre,
            }}
            validationSchema={Yup.object({
                nombre: Yup.string()
                    .max(1000, 'Must be 1000 characters or less')
                    .required('Requerido'),
            })}
            onSubmit={handleSubmit}
        >
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Editar Subcategoría
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col xs={12} lg={8}>
                                <MyTextInput
                                    label="Nombre"
                                    name="nombre"
                                />
                                <FormGroup id="fileUpload" controlId="formFile" className="mt-4">
                                    <FormLabel style={{ "marginBottom": "-1px" }}><h5>Imagen</h5></FormLabel>
                                    <FormControl
                                        type="file"
                                        accept="image/*"
                                        onChange={(event) => setFileUpload(event)}
                                    />
                                </FormGroup>
                            </Col>
                            <Col xs={12} lg={4} className='centrarImagen'>
                                <div className='text-center'>
                                    <Image src={subcategoria.img ? subcategoria.img : "/assets/no-image.png"} fluid />
                                </div>
                            </Col>
                        </Row>
                        <div className="d-grid mt-4">
                            <Button type="submit">
                                Actualizar
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        </Formik>
    );
}