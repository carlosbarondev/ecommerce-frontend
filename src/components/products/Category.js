import { useNavigate } from "react-router-dom";
import { Card, Image } from "react-bootstrap";
import { normalizeText } from 'normalize-text';

export const Category = (children) => {

    const navigate = useNavigate();

    const { nombre, img } = children;

    return (
        <Card className="cardCategory" onClick={() => navigate(`/${normalizeText(nombre.replace(/\s+/g, '-'))}`, {
            state: nombre
        })}>
            <div className="d-flex flex-column">
                <div className="border-section-category">
                    <Image className="imagenCentrar" src={img ? img : "/assets/no-image.png"} fluid />
                </div>
                <Card.Body className="d-flex justify-content-center">
                    <Card.Title className="cardCategoryBody">{nombre.charAt(0).toUpperCase() + nombre.slice(1)}</Card.Title>
                </Card.Body>
            </div>
        </Card >
    )
}