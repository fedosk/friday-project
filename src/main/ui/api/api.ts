import axios from 'axios';

export const apiServices = axios.create({
    baseURL: `http://localhost:7542/2.0/`,
});