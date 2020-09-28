import React, {useState, useEffect} from 'react';
import Header from '../general/Header.js';
import Main from "./Main.js";
import '../../App.css';

function App() {
  const [bakarim, setBakarim] = useState([])
  useEffect(() => {
    fetch('/getemployees', {method: 'GET'})
    .then(res => res.json())
    .then(data => {
        let emps = data['all_emps'].map(val => val.full_name)
        setBakarim(emps)
    })
    .catch(error => {
        alert("couldn't get bakarim from DB: " + error)
    })
  }, [])

  return (
    <div>
      <Header title="טופס הגשת משמרות שבועיות" />
      <Main bakarim={bakarim}/>
    </div>
  );
}

export default App;
