import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { Button, FormControl, FormGroup, FormLabel, FormText } from 'react-bootstrap';
import Swal from 'sweetalert2';

import { fetchConToken } from '../../helpers/fetch';


const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <FormGroup className="mb-2">
            <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
            <FormControl {...field} {...props} />
            {meta.touched && meta.error ? (
                <FormText className='text-danger'>{meta.error}</FormText>
            ) : null}
        </FormGroup>
    );
};

const Formulario = ({ uid, setStep }) => {

    const handleRegister = async ({ nombre, telefono, direccion, poblacion, codigo }) => {

        const newDireccion = { nombre, telefono, direccion, poblacion, codigo };
        const resp = await fetchConToken(`usuarios/direccion/${uid}`, newDireccion, 'POST');
        const body = await resp.json();

        if (body.msg) { // Si hay errores
            Swal.fire('Error', body.msg, 'error');
        } else {
            setStep(3);
        }

    }

    return (
        <div className='auth-main'>
            <Formik
                initialValues={{
                    nombre: '',
                    telefono: '',
                    direccion: '',
                    poblacion: '',
                    codigo: '',
                }}
                validationSchema={Yup.object({
                    nombre: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Requerido'),
                    telefono: Yup.number()
                        .test('len', 'El teléfono debe tener 9 números', val => val && val.toString().length === 9)
                        .required('Requerido'),
                    direccion: Yup.string()
                        .required('Requerido'),
                    poblacion: Yup.string()
                        .max(20, 'Must be 20 characters or less')
                        .required('Requerido'),
                    codigo: Yup.number()
                        .test('len', 'El código debe tener 5 números', val => val && val.toString().length === 5)
                        .required('Requerido'),
                })}
                onSubmit={handleRegister}
            >
                <Form className="checkbox-address-container d-grid gap-2 border rounded">

                    <h1>Añadir dirección de envío</h1>
                    <h3>Datos personales</h3>
                    <MyTextInput
                        label="Nombre"
                        name="nombre"
                        type="text"
                        placeholder="Nombre*"
                    />

                    <MyTextInput
                        label="Teléfono"
                        name="telefono"
                        type="number"
                        placeholder="Teléfono*"
                    />

                    <h3>Dirección de envío</h3>
                    <MyTextInput
                        label="Dirección"
                        name="direccion"
                        type="text"
                        placeholder="Dirección*"
                    />

                    <MyTextInput
                        label="Población"
                        name="poblacion"
                        type="text"
                        placeholder="Población*"
                    />

                    <MyTextInput
                        label="Código postal"
                        name="codigo"
                        type="number"
                        placeholder="Código postal*"
                    />

                    <Button type="submit" variant="primary" size="lg">Guardar dirección</Button>

                </Form>
            </Formik>
        </div>
    );
}

export const ShippingAddress = ({ setStep }) => {

    const { uid } = useSelector(state => state.auth);
    const [body, setBody] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const resp = await fetchConToken(`usuarios/direccion/${uid}`);
            const { direccion } = await resp.json();
            setBody(direccion);
        }
        fetchData();
    }, [uid]);

    return (
        <>
            {
                (body.length === 0 &&
                    <Formulario uid={uid} setStep={setStep} />)
                || (body.length > 0 &&
                    body.map(address => (
                        <h5 key={address._id} >{address.direccion}</h5>
                    ))
                )
            }
        </>
    );
};