import "./App.css";

import { useEffect, useState } from "react";
import { Container, Row, Button, Card } from "react-bootstrap/";

function App() {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProduct(data);
    }
    fetchProduct();
  }, []);

  return (
    <Container fluid>
      <Row style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {product &&
          product.map((product) => (
            <Card style={{ width: "18rem" }}>
              <Card.Img
                style={{ height: "13rem" }}
                variant="top"
                src={product.image}
                alt={product.title}
                fluid
              />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text className="text-truncate ">{product.description}</Card.Text>
                <Button variant="primary">{product.price} $</Button>
              </Card.Body>
            </Card>
          ))}
      </Row>
    </Container>
  );
}

export default App;
