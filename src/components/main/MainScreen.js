import { Route, Routes } from 'react-router-dom';

import { Products } from '../products/Products';
import { ProductScreen } from '../products/ProductScreen';
import { TopBar } from '../ui/TopBar';
import { CartScreen } from '../products/CartScreen';


export const MainScreen = () => {

    return (
        <>
            <TopBar />

            <div className="container">

                <Routes>

                    <Route path="productos/:ProductoId" element={<ProductScreen />} />

                    <Route path="/" element={<Products />} />

                    <Route path="/carrito" element={<CartScreen />} />

                </Routes>

            </div>

        </>
    )
}