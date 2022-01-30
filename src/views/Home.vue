<template>
  <div class="login-page">
    <div class="login-page__wrapper">
      <Login />
    </div>
  </div>
</template>

<script>
import Login from '../components/Login.vue';

export default {
  name: 'Home',
  components: {
    Login,
  },
  data: () => ({}),
};
</script>

<style scoped lang="postcss">
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  height: 100%;
  width: 100%;
}
</style>
