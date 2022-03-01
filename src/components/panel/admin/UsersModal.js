import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { Button, FormControl, FormGroup, FormLabel, FormText, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { normalizeWhiteSpaces } from 'normalize-text';

import { fetchConToken } from '../../../helpers/fetch';


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

export const UsersModal = ({ id, correo, nombre, usuarios, setUsuarios, setModalShow, ...props }) => {

    const handleSubmit = async (values) => {

        const enviar = await fetchConToken(`usuarios/${id}`, {
            oldCorreo: correo,
            correo: values.correo,
            nombre: normalizeWhiteSpaces(values.nombre),
        }, 'PUT');
        const bodyEnviar = await enviar.json();

        if (bodyEnviar.msg) { // Si hay errores
            Swal.fire('Error', bodyEnviar.msg, 'error');
        } else {
            const newUsuarios = [...usuarios];
            newUsuarios[usuarios.findIndex(user => user._id === id)] = bodyEnviar;
            setUsuarios(newUsuarios);
            setModalShow("");
        }

    }

    return (
        <Formik
            initialValues={{
                correo: correo,
                nombre: nombre,
            }}
            validationSchema={Yup.object({
                correo: Yup.string()
                    .email('El email es inválido')
                    .required('Requerido'),
                nombre: Yup.string()
                    .min(2, '2 caracteres como mínimo')
                    .max(20, '20 caracteres como máximo')
                    .required('Requerido'),
            })}
            onSubmit={handleSubmit}
        >
            <Modal
                {...props}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Editar usuario
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <MyTextInput
                            label="Correo"
                            name="correo"
                        />
                        <MyTextInput
                            label="Nombre"
                            name="nombre"
                        />
                        <div className="d-grid">
                            <Button className="mt-4" type="submit" variant="primary" size="lg">Actualizar</Button>
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