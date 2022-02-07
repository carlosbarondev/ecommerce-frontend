import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";


export const SubCategory = (children) => {

    const navigate = useNavigate();

    const { nombre, img, CategoriaNombre } = children;

    return (
        <Card className="cardCategory" onClick={() => navigate(`/${CategoriaNombre}/${nombre}`)}>
            <div className="d-flex justify-content-center">
                <Card.Img variant="top" src={img} />
                <Card.Body className="d-flex justify-content-center">
                    <Card.Title className="cardCategoryBody">{nombre.charAt(0).toUpperCase() + nombre.slice(1)}</Card.Title>
                </Card.Body>
            </div>
        </Card >
    )
}