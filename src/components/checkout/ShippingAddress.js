import { useDispatch } from 'react-redux';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { Button, FormControl, FormGroup, FormLabel, FormText } from 'react-bootstrap';

import { startRegister } from '../../actions/auth';


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


export const ShippingAddress = () => {

    const dispatch = useDispatch();

    const handleRegister = ({ nombre, telefono, direccion, poblacion, codigo }) => {
        //dispatch(startRegister(nombre, telefono, direccion, poblacion, codigo));
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
                        .required('Required'),
                    telefono: Yup.number()
                        .max(20, 'Must be 20 characters or less')
                        .required('Required'),
                    direccion: Yup.string()
                        .required('Required'),
                    poblacion: Yup.string()
                        .max(20, 'Must be 20 characters or less')
                        .required('Required'),
                    codigo: Yup.number()
                        .max(20, 'Must be 20 characters or less')
                        .required('Required'),
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
                        placeholder="¿Cuál es tu nombre?"
                    />

                    <MyTextInput
                        label="Teléfono"
                        name="telefono"
                        type="number"
                        placeholder="Teléfono"
                    />

                    <h3>Dirección de envío</h3>
                    <MyTextInput
                        label="Dirección"
                        name="direccion"
                        type="text"
                        placeholder="Dirección"
                    />

                    <MyTextInput
                        label="Población"
                        name="poblacion"
                        type="text"
                        placeholder="Población"
                    />

                    <MyTextInput
                        label="Código postal"
                        name="codigo"
                        type="number"
                        placeholder="Código postal"
                    />

                    <Button type="submit" variant="primary" size="lg">Guardar dirección</Button>

                </Form>
            </Formik>
        </div>
    );
};