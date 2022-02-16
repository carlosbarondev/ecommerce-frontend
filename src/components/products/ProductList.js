import { useEffect, useState } from "react";
import { Row } from "react-bootstrap"

import { fetchSinToken } from "../../helpers/fetch";
import { Product } from "./Product"


export const ProductList = ({ desde, limite, ordenar }) => {

    const [productos, setProductos] = useState();
    const [checking, setChecking] = useState(false); //useEffect no se llama hasta despues del render

    useEffect(() => {
        async function fetchData() {
            try {
                const resp = await fetchSinToken(`productos?desde=${desde}&limite=${limite}&ordenar=${ordenar}`);
                const body = await resp.json();
                setProductos(body.productos);
                setChecking(true);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [desde, limite, ordenar]);

    return (
        checking
            ? <div className="animate__animated animate__fadeIn mb-5">
                <h4 className="mt-5 mb-3"><b>{ordenar === "-rating" ? "Artículos mejor valorados" : "Artículos más vendidos"}</b></h4>
                <Row xs={2} sm={2} md={3} lg={4} xl={4} className="g-0">
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
            : <div style={{ "height": "5000px" }}></div>
    )
}