import "./App.css";

import { useEffect, useState } from "react";
import { Container, Row, Button, Card, Col, Stack } from "react-bootstrap/";

function App() {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch("https://fakestoreapi.com/products/");
        if (!response.ok) {
          throw new Error(`Erreur HTTP ${response.status}`);
        }
        const data = await response.json();
        // Mise à jour du state avec les données récupérées
        setProducts(data);
      } catch (error) {
        // Capture et stockage de l'erreur dans le state
        setError(error.message);
      } finally {
        // Désactive l'état de chargement, qu'il y ait une erreur ou non
        setLoading(false);
      }
    }
    fetchProduct();
  }, []); // Le tableau vide [] garantit que l'effet s'exécute une seule fois (au montage)
  // Affichage du message d'erreur si une erreur est survenue
  if (error) return <p>Erreur : {error}</p>;
  // Affichage d'un message de chargement tant que les données ne sont pas disponibles
  if (loading) return <p>Chargement...</p>;

  async function addProduct() {
    try {
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

      return alert(`Le produit avec l'id ${data.id} a été créé`);
    } catch (error) {
      console.log(error.message);
      return alert(
        `Un erreur c'est produite lors de la création`
      );
    }
  }
  async function updateProduct(productId) {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/${productId}`,
        {
          method: "PUT", // Indique qu'on envoie des données pour créer une nouvelle ressource
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
        }
      );
      const data = await response.json();

      return alert(`Le produit avec l'id ${data.id} a été mis à jour`);
    } catch (error) {
      console.log(error.message);
      return alert(
        `Un erreur c'est produite lors de la mise à jour du produit`
      );
    }
  }

  async function updatePriceProduct(productId) {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/${productId}`,
        {
          method: "PATCH", // Indique qu'on envoie des données pour créer une nouvelle ressource
          headers: {
            "Content-Type": "application/json", // Indique que les données envoyées sont au format JSON
          },
          body: JSON.stringify({
            // Convertit l'objet JavaScript en une chaîne JSON
            price: 5,
          }),
        }
      );

      const data = await response.json();

      return alert(`Le prix avec l'id ${data.id} a été mis à jour`);
    } catch (error) {
      console.log(error.message);
      
      return alert(
        `Un erreur c'est produite lors de la mise à jour du prix `
      );
    }
  }
  async function deleteProduct(productId) {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/${productId}`,
        {
          method: "DELETE", // Indique qu'on supprime une ressource existante
        }
      );
      const data = await response.json();

      return alert(`Le produit avec l'id ${data.id} a été supprimé`);
    } catch (error) {
      console.log(error.message);
      return alert(
        `Un erreur c'est produite lors de la supression du produit `
      );
    }
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
                  <Stack gap={3}>
                    <Button
                      variant="primary"
                      onClick={() => updateProduct(products.id)}
                    >
                      Modifier le produit complet{" "}
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => updatePriceProduct(products.id)}
                    >
                      Modifier le prix{" "}
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => deleteProduct(products.id)}
                    >
                      Supprimer le produit
                    </Button>
                  </Stack>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
}

export default App;
