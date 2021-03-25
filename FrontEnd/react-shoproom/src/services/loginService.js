import http from './httpService';
import { apiEndpoint } from '../config.json';
import { toast, ToastContainer } from 'react-toastify';
import { changePage } from '../services/changePageService';

const urlEndpoint = '/users';

export async function login(username, password) {

    const body = {
        'name': username,
        'password': password
    }
    const { data, headers } = await http.post(apiEndpoint, body);
    if(data === 'Invalid user or password!') return toast.error(data)

    toast.success(data);
    localStorage['x-auth-token'] = headers['x-auth-token'];
    localStorage['x-auth-user'] = headers['x-auth-user']
    window.location.href = '/'
}

export async function register(username, email, password) {

    const body = {
        'name': username,
        'email': email,
        'password': password
    }

    const { data } = await http.post(apiEndpoint + urlEndpoint, body);
    
    if(data.match('Error: ')) {
        toast.error(data)
    }
    else {
        toast.success(data.name);
        changePage('/')
    }

};

export async function logout() {

    localStorage.removeItem('x-auth-token');
    localStorage.removeItem('x-auth-user')
    window.location.href = '/'

}