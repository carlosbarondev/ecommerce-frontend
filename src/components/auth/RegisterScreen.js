import { Formik, Form, useField } from 'formik';
import { Button, FormControl, FormGroup, FormLabel, FormText, Image } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

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


export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login");
    }

    const handleRegister = ({ nombre, email, password, password2 }) => {
        if (password !== password2) {
            return Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
        }
        dispatch(startRegister(nombre, email, password, navigate));
    }

    return (
        <div className="d-flex flex-column align-items-center">
            <div className="d-flex justify-content-center">
                <Image
                    src="/assets/logo_grande.png"
                    alt="logo"
                    className='mt-3 mt-sm-5 mb-0 mb-sm-4'
                    style={{ "cursor": "pointer", "maxWidth": "75%" }}
                    onClick={() => navigate("/")}
                    fluid
                />
            </div>
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
                        .required('El nombre es obligatorio'),
                    email: Yup.string()
                        .email('El formato del correo es inválido')
                        .required('El email es obligatorio'),
                    password: Yup.string()
                        .max(20, 'Must be 20 characters or less')
                        .required('La contraseña es obligatoria'),
                    password2: Yup.string()
                        .max(20, 'Must be 20 characters or less')
                        .required('La contraseña es obligatoria'),
                })}
                onSubmit={handleRegister}
            >
                <Form className="auth-box-container d-grid gap-2 mt-4 mb-5">

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
                    <div className="position-relative my-2 text-center">
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