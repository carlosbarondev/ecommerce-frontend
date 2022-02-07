import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row } from "react-bootstrap"

import { fetchSinToken } from "../../helpers/fetch";
import { SubCategory } from "./SubCategory";


export const SubCategoryList = () => {

    const { CategoriaNombre } = useParams();
    console.log(CategoriaNombre);

    const [subcategorias, setSubcategorias] = useState();
    const [nombre, setNombre] = useState();
    const [checking, setChecking] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const resp = await fetchSinToken(`categorias/${CategoriaNombre}`);
                const body = await resp.json();
                const { categoria } = body;
                setNombre(categoria.nombre);
                setSubcategorias(categoria.subcategorias);
                setChecking(true);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [CategoriaNombre]);

    return (
        checking && <div className="animate__animated animate__fadeIn">
            <h4 className="mt-4 mb-4"><b>{nombre}</b></h4>
            <Row xs={2} sm={2} md={3} lg={4} xl={5} className="g-5">
                {
                    subcategorias.map(subcategoria => (
                        <SubCategory
                            key={subcategoria._id}
                            CategoriaNombre={CategoriaNombre}
                            {...subcategoria}
                        />
                    ))
                }
            </Row>
        </div>
    )
}