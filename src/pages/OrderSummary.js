import React, { useState } from 'react';
import { Container, Grid, Paper, Typography, Button, IconButton } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline, Delete } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import products from '../components/data'; // Adjust the import path to match your directory structure

const CartPage = () => {
  const initialCartItems = products.map((product) => ({ ...product, quantity: 1 }));
  const [cartItems, setCartItems] = useState(initialCartItems);

  const increaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === productId ? { ...item, quantity: item.quantity + 1 } : item))
    );
  };

  const decreaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId
          ? item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : null // Remove the item from the cart
          : item
      ).filter((item) => item !== null)
    );
  };

  const removeItem = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0).toFixed(2);
  };

  const handlePlaceOrder = () => {
    // Check if any item quantity is 0
    if (cartItems.some((item) => item.quantity === 0) || cartItems.length === 0) {
      toast.error('Sorry, please add item(s) to the cart before placing an order.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      // Place order logic here

      // Show the toast message for successful order
      toast.success('Congratulations!! Your order has been placed.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Additional logic after placing the order
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mt: 3, mb: 2 }}>
        Your Cart
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          {cartItems.map((product) => (
            <Paper key={product.id} elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
              <IconButton onClick={() => removeItem(product.id)}>
                <Delete />
              </IconButton>
              <div sx={{ width: 60, height: 50, overflow: 'hidden', marginRight: 16 }}>
                <img src={product.image} alt={product.title} style={{ width: 60, height: 50, objectFit: 'cover' }} />
              </div>
              <Typography>{product.title}</Typography>
              <IconButton onClick={() => decreaseQuantity(product.id)}>
                <RemoveCircleOutline />
              </IconButton>
              <Typography>{product.quantity}</Typography>
              <IconButton onClick={() => increaseQuantity(product.id)}>
                <AddCircleOutline />
              </IconButton>
            </Paper>
          ))}
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Order Summary</Typography>
            <Typography variant="body1">Total items: {cartItems.reduce((total, item) => total + item.quantity, 0)}</Typography>
            <Typography variant="body1">Total price: ${calculateTotalPrice()}</Typography>
            <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handlePlaceOrder}>
              Place Order
            </Button>
            <Button variant="outlined" color="secondary" fullWidth sx={{ mt: 2 }} onClick={clearCart}>
              Clear Cart
            </Button>
          </Paper>
        </Grid>
      </Grid>
      {/* Add the ToastContainer to render toast messages */}
      <ToastContainer />
    </Container>
  );
};

export default CartPage;
