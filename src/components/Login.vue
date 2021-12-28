<template>
  <div>
    <ModalView title="Вход" v-model="show" @show="updateModal">
      <div class="flex flex-col">
        <div class="justify-between px-2 m-2 w-100">
          <v-input
            v-model="login"
            type="text"
            title="email"
            helper="Привер: test@test.ru"
          ></v-input>
        </div>
        <div class="justify-between px-2 m-2">
          <v-input v-model="password" type="password" title="Пароль"></v-input>
        </div>
      </div>
      <template #modal-view-footer class="text-right">
        <div class="text-right">
          <button type="button" class="btn success" @click="onLogin">
            Войти
          </button>
        </div>
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
