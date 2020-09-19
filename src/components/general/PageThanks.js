import React from 'react';
import NavLink from 'react-router-dom/NavLink';
import { routeURLs as url } from '../../config';

function App() {
  return (
    <div>
      <h1>תודה רבה!</h1>
      <NavLink to={url.submissionPage}>לדף הבית</NavLink>
    </div>
  );
}


export default App;
