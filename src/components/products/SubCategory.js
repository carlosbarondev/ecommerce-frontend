import { useNavigate } from "react-router-dom";
import { Card, Image } from "react-bootstrap";
import { normalizeText } from 'normalize-text';


export const SubCategory = (children) => {

    const navigate = useNavigate();

    const { nombre, img, CategoriaNombre } = children;

    return (
        <Card className="cardCategory" onClick={() => navigate(`/${normalizeText(CategoriaNombre.replace(/\s+/g, '-'))}/${normalizeText(nombre.replace(/\s+/g, '-'))}`, {
            state: {
                nombreCat: CategoriaNombre,
                nombreSub: nombre
            }
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