import Vue from "vue";
import firebase from "firebase";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import store from "./store";
import router from "./route";

Vue.config.productionTip = false;

new Vue({
  vuetify,
  store,
  router,
  render: (h) => h(App),
  created() {
    const firebaseConfig = {};
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch("autoLoginUser", user);
      }
    });
  },
}).$mount("#app");
