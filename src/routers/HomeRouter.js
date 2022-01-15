import { useSelector } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';

import { TopBar } from '../components/ui/TopBar';
import { ProductScreen } from '../components/products/ProductScreen';
import { ProductList } from '../components/products/ProductList';
import { Summary } from '../components/cart/summary/Summary';
import { CartScreen } from '../components/cart/CartScreen';
import { PrivateRoute } from './PrivateRoute';


export const HomeRouter = () => {

    const { uid } = useSelector(state => state.auth);

    const { pathname, search } = useLocation();
    localStorage.setItem('lastPath', pathname + search);

    return (
        <>
            <TopBar />

            <div className="container">

                <Routes>

                    <Route path="/:ProductoId" element={<ProductScreen />} />

                    <Route path="cart" element={<CartScreen />} />

                    <Route
                        path="summary"
                        element={
                            <PrivateRoute isAuthenticated={!!uid}>
                                <Summary />
                            </PrivateRoute>
                        }
                    />

                    <Route path="/" element={<ProductList />} />

                </Routes>

            </div>

        </>
    )
}