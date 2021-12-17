import { useSelector } from "react-redux";
import { Row } from "react-bootstrap"

import { Product } from "./Product"


export const Products = () => {

    const { productos } = useSelector(state => state.products);

    return (
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
    )
}