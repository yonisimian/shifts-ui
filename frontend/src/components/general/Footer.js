import React from 'react';
import NavLink from 'react-router-dom/NavLink';
import { routeURLs as url } from '../../config';
import Nav from 'react-bootstrap/Nav'

function App() {
  return (
    <footer>
      <div>
        <h6>Created by Guy Shamilian & Yehonatan Simian © 2020</h6>
        {/* <h6 dir='ltr'>Special thanks to Bana ♥</h6> */}
        <Nav>
          <ul style={{textAlign: "right"}}>
            <li><NavLink to={url.submissionPage}>הגשת משמרות</NavLink></li>
            <li><NavLink to={url.managementPage}>ניהול משמרות</NavLink></li>
            <li><NavLink to={url.adminPage}>סתם ניהול</NavLink></li>
          </ul>
        </Nav>
      </div>
    </footer>
  );
}


export default App;
