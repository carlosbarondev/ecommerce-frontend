import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Container, Navbar, Button, Form, FormControl, Offcanvas } from "react-bootstrap"

import { MenuCanvas } from "./MenuCanvas";
import { CartCanvas } from "./CartCanvas";
import { cartCanvasChange, menuCanvasChange } from "../../actions/ui";
import useReactRouterBreadcrumbs from "use-react-router-breadcrumbs";


const routes = [{ path: '/:CategoriaNombre/:SubCategoriaNombre/:ProductoNombre', breadcrumb: null }];

export const TopBar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { uid } = useSelector(state => state.auth);
    const carro = useSelector(state => state.cart);
    const { carrito } = carro;

    const [show, setShow] = useState(false);

    const breadcrumbs = useReactRouterBreadcrumbs(routes);

    useEffect(() => { // Guarda el carrito de compras en el localStorage cuando se modifica el carrito
        localStorage.setItem('carrito', JSON.stringify(carro));
    }, [carro]);

    const handleShowMenu = () => dispatch(menuCanvasChange());
    const handleShowCart = () => dispatch(cartCanvasChange());

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getUnidades = () => { // Suma las unidades de los productos del carrito
        if (carrito.length > 0) {
            const unidades = carrito.reduce((n, { unidades }) => n + unidades, 0);
            return unidades;
        } else {
            return 0;
        }
    }

    return (
        <>
            <Navbar bg="light" expand={false} sticky="top" style={{ "padding": "0" }}>
                <Container fluid style={{ "paddingLeft": "0", "paddingRight": "0" }}>
                    <div className="d-flex flex-column w-100">
                        <div className="d-flex">
                            <Link
                                className="navbar-brand ms-3"
                                to="/"
                            >
                                Ecommerce
                            </Link>
                            <Form className="d-flex">
                                <FormControl
                                    type="search"
                                    placeholder="Search"
                                    className="me-2 ms-5"
                                    aria-label="Search"
                                />
                                <Button variant="outline-success">Search</Button>
                            </Form>
                            {
                                (!!uid &&
                                    <Button
                                        className="ms-5"
                                        variant="danger"
                                        onClick={handleShowMenu}
                                    >
                                        Mi cuenta
                                    </Button>)
                                || (!uid &&
                                    <Button
                                        className="ms-5"
                                        variant="danger"
                                        onClick={() => navigate("/login")}
                                    >
                                        Identificate
                                    </Button>)
                            }
                            <span className="fa-layers fa-fw fa-3x hv ms-5" onClick={handleShowCart}>
                                <i className="fa-solid fa-cart-shopping"></i>
                                <span className="fa-layers-counter" style={{ background: 'Tomato', fontSize: '60px' }}>{getUnidades()}</span>
                            </span>
                        </div>
                        <div className="d-flex border-top border-bottom" style={{ "height": "40px", "fontSize": "14px" }}>
                            <button
                                className="ms-5 border-0"
                                style={{ "backgroundColor": "#F8F9FA" }}
                                onClick={handleShow}
                            >
                                <i className="fa-solid fa-bars fa-lg"></i>
                                <b className="ms-2">Todas las categorías</b>
                            </button>
                            <Offcanvas
                                show={show}
                                onHide={handleClose}
                                scroll={true}
                                backdrop={true}
                            >
                                <Offcanvas.Header closeButton>
                                    <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                                </Offcanvas.Header>
                                <Offcanvas.Body>
                                    Some text as placeholder. In real life you can have the elements you
                                    have chosen. Like, text, images, lists, etc.
                                </Offcanvas.Body>
                            </Offcanvas>
                            {breadcrumbs.map(({
                                match,
                                breadcrumb
                            }) => (
                                <span className="me-2" key={match.pathname}>
                                    <NavLink to={match.pathname}>{breadcrumb}</NavLink>
                                </span>
                            ))}
                            {/* <Breadcrumb className="navbar-text ms-4" style={{ "--bs-breadcrumb-divider": "'>'" }}>
                                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                                <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                                    Library
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active>Data</Breadcrumb.Item>
                            </Breadcrumb> */}
                        </div>
                    </div>
                </Container>
            </Navbar>
            <MenuCanvas />
            <CartCanvas />
        </>
    )
}