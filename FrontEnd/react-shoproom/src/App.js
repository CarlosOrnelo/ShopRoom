import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import Home from './routes/home';
import Products from './routes/products';
import Product from './routes/product';
import Categories from './routes/categories';


class App extends Component {
  state = {}
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/categories/:id' component={Categories} />
          <Route path='/products/:id' component={Product} />
          <Route path='/products' component={Products} />
          <Route path='/' component={Home} />
        </Switch>
      </Router>
    );
  }
}

export default App;
