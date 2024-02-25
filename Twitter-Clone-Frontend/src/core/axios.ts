import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/';

axios.interceptors.request.use((config) => {
  config.headers.token = window.localStorage.getItem('twitter-clone-token');
  return config;
});

export default axios;
