import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, ListGroup, Offcanvas } from "react-bootstrap";

import { menuCanvasChange } from "../../actions/ui";
import { startLogout } from "../../actions/auth";


export const MenuCanvas = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { menuCanvas } = useSelector(state => state.ui);
    const { nombre } = useSelector(state => state.auth);

    const handleClose = () => dispatch(menuCanvasChange());

    const handleLogout = () => {
        dispatch(startLogout());
        dispatch(menuCanvasChange());
        navigate("/");
    }

    return (
        <Offcanvas
            show={menuCanvas}
            onHide={handleClose}
            placement={'end'}
            scroll={true}
            backdrop={true}
        >
            <Offcanvas.Header className="canvasCategoryTitle" closeButton closeVariant="white">
                <Offcanvas.Title>
                    <div>
                        <i className="fa-solid fa-circle-user fa-xl ms-3 me-3"></i>{`Hola, ${nombre}`}
                    </div>
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <ListGroup className="animate__animated animate__fadeInRight animate__faster">
                    <ListGroup.Item className="border-0 canvasCategoryHover" action onClick={() => {
                        navigate("/panel/datos")
                        dispatch(menuCanvasChange())
                    }}>
                        <div className="d-flex">
                            <div style={{ "width": "35px" }}>
                                <i className="fa-solid fa-user-pen fa-lg me-2"></i>
                            </div>
                            Mis datos
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 canvasCategoryHover" action onClick={() => {
                        navigate("/panel/deseos")
                        dispatch(menuCanvasChange())
                    }}>
                        <div className="d-flex">
                            <div style={{ "width": "35px" }}>
                                <i className="fa-solid fa-gifts fa-lg me-2"></i>
                            </div>
                            Lista de deseos
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 canvasCategoryHover" action onClick={() => {
                        navigate("/panel/valoraciones")
                        dispatch(menuCanvasChange())
                    }}>
                        <div className="d-flex">
                            <div style={{ "width": "35px" }}>
                                <i className="fa-solid fa-star fa-lg me-2"></i>
                            </div>
                            Valoraciones
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 canvasCategoryHover" action onClick={() => {
                        navigate("/panel/pedidos")
                        dispatch(menuCanvasChange())
                    }}>
                        <div className="d-flex">
                            <div style={{ "width": "35px" }}>
                                <i className="fa-solid fa-truck-fast fa-lg me-2"></i>
                            </div>
                            Pedidos
                        </div>
                    </ListGroup.Item>
                </ListGroup>
                <div className="d-grid gap-2">
                    <Button variant="danger" className="mt-3" onClick={handleLogout}><i className="fa-solid fa-right-from-bracket"></i> Cerrar sesión</Button>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    )
}