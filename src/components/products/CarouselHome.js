import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { normalizeText } from 'normalize-text';


export const CarouselHome = () => {
    return <Carousel variant="dark" className="animate__animated animate__fadeIn navbarDisable mb-5">
        <Carousel.Item>
            <Link to={`/${normalizeText("Electronica".replace(/\s+/g, '-'))}/${normalizeText("Tablets".replace(/\s+/g, '-'))}/${normalizeText("Samsung Galaxy Tab S8 Ultra".replace(/\s+/g, "-"))}`}>
                <img
                    className="d-block w-100"
                    src="/assets/tab.jpeg"
                    alt="First slide"
                />
            </Link>
        </Carousel.Item>
        <Carousel.Item>
            <Link to={`/${normalizeText("Electronica".replace(/\s+/g, '-'))}/${normalizeText("Auriculares".replace(/\s+/g, '-'))}/${normalizeText("Apple AirPods (3.ª generación)".replace(/\s+/g, "-"))}`}>
                <img
                    className="d-block w-100"
                    src="/assets/airpods.jpg"
                    alt="Second slide"
                />
            </Link>
        </Carousel.Item>
        <Carousel.Item>
            <Link to={`/${normalizeText("Informatica".replace(/\s+/g, '-'))}/${normalizeText("Portatiles".replace(/\s+/g, '-'))}/${normalizeText("Apple MacBook Pro".replace(/\s+/g, "-"))}`}>
                <img
                    className="d-block w-100"
                    src="/assets/macbook.jpg"
                    alt="Third slide"
                />
            </Link>
        </Carousel.Item>
    </Carousel>
};