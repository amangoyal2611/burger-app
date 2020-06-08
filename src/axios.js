import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-79093.firebaseio.com/'
})