import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Badge } from 'reactstrap';

// import { Container } from './styles';

function InfoSerie({ match }) {
  const [form, setForm] = useState({});
  const [sucsess, setSuccess] = useState(false);
  const [data, setData] = useState({});
  const [mode, setMode] = useState('EDIT');
  const [genres, setGenres] = useState([])

  useEffect(() => {
    axios.get(`/api/series/${match.params.id}`)
      .then(res => {
        setData(res.data)
        setForm(res.data)
      })
  }, [match.params.id])

  useEffect(() => {
    axios.get('/api/genres')
      .then(res => {
        setGenres(res.data.data)
      })
  },[])

  const masterHeader = {
    height: '50vh',
    minHeight: '500px',
    backgroundImage: `url(${data.background})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  }

  const save = () => {
    axios.put(`/api/series/${match.params.id}`, form)
      .then(res => {
        setSuccess(!sucsess)
      })
  }

  const onChange = field => e => {
    setForm({
      ...form,
      [field]: e.target.value
    })
  }

  if (sucsess) {
    //return <Redirect to='/series' />
  }

  return (
    <div>
      <header style={masterHeader}>
        <div className='h-100' style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className='h-100 container'>
            <div className='row h-100 align-items-center'>
              <div className='col-3'>
                <img className='img-fluid img-thumbnail' alt={data.name} src={data.poster} />
              </div>
              <div className='col-8'>
                <h1 className='font-weight-light text-white'>{data.name}</h1>
                <div className='lead text-white'>
                  <Badge color='success'>
                    Assistido
                  </Badge>
                  <Badge color='warning'>
                    A assistir
                  </Badge>
                  Gênero: {form.genre}

                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className='container'>
        <button className='btn btn-primary' onClick={() => setMode('EDIT')}>Editar Série</button>
      </div>
      {mode === 'EDIT' &&
        <div className='container'>
          <h1>Nova Série</h1>
          <pre>{JSON.stringify(form)}</pre>
          <form>
            <div className='form-group'>
              <label htmlFor='name'>Nome</label>
              <input value={form.name} onChange={onChange('name')} className='form-control' id='name' type='text' placeholder='Novo série' />
            </div>
            <div className='form-group'>
              <label htmlFor='name'>Comentarios</label>
              <input value={form.comments} onChange={onChange('comments')} className='form-control' id='name' type='text' placeholder='Comentários' />
            </div>
            <div class="form-group">
              <label htmlFor="name">Gêneros</label>
              <select className="form-control" onClick={onChange('genre_id')}>
                {genres.map(genre => <option key={genre.id} value={genre.id} select={genre.id === form.genre}>{genre.name}</option>)}
                
              </select>
            </div>
            <button type="button" onClick={save} className='btn btn-primary'>Salvar</button>
            <button className='btn btn-primary' onClick={() => setMode('INFO')}>Cancelar</button>
          </form>
        </div>
      }
    </div>
  );
}

export default InfoSerie;