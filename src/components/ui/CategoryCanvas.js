import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ListGroup, Offcanvas } from "react-bootstrap";

import { categoryCanvasChange } from "../../actions/ui";
import { fetchSinToken } from "../../helpers/fetch";


export const CategoryCanvas = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { categoryCanvas, backdrop } = useSelector(state => state.ui);

    const [categorias, setCategorias] = useState();
    const [menu, setMenu] = useState(1);
    const [indexCat, setIndexCat] = useState();
    const [checking, setChecking] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const resp = await fetchSinToken('categorias');
                const body = await resp.json();
                setCategorias(body.categorias);
                console.log(body);

                setChecking(true);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const handleClose = () => {
        dispatch(categoryCanvasChange());
        setTimeout(() => {
            setMenu(1);
        }, 500);
    }

    const handleChangeMenu = (idCat) => {
        const index = categorias.findIndex(cat => cat._id === idCat);
        console.log(index);
        setIndexCat(index);
        setMenu(2);
    }

    const handleLink = (nombreSub) => {
        navigate(`/${categorias[indexCat].nombre}/${nombreSub}`);
        dispatch(categoryCanvasChange());
        setTimeout(() => {
            setMenu(1);
        }, 500);
    }

    return (
        checking &&
        <Offcanvas
            show={categoryCanvas}
            onHide={handleClose}
            backdrop={backdrop}
            scroll={true}
        >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Categorías</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {
                    menu === 1
                        ? <ListGroup className="animate__animated animate__fadeInLeft animate__faster">
                            {
                                categorias.map(categoria => (
                                    <ListGroup.Item key={categoria._id} className="border-0" action onClick={() => handleChangeMenu(categoria._id)}>
                                        {categoria.nombre}
                                    </ListGroup.Item>
                                ))
                            }
                        </ListGroup>
                        : <ListGroup className="animate__animated animate__fadeInRight animate__faster">
                            <button onClick={() => setMenu(1)}>MENÚ PRINCIPAL</button>
                            {
                                categorias[indexCat].subcategorias.map(sub => (
                                    <ListGroup.Item key={sub._id} className="border-0" action onClick={() => handleLink(sub.nombre)}>
                                        {sub.nombre}
                                    </ListGroup.Item>
                                ))
                            }
                        </ListGroup>
                }
            </Offcanvas.Body>
        </Offcanvas>
    )
}