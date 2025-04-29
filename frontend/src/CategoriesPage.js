// src/categorysPage.js
import React, { useState } from 'react';

function CategoriesPage() {
  const [categories, setcategories] = useState([]);

  const fetchCategories = async () => {
    const response = await fetch('http://localhost:3000/categories');  // Adjust API endpoint
    const data = await response.json();
    setcategories(data);
  };

  return (
    <div>
      <h1>categories</h1>
      <button onClick={fetchCategories}>Get All categories</button>
      <ul>
        {categories.map(category => (
          <li key={category.category_id}>
            <h3>{category.name}</h3>
            <p>{category.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoriesPage;  // Make sure this is the default export
