import { useDispatch, useSelector } from "react-redux";
import { Container, Nav, Navbar, NavDropdown, Button, Form, FormControl } from "react-bootstrap"

import { startLogout } from "../../actions/auth";
import { Link } from "react-router-dom";

export const TopBar = () => {

    const dispatch = useDispatch();

    const { carrito } = useSelector(state => state.cart);

    const handleLogout = () => {
        dispatch(startLogout());
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Link
                    className="navbar-brand"
                    to="/"
                >
                    Ecommerce
                </Link>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="#action1">Home</Nav.Link>
                        <Nav.Link href="#action2">Link</Nav.Link>
                        <NavDropdown title="Link" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5">
                                Something else here
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#" disabled>
                            Link
                        </Nav.Link>
                    </Nav>
                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                        <Button
                            variant="danger"
                            onClick={handleLogout}
                        >
                            Identificate
                        </Button>
                    </Form>
                </Navbar.Collapse>
                <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                    <span className="fa-layers fa-fw fa-3x hv">
                        <i className="fa-solid fa-cart-shopping"></i>
                        <span className="fa-layers-counter" style={{ background: 'Tomato', fontSize: '60px' }}>{carrito.length}</span>
                    </span>
                </Link>
            </Container>
        </Navbar>
    )
}