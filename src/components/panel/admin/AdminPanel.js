import { useNavigate } from "react-router-dom";


export const AdminPanel = () => {

    const navigate = useNavigate();

    return (
        <div className="animate__animated animate__fadeIn mt-4">
            <h5>Administración</h5>
            <div className="list-group">
                <button className="list-group-item list-group-item-action border-0 listaFondo" onClick={() => navigate("/panel/usuarios")}>Gestión de usuarios</button>
                <button className="list-group-item list-group-item-action border-0 listaFondo" onClick={() => navigate("/panel/categorias")}>Gestión de categorías</button>
                <button className="list-group-item list-group-item-action border-0 listaFondo" onClick={() => navigate("/panel/productos")}>Gestión de productos</button>
            </div>
        </div>
    )
}