import React, {useState, useEffect} from 'react'
import Header from '../general/Header'
import Tab1 from "./Tab1/Tab1-construction"
import Tab2 from "./Tab2-specials"
import Tab3 from "./Tab3-constraints"
import Tab4 from "./Tab4-history"
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

function App() {
  const [key, setKey] = useState('1')
  let bakarim
  useEffect(() => {
    fetch('/getemployees', {method: 'GET'})
    .then(res => res.json())
    .then(data => {
        bakarim = data['all_emps']
    })
    .catch(error => {
        alert("couldn't get bakarim from DB: " + error)
    })
  }, [])

  return (
    <div>
      <Header title="טופס ניהול משמרות" />

      <Tabs
        style={{margin: "auto auto 10px auto", maxWidth: "800px"}}
        defaultActiveKey={key}
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="1" title="הכנת סידור"><Tab1 bakarim={bakarim} /></Tab>
        <Tab eventKey="2" title="מיוחדים"><Tab2 /></Tab>
        <Tab eventKey="3" title="אילוצים"><Tab3 /></Tab>
        <Tab eventKey="4" title="היסטוריה"><Tab4 bakarim={bakarim} /></Tab>
      </Tabs>

    </div>
  );
}

export default App;
