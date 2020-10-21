import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function Series() {
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get('/api/series')
      .then(resp => {
        setData(resp.data.data)
      })
  }, [])

  const deleteSerie = (id) => {
    axios.delete(`/api/series/${id}`)
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
          <button onClick={() => deleteSerie(record.id)} className='btn btn-danger'>Excluir</button>
          <Link to={`/series/${record.id}`} className='btn btn-warning' >Info</Link>
        </td>
      </tr>
    )
  }

  if (data.length === 0) {
    return (
      <div className='container'>
        <h1>Séries</h1>
        <div className="alert alert-warning" role="alert">
          Você não possui séries adicionadas
      </div>
        <Link to='/series/novo' className='btn btn-primary'>+ Nova série</Link>
      </div>
    )
  }
  return (
    <div className='container'>
      <h1>Série</h1>
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
      <Link className='btn btn-primary' to='/series/novo'>Nova Série</Link>
    </div>
  )
};

export default Series;