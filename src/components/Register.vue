<template>
  <div>
    <ModalView title="Регистрация" v-model="show" @show="updateModal">
      <div class="flex flex-col">
        <div class="justify-between px-2 m-2">
          <label for="email" class="px-2">Email</label>
          <input type="text" id="email" placeholder="Введите email" />
        </div>
        <div class="flex-col px-2 m-2">
          <label for="password" class="px-2">Пароль</label>
          <input
            type="password"
            id="password"
            placeholder="Введите ваш пароль"
          />
        </div>
        <div class="justify-between px-2 m-2">
          <label for="repite-password" class="px-2">Повторите пароль</label>
          <input
            type="password"
            name="repite-password"
            id="repite-password"
            placeholder="Повторите пароль"
          />
        </div>
      </div>
      <template #modal-view-footer>
        <button type="button" class="text-right">Зарегистрироваться</button>
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
