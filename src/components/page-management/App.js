import React, {useState} from 'react';
import Header from '../general/Header.js';
import Tab1 from "./Tab1/Tab1-construction";
import Tab2 from "./Tab2-specials";
import Tab3 from "./Tab3-constraints";
import Tab4 from "./Tab4-history";
import '../../App.css';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

function App() {
  const [key, setKey] = useState('1');

  return (
    <div>
      <Header title="טופס ניהול משמרות" />

      <Tabs
        id="controlled-tab-example"
        defaultActiveKey={key}
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="1" title="הכנת סידור"><Tab1 /></Tab>
        <Tab eventKey="2" title="מיוחדים"><Tab2 /></Tab>
        <Tab eventKey="3" title="אילוצים"><Tab3 /></Tab>
        <Tab eventKey="4" title="היסטוריה"><Tab4 /></Tab>
      </Tabs>

    </div>
  );
}

export default App;
