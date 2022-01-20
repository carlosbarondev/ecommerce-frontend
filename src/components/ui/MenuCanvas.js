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
                    <ListGroup.Item className="border-0" action href="#link1">
                        Link 1
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0" action href="#link2">
                        Link 2
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0" action href="#link3">
                        Link 3
                    </ListGroup.Item>
                </ListGroup>
                <h5 className="mt-3">Pedidos</h5>
                <ListGroup>
                    <ListGroup.Item className="border-0" action href="#link1">
                        Link 1
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0" action href="#link2">
                        Link 2
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0" action href="#link3">
                        Link 3
                    </ListGroup.Item>
                </ListGroup>
                <Button className="mt-3" onClick={handleLogout}>Cerrar sesión</Button>
            </Offcanvas.Body>
        </Offcanvas>
    )
}