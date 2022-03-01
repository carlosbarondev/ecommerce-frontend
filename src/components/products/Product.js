import { useNavigate } from "react-router-dom";
import { Card, Image } from "react-bootstrap";
import { normalizeText } from 'normalize-text';


export const Product = (props) => {

    const navigate = useNavigate();
    //console.log(nombreCat, nombreSub);

    const { nombre, precio, img, categoria, subcategoria } = props;

    return (
        <Card className="cardProduct" onClick={() => navigate(`/${normalizeText(categoria.nombre.replace(/\s+/g, '-'))}/${normalizeText(subcategoria.nombre.replace(/\s+/g, '-'))}/${normalizeText(nombre.replace(/\s+/g, "-"))}`)}>
            <div className="d-flex flex-column">
                <div className="border-section">
                    <Image className="imagenCentrar" src={img ? img : "/assets/no-image.png"} fluid />
                </div>
                <Card.Body className="d-flex justify-content-center">
                    <Card.Text className="cardName text-muted">{nombre.charAt(0).toUpperCase() + nombre.slice(1)}</Card.Text>
                    <Card.Title className="cardPrice"><b>{precio} €</b></Card.Title>
                </Card.Body>
            </div>
        </Card >
    )
}