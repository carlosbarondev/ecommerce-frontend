import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import Swal from "sweetalert2";

import { fetchConToken, fetchSinToken } from "../../helpers/fetch";
import { productStartAdd } from "../../actions/cart";


export const ProductScreen = () => {

    const { ProductoNombre } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { uid } = useSelector(state => state.auth);
    const { carrito } = useSelector(state => state.cart);

    const [producto, setProducto] = useState();
    const [cantidad, setCantidad] = useState(1);
    const [checking, setChecking] = useState(false);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    useEffect(() => {
        async function fetchData() {
            try {
                const resp = await fetchSinToken(`productos/producto/${ProductoNombre}`);
                const body = await resp.json();
                if (body.msg) {
                    Swal.fire('Error', body.msg, 'error');
                } else {
                    setProducto(body.producto);
                    setChecking(true);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [ProductoNombre]);

    const handleReturn = () => {
        navigate(-1);
    }

    const handleCart = () => {
        if (cantidad > 0) {
            dispatch(productStartAdd(producto, cantidad));
        }
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

    const handleWish = async (idProducto) => {
        try {
            const resp = await fetchConToken(`usuarios/deseos/${uid}`, { deseos: idProducto }, 'POST');
            const body = await resp.json();
            if (body.msg) {
                return Swal.fire('Error', body.msg, 'error');
            }
        } catch (error) {
            console.log(error);
            return Swal.fire('Error', error, 'error');
        }
    }

    const handleChange = (e) => {
        if (e > 0) {
            setCantidad(e);
        } else {
            setCantidad(0);
        }
    }

    return (
        checking && <div className="animate__animated animate__fadeIn">
            <div className="row mt-5">
                <div className="col-12 col-md-4">
                    <img
                        src={producto.img}
                        alt={producto.nombre}
                        className="img-thumbnail animate__animated animate__fadeInLeft mb-4"
                    />
                </div>
                <div className="col-12 col-md-8">
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
                        <button onClick={handleClick} className="border" style={{ height: "30px", width: "30px", marginLeft: "auto" }}>-</button>
                        <input className="text-center border" type="text" value={cantidad} onChange={e => handleChange(parseInt(e.target.value))} style={{ height: "30px", width: "30px" }} />
                        <button onClick={() => setCantidad(cantidad + 1)} className="border" style={{ height: "30px", width: "30px", marginRight: "auto" }}>+</button>
                    </div>
                    <div className="mt-3 d-grid gap-2">
                        <Button onClick={() => handleWish(producto._id)}><i class="fa-solid fa-heart"></i> Deseado</Button>
                        <Button variant="outline-dark" size="lg" onClick={handleCart}>
                            <i class="fa-solid fa-cart-plus"></i> Añadir al carrito
                        </Button>
                        <Button className="mt-1" variant="warning" size="lg" onClick={handleBuy}>
                            Comprar <i class="fa-solid fa-share"></i>
                        </Button>
                    </div>
                </div>
            </div>
            <hr className="mt-5 mb-5" />
            <div className="mb-5 ms-2 ms-sm-0">
                <div className="d-flex align-items-center mb-5">
                    <h4 className="mb-0 me-1">
                        {`Valoraciones (${producto.opinion.length})`}
                    </h4>
                    <Rating
                        showTooltip={window.innerWidth > 400 ? true : false}
                        tooltipDefaultText="Sin opiniones"
                        tooltipArray={['Muy malo', 'Malo', 'Bueno', 'Muy bueno', 'Excelente']}
                        tooltipStyle={{ "background": "#00A3C8", "fontSize": "20px" }}
                        style={{ "pointerEvents": "none", "marginLeft": "8px" }}
                        size={30}
                        ratingValue={producto.rating}
                        allowHover={false}
                    />
                </div>
                {
                    producto.opinion.map((op, index) => (
                        <div className="row mt-2" key={op._id}>
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
                                    <div style={{ "fontSize": "16px" }}><b>{`${op.titulo}`}</b></div>
                                </div>
                                <div style={{ "fontSize": "14px" }}>{`${new Date(op.fecha).toLocaleDateString("es-ES", options)}`}</div>
                                <div className="mt-3">{`${op.comentario}`}</div>
                            </div>
                            {
                                (index !== producto.opinion.length - 1) && <hr className="mt-4" />
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}