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
        checking && <div className="animate__animated animate__fadeIn">
            <h4 className="mt-4 mb-4"><b>{SubCategoriaNombre}</b></h4>
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