import React, { Component, Fragment } from 'react';
import Navbar from '../components/navbar';
import { getProducts } from '../services/productsService';


class Products extends Component {
    
    state = {
        products: []
      }
    
    async componentDidMount() {
        
        const products = await getProducts();
        this.setState({ products })
    }

    render() { 
        return (
            <React.Fragment>
                <Navbar />
                    {this.state.products[0] ? 
                        this.state.products.map( element =>
                        <div key={element._id}>
                            <img src={element.image} width="300" height="300" onClick={() => console.log(element._id)} />
                            <p>{element.name}</p>
                            <p>R${element.price}</p>
                        </div> 
                        )
                        :
                        null
                    }
            </React.Fragment>
        );
    }
}
 
export default Products;
