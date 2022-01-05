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
        <Row xs={1} sm={2} md={4} lg={8} xl={16} className="g-0">
            {
                checking && productos.map(producto => (
                    <Product
                        key={producto._id}
                        {...producto}
                    />
                ))
            }
        </Row>
    )
}