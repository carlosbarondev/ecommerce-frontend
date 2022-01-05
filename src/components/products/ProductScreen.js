import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

import { fetchSinToken } from "../../helpers/fetch";
import { productStartAdd } from "../../actions/cart";


export const ProductScreen = () => {

    const { ProductoId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [producto, setProducto] = useState();
    const [checking, setChecking] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const resp = await fetchSinToken(`productos/${ProductoId}`);
                const body = await resp.json();
                setProducto(body.producto);
                setChecking(true);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [ProductoId]);

    const handleReturn = () => {
        navigate(-1);
    }

    const handleCart = () => {
        dispatch(productStartAdd(producto));
    }

    const handleBuy = async () => {
        await dispatch(productStartAdd(producto));
        navigate("/cart");
    }

    return (
        checking && <div className="row mt-5">
            <div className="col-4">
                <img
                    src={producto.img}
                    alt={producto.nombre}
                    className="img-thumbnail animate__animated animate__fadeInLeft"
                />
            </div>
            <div className="col-8 animate__animated animate__fadeIn">
                <h3>{producto.nombre}</h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><b>Descripción: </b>{producto.descripcion}</li>
                    <li className="list-group-item"><b>Precio: </b>{producto.precio}</li>
                    <li className="list-group-item"><b>Stock: </b>{producto.stock}</li>
                </ul>

                <h5 className="mt-3">Characters</h5>
                <p>{producto.nombre}</p>

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
                    <Button className="mt-1" variant="warning" size="lg" onClick={handleBuy}>
                        Comprar
                    </Button>
                </div>
            </div>
        </div>
    )
}