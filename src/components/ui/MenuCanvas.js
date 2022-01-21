import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, ListGroup, Offcanvas } from "react-bootstrap";

import { menuCanvasChange } from "../../actions/ui";
import { startLogout } from "../../actions/auth";


export const MenuCanvas = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { menuCanvas } = useSelector(state => state.ui);

    const handleClose = () => dispatch(menuCanvasChange());

    const handleLogout = () => {
        dispatch(startLogout());
        dispatch(menuCanvasChange());
        navigate("/");
    }

    return (
        <Offcanvas show={menuCanvas} onHide={handleClose} placement={'end'}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Mi cuenta</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <h5>Mi cuenta</h5>
                <ListGroup>
                    <ListGroup.Item className="border-0" action onClick={() => {
                        navigate("/panel/datos")
                        dispatch(menuCanvasChange())
                    }}>
                        Mis datos
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0" action onClick={() => {
                        navigate("/panel/deseos")
                        dispatch(menuCanvasChange())
                    }}>
                        Lista de deseos
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0" action onClick={() => {
                        navigate("/panel/valoraciones")
                        dispatch(menuCanvasChange())
                    }}>
                        Valoraciones
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0" action onClick={() => {
                        navigate("/panel/pedidos")
                        dispatch(menuCanvasChange())
                    }}>
                        Pedidos
                    </ListGroup.Item>
                </ListGroup>
                <Button className="mt-3" onClick={handleLogout}>Cerrar sesión</Button>
            </Offcanvas.Body>
        </Offcanvas>
    )
}