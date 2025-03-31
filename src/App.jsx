import "./App.css";

import { useEffect, useState } from "react";
import { Container, Row, Button, Card, Col, Stack } from "react-bootstrap/";

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

  async function addProduct() {
    const response = await fetch("https://fakestoreapi.com/products", {
      method: "POST", // Indique qu'on envoie des données pour créer une nouvelle ressource
      headers: {
        "Content-Type": "application/json", // Indique que les données envoyées sont au format JSON
      },
      body: JSON.stringify({
        // Convertit l'objet JavaScript en une chaîne JSON
        title: "Nouveau produit",
        price: 29.99,
        description: "Un super produit ajouté via API",
        image: "https://via.placeholder.com/150",
        category: "electronics",
      }),
    });
    const data = await response.json();
    alert(`Le produit avec l'id ${data.id} a été créé`);
  }

  return (
    <Container fluid className="w-75">
      <Stack className="mt-5">
        <Button variant="primary" onClick={addProduct}>
          Ajouter un produit
        </Button>
      </Stack>
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
