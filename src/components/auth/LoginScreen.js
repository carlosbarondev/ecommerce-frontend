import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { Button, Col, FormControl, FormGroup, FormLabel, FormText, Image, ListGroup, Row } from 'react-bootstrap';

import { startLogin } from '../../actions/auth';


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

export const LoginScreen = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = () => {
        navigate("/registro");
    }

    const handleLogin = (values) => {
        dispatch(startLogin(values.email, values.password, navigate));
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="d-flex justify-content-center">
                <Image
                    src="https://res.cloudinary.com/dyi0p8m1g/image/upload/v1643859405/ecommerce/productos/logo_qdclxm.png"
                    alt="logo"
                    className='mt-5 mb-5'
                    style={{ "cursor": "pointer", "maxWidth": "75%" }}
                    onClick={() => navigate("/")}
                    fluid
                />
            </div>
            <Row>
                <Col xs={12} lg={5} className="align-self-center">
                    <div className='d-flex justify-content-center'>
                        <div>
                            <h4 className='ms-2'>Usuarios disponibles</h4>
                            <ListGroup className='mt-3'>
                                <ListGroup.Item className='border-0'>
                                    <i className="fa-solid fa-user fa-xl"></i>
                                    <b> Usuario predefinido</b>
                                    <div className='mt-2 ms-5'>E-mail: <strong>test1</strong></div>
                                    <div className='ms-5'>Contraseña: <strong>123456</strong></div>
                                </ListGroup.Item>
                                <ListGroup.Item className='border-0'>
                                    <i className="fa-solid fa-user-gear fa-xl"></i>
                                    <b> Administrador</b>
                                    <div className='mt-2 ms-5'>E-mail: <strong>admin</strong></div>
                                    <div className='ms-5'>Contraseña: <strong>123456</strong></div>
                                </ListGroup.Item>
                                <ListGroup.Item className='border-0'>
                                    <i className="fa-solid fa-user-plus fa-xl"></i>
                                    <b> Nuevo usuario</b>
                                    <div className='mt-2'>¡Crea un nuevo usuario desde cero!</div>
                                </ListGroup.Item>
                            </ListGroup>
                        </div>
                    </div>
                </Col>
                <Col xs={0} lg={1} className="disable-vr">
                    <div className="h-100 d-flex justify-content-center">
                        <div className="vr h-100"></div>
                    </div>
                </Col>
                <Col xs={12} lg={6}>
                    <div className='d-flex justify-content-center mt-2 ms-4'>
                        <Formik
                            initialValues={{
                                email: '',
                                password: '',
                            }}
                            validationSchema={Yup.object({
                                email: Yup.string()
                                    .email('Invalid email address')
                                    .required('El email es obligatorio'),
                                password: Yup.string()
                                    .max(20, 'Must be 20 characters or less')
                                    .required('La contraseña es obligatoria'),
                            })}
                            onSubmit={handleLogin}
                        >
                            <Form className="auth-box-container d-grid gap-2 mt-4 mb-5">

                                <h1>Iniciar sesión</h1>

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

                                <Button type="submit" variant="primary" size="lg">Iniciar sesión</Button>
                                <div className="position-relative my-2 text-center">
                                    <hr />
                                    <p className="position-absolute top-50 start-50 translate-middle bg-white px-3">
                                        ¿Eres nuevo cliente?
                                    </p>
                                </div>
                                <Button type="button" variant="outline-primary" size="lg" onClick={handleRegister}>Crear cuenta</Button>
                            </Form>
                        </Formik>
                    </div>
                </Col>
            </Row>
        </div>
    );
};