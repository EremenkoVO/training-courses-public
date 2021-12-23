// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require('axios');
axios.defaults.baseURL = process.env.api_uri;
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';

export default axios;
