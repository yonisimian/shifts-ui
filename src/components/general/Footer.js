import React from 'react';
import NavLink from 'react-router-dom/NavLink';
import { routeURLs as url } from '../../config';
import Nav from 'react-bootstrap/Nav'

function App() {
  return (
    <footer className="footer navbar-fixed-bottom">
      <h6>Created by Guy Shamilian & Yehonatan Simian © 2020</h6>
      <Nav>
        <ul className='text-align-right'>
          <li><NavLink to={url.submissionPage}>הגשת משמרות</NavLink></li>
          <li><NavLink to={url.managementPage}>ניהול משמרות</NavLink></li>
          <li><NavLink to={url.adminPage}>אדמיניסטרציופוליניזיה</NavLink></li>
        </ul>
      </Nav>
    </footer>
  );
}


export default App;
