import { Card } from "react-bootstrap"


export const Product = () => {
    return (
        <Card>
            <Card.Img variant="top" src="https://m.media-amazon.com/images/I/31oEszTc67L.jpg" />
            <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                    This is a longer card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit longer.
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
        </Card>
    )
}