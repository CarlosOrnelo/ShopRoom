import { toast, ToastContainer } from 'react-toastify';

function addToCart (quantity, cartProducts, product) {
      
    let productsCart = cartProducts;

    if(!quantity) {
        quantity = 1
    };
    
    if(!productsCart)
        productsCart = [];
    
    let newProduct = productsCart.find(element => {
        return element._id === product._id
    });

    if(!newProduct) {
        newProduct = product;
        newProduct.quantity = quantity;
        productsCart.push(newProduct);
        toast.success(`${product.name} added to your cart!`)
    }
    else {
        productsCart.find((element, range) => {
            return element._id === product._id && parseInt(element.quantity) + parseInt(quantity) <= 5 ? 
            (productsCart[range].quantity = parseInt(productsCart[range].quantity) + parseInt(quantity), toast.success(`${element.name} added to your cart!`)) : 
            toast.error('Maximum units on cart is 5!');
        })
    }

    localStorage.setItem('shoproom-cart', JSON.stringify(productsCart))

};

export default addToCart