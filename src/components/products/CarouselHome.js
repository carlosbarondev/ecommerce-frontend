import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";


export const CarouselHome = () => {
    return <Carousel className="animate__animated animate__fadeIn navbarDisable mb-5">
        <Carousel.Item>
            <Link to={`/Electrónica/Smartphones`}>
                <img
                    className="d-block w-100"
                    src="https://img-live.goboo.vip/goods/20220124/1643003923401_7475546.jpg?imageMogr2/format/webp"
                    alt="First slide"
                />
            </Link>
        </Carousel.Item>
        <Carousel.Item>
            <img
                className="d-block w-100"
                src="https://img-live.goboo.vip/goods/20220121/1642763437323_8933246.jpg?imageMogr2/format/webp"
                alt="Second slide"
            />
        </Carousel.Item>
        <Carousel.Item>
            <img
                className="d-block w-100"
                src="https://img-live.goboo.vip/goods/20220117/1642400187994_3106679.jpg?imageMogr2/format/webp"
                alt="Third slide"
            />
        </Carousel.Item>
    </Carousel>
};