<template>
  <nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <h2>Учебные курсы</h2>
        <div class="buttons-login">
          <button class="" @click.prevent="openModal">
            <font-awesome-icon icon="fa-solid fa-arrow-right-to-bracket" />
          </button>
          <button class=""><font-awesome-icon icon="fa-solid fa-key" /></button>
        </div>
      </div>
    </div>
  </nav>

  <ModalView title="Вход" :modelValue="modal" @show="hideModal">
    <div class="px-2">
      <label for="email">Email </label>
      <input id="email" type="text" class="w-100" required v-model="email" />
    </div>
    <div class="px-2">
      <label for="password"> Пароль </label>
      <input
        type="password"
        name="password"
        id="password"
        class="w-100"
        required
        v-model="password"
      />
    </div>
    <div name="modal-view-footer">
      <button type="button" @click="login">Войти</button>
    </div>
  </ModalView>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import ModalView from '../components/ModalView.vue';
import axios from '../helpers/axios';

library.add(faUser);

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
      let user = {
        login: this.email,
        password: this.password,
      };
      axios
        .post('http://localhost:5000/api/auth/login/', user)
        .then((r: any) => {
          console.log(r);
        })
        .catch((e: any) => {
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

.buttons-login {
  @apply flex justify-between px-6;
}
</style>
