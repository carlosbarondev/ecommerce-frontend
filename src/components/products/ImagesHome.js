import { Col, Image, Row } from "react-bootstrap"


export const ImagesHome = () => {
    return (
        <Row className="animate__animated animate__fadeIn">
            <Col xs={4}>
                <Image src="https://img-live.goboo.vip/goods/20211227/1640584815769_9673885.jpg?imageMogr2/format/webp" fluid />
            </Col>
            <Col xs={4}>
                <Image src="https://img-live.goboo.vip/goods/20211227/1640584831523_2705053.jpg?imageMogr2/format/webp" fluid />
            </Col>
            <Col xs={4}>
                <Image src="https://img-live.goboo.vip/goods/20220106/1641440269761_514887.png?imageMogr2/format/webp" fluid />
            </Col>
        </Row>
    )
}