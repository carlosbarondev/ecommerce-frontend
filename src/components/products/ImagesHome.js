import { Col, Image, Row } from "react-bootstrap"


export const ImagesHome = () => {
    return (
        <div className="navbarDisable">
            <Row className="animate__animated animate__fadeIn">
                <Col xs={4}>
                    <Image src="/assets/small_xiaomi.webp" fluid />
                </Col>
                <Col xs={4}>
                    <Image src="/assets/small_reloj.webp" fluid />
                </Col>
                <Col xs={4}>
                    <Image src="/assets/small_auriculares.webp" fluid />
                </Col>
            </Row>
        </div>
    )
}