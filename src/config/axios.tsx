import axios from 'axios';
import history from './history'

const appID = "fPr27Pe2ykZH812vbpcRwee6"
const appSecret = "xu6mBzR7kX1J331dqdhyampy"

const instance = axios.create({
    baseURL: 'https://gp-server.hunger-valley.com/',
    headers: {
        't-app-id': appID,
        't-app-secret': appSecret
    }
});
/* tslint:disable:no-string-literal */
// Add a request interceptor
instance.interceptors.request.use(function (config) {
    const xToken = localStorage.getItem('x-token')
    if(xToken){
        config.headers['Authorization'] = `Bearer ${xToken}`
    }
    return config;
}, function (error) {
    console.error(error)
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    if(response.headers['x-token']){
        localStorage.setItem('x-token',response.headers['x-token'])
    }
    return response;
}, function (error) {
    // if(error.response.status){
    //     history.push('/login')
    // }
    history.push('/login')
    return Promise.reject(error);
});

/* tslint:enable:no-string-literal */
export default instance