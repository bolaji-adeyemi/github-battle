import React from 'react';
import Popular from './Popular';
import Home from './Home';
import Battle from './Battle';
import Results from './Results'
var  ReactRouter = require('react-router-dom');
import Nav from './Nav';
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;


class App extends React.Component {

    render() {
        return (
            <Router>
                <div className='container'>
                    <Nav/>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route exact path='/battle' component={Battle}/>
                        <Route  path='/battle/results' component={Results}/>
                        <Route path='/popular' component={Popular}/>
                        <Route render={function () {
                            return <p>Not Found</p>
                        }}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}
module.exports = App;