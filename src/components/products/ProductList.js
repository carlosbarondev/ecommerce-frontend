import { useEffect, useState } from "react";
import { Carousel, Row } from "react-bootstrap"
import { Link } from "react-router-dom";

import { fetchSinToken } from "../../helpers/fetch";
import { Product } from "./Product"


export const ProductList = () => {

    const [productos, setProductos] = useState();
    const [checking, setChecking] = useState(false); //useEffect no se llama hasta despues del render

    useEffect(() => {
        async function fetchData() {
            try {
                const resp = await fetchSinToken('productos');
                const body = await resp.json();
                setProductos(body.productos);
                setChecking(true);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    return (
        checking && <div className="col animate__animated animate__fadeIn">
            <Carousel>
                <Carousel.Item>
                    <Link to={`/Electrónica/Smartphones`}>
                        <img
                            className="d-block w-100"
                            src="https://img-live.goboo.vip/goods/20220124/1643003923401_7475546.jpg?imageMogr2/format/webp"
                            alt="First slide"
                        />
                    </Link>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://img-live.goboo.vip/goods/20220121/1642763437323_8933246.jpg?imageMogr2/format/webp"
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://img-live.goboo.vip/goods/20220117/1642400187994_3106679.jpg?imageMogr2/format/webp"
                        alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
            <Row xs={1} sm={2} md={4} lg={8} xl={16} className="g-0">
                {
                    productos.map(producto => (
                        <Product
                            key={producto._id}
                            {...producto}
                        />
                    ))
                }
            </Row>
        </div>
    )
}