import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

async function fetchProductDetails(productName) {
  try {
    const encodedProductName = encodeURIComponent(productName);
    const response = await fetch(`http://localhost:8080/products/${encodedProductName}`);
    
    if (!response.ok) {
      throw new Error(`Network response was not ok (Status: ${response.status})`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Response is not JSON');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching product details:', error);
    return null;
  }
}


const ProductDetails = () => {
  const { productName } = useParams();
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    fetchProductDetails(productName)
      .then((data) => {
        setProductDetails(data);
      })
      .catch((error) => {
        console.error('Error fetching product details', error);
      });
  }, [productName]);

  if(!productDetails) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>{productDetails.Product_Name}</h2>
      <p>Description: {productDetails.Description}</p>
      <p>Price: ${productDetails.Price}</p>
      <p>Category: {productDetails.Category}</p>
      <p>Artist: {productDetails.Artist}</p>
      <img src={productDetails.Product_Images} alt={productDetails.Product_Name} />
    </div>
  );
};

export default ProductDetails;
