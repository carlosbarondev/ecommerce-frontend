import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Container, Navbar, Form, FormControl } from "react-bootstrap"
import useBreadcrumbs from 'use-react-router-breadcrumbs';

import { MenuCanvas } from "./MenuCanvas";
import { CartCanvas } from "./CartCanvas";
import { CategoryCanvas } from "./CategoryCanvas";
import { cartCanvasChange, categoryCanvasChange, menuCanvasChange } from "../../actions/ui";


const routes = [
    { path: '/:CategoriaNombre/:SubCategoriaNombre/:ProductoNombre', breadcrumb: null },
    { path: '/cart', breadcrumb: "Carrito" },
    { path: '/panel', breadcrumb: "Panel de Usuario" },
    { path: '/panel/datos', breadcrumb: null },
    { path: '/panel/deseos', breadcrumb: "Lista de deseos" },
    { path: '/panel/pedidos/detalles', breadcrumb: null },
];

export const TopBar = () => {
    console.log('Hola Mundo');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const { nombre, uid } = useSelector(state => state.auth);
    const carro = useSelector(state => state.cart);
    const { carrito } = carro;

    const breadcrumbs = useBreadcrumbs(routes);

    useEffect(() => { // Guarda el carrito de compras en el localStorage cuando se modifica el carrito
        localStorage.setItem('carrito', JSON.stringify(carro));
    }, [carro]);

    const handleShowMenu = () => dispatch(menuCanvasChange());
    const handleShowCart = () => dispatch(cartCanvasChange());
    const handleShowCategory = () => dispatch(categoryCanvasChange());

    const getUnidades = () => { // Suma las unidades de los productos del carrito
        if (carrito.length > 0) {
            const unidades = carrito.reduce((n, { unidades }) => n + unidades, 0);
            return unidades;
        } else {
            return 0;
        }
    }

    return (
        <Navbar sticky="top" bg="light" style={{ "padding": "0", "margin": "0" }}>
            <Container className="d-flex flex-column" style={{ "padding": "0", "margin": "0" }} fluid>
                <Container className="d-flex align-items-center" style={{ "height": "55px" }} fluid>
                    <Navbar.Brand className="ms-4 me-5">
                        <Link
                            className="navbarDisableImg"
                            to="/"
                        >
                            <img
                                style={{ "height": "55px" }}
                                alt="logo"
                                src="https://res.cloudinary.com/dyi0p8m1g/image/upload/v1643859405/ecommerce/productos/logo_qdclxm.png"
                            />
                        </Link>
                        <Link
                            className="navbarEnableImg"
                            to="/"
                        >
                            <img
                                style={{ "height": "55px" }}
                                alt="logo"
                                src="https://res.cloudinary.com/dyi0p8m1g/image/upload/v1643886601/ecommerce/productos/logo-sm_hhr2nc.png"
                            />
                        </Link>
                    </Navbar.Brand>
                    <Form className="d-flex flex-grow-1 me-5">
                        <FormControl
                            type="search"
                            placeholder="Busca en Ecommerce..."
                            aria-label="Search"
                        />
                        <button
                            className="border-0"
                            style={{ "backgroundColor": "#F3A847", "marginLeft": "-40px", "width": "40px" }}
                        >
                            <i className="fas fa-search">
                            </i>
                        </button>
                    </Form>
                    {
                        (!!uid &&
                            <div key="in" className="d-flex align-items-center h-100 hoverFondo me-md-4 px-md-3" style={{ "cursor": "pointer" }} onClick={handleShowMenu}>
                                <i className="fas fa-user me-4 me-md-2" style={{ "fontSize": "30px" }}></i>
                                <div className="navbarDisable">
                                    <div style={{ "marginBottom": "-5px" }}>{`Hola ${nombre}`}</div>
                                    <b>Mi Cuenta</b>
                                </div>
                            </div>
                        )
                        || (!uid &&
                            <div key="out" className="d-flex align-items-center h-100 hoverFondo me-md-4 px-md-3" style={{ "cursor": "pointer" }} onClick={() => navigate("/login")}>
                                <i className="fas fa-sign-in-alt me-4 me-md-2" style={{ "fontSize": "30px" }}></i>
                                <b className="navbarDisable">Identifícate</b>
                            </div>
                        )
                    }
                    <div className="d-flex align-items-center h-100 hoverFondo me-md-3 px-md-3" style={{ "cursor": "pointer" }} onClick={handleShowCart}>
                        <span className="fa-layers fa-fw me-2" style={{ "fontSize": "40px" }}>
                            <i className="fas fa-shopping-cart"></i>
                            <span className="fa-layers-counter" style={{ "background": "Tomato", "fontSize": "45px" }}>{getUnidades()}</span>
                        </span>
                        <b className="navbarDisable">Mi Carrito</b>
                    </div>
                </Container>
                <Container className="d-flex align-items-center border-top border-bottom" style={{ "height": "35px", "fontSize": "14px" }} fluid>
                    <button
                        className="border-0 ms-5 me-4"
                        style={{ "backgroundColor": "#F8F9FA" }}
                        onClick={handleShowCategory}
                    >
                        <i className="fa-solid fa-bars fa-lg"></i>
                        <b className="ms-2">Todas las categorías</b>
                    </button>
                    {
                        location.pathname !== "/" && location.pathname !== "/summary" && breadcrumbs.map(({
                            match,
                            breadcrumb,
                        }, index) => (
                            <span key={match.pathname}>
                                <NavLink to={match.pathname} className="linkNormal">{breadcrumb}</NavLink>
                                {
                                    index < breadcrumbs.length - 1 && <span className="ms-1 me-1">{">"}</span>
                                }
                            </span>
                        ))
                    }
                    <Link className="linkNormal ms-auto me-5 navbarDisable" to="/panel/deseos">Lista de deseos</Link>
                </Container>
            </Container>
            <MenuCanvas />
            <CartCanvas />
            <CategoryCanvas />
        </Navbar>
    )
}