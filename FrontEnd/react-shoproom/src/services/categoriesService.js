import http from './httpService';
import { apiEndpoint } from '../config.json';

const urlEndpoint = '/categories/';

export async function getCategories () {
    const { data } = await http.get(apiEndpoint + urlEndpoint);
    return data;
};

export async function getCategorie (id) {
    const { data } = await http.post(apiEndpoint + urlEndpoint + id);
    return data;
}