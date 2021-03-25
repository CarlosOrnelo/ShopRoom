import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Banner from '../components/banner';
import Bottom from '../components/bottom';
import { ShowProducts } from '../components/showProducts';
import { newOrder } from '../services/orderService';

class Checkout extends Component {

    state = {
        userData: null,
        products: null,
        cost: null,
        address: null
    }
    
    componentDidMount() {
        const {products, total} = this.props.location.state;
        const userData = JSON.parse(localStorage.getItem('x-auth-user')); 
        this.setState({ products });
        this.setState({ userData });
        this.setState({ cost: total });
    }

    handleAdress = address => {
        this.setState({ address })
    }

    render() {
        return (
            <React.Fragment>
                <Navbar />
                <Banner />
                <div className='checkout-container'>
                    <div className='adress'>
                        <input type="text" placeholder="Insert your adress..." onChange={e => this.handleAdress(e.target.value)}/>
                        <hr/>
                        <button disabled={!this.state.address} onClick={() => newOrder(this.state)}>Finish Order</button>
                    </div>
                    {ShowProducts(this.state.products)}
                </div>
                <Bottom />
            </React.Fragment>
        );
    }
}

export default Checkout;