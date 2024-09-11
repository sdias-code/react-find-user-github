import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);

  const fetchUserData = async () => {
    try {
      const userResponse = await axios.get(
        `https://api.github.com/users/${username}`
      );
      setUserData(userResponse.data);

      const reposResponse = await axios.get(userResponse.data.repos_url);
      setRepos(reposResponse.data);
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
    }
  };

  return (
    <div className="box-content">
      <div className="box-find-user">
        <h1>Buscar Usuário do GitHub</h1>
        <input
          className="find-user"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Digite o nome do usuário"
        />
        <button className="btn-find-user" onClick={fetchUserData}>
          Buscar
        </button>
      </div>

      <div className="box-repo">
        {userData && (
          <div className="repo-container">
            <div className="box-repo-item">
              <h2>{userData.name}</h2>
              <img src={userData.avatar_url} alt="Avatar" width="100" />
            </div>
            {repos.map((repo) => (
              <div className="box-repo-item">
                <h3 className="title-repo">Repositório</h3>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.name}
                </a>
                <p>
                  {repo.description && <strong>Descrição:</strong>}{" "}
                  {repo.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
