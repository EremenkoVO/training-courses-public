<template>
  <div class="w-full login-page">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div
        v-if="isError"
        class="mb-4 rounded px-2 py-2 bg-red-500 text-white text-center"
      >
        {{ error }}
      </div>
      <div class="mb-4">
        <label for="username" class="block text-gray text-sm font-bold mb-2"
          >Email</label
        >
        <input
          id="username"
          type="text"
          class="form-control"
          placeholder="Введите email"
          v-model="login"
        />
      </div>
      <div class="mb-6">
        <label
          for="password"
          class="block text-gray-700 text-sm font-bold mb-2"
        >
          Пароль
        </label>
        <input
          id="password"
          type="password"
          class="form-control"
          placeholder="Введите пароль"
          v-model="password"
        />
        <a
          v-if="isLogin"
          class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          href="#"
          >Забыли пароль</a
        >
      </div>
      <div class="mb-6" v-if="isRegister">
        <label
          for="password"
          class="block text-gray-700 text-sm font-bold mb-2"
        >
          Повторите пароль
        </label>
        <input
          type="password"
          class="form-control"
          placeholder="Повторите пароль"
          v-model="repitePassword"
        />
      </div>
      <div v-if="isLogin" class="flex items-center justify-between">
        <button
          type="button"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          @click="onLogin"
        >
          Войти
        </button>
        <button
          type="button"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          @click="goRegister"
        >
          Зарегистрироваться
        </button>
      </div>
      <div v-else-if="isRegister" class="flex items-center justify-between">
        <button
          type="button"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          @click="onRegister"
        >
          Зарегистрироваться
        </button>
        <button
          type="button"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          @click="goLogin"
        >
          Назад
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from '../helpers/axios';
export default {
  data: () => ({
    state: 'login',
    error: '',
    login: '',
    password: '',
    repitePassword: '',
  }),
  computed: {
    isLogin() {
      return this.state === 'login';
    },
    isRegister() {
      return this.state === 'register';
    },
    isError() {
      return this.error != '';
    },
  },
  methods: {
    onLogin() {
      let user = {
        login: this.login,
        password: this.password,
      };
      if (this.login && this.password) {
        this.$store.dispatch('auth/login', user).then(
          () => {
            this.$router.push('/profile');
          },
          (error) => {
            let message = error?.response?.data?.message ?? 'Ошибка входа';
            this.error = message;
          },
        );
      }
    },
    onRegister() {
      let user = {
        login: this.login,
        password: this.password,
      };

      if (this.repitePassword == this.password) {
        if (this.login && this.password) {
          this.$store
            .dispatch('auth/register', user)
            .then((response) => {
              let profile = {
                image: '',
                email: response.email,
                firstName: '',
                secondName: '',
                age: 0,
                id_account: response._id,
              };

              axios
                .post('profile/create', profile)
                .then(() => {
                  this.$router.push('/profile');
                })
                .catch((error) => {
                  this.error(error.response.data.message);
                });
            })
            .catch((error) => {
              this.error = error.response.data.message;
            });
        }
      } else {
        this.error = 'Введеные пароли не совпадают';
      }
    },
    goRegister() {
      this.state = 'register';
    },
    goLogin() {
      this.state = 'login';
    },
  },
};
</script>

<style>
.login-page {
  @apply flex items-center absolute justify-center h-full w-full;
}
</style>
