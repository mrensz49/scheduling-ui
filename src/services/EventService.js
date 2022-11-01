import axios from 'axios'

const apiClient = axios.create({
    baseURL: `http://localhost:8080/`,
    //   baseURL: `http://localhost:8081/`,
//   withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 15000
})

apiClient.interceptors.request.use(function (config) {
    const token = localStorage.getItem('scheduling_token');
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, null, { synchronous: true });

export default {

    register(payloads) {
        return apiClient.post(`/api/register`, payloads)
    },

    login(payloads) {
        return apiClient.post(`/api/login`, payloads)
    },

}