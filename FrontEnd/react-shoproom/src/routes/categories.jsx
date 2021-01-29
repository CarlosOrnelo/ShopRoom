import React, { Component, Fragment } from 'react';
import Navbar from '../components/navbar';
import { getCategorie } from '../services/categoriesService';

class Categories extends Component {

    state = { products: []
    }

    async componentDidMount() {
        const products = await getCategorie(this.props.match.params.id);
        this.setState( products )
        console.log(this.state);
    }

    render() {
        
        return (
            <Navbar />
            );
    }
}

export default Categories;