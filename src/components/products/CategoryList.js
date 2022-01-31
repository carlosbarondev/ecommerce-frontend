import { useEffect, useState } from "react";
import { Row } from "react-bootstrap"

import { fetchSinToken } from "../../helpers/fetch";
import { Category } from "./Category";


export const CategoryList = () => {

    const [categorias, setCategorias] = useState();
    const [checking, setChecking] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const resp = await fetchSinToken('categorias');
                const body = await resp.json();
                setCategorias(body.categorias);
                setChecking(true);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    return (
        checking && <div className="col animate__animated animate__fadeIn">
            <h3>Categorias</h3>
            <Row xs={1} sm={2} md={4} lg={8} xl={16} className="g-0">
                {
                    categorias.map(categoria => (
                        <Category
                            key={categoria._id}
                            {...categoria}
                        />
                    ))
                }
            </Row>
        </div>
    )
}