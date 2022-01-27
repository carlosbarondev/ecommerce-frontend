import { Route, Routes, useLocation } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

import { TopBar } from "../components/ui/TopBar";
import { MenuPanel } from "../components/panel/MenuPanel";
import { Data } from "../components/panel/Data";
import { Wishes } from "../components/panel/Wishes";
import { Ratings } from "../components/panel/Ratings";
import { Orders } from "../components/panel/Orders";
import { OrdersDetail } from "../components/panel/OrdersDetail";


export const PanelRouter = () => {

    const { pathname, search } = useLocation();
    localStorage.setItem('lastPath', pathname + search);

    return (
        <>
            <TopBar />

            <Container>
                <Row>
                    <Col md={2}>
                        <MenuPanel />
                    </Col>
                    <Col md={10}>
                        <Routes>
                            <Route path="datos" element={<Data />} />
                        </Routes>
                        <Routes>
                            <Route path="deseos" element={<Wishes />} />
                        </Routes>
                        <Routes>
                            <Route path="valoraciones" element={<Ratings />} />
                        </Routes>
                        <Routes>
                            <Route path="pedidos" element={<Orders />} />
                        </Routes>
                        <Routes>
                            <Route path="pedidosDetalles" element={<OrdersDetail />} />
                        </Routes>
                    </Col>
                </Row>
            </Container>

        </>
    )
};
