import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Container, Image, Navbar } from "react-bootstrap"
import useBreadcrumbs from 'use-react-router-breadcrumbs';

import { MenuCanvas } from "./MenuCanvas";
import { CartCanvas } from "./CartCanvas";
import { CategoryCanvas } from "./CategoryCanvas";
import { cartCanvasChange, categoryCanvasChange, menuCanvasChange } from "../../actions/ui";
import { Search } from "../search/Search";


const routes = [
    { path: '/:CategoriaNombre/:SubCategoriaNombre/:ProductoNombre', breadcrumb: null },
    { path: '/cart', breadcrumb: "Carrito" },
    { path: '/panel', breadcrumb: "Panel" },
    { path: '/panel/datos', breadcrumb: null },
    { path: '/panel/deseos', breadcrumb: "Deseados" },
    { path: '/buscar', breadcrumb: null },
    { path: '/buscar/:Busqueda', breadcrumb: null },
];

export const TopBar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const { nombre, uid, rol } = useSelector(state => state.auth);
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
                    <Navbar.Brand className="ms-2 ms-md-4 me-4 me-md-5">
                        <Image
                            className="navbarDisableImg"
                            style={{ "height": "55px", "cursor": "pointer" }}
                            alt="logo"
                            src="/assets/logo_grande.png"
                            onClick={() => navigate("/")}
                        />
                        <Image
                            className="navbarEnableImg"
                            style={{ "height": "55px", "cursor": "pointer" }}
                            alt="logo"
                            src="/assets/logo.png"
                            onClick={() => navigate("/")}
                        />
                    </Navbar.Brand>
                    <div className="d-flex flex-grow-1 ms-md-2 me-3 me-md-5">
                        <Search />
                    </div>
                    {
                        (!!uid &&
                            <div key="in" className="d-flex align-items-center h-100 hoverFondo me-md-4 px-2 px-md-3" style={{ "cursor": "pointer" }} onClick={handleShowMenu}>
                                {
                                    rol === "USER_ROLE"
                                        ? <i className="fas fa-user" style={{ "fontSize": "30px" }}></i>
                                        : <i className="fa-solid fa-user-gear" style={{ "fontSize": "30px" }}></i>
                                }
                                <div className="navbarDisable ms-2">
                                    <div style={{ "marginBottom": "-5px" }}>{`Hola ${nombre}`}</div>
                                    {
                                        rol === "USER_ROLE"
                                            ? <b>Mi Cuenta</b>
                                            : <b>Panel de Administración</b>
                                    }
                                </div>
                            </div>
                        )
                        || (!uid &&
                            <div key="out" className="d-flex align-items-center h-100 hoverFondo me-md-4 px-2 px-md-3" style={{ "cursor": "pointer" }} onClick={() => navigate("/login")}>
                                <i className="fas fa-sign-in-alt" style={{ "fontSize": "30px" }}></i>
                                <b className="navbarDisable ms-2">Identifícate</b>
                            </div>
                        )
                    }
                    <div className="d-flex align-items-center h-100 hoverFondo me-md-3 px-2 px-md-3" style={{ "cursor": "pointer" }} onClick={handleShowCart}>
                        <span className="fa-layers fa-fw" style={{ "fontSize": "40px" }}>
                            <i className="fas fa-shopping-cart"></i>
                            <span className="fa-layers-counter" style={{ "background": "Tomato", "fontSize": "50px" }}>{getUnidades()}</span>
                        </span>
                        <b className="navbarDisable ms-1">Mi Carrito</b>
                    </div>
                </Container>
                <Container className="d-flex align-items-center border-top border-bottom" style={{ "height": "35px", "fontSize": "14px" }} fluid>
                    <button
                        className="border-0 ms-2 ms-md-5 me-3 h-100 hoverFondo px-3"
                        style={{ "backgroundColor": "#F8F9FA" }}
                        onClick={handleShowCategory}
                    >
                        <i className="fa-solid fa-bars fa-lg"></i>
                        <b className="ms-2 navbarDisable">Todas las categorías</b>
                    </button>
                    {
                        location.pathname !== "/" &&
                        location.pathname !== "/summary" &&
                        location.pathname !== "/buscar" &&
                        breadcrumbs.map(({
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