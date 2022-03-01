import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Image } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import Swal from "sweetalert2";
import ReactRoundedImage from "react-rounded-image";

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
                    console.log(body.msg);
                    // Swal.fire('Error', body.msg, 'error');
                    navigate("/");
                } else {
                    setProducto(body.producto);
                    setChecking(true);
                }
            } catch (error) {
                console.log(error);
                navigate("/");
            }
        }
        fetchData();
    }, [ProductoNombre, navigate]);

    const handleCart = () => {
        if (producto.estado) {
            if (producto.stock > 0) {
                if (cantidad > 0) {
                    if (cantidad <= producto.stock) {
                        dispatch(productStartAdd(producto, cantidad));
                    } else {
                        Swal.fire('Escasez de stock', 'Su pedido es mayor al stock del artículo', 'warning');
                    }
                }
            } else {
                Swal.fire('Artículo agotado', 'El artículo estará disponible próximamente', 'warning');
            }
        } else {
            Swal.fire('Artículo descatalogado', 'El artículo ya no está disponible', 'warning');
        }
    }

    const handleBuy = () => {
        if (producto.estado) {
            if (producto.stock > 0) {
                if (cantidad > 0) {
                    if (cantidad <= producto.stock) {
                        const productIndex = carrito.findIndex(pid => pid.producto._id === producto._id);
                        if (carrito[productIndex]?.unidades === undefined) {
                            dispatch(productStartAdd(producto, cantidad, true));
                        }
                        navigate("/cart");
                    } else {
                        Swal.fire('Escasez de stock', 'Su pedido es mayor al stock del artículo', 'warning');
                    }
                }
            } else {
                Swal.fire('Artículo agotado', 'El artículo estará disponible próximamente', 'warning');
            }
        } else {
            Swal.fire('Artículo descatalogado', 'El artículo ya no está disponible', 'warning');
        }
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
                return Swal.fire('Inicia sesión', "Identifícate para añadir el artículo a tu lista de deseos", 'warning');
            } else {
                return Swal.fire('Artículo añadido a tu lista', "Accede a tu lista de deseos para organizar tus compras", 'success');
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
                <div className="col-12 col-lg-5 text-center">
                    <Image
                        src={producto.img ? producto.img : "/assets/no-image.png"}
                        alt={producto.nombre}
                        className="animate__animated animate__fadeInLeft mb-5 mb-lg-0 imagenDetalleProducto"
                        fluid
                    />
                </div>
                <div className="col-12 col-lg-7">
                    <h3>{producto.nombre}</h3>
                    <div className="d-flex align-items-center">
                        <Rating
                            className="me-2 mb-1"
                            style={{ "pointerEvents": "none" }}
                            size={20}
                            ratingValue={producto.rating}
                            allowHover={false}
                        />
                        <div>
                            {
                                producto.opinion.length > 0
                                    ? <a className="linkNormal text-muted" href="#stars">{producto.opinion.length === 1 ? `${producto.opinion.length} valoración` : `${producto.opinion.length} valoraciones`}</a>
                                    : `Sin valoraciones`
                            }
                        </div>
                    </div>
                    <h4 className="mt-2 mb-3"><b>{producto.precio} €</b></h4>

                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <div className="fw-bold">Detalles del producto</div>
                            <div className="mt-2 ms-4 mb-2" style={{ "whiteSpace": "pre-wrap" }}>{producto.descripcion}</div>
                        </li>
                        <li className="list-group-item">
                            <span className="fw-bold">Stock: </span>
                            {
                                producto.estado
                                    ? producto.stock > 0 ? `${producto.stock} unidades`
                                        : <span className="p-1 rounded" style={{ "backgroundColor": "#cc0000", "color": "white", "fontWeight": "bolder" }}>Producto agotado</span>
                                    : <span className="p-1 rounded" style={{ "backgroundColor": "#cc0000", "color": "white", "fontWeight": "bolder" }}>Producto descatalogado</span>
                            }
                        </li>
                    </ul>

                    <div className="input-group mt-3 mb-1">
                        <button onClick={handleClick} className="border" style={{ height: "30px", width: "30px", marginLeft: "auto" }}>-</button>
                        <input className="text-center border" type="text" value={cantidad} onChange={e => handleChange(parseInt(e.target.value))} style={{ height: "30px", width: "30px" }} />
                        <button onClick={() => setCantidad(cantidad + 1)} className="border" style={{ height: "30px", width: "30px", marginRight: "auto" }}>+</button>
                    </div>

                    <div className="d-flex gap-2 mt-4">
                        <Button className="flex-fill" variant="outline-danger" size="lg" onClick={() => handleWish(producto._id)}>
                            <i className="fa-solid fa-heart"></i>
                        </Button>
                        <div className="flex-fill buttonDisable2">
                            <Button className="flex-fill" variant="outline-dark" size="lg" onClick={handleCart}>
                                <i className="fa-solid fa-cart-plus"></i> Añadir al carrito
                            </Button>
                        </div>
                        <div className="flex-fill buttonDisable">
                            <Button className="flex-fill" variant="outline-dark" size="lg" onClick={handleCart}>
                                <i className="fa-solid fa-cart-plus"></i> Añadir
                            </Button>
                        </div>
                        <Button className="flex-fill" variant="warning" size="lg" onClick={handleBuy}>
                            Comprar <i className="fa-solid fa-share"></i>
                        </Button>
                    </div>
                </div>
            </div>
            <hr className="mt-5 mb-5" />
            <div className="mb-5 ms-2 ms-sm-0">
                <div className="mb-5">
                    <h4 id="stars" style={{ "display": "inline" }} className="me-3 align-middle">
                        {`Valoraciones (${producto.opinion.length})`}
                    </h4>
                    <Rating
                        className="mt-2 mt-sm-1 me-3"
                        showTooltip
                        tooltipDefaultText="El artículo no tiene comentarios"
                        tooltipArray={['Muy malo', 'Malo', 'Bueno', 'Muy bueno', 'Excelente']}
                        tooltipStyle={{ "background": "#00A3C8", "fontSize": "20px", "margin": "0", "marginTop": "6px" }}
                        style={{ "pointerEvents": "none" }}
                        size={30}
                        ratingValue={producto.rating}
                        allowHover={false}
                    />
                </div>
                {
                    producto.opinion.map((op, index) => (
                        op.usuario.estado && <div className="row mt-2" key={op._id}>
                            <div className="col-sm-12 col-md-4">
                                <div className="row">
                                    <div className="col-2">
                                        {
                                            op.usuario.rol !== "ADMIN_ROLE"
                                                ? op.usuario.img
                                                    ? <div className="ms-2 me-3">
                                                        <ReactRoundedImage
                                                            image={op.usuario.img ? op.usuario.img : "/assets/no-image.png"}
                                                            roundedColor="#49c1e1"
                                                            imageWidth="50"
                                                            imageHeight="50"
                                                            roundedSize="2"
                                                            borderRadius="15"
                                                        />
                                                    </div>
                                                    : <div className="circulo ms-2 me-3">
                                                        <i className="fa-solid fa-user fa-lg"></i>
                                                    </div>
                                                : <div className="circulo ms-2 me-3">
                                                    <i className="fa-solid fa-user-gear fa-lg"></i>
                                                </div>
                                        }
                                    </div>
                                    <div className="col-10 d-flex align-items-center">
                                        <div className="ms-2" style={{ "fontSize": "20px" }}>{`${op.usuario.nombre}`}</div>
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