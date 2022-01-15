import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";

import { fetchSinToken } from "../../helpers/fetch";
import { productStartAdd } from "../../actions/cart";


export const ProductScreen = () => {

    const { ProductoId } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { carrito } = useSelector(state => state.cart);

    const [producto, setProducto] = useState();
    const [cantidad, setCantidad] = useState(1);
    const [checking, setChecking] = useState(false);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };

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
        dispatch(productStartAdd(producto, cantidad));
    }

    const handleBuy = () => {
        const productIndex = carrito.findIndex(pid => pid.producto._id === producto._id);
        if (carrito[productIndex]?.unidades === undefined) {
            dispatch(productStartAdd(producto, cantidad, true));
        }
        navigate("/cart");
    }

    const handleClick = () => {
        if (cantidad >= 2) {
            setCantidad(cantidad - 1)
        }
    }

    return (
        checking && <div className="animate__animated animate__fadeIn">
            <div className="row mt-5">
                <div className="col-4">
                    <img
                        src={producto.img}
                        alt={producto.nombre}
                        className="img-thumbnail animate__animated animate__fadeInLeft"
                    />
                </div>
                <div className="col-8">
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
                    <div className="input-group">
                        <button onClick={handleClick} style={{ height: "30px", width: "30px", marginLeft: "auto" }}>-</button>
                        <input className="text-center" type="text" value={cantidad} readOnly style={{ height: "30px", width: "30px" }} />
                        <button onClick={() => setCantidad(cantidad + 1)} style={{ height: "30px", width: "30px", marginRight: "auto" }}>+</button>
                    </div>
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
            <div style={{ "marginTop": "80px" }}>
                <h4 className="comentarios" style={{ "marginBottom": "30px" }}>
                    {`Valoraciones(${producto.opinion.length})`}
                    <Rating
                        showTooltip
                        tooltipDefaultText="Sin opiniones"
                        tooltipArray={['Muy malo', 'Malo', 'Bueno', 'Muy bueno', 'Excelente']}
                        tooltipStyle={{ "background": "#00A3C8" }}
                        style={{ "pointerEvents": "none", "marginLeft": "8px" }}
                        size={30}
                        ratingValue={producto.rating}
                        allowHover={false}
                    />
                </h4>
                {
                    producto.opinion.map(op => (
                        <div className="row mt-2" key={op._id} >
                            <hr />
                            <div className="col-sm-12 col-md-4">
                                <div className="row">
                                    <div className="col-2">
                                        <div className="circulo me-2">
                                            <i className="fa-solid fa-user"></i>
                                        </div>
                                    </div>
                                    <div className="col-10">
                                        <div style={{ "fontSize": "18px" }}>{`${op.usuario.nombre}`}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-8 mt-sm-2 mt-md-0">
                                <div className="comentarios">
                                    <Rating
                                        style={{ "pointerEvents": "none", "marginRight": "8px" }}
                                        size={20}
                                        ratingValue={op.rating}
                                        allowHover={false}
                                    />
                                    <div style={{ "fontSize": "18px" }}>{`${op.titulo}`}</div>
                                </div>
                                <div style={{ "fontSize": "14px" }}>{`${new Date(op.fecha).toLocaleDateString("es-ES", options)}`}</div>
                                <div className="mt-3">{`${op.comentario}`}</div>
                            </div>
                            <hr className="mt-4" />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}