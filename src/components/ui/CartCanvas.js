import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Offcanvas } from "react-bootstrap";
import { normalizeText } from 'normalize-text';

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
                                <div className="col-4 text-center">
                                    <img
                                        src={cart.producto.img ? cart.producto.img : "/assets/no-image.png"}
                                        alt={cart.producto.nombre}
                                        className="img-thumbnail"
                                        style={{ "maxHeight": "8rem" }}
                                    />
                                </div>
                                <div className="col-8">
                                    <Link className="linkProducto" onClick={handleClose} style={{ "fontSize": "20px" }} to={`/${normalizeText(cart.producto.categoria.nombre.replace(/\s+/g, "-"))}/${normalizeText(cart.producto.subcategoria.nombre.replace(/\s+/g, "-"))}/${normalizeText(cart.producto.nombre.replace(/\s+/g, "-"))}`}>{cart.producto.nombre}</Link>
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