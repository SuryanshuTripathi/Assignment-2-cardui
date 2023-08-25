import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Github User Card</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="submit">Get Info</button>
        </form>
        {userData && (
          <div className="card">
            <img src={userData.avatar_url} alt="User Avatar" />
            <h2>{userData.login}</h2>
            <p>Name: {userData.name || 'N/A'}</p>
            <p>Public Repos: {userData.public_repos}</p>
            <p>Public Gists: {userData.public_gists}</p>
            <p>Profile Created At: {userData.created_at.slice(0, 10)}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
