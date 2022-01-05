import { useSelector } from 'react-redux';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { Button, FormControl, FormGroup, FormLabel, FormText, Form as FormRB } from 'react-bootstrap';
import Swal from 'sweetalert2';

import { fetchConToken } from '../../../helpers/fetch';


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

export const ShippingForm = () => {

    const { uid } = useSelector(state => state.auth);

    const handleRegister = async ({ direccion, nombre, telefono }) => {

        const newEnvio = { direccion, nombre, telefono };
        const resp = await fetchConToken(`usuarios/envio/${uid}`, newEnvio, 'POST');
        const body = await resp.json();

        if (body.msg) { // Si hay errores

            Swal.fire('Error', body.msg, 'error');

        } else {

            const id = document.querySelector("input[name=checkbox2]:checked").id;

            if (id) {

                const resp = await fetchConToken(`usuarios/facturacion/${uid}`, direccion, 'POST');
                const body = await resp.json();

                if (body.msg) { // Si hay errores
                    Swal.fire('Error', body.msg, 'error');
                }

            }

        }

    }

    return (
        <div className='auth-main'>
            <Formik
                initialValues={{
                    direccion: {
                        poblacion: '',
                        pais: '',
                        calle: '',
                        numero: '',
                        codigo: '',
                        provincia: ''
                    },
                    nombre: '',
                    telefono: '',
                }}
                validationSchema={Yup.object({
                    nombre: Yup.string()
                        .required('Requerido'),
                    telefono: Yup.number()
                        .test('len', 'El teléfono debe tener 9 números', val => val && val.toString().length === 9)
                        .required('Requerido'),
                    direccion: Yup.object({
                        poblacion: Yup.string()
                            .required('Requerido'),
                        pais: Yup.string()
                            .required('Requerido'),
                        calle: Yup.string()
                            .required('Requerido'),
                        numero: Yup.string()
                            .required('Requerido'),
                        codigo: Yup.number()
                            .test('len', 'El código debe tener 5 números', val => val && val.toString().length === 5)
                            .required('Requerido'),
                        provincia: Yup.string()
                            .required('Requerido'),
                    })
                })}
                onSubmit={handleRegister}
            >
                <Form className="checkbox-address-container d-grid gap-2 border rounded">

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
                        name="direccion.calle"
                        type="text"
                        placeholder="Dirección*"
                    />

                    <MyTextInput
                        label="Información opcional"
                        name="direccion.numero"
                        type="text"
                        placeholder="Información opcional*"
                    />

                    <MyTextInput
                        label="País"
                        name="direccion.pais"
                        type="text"
                        placeholder="País*"
                    />

                    <MyTextInput
                        label="Código postal"
                        name="direccion.codigo"
                        type="number"
                        placeholder="Código postal*"
                    />

                    <MyTextInput
                        label="Población"
                        name="direccion.poblacion"
                        type="text"
                        placeholder="Población*"
                    />

                    <MyTextInput
                        label="Provincia"
                        name="direccion.provincia"
                        type="text"
                        placeholder="Provincia*"
                    />

                    <div key="checkbox-default" className="mb-3">
                        <FormRB.Check
                            type="checkbox"
                            id="checkbox1"
                            name="checkbox1"
                            label="Establecer esta dirección como predeterminada (para futuras compras)"
                        />
                        <FormRB.Check
                            type="checkbox"
                            id="checkbox2"
                            name="checkbox2"
                            label="Usar mismos datos de envío para la facturación"
                        />
                    </div>

                    <Button type="submit" variant="primary" size="lg">Guardar dirección</Button>

                </Form>
            </Formik>
        </div >
    );
}