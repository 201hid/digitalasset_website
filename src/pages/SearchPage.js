import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import digitalAssets from '../components/data';
import Slider from '@mui/material/Slider';

import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Container,
    Grid,
    Button,
    Paper,
    IconButton,
    Badge
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function SearchPage() {
    const { title, category } = useParams();
    const [priceRange, setPriceRange] = useState([0, Math.max(...digitalAssets.map(asset => asset.price))]);
    const [cartQuantities, setCartQuantities] = useState({}); // Individual product quantities

    let products;

    if (category) {
        products = digitalAssets.filter(asset => asset.category === category);
    } else if (title === "all") {
        products = digitalAssets;
    } else {
        const productWithTitle = digitalAssets.find(asset => asset.title === title);

        if (!productWithTitle) {
            products = []; // Product not found, set empty array
        } else {
            products = [productWithTitle];
        }
    }

    // Filter products based on the selected price range from the slider
    products = products.filter(product => product.price >= priceRange[0] && product.price <= priceRange[1]);

    // Determine if there's only one product
    const isSingleProduct = products.length === 1;

    const handleAddToCart = (productId) => {
        setCartQuantities(prevQuantities => ({
            ...prevQuantities,
            [productId]: (prevQuantities[productId] || 0) + 1
        }));
    };

    const handleRemoveFromCart = (productId) => {
        setCartQuantities(prevQuantities => ({
            ...prevQuantities,
            [productId]: Math.max(0, prevQuantities[productId] - 1)
        }));
    };

    return (
        <Container>
            <Grid container spacing={4}>
                {products.length > 1 && (
                    <Grid item xs={12} sm={4} md={3}>
                        <Paper style={{ padding: '20px' }}>
                            <Typography variant="h6" gutterBottom>
                                Filters
                            </Typography>
                            <Typography gutterBottom>Price Range</Typography>
                            <Slider
                                value={priceRange}
                                onChange={(event, newValue) => setPriceRange(newValue)}
                                valueLabelDisplay="auto"
                                min={0}
                                max={Math.max(...digitalAssets.map(asset => asset.price))}
                                step={0.1}  // Allow for decimal increments
                            />
                            <Typography>Min: ${priceRange[0].toFixed(2)}</Typography>
                            <Typography>Max: ${priceRange[1].toFixed(2)}</Typography>
                        </Paper>
                    </Grid>
                )}

                <Grid item xs={12} sm={!isSingleProduct || products.length > 1 ? 8 : 12} md={!isSingleProduct || products.length > 1 ? 9 : 12}>
                    <Grid container spacing={2}>
                        {products.length === 0 ? (
                            <Grid item xs={12} style={{ textAlign: 'center', marginTop: '20px' }}>
                                <Typography variant="h6" style={{ color: '#ff5252', fontWeight: 'bold' }}>
                                    Oops! We searched high and low, but couldn't find that one.
                                </Typography>
                            </Grid>
                        ) : (
                            products.map(product => (
                                <Grid item xs={12} sm={6} md={isSingleProduct ? 12 : 4} key={product.id}>
                                    <Card>
                                        <CardMedia
                                            component="img"
                                            height="250"
                                            image={product.image}
                                            alt={product.title}
                                        />
                                        <CardContent>
                                            <Typography variant="h5" component="div" gutterBottom>
                                                {product.title}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" gutterBottom>
                                                {product.description}
                                            </Typography>
                                            <Typography variant="body1" gutterBottom>
                                                Artist: {product.artist}
                                            </Typography>
                                            <Typography variant="h6" color="primary" gutterBottom>
                                                Price: ${product.price}
                                            </Typography>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto' }}>
                                                <IconButton aria-label="Add to Cart" onClick={() => handleAddToCart(product.id)}>
                                                    <Badge badgeContent={cartQuantities[product.id] || 0} color="secondary">
                                                        <ShoppingCartIcon />
                                                    </Badge>
                                                </IconButton>
                                                {cartQuantities[product.id] && cartQuantities[product.id] > 0 && (
                                                    <Button variant="outlined" color="primary" onClick={() => handleRemoveFromCart(product.id)}>
                                                        Remove
                                                    </Button>
                                                )}
                                                {!isSingleProduct && (
                                                    <Button variant="contained" color="primary" onClick={() => handleAddToCart(product.id)}>
                                                        Add to Cart
                                                    </Button>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}
