import React from 'react';


import Header from './components/Header';
import Genres from './components/Genres';
import NewGenres from './components/NewGenres';
import EditGenres from './components/EditGenres'
import Series from './components/Series';
import NewSeries from './components/NewSerie';
import InforSerie from './components/InfoSerie';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'


function App() {


  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path='/' />
          <Route exact path='/series' component={Series} />
          <Route exact path='/generos' component={Genres} />
          <Route exact path='/generos/novo' component={NewGenres} />
          <Route exact path='/series/novo' component={NewSeries} />
          <Route exact path='/generos/:id' component={EditGenres} />
          <Route exact path='/series/:id' component={InforSerie} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
