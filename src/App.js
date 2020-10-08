import React from 'react';


import Header from './components/Header';
import Genres from './components/Genres';
import NewGenres from './components/NewGenres';
import EditGenres from './components/EditGenres'

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'


function App() {
  
  
  return (
    <Router>
      <div>
        <Header />
        <Route exact path='/'/>
        <Route exact path='/generos/novo' component={NewGenres}/>
        <Route exact path='/generos' component={Genres}/>
        <Route exact path='/generos/:id' component={EditGenres}/>
      </div>
    </Router>
  );
}

export default App;
