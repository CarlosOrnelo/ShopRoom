import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Redirect, Route, Switch} from 'react-router-dom';
import Home from './routes/home';
import Products from './routes/products';
import Product from './routes/product';
import Categories from './routes/categories';
import Cart from './routes/cart';
import Login from './routes/login';
import Logout from './routes/logout';
import Checkout from './routes/checkout';
import Orders from './routes/orders';

class App extends Component {
  state = {}
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/categories/:id' component={Categories} />
          <Route path='/product/:id' component={Product} />
          {localStorage.getItem('x-auth-user') ? null : <Route path='/login' component={Login} />}
          {!localStorage.getItem('x-auth-user') ? null : <Route path='/checkout' component={Checkout} />}
          {!localStorage.getItem('x-auth-user') ? null : <Route path='/orders' component={Orders} />}
          {!localStorage.getItem('x-auth-user') ? null : <Route path='/logout' component={Logout} />}
          <Route path='/cart' component={Cart} />
          <Route path='/products' component={Products} />
          <Route path='/home' component={Home} />
          <Redirect from='/' to='/home' component={Home} />
        </Switch>
      </Router>
    );
  }
}

export default App;
