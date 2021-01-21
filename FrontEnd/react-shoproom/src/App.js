import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './context/home';
import Products from './context/products';

class App extends Component {
  state = {}
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/products' component={Products} />
          <Route path='/' component={Home} />
        </Switch>
      </Router>
    );
  }
}

export default App;
