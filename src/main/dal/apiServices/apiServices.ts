import axios from 'axios';

export const apiServices = axios.create({
    baseURL: `https://neko-back.herokuapp.com/2.0`,
});