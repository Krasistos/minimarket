// src/InventarLogsPage.js
import React, { useState } from 'react';

function InventarLogsPage() {
  const [inventarLogs, setInventarLogs] = useState([]);

  const fetchInventarLogs = async () => {
    const response = await fetch('http://localhost:3000/inventar-logs');  // Adjust API endpoint
    const data = await response.json();
    setInventarLogs(data);
  };

  return (
    <div>
      <h1>InventarLogs</h1>
      <button onClick={fetchInventarLogs}>Get All InventarLogs</button>
      <ul>
        {inventarLogs.map(inventarLog => (
          <li key={inventarLog.inventarLog_id}>
            <h3>{inventarLog.name}</h3>
            <p>{inventarLog.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InventarLogsPage;  // Make sure this is the default export
