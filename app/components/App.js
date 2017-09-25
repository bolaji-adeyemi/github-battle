import React from 'react';
import Popular from './Popular';
var  ReactRouter = require('react-router-dom');
import Nav from './Nav';
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;


class App extends React.Component {

    render() {
        return (
            <Router>
                <div className='container'>
                    <Nav/>
                   <Route path='/popular' component={Popular}/>
                </div>
            </Router>
        )
    }
}
module.exports = App;