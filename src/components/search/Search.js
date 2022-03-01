import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { normalizeText } from 'normalize-text';

import { fetchSinToken } from '../../helpers/fetch';


export const Search = () => {

    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [aux, setAux] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const resp = await fetchSinToken('productos');
                const body = await resp.json();
                body.productos.forEach(p => {
                    const item = {
                        id: p._id,
                        _id: p._id,
                        name: p.nombre,
                        nombre: p.nombre,
                        categoria: p.categoria,
                        subcategoria: p.subcategoria,
                        img: p.img,
                        precio: p.precio
                    }
                    setItems(items => items.concat(item));
                })
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const handleOnSearch = (string, results) => {
        if (string !== "") {
            setAux(string);
            const input = document.querySelector('input');
            input.addEventListener("keyup", function (event) {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    event.target.blur();
                    setAux("");
                    if (event.target.value) {
                        navigate(`/buscar/${event.target.value}`, {
                            state: {
                                nombre: event.target.value,
                                busqueda: results,
                            }
                        });
                    }
                }
            });
        }
    }

    const handleOnSelect = (item) => {
        setAux("");
        navigate(`/${normalizeText(item.categoria.nombre.replace(/\s+/g, "-"))}/${normalizeText(item.subcategoria.nombre.replace(/\s+/g, "-"))}/${normalizeText(item.name.replace(/\s+/g, "-"))}`);
    }

    const formatResult = (item) => {
        const product = items.find(p => p.name === item);
        return <div>
            <b>{item}</b>
            <span style={{ "color": "grey" }}>{` en ${product.categoria.nombre}`}</span>
        </div>
    }

    return (
        <div style={{ width: "100%" }}>
            <ReactSearchAutocomplete
                items={items}
                onSearch={handleOnSearch}
                onSelect={handleOnSelect}
                formatResult={formatResult}
                placeholder="Busca en Ecommerce..."
                inputSearchString={aux}
                styling={
                    {
                        borderRadius: "5px",
                        // boxShadow: "0",
                        height: "35px",
                        iconColor: "black",
                        placeholderColor: "#ADADAD",
                    }
                }
            />
        </div>
    )
}