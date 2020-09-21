import React from 'react';
import Header from '../general/Header.js';
import Main from "./Main.js";
import '../../App.css';
import { Jumbotron } from 'react-bootstrap';

function App() {
  return (
    <div>
      <Header title="טופס הגשת משמרות שבועיות" />
      <Main />
    </div>
  );
}

export default App;
