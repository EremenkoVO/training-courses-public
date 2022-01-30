<template>
  <div class="w-full max-w-xs">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="username"
        >
          Username
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Username"
          v-model="login"
        />
      </div>
      <div class="mb-6">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="password"
        >
          Password
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline;"
          id="password"
          type="password"
          placeholder="******************"
          v-model="password"
        />
      </div>
      <div class="mb-6">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="password"
        >
          Repite password
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline;"
          id="repite-password"
          type="password"
          placeholder="******************"
          v-model="repitePassword"
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          @click="signUp"
        >
          Sign Up
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import notice from '../helpers/notice';
import axios from '../helpers/axios';

export default {
  name: 'Register',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    login: '',
    password: '',
    repitePassword: '',
  }),
  methods: {
    signUp() {
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
              console.log(profile);

              axios
                .post('profile/create', profile)
                .then((response) => {
                  console.log(response);
                  this.$router.push('/profile');
                })
                .catch((error) => {
                  notice.error(error.response.data.message);
                });
            })
            .catch((error) => {
              console.log(error);
              notice.error(error.response.data.message);
            });
        }
      } else {
        notice.error('Введеные пароли не совпадают');
      }
    },
  },
};
</script>
