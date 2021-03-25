import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Banner from '../components/banner';
import Bottom from '../components/bottom';
import { getOrders } from '../services/orderService';

class Orders extends Component {

    state = {
        orders: []
    }

    async componentDidMount() {
        const id = JSON.parse(localStorage.getItem('x-auth-user'))._id;
        const orders = await getOrders(id);
        this.setState({ orders });
    }                
    
    render() {
        return (
            <React.Fragment>
                <Navbar />
                <Banner />
                <div className='orders-form'>
                    <div>
                        {this.state.orders[0] ? this.state.orders[0].user.name[0].toUpperCase() + this.state.orders[0].user.name.slice(1) + ' Orders:' : null}
                    </div>
                    {this.state.orders.map(element => {
                        return <div key={element._id}>
                            <p>Order: {element._id}</p>
                            <p>Order Date: {element.date.substring(0, 10)}</p>
                            <p>Total Cost: R$ {element.cost}</p>
                            <hr/>
                        </div>
                    })}
                </div>
                <Bottom />
            </React.Fragment>
        )
    }

}

export default Orders;