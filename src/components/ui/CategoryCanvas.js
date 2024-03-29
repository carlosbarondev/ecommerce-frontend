import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ListGroup, Offcanvas } from "react-bootstrap";
import { normalizeText } from 'normalize-text';
import ReactRoundedImage from "react-rounded-image";

import { categoryCanvasChange } from "../../actions/ui";
import { fetchSinToken } from "../../helpers/fetch";


export const CategoryCanvas = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { categoryCanvas, backdrop } = useSelector(state => state.ui);
    const { nombre, rol, img } = useSelector(state => state.auth);

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
                setChecking(true);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const handleClose = () => {
        dispatch(categoryCanvasChange());
        setMenu(1);
    }

    const handleChangeMenu = (idCat) => {
        const index = categorias.findIndex(cat => cat._id === idCat);
        setIndexCat(index);
        setMenu(2);
    }

    const handleLink = (nombreSub) => {
        navigate(`/${normalizeText(categorias[indexCat].nombre.replace(/\s+/g, '-'))}/${normalizeText(nombreSub.replace(/\s+/g, '-'))}`);
        dispatch(categoryCanvasChange());
        setMenu(1);
    }

    return (
        checking &&
        <Offcanvas
            show={categoryCanvas}
            onHide={handleClose}
            backdrop={backdrop}
            scroll={true}
        >
            <Offcanvas.Header className="canvasCategoryTitle" closeButton closeVariant="white">
                <Offcanvas.Title>
                    <div className="d-flex align-items-center">
                        {
                            rol !== "ADMIN_ROLE"
                                ? img
                                    ? <div className="ms-2 me-3">
                                        <ReactRoundedImage
                                            image={img ? img : "/assets/no-image.png"}
                                            roundedColor="#49c1e1"
                                            imageWidth="50"
                                            imageHeight="50"
                                            roundedSize="2"
                                            borderRadius="15"
                                        />
                                    </div>
                                    : <i className="fa-solid fa-circle-user fa-xl ms-3 me-3"></i>
                                : <i className="fa-solid fa-user-gear fa-xl ms-3 me-3"></i>
                        }
                        {
                            nombre
                                ? `Hola, ${nombre}`
                                : <span
                                    onClick={() => {
                                        navigate("/login")
                                        dispatch(categoryCanvasChange())
                                    }}>
                                    Hola, Identifícate
                                </span>
                        }
                    </div>
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {
                    menu === 1
                        ? <div>
                            <div className="mb-3">
                                <strong>CATEGORÍAS</strong>
                            </div>
                            <ListGroup className="animate__animated animate__fadeInLeft">
                                {
                                    categorias.map(categoria => (
                                        <ListGroup.Item key={categoria._id} className="border-0 d-flex align-items-center canvasCategoryHover" action onClick={() => handleChangeMenu(categoria._id)}>
                                            {categoria.nombre}<i className="fa-solid fa-angle-right ms-auto canvasCategoryArrow"></i>
                                        </ListGroup.Item>
                                    ))
                                }
                            </ListGroup>
                        </div>
                        : <div>
                            <div className="mb-3 d-flex align-items-center" style={{ "cursor": "pointer" }} onClick={() => setMenu(1)}>
                                <b><i className="fa-solid fa-arrow-left mx-3"></i>MENÚ PRINCIPAL</b>
                            </div>
                            <ListGroup className="animate__animated animate__fadeInRight animate__faster">
                                <ListGroup.Item key="all" className="border-0 canvasCategoryHover" action onClick={() => handleLink("")}>
                                    Todo en {categorias[indexCat].nombre}
                                </ListGroup.Item>
                                {
                                    categorias[indexCat].subcategorias.map(sub => (
                                        <ListGroup.Item key={sub._id} className="border-0 canvasCategoryHover" action onClick={() => handleLink(sub.nombre)}>
                                            {sub.nombre}
                                        </ListGroup.Item>
                                    ))
                                }
                            </ListGroup>
                        </div>
                }
            </Offcanvas.Body>
        </Offcanvas>
    )
}