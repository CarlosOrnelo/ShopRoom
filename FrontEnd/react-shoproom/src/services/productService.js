import http from './httpService';
import { apiEndpoint } from '../config.json';

const urlEndpoint = '/products/';

export async function getProduct (id) {
    const { data } = await http.get(apiEndpoint + urlEndpoint + id);
    return data;
};