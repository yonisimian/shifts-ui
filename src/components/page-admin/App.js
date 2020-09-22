import React from 'react'
import Header from '../general/Header'
import Main from "./Main"
import Main2 from './Main2'
import '../../App.css'
import { Jumbotron } from 'react-bootstrap'

function App() {
  return (
    <div>
      <Header title="דף אדמין" />
      <Main2 />
    </div>
  );
}

export default App;
