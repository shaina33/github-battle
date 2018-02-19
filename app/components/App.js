var React = require('react');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
var Nav = require('./Nav');
var Home = require('./Home');
var Popular = require('./Popular');
var Battle = require('./Battle');

class App extends React.Component {
    render() {
        return (
          <Router>
              <div className='container'>
                  <Nav />
                  <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/popular' component={Popular} />
                    <Route path='/battle' exact component={Battle} />
                    <Route render={ function() {
                      return <p>Not Found</p>
                    }} />
                  </Switch>
              </div>
          </Router>
        )
    }
}

module.exports = App;
