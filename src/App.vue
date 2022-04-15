<template>
  <div>
    <Header v-if="isLogin" />
    <div>
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from './layouts/header.vue';

export default {
  components: {
    Header,
  },
  computed: {
    isLogin() {
      return this.$store.getters['auth/statusLogin'];
    },
  },
};
</script>

<style></style>
