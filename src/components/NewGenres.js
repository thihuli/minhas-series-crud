import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

// import { Container } from './styles';

function NewGenres() {
  const [name, setName] = useState('');
  const [sucsess, setSuccess] = useState(false);

  const save = () => {
    axios.post('/api/genres', {
      name
    })
    .then(res => {
      setSuccess(!sucsess)
    })
  }

  if(sucsess) {
    return <Redirect to='/generos'/>
  }

  return (
    <div className='container'>
      <h1>Novo Genêro</h1>
      <form>
        <div className='form-group'>
          <label htmlFor='name'>Nome</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className='form-control' id='name' type='text' placeholder='Novo genêro'/>
        </div>
        <button type="button" onClick={save} className='btn btn-primary'>Salvar</button>
      </form>
    </div>
  );
}

export default NewGenres;