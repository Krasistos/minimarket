// src/ProductsPage.js
import React, { useState } from 'react';

function ProductsPage() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await fetch('http://localhost:3000/products');  // Adjust API endpoint
    const data = await response.json();
    setProducts(data);
  };

  return (
    <div>
      <h1>Products</h1>
      <button onClick={fetchProducts}>Get All Products</button>
      <ul>
        {products.map(product => (
          <li key={product.product_id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductsPage;  // Make sure this is the default export
