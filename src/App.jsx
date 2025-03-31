import "./App.css";

import { useEffect, useState } from "react";
import { Container, Row, Button, Card, Col } from "react-bootstrap/";

function App() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    }
    fetchProduct();
  }, []);

  return (
    <Container fluid className="w-75">
      <Row className="mt-5">
        {products &&
          products.map((products) => (
            <Col key={products.id} sm={5} md={4} lg={3} className="mt-3">
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={products.image}
                  alt={products.title}
                  fluid
                />
                <Card.Body>
                  <Card.Title>{products.title}</Card.Title>
                  <Card.Text>{products.description}</Card.Text>
                  <Card.Text variant="primary">{products.price} $</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
}

export default App;
