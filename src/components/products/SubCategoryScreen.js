import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Row } from "react-bootstrap"

import { fetchSinToken } from "../../helpers/fetch";
import { Product } from "./Product";


export const SubCategoryScreen = () => {

    const navigate = useNavigate();

    const { SubCategoriaNombre } = useParams();

    const [productos, setProductos] = useState();
    const [nombre, setNombre] = useState();
    const [checking, setChecking] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const resp = await fetchSinToken(`categorias/subcategoria/${SubCategoriaNombre.replace(/-/g, " ")}`);
                const body = await resp.json();
                setNombre(body.subcategoria.nombre);
                setProductos(body.subcategoria.productos);
                setChecking(true);
            } catch (error) {
                console.log(error);
                navigate("/");
            }
        }
        fetchData();
    }, [SubCategoriaNombre, navigate]);

    return (
        checking && <div className="animate__animated animate__fadeIn">
            <h4 className="mt-4 mb-3"><b>{nombre}</b></h4>
            <Row xs={2} sm={2} md={3} lg={4} xl={4} className="g-0">
                {
                    productos.map(producto => (
                        <Product
                            key={producto._id}
                            nombreCat={producto.categoria}
                            nombreSub={producto.subcategoria}
                            {...producto}
                        />
                    ))
                }
            </Row>
        </div>
    )
}