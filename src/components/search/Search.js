import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

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
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.

        if (string !== "") {
            setAux(string);

            const input = document.querySelector('input');

            input.addEventListener("keyup", function (event) {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    event.target.blur();
                    setAux("");
                    navigate(`/buscar/${string}`, {
                        state: {
                            nombre: string,
                            busqueda: results,
                        }
                    });
                }
            });
        }
        // console.log("handleOnSearch", string, results)
    }

    const handleOnHover = (result) => {
        // the item hovered
        // console.log("handleOnHover", result)
    }

    const handleOnSelect = (item) => {
        setAux("");
        navigate(`/${item.categoria.nombre}/${item.subcategoria.nombre}/${item.name.replace(/\s+/g, "-")}`);
    }

    const handleOnFocus = () => {
        // console.log("handleOnFocus", 'Focused')
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
                onHover={handleOnHover}
                onSelect={handleOnSelect}
                onFocus={handleOnFocus}
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