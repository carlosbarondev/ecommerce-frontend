import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

import { TopBar } from "../components/ui/TopBar";
import { MenuPanel } from "../components/panel/MenuPanel";
import { Data } from "../components/panel/Data";
import { Wishes } from "../components/panel/Wishes";
import { Ratings } from "../components/panel/Ratings";
import { Orders } from "../components/panel/Orders";
import { OrdersDetail } from "../components/panel/OrdersDetail";
import { Footer } from "../components/ui/Footer";


export const PanelRouter = () => {

    const { pathname, search } = useLocation();
    localStorage.setItem('lastPath', pathname + search);

    return (

        <div className="d-flex flex-column min-vh-100">

            <TopBar />

            <Container>

                <Routes>
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
                </Routes>

            </Container>

            <Footer />

        </div>
    )
};
