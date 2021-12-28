<template>
  <div>
    <ModalView title="Регистрация" v-model="show" @show="updateModal">
      <div class="flex flex-col">
        <div class="justify-between px-2 m-2">
          <v-input
            v-model="login"
            type="text"
            title="email"
            helper="Привер: test@test.ru"
          ></v-input>
        </div>
        <div class="flex-col px-2 m-2">
          <v-input v-model="password" type="password" title="Пароль"></v-input>
        </div>
        <div class="justify-between px-2 m-2">
          <v-input
            v-model="repitePassword"
            type="password"
            title="Повторите пароль"
          ></v-input>
        </div>
      </div>
      <template #modal-view-footer>
        <div class="text-right">
          <button type="button" class="btn success">Зарегистрироваться</button>
        </div>
      </template>
    </ModalView>
  </div>
</template>

<script>
import ModalView from '@/components/UI/ModalView.vue';
export default {
  name: 'Register',
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
    repitePassword: '',
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
    onLogin() {},
  },
};
</script>

<style></style>
