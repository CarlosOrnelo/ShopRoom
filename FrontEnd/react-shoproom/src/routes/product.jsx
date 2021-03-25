import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Banner from '../components/banner';
import Bottom from '../components/bottom';
import { getProduct } from '../services/productService';
import { ShowProducts } from '../components/showProducts';

class Product extends Component {

    state = {
        product: []
    }

    async componentDidMount() {
        let product = await getProduct(this.props.match.params.id);
        product = product.stock > 0 ? product : null;
        this.setState({ product });
    }

    render() {
        return (
            <React.Fragment>
                <Navbar />
                <Banner />
                {this.state.product ? ShowProducts(Array(this.state.product)) : null}
                <Bottom />
            </React.Fragment>
        );
    }
}

export default Product;