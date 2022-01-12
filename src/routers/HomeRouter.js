import { Route, Routes, useLocation } from 'react-router-dom';

import { TopBar } from '../components/ui/TopBar';
import { ProductScreen } from '../components/products/ProductScreen';
import { ProductList } from '../components/products/ProductList';
import { Summary } from '../components/cart/summary/Summary';
import { CartScreen } from '../components/cart/CartScreen';


export const HomeRouter = () => {

    const { pathname, search } = useLocation();
    localStorage.setItem('lastPath', pathname + search);

    return (
        <>
            <TopBar />

            <div className="container">

                <Routes>

                    <Route path="/:ProductoId" element={<ProductScreen />} />

                    <Route path="cart" element={<CartScreen />} />

                    <Route path="summary" element={<Summary />} />

                    <Route path="/" element={<ProductList />} />

                </Routes>

            </div>

        </>
    )
}