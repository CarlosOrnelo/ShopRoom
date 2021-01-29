import http from './httpService';
import { apiEndpoint } from '../config.json';

const urlEndpoint = '/products/';

export async function getProducts () {
    const { data } = await http.get(apiEndpoint + urlEndpoint);
    return data;
};

