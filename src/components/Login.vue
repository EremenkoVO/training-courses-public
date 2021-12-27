<template>
  <div>
    <ModalView title="Вход" v-model="show" @show="updateModal">
      <div class="flex flex-col">
        <div class="justify-between px-2 m-2">
          <label for="email" class="px-2">Email</label>
          <input
            type="text"
            id="email"
            placeholder="Введите email"
            v-model="login"
          />
        </div>
        <div class="justify-between px-2 m-2">
          <label for="password" class="px-2">Пароль</label>
          <input
            type="password"
            id="password"
            placeholder="Введите ваш пароль"
            v-model="password"
          />
        </div>
      </div>
      <template #modal-view-footer>
        <button type="button" class="text-right" @click="onLogin">Войти</button>
      </template>
    </ModalView>
  </div>
</template>

<script>
import ModalView from '@/components/UI/ModalView.vue';
import notice from '../helpers/notice';

export default {
  name: 'Login',
  components: {
    ModalView,
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    login: '',
    password: '',
  }),
  computed: {
    show() {
      return this.modelValue;
    },
  },
  methods: {
    updateModal(data) {
      this.$emit('show', data);
    },
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
            notice.error(message);
          },
        );
      }
    },
  },
};
</script>

<style></style>
