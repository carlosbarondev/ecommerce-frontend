import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Formik, useField } from "formik";
import * as Yup from 'yup';
import { Button, Col, FormControl, FormGroup, FormLabel, FormText, ListGroup, Row } from "react-bootstrap";
import Swal from "sweetalert2";

import { fetchConToken } from "../../helpers/fetch";
import { changeName } from "../../actions/auth";


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

export const Data = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { nombre, uid } = useSelector(state => state.auth);

    const [total, setTotal] = useState();
    const [checking, setChecking] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const resp = await fetchConToken(`pedidos/${uid}`);
                const body = await resp.json();
                if (body.msg) {
                    return Swal.fire('Error', body.msg, 'error');
                } else {
                    setTotal(body.total);
                    setChecking(true);
                }
            } catch (error) {
                console.log(error);
                return Swal.fire('Error', error, 'error');
            }
        }
        fetchData();
    }, [uid]);

    const handleName = async (values) => {
        try {
            const resp = await fetchConToken(`usuarios/${uid}`, { nombre: values.nombre }, 'PUT');
            const body = await resp.json();
            if (body.msg) {
                return Swal.fire('Error', body.msg, 'error');
            } else {
                dispatch(changeName(values.nombre));
                return Swal.fire('', 'Nombre cambiado', 'success');
            }
        } catch (error) {
            console.log(error);
            return Swal.fire('Error', error, 'error');
        }
    }

    const handlePassword = async (values) => {
        if (values.newPassword !== values.newPassword2) {
            return Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
        } else {
            try {
                const resp = await fetchConToken(`usuarios/${uid}`, { password: values.newPassword }, 'PUT');
                const body = await resp.json();
                if (body.msg) {
                    return Swal.fire('Error', body.msg, 'error');
                } else {
                    return Swal.fire('', 'Contraseña cambiada', 'success');
                }
            } catch (error) {
                console.log(error);
                return Swal.fire('Error', error, 'error');
            }
        }
    }

    return (
        checking && <div className="animate__animated animate__fadeIn mt-4 mb-5">
            <h3>Mis Datos</h3>
            <div className="centrar">
                <div className="list-group">
                    <button className="list-group-item list-group-item-action border-0 listaFondo" onClick={() => navigate("/panel/pedidos")}>
                        <h5>PEDIDOS</h5>
                        <div className="fs-1 text-center">{total}</div>
                    </button>
                </div>
            </div>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <h5>Datos de mi cuenta</h5>
                    <Formik
                        initialValues={{
                            nombre: nombre || '',
                        }}
                        validationSchema={Yup.object({
                            nombre: Yup.string()
                                .required('Required'),
                        })}
                        onSubmit={handleName}
                    >
                        <Form>
                            <Row>
                                <Col md={4}>
                                    <MyTextInput
                                        label="Nombre"
                                        name="nombre"
                                        type="text"
                                        placeholder="Nombre"
                                    />
                                </Col>
                            </Row>
                            <Button type="submit" variant="primary">Guardar cambios</Button>
                        </Form>
                    </Formik>
                </ListGroup.Item>
                <ListGroup.Item>
                    <h5>Contraseña</h5>
                    <Formik
                        initialValues={{
                            newPassword: '',
                            newPassword2: '',
                        }}
                        validationSchema={Yup.object({
                            newPassword: Yup.string()
                                .min(6, 'Must be 6 characters or more')
                                .required('Required'),
                            newPassword2: Yup.string()
                                .min(6, 'Must be 6 characters or more')
                                .required('Required'),
                        })}
                        onSubmit={handlePassword}
                    >
                        <Form>
                            <Row>
                                <Col md={4}>
                                    <MyTextInput
                                        label="Nueva contraseña"
                                        name="newPassword"
                                        type="text"
                                    />
                                </Col>
                                <Col md={4}>
                                    <MyTextInput
                                        label="Repetir contraseña"
                                        name="newPassword2"
                                        type="text"
                                    />
                                </Col>
                            </Row>
                            <Button type="submit" variant="primary">Guardar cambios</Button>
                        </Form>
                    </Formik>
                </ListGroup.Item>
            </ListGroup>
        </div>
    )
};