import React, { useEffect, useState } from "react";

import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(({ data }) => setRepositories(data))
  }, [])

  /**
   * Add repository
   */
  async function handleAddRepository() {
    const { data } = await api.post('repositories', {
      title: `MY PROJET ${Date.now()}`,
      url: 'https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-conceitos-nodejs',
      techs: ['Node.js', 'ReactJS', 'React Native']
    })

    setRepositories([...repositories, data])
  }

  /**
   * Remove repository
   * @param {integer} id 
   */
  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const newRepositories = repositories.filter(
      repository => repository.id !== id
    )

    setRepositories(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;