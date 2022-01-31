import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";


export const SubCategory = (children) => {

    const { nombre, CategoriaNombre } = children;

    return (
        <Link to={`/${CategoriaNombre}/${nombre}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
            <Card>
                {/* <Card.Img variant="top" src={img} /> */}
                <Card.Body>
                    <Card.Title>{nombre.charAt(0).toUpperCase() + nombre.slice(1)}</Card.Title>
                    {/* <Card.Text>{descripcion.charAt(0).toUpperCase() + descripcion.slice(1)}</Card.Text> */}
                </Card.Body>
                {/* <Card.Footer>
                    <small className="text-muted">Precio: {precio}</small>
                </Card.Footer> */}
            </Card>
        </Link >
    )
}