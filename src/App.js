import React from 'react'
import Footer from './components/general/Footer'
import Submission from './components/page-submissions/App'
import Management from './components/page-management/App'
import AdminPage from './components/page-admin/App'
import PageNotFound from './components/general/PageNotFound'
import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import { routeURLs as url } from './config';

function App() {
    return (
        <Router>
            <div className="App">
                {/*currentPage*/}
                <Switch>
                    <Route exact path='/'><Redirect to={url.submissionPage} /></Route>
                    <Route exact path={url.submissionPage} component={Submission} />
                    <Route exact path={url.managementPage} component={Management} />
                    <Route exact path={url.adminPage} component={AdminPage} />
                    <Route component={PageNotFound} />
                </Switch>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
