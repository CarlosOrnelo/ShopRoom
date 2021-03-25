import React, { Component, Fragment } from 'react';
import Navbar from '../components/navbar';
import Banner from '../components/banner';
import Bottom from '../components/bottom';
import { getCategorie } from '../services/categoriesService';
import { ShowProducts } from '../components/showProducts';

class Categories extends Component {

    state = { products: []
    }

    async componentDidMount() {
        const products = await getCategorie(this.props.match.params.id);
        this.setState({ products })
    }

    render() {
        
        return (
            <React.Fragment>
                <Navbar />
                <Banner />
                <div className='categories-container'>
                    {this.state.products[0] ? ShowProducts(this.state.products) : <div><p>There are no products in this category!</p></div>}
                </div>
                <Bottom />
            </React.Fragment>
            );
    }
}

export default Categories;