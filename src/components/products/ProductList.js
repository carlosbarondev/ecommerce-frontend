import { useEffect, useState } from "react";
import { Row } from "react-bootstrap"

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
        checking && <div className="animate__animated animate__fadeIn">
            <h4 className="mt-5 mb-4"><b>Artículos mejor valorados</b></h4>
            <Row xs={2} sm={2} md={3} lg={4} xl={4} className="g-5">
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