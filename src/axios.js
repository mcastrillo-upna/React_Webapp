import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://dsm-react-90c16.firebaseio.com/trabajofinal'
});

export default instance;