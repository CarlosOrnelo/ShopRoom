import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Banner from '../components/banner';
import Bottom from '../components/bottom';
import { topProducts } from '../services/orderService';
import { ShowProducts } from '../components/showProducts';

class Home extends Component {
    
  state = {
    products: []
    }
  
  async componentDidMount() {
    const products = await topProducts();
    this.setState({ products });
  }




  render() { 
      return (
          <React.Fragment>
            <Navbar />
            <div className='home'>
            <Banner />
              <h2 className='bestseller-title'>Our Bestsellers!</h2>
                {ShowProducts(this.state.products, null, null, null, 'hide')}
            </div>
            <Bottom />
          </React.Fragment>
        );
  }
}
 
export default Home;