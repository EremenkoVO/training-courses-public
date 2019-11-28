import Vue from 'vue';
import * as fb from 'firebase';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import store from './store';
import router from './route';
import moment from 'moment';

moment.locale('ru');

Vue.config.productionTip = false;

new Vue({
  vuetify, store, router, moment,
  render: h => h(App),
  created() {
    var firebaseConfig = {
      // Конфигурация firebase
    };
    // Initialize Firebase
    fb.initializeApp(firebaseConfig);

    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user);
      }
    });
  }
}).$mount('#app');
