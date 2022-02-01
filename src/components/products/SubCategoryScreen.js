import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row } from "react-bootstrap"

import { fetchSinToken } from "../../helpers/fetch";
import { Product } from "./Product";


export const SubCategoryScreen = () => {

    const { SubCategoriaNombre } = useParams();

    const [productos, setProductos] = useState();
    const [checking, setChecking] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const resp = await fetchSinToken(`categorias/subcategoria/${SubCategoriaNombre}`);
                const body = await resp.json();
                setProductos(body.subcategoria.productos);
                setChecking(true);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [SubCategoriaNombre]);

    return (
        checking && <div className="col animate__animated animate__fadeIn">
            <h3>{SubCategoriaNombre}</h3>
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