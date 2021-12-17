import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { productsStartLoad } from '../../actions/products';
import { TopBar } from "../ui/TopBar"
import { Products } from "./Products"


export const ProductsScreen = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(productsStartLoad());
    }, [dispatch]);

    return (
        <div>
            <TopBar />
            <div className="container">
                <Products />
            </div>
        </div>
    )
}