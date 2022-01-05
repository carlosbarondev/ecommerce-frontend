import { Route, Routes, useLocation } from 'react-router-dom';

import { TopBar } from '../components/ui/TopBar';
import { ProductScreen } from '../components/products/ProductScreen';
import { ProductList } from '../components/products/ProductList';


export const HomeRouter = () => {

    const { pathname, search } = useLocation();
    localStorage.setItem('lastPath', pathname + search);

    return (
        <>
            <TopBar />

            <div className="container">

                <Routes>

                    <Route path="/:ProductoId" element={<ProductScreen />} />

                    <Route path="/" element={<ProductList />} />

                </Routes>

            </div>

        </>
    )
}