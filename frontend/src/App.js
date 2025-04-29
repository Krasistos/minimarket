// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';  // Your styling file

// Default imports for each page component
import HomePage from './HomePage';
import ProductsPage from './ProductsPage';
import CategoriesPage from './CategoriesPage';
import InventarLogsPage from './InventarLogsPage';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar */}
        <nav>
          <ul className="navbar">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/categories">Categories</Link>
            </li>
            <li>
              <Link to="/inventar-logs">Inventar Logs</Link>
            </li>
          </ul>
        </nav>

        {/* Routes for each page */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/inventar-logs" element={<InventarLogsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
