import Vue from "vue";
import * as fb from "firebase";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import store from "./store";
import router from "./route";
import moment from "moment";

moment.locale("ru");

Vue.config.productionTip = false;

new Vue({
  vuetify,
  store,
  router,
  moment,
  render: (h) => h(App),
  created() {
    var firebaseConfig = {
      // Конфигурация firebase
      apiKey: "AIzaSyBjQNN7rkE9tMUeJ_YJvvy3BfroxXSKavg",
      authDomain: "pages-history-lesson-math.firebaseapp.com",
      databaseURL: "https://pages-history-lesson-math.firebaseio.com",
      projectId: "pages-history-lesson-math",
      storageBucket: "pages-history-lesson-math.appspot.com",
      messagingSenderId: "68228576468",
      appId: "1:68228576468:web:bf30b471d37a3ba084f741",
      measurementId: "G-ET63NDSKF8",
    };
    // Initialize Firebase
    fb.initializeApp(firebaseConfig);

    fb.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch("autoLoginUser", user);
      }
    });
  },
}).$mount("#app");
