import React, { useState, useEffect } from "react";
import api from './services/api'
import "./styles.css";

function App() {


  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])


  async function handleAddRepository() {

    api.post('repositories', {
      title: "normal",
      url: "https://github.com",
      techs: [
        "NodeJS",
        "ReactJS"
      ]
    }).then(response => {
      setRepositories([...repositories, response.data])
    })

  }

  async function handleRemoveRepository(id) {

    api.delete(`repositories/${id}`).then(response => {
      if (response.status == 204) {

        setRepositories(repositories.filter(repositore => repositore.id != id))

      }
    })

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositore => <li>
          {repositore.title}

          <button onClick={() => handleRemoveRepository(repositore.id)}>
            Remover
          </button>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
