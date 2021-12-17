import { Card } from "react-bootstrap"


export const Product = ({ nombre, descripcion, precio, img }) => {
    return (
        <Card>
            <Card.Img variant="top" src={img} />
            <Card.Body>
                <Card.Title>{nombre.charAt(0).toUpperCase() + nombre.slice(1)}</Card.Title>
                <Card.Text>{descripcion.charAt(0).toUpperCase() + descripcion.slice(1)}</Card.Text>
            </Card.Body>
            <Card.Footer>
                <small className="text-muted">Precio: {precio}</small>
            </Card.Footer>
        </Card>
    )
}