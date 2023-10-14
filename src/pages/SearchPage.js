import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Grid,
  Button,
  Paper,
  Slider
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css';

export default function SearchPage() {
  const { category } = useParams(); // Get the category from the URL parameter
  const [products, setProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 2]); // Default price range

  useEffect(() => {
    // Fetch products here similar to the HomePage component
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/products');

        if (!response.ok) {
          throw new Error(`Network response was not ok (Status: ${response.status})`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Response is not JSON');
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []); // Fetch products when the component mounts

  // Filter products based on category and price range
  const filteredProducts = products.filter(
    (product) =>
      (!category || product.Category === category) && // Filter by category when selected
      (product.Price >= priceRange[0] && product.Price <= priceRange[1])
  );

  const addToCart = async (productId, cartId) => {
    try {
      const response = await fetch(`http://localhost:8080/Cart_Items/${cartId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product_id: productId, quantity: 1 }), // Send the product ID in the request body
      });
  
      if (!response.ok) {
        throw new Error(`Network response was not ok (Status: ${response.status})`);
      }
  
      toast.success('Item added to the cart successfully', {
        position: 'top-right',
        autoClose: 3000, // Close the notification after 3 seconds
      });

    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  return (
    <Container>
      <Paper style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography gutterBottom>Price Range</Typography>
        <Slider
          value={priceRange}
          onChange={(event, newValue) => setPriceRange(newValue)}
          valueLabelDisplay="auto"
          min={0}
          max={2} // Limit the range from 0 to 2
          step={0.1} // Set the step increment to 0.1
          valueLabelFormat={(value) => value.toFixed(1)} // Format the displayed values with one decimal place
        />
        <Typography>Min: ${priceRange[0].toFixed(1)}</Typography>
        <Typography>Max: ${priceRange[1].toFixed(1)}</Typography>
      </Paper>

      <Grid container spacing={2}>
        {filteredProducts.length === 0 ? (
          <Grid item xs={12} style={{ textAlign: 'center', marginTop: '20px' }}>
            <Typography variant="h6" style={{ color: '#ff5252', fontWeight: 'bold' }}>
              Oops! We searched high and low, but couldn't find that one.
            </Typography>
          </Grid>
        ) : (
          filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="250"
                  image={product.Product_Images}
                  alt={product.title}
                />
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    {product.Product_Name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {product.Description}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Artist: {product.Artist}
                  </Typography>
                  <Typography variant="h6" color="primary" gutterBottom>
                    Price: ${product.Price}
                  </Typography>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginTop: 'auto'
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => addToCart(product.Product_ID, '1')}
                    >
                      Add to cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
      <ToastContainer/>
    </Container>
  );
}
