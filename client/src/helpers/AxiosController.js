import axios from 'axios';

const devRuta = 'http://localhost:8080'

const axiosController = axios.create({
    baseURL: devRuta
})

export default axiosController