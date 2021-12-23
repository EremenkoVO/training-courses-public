<template>
  <nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <label class="title">Учебные курсы</label>
        <div class="buttons-login">
          <button
            class="border-transparent text-white"
            title="Авторизация"
            @click.prevent="openModal"
          >
            <font-awesome-icon icon="arrow-right" />
          </button>
          <button class="border-transparent text-white" title="Регистрация">
            <font-awesome-icon icon="key" />
          </button>
        </div>
      </div>
    </div>
  </nav>

  <ModalView title="Вход" :modelValue="modal" @show="hideModal">
    <div class="p-5">
      <div class="my-2">
        <label for="email" class="px-2">Email </label>
        <input type="text" name="email" id="email" required v-model="email" />
      </div>
      <div class="my-2">
        <label for="password" class="px-2"> Пароль </label>
        <input
          type="password"
          name="password"
          id="password"
          required
          v-model="password"
        />
      </div>
    </div>

    <template #modal-view-footer>
      <button type="button" @click="login">Войти</button>
    </template>
  </ModalView>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { User } from '../interface/user.interface';
import ModalView from '../components/ModalView.vue';
import axios from '../helpers/axios';
import notice from '../helpers/notice';

export default defineComponent({
  name: 'Header',
  components: {
    ModalView,
  },
  data() {
    return {
      modal: false,
      email: '',
      password: '',
    };
  },
  methods: {
    hideModal() {
      this.modal = !this.modal;
    },
    openModal() {
      this.modal = true;
    },

    login() {
      let user: User = {
        login: this.email,
        password: this.password,
      };

      axios
        .post('http://localhost:5000/api/auth/login/', user)
        .then((r: any) => {
          notice.success('Авторизация прошла успешна');
          console.log(r);
        })
        .catch((e: any) => {
          notice.error(e.response.data.message);
          console.log(e);
        });
    },
  },
});
</script>

<style scoped lang="postcss">
h2 {
  color: white;
}

.title {
  font-size: 20px;
  color: white;
}

.buttons-login {
  @apply flex justify-between px-6;
}
</style>
