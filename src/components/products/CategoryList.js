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
                const resp = await fetchSinToken('categorias?desde=0&limite=5');
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
        checking && <div className="animate__animated animate__fadeIn">
            <h4 className="mt-3 mb-3"><b>Categorías destacadas</b></h4>
            <Row xs={2} sm={3} md={4} lg={5} xl={5} className="g-0">
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