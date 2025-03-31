import "./App.css";

import { useEffect, useState } from "react";
import { Container, Row, Button, Card } from "react-bootstrap/";

function App() {
  const [products, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProduct(data);
    }
    fetchProduct();
  }, []);

  return (
    <Container >
      <Row className="rowClass">
        {products &&
          products.map((products) => (
            <Card key={products.id}>
              <Card.Img
                variant="top"
                src={products.image}
                alt={products.title}
                fluid
              />
              <Card.Body>
                <Card.Title>{products.title}</Card.Title>
                <Card.Text className="text-truncate ">{products.description}</Card.Text>
                <Button variant="primary">{products.price} $</Button>
              </Card.Body>
            </Card>
          ))}
      </Row>
    </Container>
  );
}

export default App;
