import { Formik, Form, useField } from 'formik';
import { Button, FormControl, FormGroup, FormLabel, FormText } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

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


export const RegisterScreen = () => {

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login");
    }

    return (
        <div className='auth-main'>
            <Formik
                initialValues={{
                    nombre: '',
                    email: '',
                    password: '',
                    password2: '',
                }}
                validationSchema={Yup.object({
                    nombre: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),
                    email: Yup.string()
                        .email('Invalid email address')
                        .required('Required'),
                    password: Yup.string()
                        .max(20, 'Must be 20 characters or less')
                        .required('Required'),
                    password2: Yup.string()
                        .max(20, 'Must be 20 characters or less')
                        .required('Required'),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
            >
                <Form className="auth-box-container d-grid gap-2 border rounded">

                    <h1>Crear cuenta</h1>

                    <MyTextInput
                        label="Nombre"
                        name="nombre"
                        type="text"
                        placeholder="¿Cuál es tu nombre?"
                    />

                    <MyTextInput
                        label="E-mail"
                        name="email"
                        type="text"
                        placeholder="E-mail"
                    />

                    <MyTextInput
                        label="Contraseña"
                        name="password"
                        type="text"
                        placeholder="Contraseña"
                    />

                    <MyTextInput
                        label="Confirma tu contraseña"
                        name="password2"
                        type="text"
                        placeholder="Contraseña"
                    />

                    <Button type="submit" variant="primary" size="lg">Crear cuenta</Button>
                    <div className="position-relative my-2">
                        <hr />
                        <p className="position-absolute top-50 start-50 translate-middle bg-white px-3">
                            Ya tengo una cuenta
                        </p>
                    </div>
                    <Button type="button" variant="outline-primary" size="lg" onClick={handleLogin}>Iniciar sesión</Button>
                </Form>
            </Formik>
        </div>
    );
};