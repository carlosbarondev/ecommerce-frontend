import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row } from "react-bootstrap"

import { Product } from "./Product"
import { productsStartLoad } from "../../actions/products";


export const Products = () => {

    const dispatch = useDispatch();
    const { productos } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(productsStartLoad());
    }, [dispatch]);

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