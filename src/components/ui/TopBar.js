import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Container, Navbar, Button, Form, FormControl } from "react-bootstrap"

import { MenuCanvas } from "./MenuCanvas";
import { CartCanvas } from "./CartCanvas";
import { cartCanvasChange, menuCanvasChange } from "../../actions/ui";


export const TopBar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { uid } = useSelector(state => state.auth);
    const carro = useSelector(state => state.cart);
    const { carrito } = carro;

    useEffect(() => { // Guarda el carrito de compras al recargar el navegador
        localStorage.setItem('carrito', JSON.stringify(carro));
    }, [carro]);

    const handleShowMenu = () => dispatch(menuCanvasChange());
    const handleShowCart = () => dispatch(cartCanvasChange());

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
            <Navbar bg="light" expand="lg" sticky="top">
                <Container fluid>
                    <Link
                        className="navbar-brand"
                        to="/"
                    >
                        Ecommerce
                    </Link>

                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                    {
                        (!!uid &&
                            <Button
                                variant="danger"
                                onClick={handleShowMenu}
                            >
                                Mi cuenta
                            </Button>)
                        || (!uid &&
                            <Button
                                variant="danger"
                                onClick={() => navigate("/login")}
                            >
                                Identificate
                            </Button>)
                    }
                    <span className="fa-layers fa-fw fa-3x hv" onClick={handleShowCart}>
                        <i className="fa-solid fa-cart-shopping"></i>
                        <span className="fa-layers-counter" style={{ background: 'Tomato', fontSize: '60px' }}>{getUnidades()}</span>
                    </span>
                </Container>
            </Navbar>
            <MenuCanvas />
            <CartCanvas />
        </>
    )
}