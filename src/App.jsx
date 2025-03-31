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
    <Container fluid>
      <Row className="row-cols-4 mt-5">
        {products &&
          products.map((products) => (
            <Col  key={products.id} className="mb-3">
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={products.image}
                  alt={products.title}
                  fluid
                />
                <Card.Body>
                  <Card.Title>{products.title}</Card.Title>
                  <Card.Text >
                    {products.description}
                  </Card.Text>
                  <Button variant="primary">{products.price} $</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
}

export default App;
