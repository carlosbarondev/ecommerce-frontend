import { Col, Row } from "react-bootstrap"
import { Product } from "./Product"

export const Products = () => {
    return (
        <Row xs={2} sm={3} md={5} lg={8} xl={12} className="g-0">
            {Array.from({ length: 18 }).map((_, idx) => (
                <Col>
                    <Product />
                </Col>
            ))}
        </Row>
    )
}