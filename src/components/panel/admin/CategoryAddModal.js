import { useState } from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { Button, FormControl, FormGroup, FormLabel, FormText, Modal } from 'react-bootstrap';
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

export const CategoryAddModal = ({ categorias, setCategorias, setModalShow, ...props }) => {

    const [fileUpload, setFileUpload] = useState();

    const handleSubmit = async (values, resetForm) => {

        try {
            const resp = await fetchConToken(`categorias`, {
                nombre: normalizeWhiteSpaces(values.nombre)
            }, 'POST');
            const body = await resp.json();
            if (body.msg) {
                Swal.fire('Error', body.msg, 'error');
            } else {
                const newCat = [...categorias];
                newCat.push(body);
                setCategorias(newCat);
                handleUploadImage(body._id, newCat);
                resetForm();
                setModalShow("");
                window.location.reload();
            }
        } catch (error) {
            console.log(error.message);
            Swal.fire('Error', error.message, 'error');
        }

    }

    const handleUploadImage = (id, newCat) => {
        if (fileUpload) {
            imageUpload(fileUpload, id, "categorias")
                .then((data) => {
                    if (data.msg) {
                        Swal.fire('Error', data.msg, 'error')
                    } else {
                        const newCatImg = [...newCat];
                        newCatImg[newCatImg.findIndex(cat => cat._id === data._id)] = data;
                        setCategorias(newCatImg);
                    }
                })
                .catch(error => Swal.fire('Error', error.message, 'error'));
        }
    }

    return (
        <Formik
            initialValues={{
                nombre: "",
            }}
            validationSchema={Yup.object({
                nombre: Yup.string()
                    .min(2, '2 caracteres como mínimo')
                    .max(23, '23 caracteres como máximo')
                    .required('El nombre es obligatorio'),
            })}
            onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
        >
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Crear Categoría
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <MyTextInput
                            label="Nombre"
                            name="nombre"
                            placeholder="Nombre*"
                        />
                        <FormGroup id="fileUpload" controlId="formFile" className="mt-4">
                            <FormLabel style={{ "marginBottom": "-1px" }}><h5>Imagen</h5></FormLabel>
                            <FormControl
                                type="file"
                                accept="image/*"
                                onChange={(event) => setFileUpload(event)}
                            />
                        </FormGroup>
                        <div className="d-grid mt-4">
                            <Button type="submit">
                                Crear
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