import { createApp } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';
import store from './store';
import './font-awesome';
import './assets/style/index.css';
import './assets/style/notice.css';

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(store)
  .use(router)
  .mount('#app');
