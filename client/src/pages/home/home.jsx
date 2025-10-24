
import { useState, useEffect } from 'react';
import reactLogo from '../../assets/images/react.svg';
import viteLogo from '/vite.svg';
import './home.css';

export default function Home() {
  const
    [count, setCount] = useState(0),
    [links, setLinks] = useState([]),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(null),

    fetchLinks = async () => {
      try {
        const response = await fetch('/api/test');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        setLinks(data);
        setLoading(false);
      }
      catch (e) {
        setError(e.message);
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchLinks();
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/pages/home/home.jsx</code> and save to test HMR
        </p>
      </div>

      <div className="card">
        <h2>Links API Test</h2>
        <button onClick={fetchLinks}>Refresh Links</button>
        {loading
          ? (
            <p>Loading links...</p>
          )
          : error
            ? (
              <p style={{ color: 'red' }}>Error: {error}</p>
            )
            : (
              <ul>
                {links.map((link) => (
                  <li key={link.id}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.url}
                    </a>
                  </li>
                ))}
              </ul>
            )}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};
