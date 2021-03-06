import { useSelector } from 'react-redux';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import { TopBar } from '../components/ui/TopBar';
import { ProductScreen } from '../components/products/ProductScreen';
import { ProductList } from '../components/products/ProductList';
import { Summary } from '../components/cart/summary/Summary';
import { CartScreen } from '../components/cart/CartScreen';
import { PrivateRoute } from './PrivateRoute';
import { SubCategoryList } from '../components/products/SubCategoryList';
import { CategoryList } from '../components/products/CategoryList';
import { SubCategoryScreen } from '../components/products/SubCategoryScreen';
import { CarouselHome } from '../components/products/CarouselHome';
import { SearchList } from '../components/search/SearchList';
import { Footer } from '../components/ui/Footer';
import { ImagesHome } from '../components/products/ImagesHome';


export const HomeRouter = () => {

    const { uid } = useSelector(state => state.auth);
    const { carrito } = useSelector(state => state.cart);

    const { pathname, search } = useLocation();
    localStorage.setItem('lastPath', pathname + search);

    return (
        <div className="d-flex flex-column min-vh-100">

            <TopBar />

            <Container>

                <Routes>

                    <Route path="/:CategoriaNombre" element={<SubCategoryList />} />

                    <Route path="/:CategoriaNombre/:SubCategoriaNombre" element={<SubCategoryScreen />} />

                    <Route path="/:CategoriaNombre/:SubCategoriaNombre/:ProductoNombre" element={<ProductScreen />} />

                    <Route path="/buscar/:Busqueda" element={<SearchList />} />

                    <Route path="cart" element={
                        <>
                            {
                                carrito.length > 0
                                    ? <CartScreen />
                                    : <Navigate to="/" replace={true} />
                            }
                        </>
                    } />

                    <Route
                        path="/cart/*"
                        element={<Navigate to="/" />}
                    />

                    <Route
                        path="summary"
                        element={
                            <PrivateRoute isAuthenticated={!!uid}>
                                <Summary />
                            </PrivateRoute>
                        }
                    />

                    <Route path="/" element={
                        <>
                            <CarouselHome />
                            <CategoryList />
                            <ProductList desde={0} limite={4} ordenar="-rating" />
                            <ImagesHome />
                            <ProductList desde={0} limite={8} ordenar="-vendido" />
                        </>
                    }
                    />

                    <Route path="/*" element={<Navigate to="/" />} />

                </Routes>

            </Container>

            <Footer />

        </div>
    )
}