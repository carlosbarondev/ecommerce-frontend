import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

import { TopBar } from "../components/ui/TopBar";
import { Footer } from "../components/ui/Footer";
import { MenuPanel } from "../components/panel/user/MenuPanel";
import { Data } from "../components/panel/user/Data";
import { Wishes } from "../components/panel/user/Wishes";
import { Ratings } from "../components/panel/user/Ratings";
import { Orders } from "../components/panel/user/Orders";
import { OrdersDetail } from "../components/panel/user/OrdersDetail";
import { AdminPanel } from "../components/panel/admin/AdminPanel";
import { Users } from "../components/panel/admin/Users";
import { Categories } from "../components/panel/admin/Categories";
import { CategoryDetail } from "../components/panel/admin/CategoryDetail";
import { Products } from "../components/panel/admin/Products";
import { ProductDetail } from "../components/panel/admin/ProductDetail";


export const PanelRouter = () => {

    const { rol } = useSelector(state => state.auth);

    const { pathname, search } = useLocation();
    localStorage.setItem('lastPath', pathname + search);

    return (

        <div className="d-flex flex-column min-vh-100">

            <TopBar />

            <Container>

                {
                    rol === "USER_ROLE"
                        ? <Routes>
                            <Route path="datos" element={
                                <Row>
                                    <Col md={2}>
                                        <MenuPanel />
                                    </Col>
                                    <Col md={10}>
                                        <Data />
                                    </Col>
                                </Row>
                            } />
                            <Route path="deseos" element={
                                <Wishes />
                            } />
                            <Route path="valoraciones" element={
                                <Row>
                                    <Col md={2}>
                                        <MenuPanel />
                                    </Col>
                                    <Col md={10}>
                                        <Ratings />
                                    </Col>
                                </Row>
                            } />
                            <Route path="pedidos" element={
                                <Row>
                                    <Col md={2}>
                                        <MenuPanel />
                                    </Col>
                                    <Col md={10}>
                                        <Orders />
                                    </Col>
                                </Row>
                            } />
                            <Route path="pedidos/detalles" element={
                                <Row>
                                    <Col md={2}>
                                        <MenuPanel />
                                    </Col>
                                    <Col md={10}>
                                        <OrdersDetail />
                                    </Col>
                                </Row>
                            } />
                            <Route
                                path="/"
                                element={<Navigate to="/panel/datos" />}
                            />
                            <Route path="/*" element={<Navigate to="/" />} />
                        </Routes>
                        : <Routes>
                            <Route path="usuarios" element={
                                <Row>
                                    <Col md={12} lg={2}>
                                        <AdminPanel />
                                    </Col>
                                    <Col md={12} lg={10}>
                                        <Users />
                                    </Col>
                                </Row>
                            } />
                            <Route path="categorias" element={
                                <Row>
                                    <Col md={12} lg={2}>
                                        <AdminPanel />
                                    </Col>
                                    <Col md={12} lg={10}>
                                        <Categories />
                                    </Col>
                                </Row>
                            } />
                            <Route path="categorias/:CategoriaNombre" element={
                                <Row>
                                    <Col md={12} lg={2}>
                                        <AdminPanel />
                                    </Col>
                                    <Col md={12} lg={10}>
                                        <CategoryDetail />
                                    </Col>
                                </Row>
                            } />
                            <Route path="productos" element={
                                <Row>
                                    <Col md={12} lg={2}>
                                        <AdminPanel />
                                    </Col>
                                    <Col md={12} lg={10}>
                                        <Products />
                                    </Col>
                                </Row>
                            } />
                            <Route path="productos/:ProductoNombre" element={
                                <Row>
                                    <Col md={12} lg={2}>
                                        <AdminPanel />
                                    </Col>
                                    <Col md={12} lg={10}>
                                        <ProductDetail />
                                    </Col>
                                </Row>
                            } />
                            <Route
                                path="/"
                                element={<Navigate to="/panel/usuarios" />}
                            />
                            <Route path="/*" element={<Navigate to="/" />} />
                        </Routes>
                }

            </Container>

            <Footer />

        </div>
    )
};