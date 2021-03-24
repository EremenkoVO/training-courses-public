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
    const firebaseConfig = {
      apiKey: "AIzaSyBPIDSnG3_d_qnRa_uih6m_NVtKOoJy6j8",
      authDomain: "pages-history-lesson-mat-c6a0d.firebaseapp.com",
      databaseURL:
        "https://pages-history-lesson-mat-c6a0d-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "pages-history-lesson-mat-c6a0d",
      storageBucket: "pages-history-lesson-mat-c6a0d.appspot.com",
      messagingSenderId: "508167722264",
      appId: "1:508167722264:web:13be25a2899b17ef403a6d",
      measurementId: "G-QXZN5KTBCY",
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch("autoLoginUser", user);
      }
    });
  },
}).$mount("#app");
