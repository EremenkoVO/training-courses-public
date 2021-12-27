const axios = require('axios');
axios.defaults.baseURL = process.env.VUE_APP_API_URI;
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';

export default axios;
