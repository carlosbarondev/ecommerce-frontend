import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";


export const Product = (props) => {
    console.log(props);

    const { _id, nombre, descripcion, precio, img, categoria, subcategoria, nombreCategoria, nombreSubcategoria } = props;
    console.log(categoria.nombre, subcategoria, nombreCategoria, nombreSubcategoria);
    return (
        <Link to={`/${nombreCategoria}/${nombreSubcategoria}/${_id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
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
        </Link >
    )
}