import React from 'react';
import { changePage } from '../services/changePageService';
import { paginate } from '../utils/paginate';
import addToCart from './addToCart';

export function ShowProducts(products, remove, pageNumber, pageSize, tagName) {
   
    if(!pageNumber && !pageSize) {
        pageNumber = 1;
        pageSize = 99;
    };

    products = paginate(products, pageNumber, pageSize);
    const routes = ['/home', '/cart', '/checkout'].find(element => element === window.location.pathname);
    
    return (

        <div className={`products-${window.location.pathname.substring(1).split('/')[0]}`}>
            {products.map((element, range) => 
                <div id='products-id' key={element._id || 'none'}>
                    {remove ? <button className='remove-button' onClick={() => remove(element._id)}><i>Remove from cart</i></button> : null}
                        <li className='product-details'>
                            <img className='product-image' src={element.image} onClick={() => changePage(`/product/${element._id}`)}/>
                            <h2>{element.name}</h2>
                            <p>R${element.price}</p>
                            <p className={tagName}>{element.quantity}</p>

                            {!routes ? (
                                <div className='insert-cart'>
                                    <input className='input-quantity-cart' type="number"
                                        min="1"
                                        max={element.stock > 5 ? 5 : element.stock}
                                        defaultValue='1'
                                        onChange={e => element.quantity = e.target.value}
                                    />
                                    <button
                                        className='addToCart'
                                        disabled={element.quantity}
                                        onClick={() => addToCart(element.quantity, JSON.parse(localStorage.getItem('shoproom-cart')), element)}
                                    >
                                        Add to cart
                                    </button>
                                </div>
                            )
                            :
                                null
                            }
                        </li>
                </div>
            )}
        </div>
    );
}
