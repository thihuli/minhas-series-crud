import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// import { Container } from './styles';

function Genres() {
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get('/api/genres')
      .then(resp => {
        setData(resp.data.data)
      })
  }, [])

  const deleteGenres = (id) => {
    axios.delete(`/api/genres/${id}`)
      .then(res => {
        const filtered = data.filter(item => item.id !== id)
        setData(filtered)
      })
  }
  const renderLine = record => {
    return (
      <tr key={record.id}>
        <th scope="row">{record.id}</th>
        <td>{record.name}</td>
        <td>
          <button onClick={() => deleteGenres(record.id)} className='btn btn-danger'>Excluir</button>
          <Link to={`/generos/${record.id}`} className='btn btn-warning' >Editar</Link>
        </td>
      </tr>
    )
  }

  if (data.length === 0) {
    return (
      <div className='container'>
        <h1>Genêros</h1>

        <div className="alert alert-warning" role="alert">
          Você não possui genêros criados
      </div>
        <Link to='/generos/novo' className='btn btn-primary'>+ Novo Genêro</Link>
      </div>
    )
  }
  return (
    <div className='container'>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map(renderLine)}
        </tbody>
      </table>
      <Link className='btn btn-primary' to='/generos/novo'>Novo Genêro</Link>
    </div>
  );
}

export default Genres;