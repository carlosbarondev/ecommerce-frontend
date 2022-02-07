import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";


export const Product = (props) => {

    const navigate = useNavigate();

    const { nombre, precio, img, categoria, subcategoria } = props;

    return (
        <Card className="cardProduct" onClick={() => navigate(`/${categoria.nombre}/${subcategoria.nombre}/${nombre.replace(/\s+/g, "-")}`)}>
            <div className="d-flex justify-content-center">
                <Card.Img variant="top" src={img} />
                <Card.Body className="d-flex justify-content-center">
                    <Card.Text className="cardName">{nombre.charAt(0).toUpperCase() + nombre.slice(1)}</Card.Text>
                    <Card.Title className="cardPrice"><b>{precio} €</b></Card.Title>
                </Card.Body>
            </div>
        </Card >
    )
}