import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Row } from "react-bootstrap"

import { fetchSinToken } from "../../helpers/fetch";
import { Category } from "./Category";
import { categoryCanvasChange } from "../../actions/ui";


export const CategoryList = () => {

    const dispatch = useDispatch();

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

    const handleShowCategory = () => dispatch(categoryCanvasChange());

    return (
        checking && <div className="animate__animated animate__fadeIn">
            <h4 className="mt-3 mb-3">
                <b>Categorías destacadas</b>
                <button className="botonLinkProducto ms-2" style={{ "fontSize": "16px" }} onClick={handleShowCategory}>Ver más</button>
            </h4>
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