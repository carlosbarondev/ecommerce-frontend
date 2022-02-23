import { useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap"


export const Footer = () => {

    const navigate = useNavigate();

    return (
        <footer className="row row-cols-4 py-5 mt-auto border-top d-flex justify-content-around align-items-center animate__animated animate__fadeIn" style={{ "backgroundColor": "#f8f9fa", "overflow": "hidden", "padding": "0", "margin": "0" }}>

            <div className="col-12 col-lg-4 mb-5 mb-lg-0">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <Image
                        src="/assets/logo_grande.png"
                        alt="logo"
                        style={{ "cursor": "pointer", "maxWidth": "50%" }}
                        onClick={() => navigate("/")}
                        fluid
                    />
                </div>
            </div>

            <div className="col-4 col-lg-2 d-flex flex-column justify-content-center align-items-center">
                <h5>Section</h5>
                <ul className="nav flex-column">
                    <li className="nav-item mb-2"><a href="https://github.com/carlosbarondev" className="nav-link p-0 text-muted">Home</a></li>
                    <li className="nav-item mb-2"><a href="https://github.com/carlosbarondev" className="nav-link p-0 text-muted">Features</a></li>
                    <li className="nav-item mb-2"><a href="https://github.com/carlosbarondev" className="nav-link p-0 text-muted">Pricing</a></li>
                </ul>
            </div>

            <div className="col-4 col-lg-2 d-flex flex-column justify-content-center align-items-center">
                <h5>Section</h5>
                <ul className="nav flex-column">
                    <li className="nav-item mb-2"><a href="https://github.com/carlosbarondev" className="nav-link p-0 text-muted">Pricing</a></li>
                    <li className="nav-item mb-2"><a href="https://github.com/carlosbarondev" className="nav-link p-0 text-muted">FAQs</a></li>
                    <li className="nav-item mb-2"><a href="https://github.com/carlosbarondev" className="nav-link p-0 text-muted">About</a></li>
                </ul>
            </div>

            <div className="col-12 col-lg-4 mt-5 mt-sm-0">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <a className="linkFooter text-muted" href="https://github.com/carlosbarondev">carlosbarondev &copy; 2022</a>
                </div>
            </div>

        </footer>
    )
}