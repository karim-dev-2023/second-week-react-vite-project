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
      <Row>
        {products &&
          products.map((products) => (
            <Col className="m-3">
              <Card key={products.id}>
                <Card.Img
                  variant="top"
                  src={products.image}
                  alt={products.title}
                  fluid
                />
                <Card.Body>
                  <Card.Title>{products.title}</Card.Title>
                  <Card.Text className="text-truncate ">
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
