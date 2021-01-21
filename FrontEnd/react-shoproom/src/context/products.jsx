import React, { Component, Fragment } from 'react';
import Navbar from '../hooks/navbar';
import { getProducts } from '../services/productsService';

class Products extends Component {
    
    state = {
        products: []
      }
    
    async componentDidMount() {
        
        const products = await getProducts();
        console.log(products)
        
    }

    render() { 
        return (
            <Fragment>
                <Navbar />
            </Fragment>
        );
    }
}
 
export default Products;
