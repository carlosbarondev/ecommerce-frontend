import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

import { productStartAdd } from "../../actions/cart";


export const ProductScreen = () => {

    const navigate = useNavigate();

    const { ProductoId } = useParams();
    const { productos, productoActivo } = useSelector(state => state.products);
    const dispatch = useDispatch();

    const producto = productos.find(p => p._id === ProductoId);

    if (!producto) {
        return <Navigate to='/' />
    }

    const { nombre, descripcion, precio, stock, img } = producto;

    const handleReturn = () => {
        navigate(-1);
    }

    const handleCart = () => {
        dispatch(productStartAdd(productoActivo));
    }

    return (
        <div className="row mt-5">
            <div className="col-4">
                <img
                    src={img}
                    alt={nombre}
                    className="img-thumbnail animate__animated animate__fadeInLeft"
                />
            </div>
            <div className="col-8 animate__animated animate__fadeIn">
                <h3>{nombre}</h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><b>Descripción: </b>{descripcion}</li>
                    <li className="list-group-item"><b>Precio: </b>{precio}</li>
                    <li className="list-group-item"><b>Stock: </b>{stock}</li>
                </ul>

                <h5 className="mt-3">Characters</h5>
                <p>{nombre}</p>

                <button
                    className="btn btn-outline-info"
                    onClick={handleReturn}
                >
                    Regresar
                </button>
                <div className="mt-3 d-grid gap-2">
                    <Button variant="outline-dark" size="lg" onClick={handleCart}>
                        Añadir al carrito
                    </Button>
                    <Button className="mt-1" variant="warning" size="lg">
                        Comprar
                    </Button>
                </div>
            </div>
        </div>
    )
}