import React from 'react'
import Header from '../general/Header'
import Main from "./Main"
import '../../App.css'
import { Jumbotron } from 'react-bootstrap'

function App() {
  return (
    <div>
      <Header title="דף אדמין" />
      <Main />
    </div>
  );
}

export default App;
