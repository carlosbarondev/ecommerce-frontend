import { useNavigate } from "react-router-dom";


export const MenuPanel = () => {

    const navigate = useNavigate();

    return (
        <>
            <h5>Mi cuenta</h5>
            <div className="list-group">
                <button className="list-group-item list-group-item-action border-0 listaFondo" onClick={() => navigate("/panel/datos")}>Mis datos</button>
                <button className="list-group-item list-group-item-action border-0 listaFondo" onClick={() => navigate("/panel/deseos")}>Lista de deseos</button>
                <button className="list-group-item list-group-item-action border-0 listaFondo" onClick={() => navigate("/panel/valoraciones")}>Valoraciones</button>
                <button className="list-group-item list-group-item-action border-0 listaFondo" onClick={() => navigate("/panel/pedidos")}>Pedidos</button>
            </div>
        </>
    )
};