import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { productName } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // Use the productName directly in the URL since it's already in the desired format
        const response = await fetch(`http://localhost:8080/product/${productName}`);

        if (!response.ok) {
          throw new Error(`Network response was not ok (Status: ${response.status})`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Response is not JSON');
        }

        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [productName]);

  return (
    <div>
      {product ? (
        <div>
          <h2>{product.Product_Name}</h2>
          <p>Description: {product.Description}</p>
          <p>Price: ${product.Price}</p>
          <p>Category: {product.Category}</p>
          <p>Artist: {product.Artist}</p>
          <img src={product.Product_Images} alt={product.Product_Name} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetails;
