import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";


export const Product = (children) => {

    const { _id, nombre, descripcion, precio, img } = children;

    return (
        <Link to={`${_id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
            <Card className="col animate__animated animate__fadeIn">
                <Card.Img variant="top" src={img} />
                <Card.Body>
                    <Card.Title>{nombre.charAt(0).toUpperCase() + nombre.slice(1)}</Card.Title>
                    <Card.Text>{descripcion.charAt(0).toUpperCase() + descripcion.slice(1)}</Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">Precio: {precio}</small>
                </Card.Footer>
            </Card>
        </Link >
    )
}