import React, { Component, useState, Fragment } from 'react';
import PageContext from '../context/pageContext';
import history from 'history/browser';


class NavBar extends Component {
    
    changePage = path => {
        history.push(path)
        history.go(path)
    }

    state = {
        pages: [
            { name: 'Home', current: true, path: '/' },
            { name: 'Products', current: false, path: '/products' },
            { name: 'Categories', current: false, path: '/categories/' },
            { name: 'Shopping Cart', current: false, path: '/cart' },
            { name: 'Login', current: false, path: '/login' }
        ]
    }
    
    render() { 
        return (

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" >ShopRoom</a>
                {this.state.pages.map(element => {
                    return <a className="nav-item nav-link" key={element.name} onClick={e => this.changePage(element.path)}>{element.name}</a>
                })}
            </nav>

          );
    }
}

NavBar.contextType = PageContext;

export default NavBar;

