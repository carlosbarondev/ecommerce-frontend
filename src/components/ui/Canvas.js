import { useSelector } from "react-redux";
import { Button, Offcanvas } from "react-bootstrap";


export const Canvas = ({ show, setShow }) => {

    const { carrito } = useSelector(state => state.cart);

    const handleClose = () => setShow(false);

    return (
        <Offcanvas show={show} onHide={handleClose} placement={'end'}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Mi carrito</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {
                    carrito.length > 0
                        ?
                        <div className="mb-4 d-grid gap-2">
                            <h3>TOTAL: 100 €</h3>
                            <Button className="mt-1" variant="warning" size="lg" onClick={handleClose}>
                                Realizar Pedido
                            </Button>
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
                                        className="img-thumbnail animate__animated animate__fadeInLeft"
                                    />
                                </div>
                                <div className="col-8 animate__animated animate__fadeIn">
                                    <h3>{cart.producto.nombre}</h3>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item"><b>Unidades: </b>{cart.unidades}</li>
                                        <li className="list-group-item"><b>Precio: </b>{cart.unidades * cart.producto.precio} €</li>
                                    </ul>
                                </div>
                            </div>
                        ))
                        :
                        "No hay artículos en tu carrito"
                }
            </Offcanvas.Body>
        </Offcanvas>
    )
}