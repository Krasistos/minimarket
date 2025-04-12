import React, { useState } from 'react';

function App() {
  // State to store the list of products
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to fetch all products from the backend
  const fetchProducts = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3000/products'); // Replace with your actual endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data); // Update the state with the fetched products
    } catch (err) {
      setError(err.message); // Set error message if request fails
    } finally {
      setLoading(false);
    }
  };

    // Format date-time to include both date and time
    const formatDateTime = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleString(); // Formats the date to include both date and time
    };

  return (
    <div className="App">
      <h1>Product List</h1>
      
      {/* Button to fetch products */}
      <button onClick={fetchProducts}>Get All Products</button>

      {/* Loading state */}
      {loading && <p>Loading...</p>}

      {/* Error message */}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {/* Display the list of products */}
      <div>
        {products.length > 0 ? (
          <ul>
            {products.map((product) => (
              <li key={product.product_id}>
                <h3>{product.name}</h3>
                <p>Price: {product.price} USD</p>
                <p>Quantity: {product.quantity}</p>
                <p>Description: {product.description}</p>
                <p>Category ID: {product.category_id}</p>
                <p>Created At: { formatDateTime(product.created_at)}</p>
                <p>Updated At: {formatDateTime(product.updated_at)}</p>
                <img src={product.img_url} alt={product.name} />
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p>No products available</p>
        )}
      </div>
    </div>
  );
}


export default App;
