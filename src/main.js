import { createApp } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';
import store from './store';
import FormInput from './components/UI/FormInput.vue';

import './font-awesome';
import './assets/tailwind.css';
import './assets/style.css';
import './assets/notice.css';
import './assets/ui.css';

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .component('v-input', FormInput)
  .use(store)
  .use(router)
  .mount('#app');
