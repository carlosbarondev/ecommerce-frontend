import { useNavigate } from "react-router-dom";
import { Col, Image, Row } from "react-bootstrap"
import { normalizeText } from 'normalize-text';


export const ImagesHome = () => {

    const navigate = useNavigate();

    return (
        <div className="navbarDisable">
            <Row className="animate__animated animate__fadeIn">
                <Col xs={4}>
                    <Image
                        src="/assets/small_xiaomi.webp"
                        fluid
                        style={{ "cursor": "pointer" }}
                        alt="xiaomi"
                        onClick={() => navigate(`/${normalizeText("Smartphones".replace(/\s+/g, '-'))}/${normalizeText("Xiaomi".replace(/\s+/g, '-'))}`, {
                            state: {
                                nombreCat: "Electrónica",
                                nombreSub: "Smartphones"
                            }
                        })}
                    />
                </Col>
                <Col xs={4}>
                    <Image
                        src="/assets/small_reloj.webp"
                        fluid
                        style={{ "cursor": "pointer" }}
                        alt="smartwatch"
                        onClick={() => navigate(`/${normalizeText("Electrónica".replace(/\s+/g, '-'))}/${normalizeText("Relojes Inteligentes".replace(/\s+/g, '-'))}`, {
                            state: {
                                nombreCat: "Electrónica",
                                nombreSub: "Relojes Inteligentes"
                            }
                        })}
                    />
                </Col>
                <Col xs={4}>
                    <Image
                        src="/assets/small_auriculares.webp"
                        fluid
                        style={{ "cursor": "pointer" }}
                        alt="auriculares"
                        onClick={() => navigate(`/${normalizeText("Electrónica".replace(/\s+/g, '-'))}/${normalizeText("Auriculares".replace(/\s+/g, '-'))}`, {
                            state: {
                                nombreCat: "Electrónica",
                                nombreSub: "Auriculares"
                            }
                        })}
                    />
                </Col>
            </Row>
        </div>
    )
}