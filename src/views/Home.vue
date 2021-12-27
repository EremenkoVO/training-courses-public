<template>
  <div class="home">
    <nav class="nav">
      <h2 class="m-2">Учебные курсы</h2>
      <div class="justify-around">
        <button type="button" class="m-2" @click="loginShow = !loginShow">
          Войти
        </button>
        <button type="button" class="m-2" @click="registerShow = !registerShow">
          Регистрация
        </button>
      </div>
    </nav>
    <Login v-model="loginShow" @show="loginShow = data" />
    <Register v-model="registerShow" @show="registerShow = data" />
  </div>
</template>

<script>
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
export default {
  name: 'Home',
  components: {
    Login,
    Register,
  },
  data: () => ({
    loginShow: false,
    registerShow: false,
  }),
};
</script>

<style scoped lang="postcss">
.nav {
  @apply flex justify-between h-11 bg-gray-600 text-white;
}
</style>
