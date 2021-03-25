import { toast } from 'react-toastify';
import { apiEndpoint } from '../config.json';
import http from '../services/httpService';
import { changePage } from './changePageService';

const urlEndpoint = '/orders/';

const headers = {
    'Content-Type': 'application/json',
    'x-auth-token': localStorage.getItem('x-auth-token')
}

export async function newOrder(requestData) {
    
    const { data } = await http.post(apiEndpoint + urlEndpoint, requestData, {headers: headers});

    if(data._id) {
        changePage('/orders');
        localStorage.removeItem('shoproom-cart')
    }

    toast.error('Quantidade maior que o estoque disponível');
    console.log(requestData);

    return data
}

export async function getOrders(id) {

    const { data } = await http.get(apiEndpoint + urlEndpoint + id, {headers: headers});
    return data
    
};

export async function topProducts() {

    const { data } = await http.get(apiEndpoint + urlEndpoint);
    const productsArray = [];
    let topProducts = [];

    data.map(element => element.products.map(subElement => {
        productsArray.push(subElement)
    }));

    
    // Transform in one array with total quantity
    productsArray.forEach((item) => {
        if(!topProducts[0]) {topProducts.push(item)}
        else {
            const verify = topProducts.findIndex((product) => product._id === item._id)
            verify === -1 ? topProducts.push(item) : topProducts[verify].quantity += item.quantity
        }
    });
    
    //Sort by quantity "desc"
    topProducts.sort((a, b) => a.quantity > b.quantity ? -1 : 1 )

    return topProducts.slice(0, 5);
}