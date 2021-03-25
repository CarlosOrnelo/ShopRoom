import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Banner from '../components/banner';
import Bottom from '../components/bottom';
import { ShowProducts } from '../components/showProducts';

class Cart extends Component {

    state = {
        products: [],
        total: 0,
        isLogged: null
    }

    componentDidMount() {
        let products = JSON.parse(localStorage.getItem('shoproom-cart'));
        products ? this.setState({ products }) : products = [];

        const isLogged = localStorage.getItem('x-auth-user');
        this.setState({ isLogged });

        this.calculateTotal(products);

    }

    calculateTotal = products => {
        const total =  products.reduce((acc, val) => acc + val.quantity * val.price, 0);
        this.setState({ total });
    }

    
    removeFromCart = parametro => {
        const products = [...this.state.products];
        let product =  products.filter(element => {
            return element._id !== parametro
        });
        this.setState({ products: product });
        this.calculateTotal(product);


        localStorage['shoproom-cart'] = JSON.stringify(product)
    };

    toCheckout = (products, total) => {
        const data = {
            products,
            total
        }
        this.props.history.push(this.state.isLogged ? {pathname: '/checkout', state: data} : {pathname: '/login'})
    }


    render() {

        return (
            <React.Fragment>
                <Navbar />
                <Banner />
                <div className='cart-container'>
                    <div>
                        {this.state.products ? ShowProducts(this.state.products, this.removeFromCart) : null}
                    </div>
                    <div className='buy-div'>
                        {this.state.total ? (
                            <div className='total-cart'>
                                Total: R$ {this.state.total}
                                <hr/>
                                {this.state.products[0] ? 
                                    <button className='buy-button' 
                                    onClick={() => this.toCheckout(this.state.products, this.state.total)}>
                                        Buy
                                    </button> : 
                                null}
                            </div>
                        ) :
                        null}
                    </div>
                </div>
                <Bottom />
            </React.Fragment>
        );
    }
}

export default Cart;