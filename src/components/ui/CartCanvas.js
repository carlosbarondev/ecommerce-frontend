import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Offcanvas } from "react-bootstrap";

import { cartCanvasChange } from "../../actions/ui";


export const CartCanvas = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { carrito } = useSelector(state => state.cart);
    const { cartCanvas, backdrop } = useSelector(state => state.ui);

    const getUnidades = () => { // Suma las unidades de los productos del carrito
        if (carrito.length > 0) {
            const unidades = carrito.reduce((n, { unidades }) => n + unidades, 0);
            return unidades;
        } else {
            return 0;
        }
    }

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
            <Offcanvas.Header className="canvasCategoryTitle" closeButton closeVariant="white">
                <Offcanvas.Title>
                    <div className="ms-2">
                        MI CARRITO
                    </div>
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {
                    carrito.length > 0
                        ? <div className="mb-4">
                            <h5>Unidades<span className="float-end">{getUnidades()}</span></h5>
                            <h4>TOTAL<span className="float-end">{carrito.reduce((n, { unidades, producto }) => n + unidades * producto.precio, 0).toFixed(2)} €</span></h4>
                            <div className="d-grid gap-2 mt-4">
                                <Button className="mb-2" variant="warning" size="lg" onClick={handleClick}>
                                    Realizar Pedido
                                </Button>
                            </div>
                            <hr />
                        </div>
                        : null
                }
                {
                    carrito.length > 0
                        ?
                        carrito.map(cart => (
                            <div key={cart.producto._id} className="row d-flex align-items-center">
                                <div className="col-4">
                                    <img
                                        src={cart.producto.img}
                                        alt={cart.producto.nombre}
                                        className="img-thumbnail"
                                    />
                                </div>
                                <div className="col-8">
                                    <h5 className="text-black-50">{cart.producto.nombre}</h5>
                                    <div><b>Unidades: {cart.unidades}</b></div>
                                    <div><b>{(cart.producto.precio * cart.unidades).toFixed(2)} €</b></div>
                                </div>
                                <hr className="my-3" />
                            </div>
                        ))
                        :
                        "No hay artículos en tu carrito"
                }
            </Offcanvas.Body>
        </Offcanvas>
    )
}