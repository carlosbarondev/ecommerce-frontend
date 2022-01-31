import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Offcanvas } from "react-bootstrap";

import { cartCanvasChange } from "../../actions/ui";


export const CartCanvas = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { carrito } = useSelector(state => state.cart);
    const { cartCanvas, backdrop } = useSelector(state => state.ui);

    const handleClose = () => dispatch(cartCanvasChange());

    const handleClick = () => {
        navigate("/cart");
        handleClose();
    }

    return (
        <Offcanvas
            show={cartCanvas}
            onHide={handleClose}
            placement={'end'}
            backdrop={backdrop}
            scroll={true}
        >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Mi carrito</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {
                    carrito.length > 0
                        ?
                        <div className="mb-4 d-grid gap-2">
                            <h3>TOTAL: {carrito.reduce((n, { unidades, producto }) => n + unidades * producto.precio, 0).toFixed(2)} €</h3>
                            <Button className="mt-1" variant="warning" size="lg" onClick={handleClick}>
                                Realizar Pedido
                            </Button>
                            <hr />
                        </div>
                        : null
                }
                {
                    carrito.length > 0
                        ?
                        carrito.map(cart => (
                            <div key={cart.producto._id} className="row">
                                <div className="col-4">
                                    <img
                                        src={cart.producto.img}
                                        alt={cart.producto.nombre}
                                        className="img-thumbnail"
                                    />
                                </div>
                                <div className="col-8">
                                    <h3>{cart.producto.nombre}</h3>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item"><b>Unidades: </b>{cart.unidades}</li>
                                        <li className="list-group-item"><b>Precio: </b>{(cart.producto.precio * cart.unidades).toFixed(2)} €</li>
                                    </ul>
                                </div>
                                <hr />
                            </div>
                        ))
                        :
                        "No hay artículos en tu carrito"
                }
            </Offcanvas.Body>
        </Offcanvas>
    )
}