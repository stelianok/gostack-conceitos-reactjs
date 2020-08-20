import React, {useState, useEffect} from "react";

import "./styles.css";

import api from './services/api';

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, [])
  
  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories',{
      title: `Novo repositorie ${Date.now()}`,
      url: 'https://github.com/stelianok/GoStack-Challenge-Nodejs-01',
      techs: ["Node.js", "express"]
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`repositories/${id}`);
    const newRepositories = repositories.filter(repository => repository.id !== id);
    setRepositories(newRepositories);
  }

  return (
    <>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
            </button>
          </li>   
)} 
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </>
  );
}

export default App;
