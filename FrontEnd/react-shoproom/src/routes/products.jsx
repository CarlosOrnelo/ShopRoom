import React, { Component, Fragment } from 'react';
import Navbar from '../components/navbar';
import Banner from '../components/banner';
import Bottom from '../components/bottom';
import { getProducts } from '../services/productsService';
import { ShowProducts } from '../components/showProducts';
import Pagination from '../components/pagination';
import SearchBar from '../components/searchBar';

class Products extends Component {
    
    state = {
        products: [],
        page: 1,
        pageSize: 16,
        searchQuery: ''
      }
      
    async componentDidMount() {
        let products = await getProducts();
        this.setState({ products });
    }

    handleChange = page => 
        this.setState({ page })
    
    handleSearch = query => {
        this.setState({ searchQuery: query });
    };

    
    render() { 
        
        let products = this.state.products.filter(product => product.name.toLowerCase().match(this.state.searchQuery.toLowerCase())) 
        
        return (
            <React.Fragment>
                <SearchBar
                    query={this.state.searchQuery}
                    handleSearch={this.handleSearch}
                />
                <Navbar />
                <Banner />
                <p></p>
                {ShowProducts(products, null, this.state.page, this.state.pageSize)}
                <Pagination 
                    items={this.state.products.length}
                    pageSize={this.state.pageSize}
                    currentPage={this.state.page}
                    handleChange={this.handleChange}
                />
                <Bottom />
            </React.Fragment>
        );
    }
}

export default Products;
