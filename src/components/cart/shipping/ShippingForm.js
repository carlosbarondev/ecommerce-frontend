import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { Button, FormControl, FormGroup, FormLabel, FormText, Form as FormRB } from 'react-bootstrap';
import Swal from 'sweetalert2';

import { fetchConToken } from '../../../helpers/fetch';
import { shippingModalChange } from '../../../actions/ui';
import { shippingSetActive, shippingSetDefault, shippingStartAddBilling, shippingStartAddNew, shippingStartSort, shippingStartUpdate } from '../../../actions/shipping';


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
    console.log('ShippingForm');

    const dispatch = useDispatch();

    const { uid } = useSelector(state => state.auth);
    const { activo } = useSelector(state => state.shipping);

    const handleRegister = async ({ direccion, nombre, telefono }) => {

        let newEnvio;
        let body;
        let predeterminado;

        if (!activo) {
            newEnvio = { direccion, nombre, telefono };
            await dispatch(shippingStartAddNew(newEnvio)).then((result) => {
                predeterminado = result;
                console.log("aqui: ", predeterminado);
            });
            console.log("fuera: ", predeterminado);
        } else {
            const { _id } = activo;
            newEnvio = { _id, direccion, nombre, telefono };
            dispatch(shippingStartUpdate(newEnvio));
            predeterminado = _id;
        }

        if (document.querySelector("input[name=checkbox1]:checked")) { // Marcar dirección de envío como predeterminada
            console.log("pred:", predeterminado);

            dispatch(shippingSetDefault(predeterminado));
            newEnvio = { predeterminado }
            const resp = await fetchConToken(`usuarios/${uid}`, newEnvio, 'PUT');
            body = await resp.json();
            if (body.msg) { // Si hay errores
                console.log('Hola Mundo');
                Swal.fire('Error', body.msg, 'error');
            } else {
                const enviar = body.envio.find(element => element._id === predeterminado);
                dispatch(shippingStartUpdate(enviar));
                dispatch(shippingStartSort());
            }
        }

        const id = document.querySelector("input[name=checkbox2]:checked")?.id; // Dirección de facturación igual a la dirección de envío
        if (id) {
            dispatch(shippingStartAddBilling(direccion));
        }

        dispatch(shippingModalChange(false));
        dispatch(shippingSetActive());

    }

    return (
        <div className='auth-main'>
            <Formik
                initialValues={{
                    direccion: {
                        poblacion: activo?.direccion.poblacion || '',
                        pais: activo?.direccion.pais || '',
                        calle: activo?.direccion.calle || '',
                        numero: activo?.direccion.numero || '',
                        codigo: activo?.direccion.codigo || '',
                        provincia: activo?.direccion.provincia || '',
                    },
                    nombre: activo?.nombre || '',
                    telefono: activo?.telefono || '',
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
                            defaultChecked
                            type="checkbox"
                            id="checkbox1"
                            name="checkbox1"
                            label="Establecer esta dirección como predeterminada (para futuras compras)"
                        />
                        <FormRB.Check
                            defaultChecked
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