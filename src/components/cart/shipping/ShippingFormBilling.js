import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { Button, FormControl, FormGroup, FormLabel, FormText } from 'react-bootstrap';

import { shippingModalChange } from '../../../actions/ui';
import { shippingStartAddBilling } from '../../../actions/shipping';


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

export const ShippingFormBilling = () => {
    console.log('ShippingFormBilling');

    const dispatch = useDispatch();

    const { facturacion } = useSelector(state => state.shipping);

    const handleRegister = ({ direccion }) => {

        dispatch(shippingStartAddBilling(direccion));
        dispatch(shippingModalChange(false));

    }

    return (
        <div className='auth-main'>
            <Formik
                initialValues={{
                    direccion: {
                        poblacion: facturacion?.poblacion || '',
                        pais: facturacion?.pais || '',
                        calle: facturacion?.calle || '',
                        numero: facturacion?.numero || '',
                        codigo: facturacion?.codigo || '',
                        provincia: facturacion?.provincia || '',
                    },
                }}
                validationSchema={Yup.object({
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

                    <Button type="submit" variant="primary" size="lg">Guardar dirección</Button>

                </Form>
            </Formik>
        </div >
    );
}