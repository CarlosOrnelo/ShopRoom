import React, { Component, useState, Fragment } from 'react';
import { getCategories } from '../services/categoriesService';
import { changePage } from '../services/changePageService';

class NavBar extends Component {
    
    state = {
        pages: [
            { name: 'Home', current: true, path: '/' },
            { name: 'Products', current: false, path: '/products' },
            { name: 'Categories', current: false, path: '/categories/', subCategories: [{}]},
            { name: 'Shopping Cart', current: false, path: '/cart' },
            { name: 'Login', current: false, path: '/login' }
        ]
    }

    async componentDidMount() {
        let subCategories = {...this.state.pages}
        const categories = await getCategories();
        subCategories[2].subCategories = categories
        this.setState({ subCategories })
    }
    
    render() { 
        return (
                <nav className="navbar">
                    {this.state.pages.map(element => {
                        return !element.subCategories ? <a className="nav-item" key={element.name} onClick={e => changePage(element.path)}>{element.name}</a> :
                        
                        <div className='dropdown' key={element.name}>
                            <button className='dropbtn' key={element.name}>{element.name}</button>
                                <div className="dropdown-content">
                                    {element.subCategories.map(sub => <a key={sub._id + sub.name} onClick={e => changePage(element.path + sub._id)}>{sub.name}</a>)}
                                </div>
                        </div>
                        
                    })}
                </nav>
          );
    }
}

export default NavBar;

