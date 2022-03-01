import { useLocation } from "react-router-dom";
import { Row } from "react-bootstrap"

import { Product } from "../products/Product";


export const SearchList = () => {

    const location = useLocation();
    const { nombre, busqueda } = location.state;

    return (
        <div className="animate__animated animate__fadeIn">
            <h4 className="mt-5 mb-4"><b>{`Resultados de búsqueda para "${nombre}" (${busqueda.length})`}</b></h4>
            <Row xs={2} sm={2} md={3} lg={4} xl={4} className="g-0">
                {
                    busqueda.map(producto => (
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