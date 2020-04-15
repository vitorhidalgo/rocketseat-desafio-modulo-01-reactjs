import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepository] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(function({data}){
      setRepository(data);
    });
  }, []);

  async function handleAddRepository() {
    const { data, status } = await api.post('/repositories', {
      title: `Novo curso ${Date.now()}`,
      url: 'https://github.com/vitorhidalgo',
      techs: ["reactjs", "react native", "nodeJS"],
      likes: 0
    });
    
    if(status === 200) {
      setRepository([...repositories, data]);
    }
  }

  async function handleRemoveRepository(id) {
    const {status} = await api.delete(`/repositories/${id}`);
    if(status === 204) {
      const index = repositories.findIndex(repository => repository.id === id);
      repositories.splice(index, 1);

      setRepository([...repositories]);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {
        repositories.map(({id, title}) => (
          <li key={id}>
            {title}
            <button onClick={() => handleRemoveRepository(id)}>
              Remover
            </button>
          </li>
        ))
      }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
