import { useEffect, useState } from "react";
import { Row } from "react-bootstrap"

import { fetchSinToken } from "../../helpers/fetch";
import { Product } from "./Product"


export const ProductListBest = ({ categoria }) => {

    const [productos, setProductos] = useState();
    const [checking, setChecking] = useState(false);
    console.log(categoria);

    useEffect(() => {
        async function fetchData() {
            try {
                const resp = await fetchSinToken(`productos/mejor/?desde=0&limite=4&categoria=${categoria}&ordenar=${"-vendido"}`);
                const body = await resp.json();
                console.log(body);

                setProductos(body.productos);
                setChecking(true);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [categoria]);

    return (
        checking
            ? <div className="animate__animated animate__fadeIn mb-5">
                <h4 className="mt-5 mb-4">Artículos más vendidos en <b>{categoria}</b></h4>
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