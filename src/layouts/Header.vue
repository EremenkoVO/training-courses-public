<template>
  <nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <h2>Учебные курсы</h2>
        <div class="buttons-login w">
          <button class="" @click.prevent="openModal">Вход</button>
          <button class="">Регистрация</button>
        </div>
      </div>
    </div>
  </nav>

  <ModalView title="Вход" :modelValue="modal" @show="hideModal">
    <div class="px-2">
      <label for="email">Email</label>
      <input id="email" type="text" class="w-100" />
    </div>
    <div class="px-2">
      <label for="password"> Пароль </label>
      <input type="password" name="password" id="password" class="w-100" />
    </div>
    <button type="button">Войти</button>
  </ModalView>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ModalView from '../components/ModalView.vue';

export default defineComponent({
  name: 'Header',
  components: {
    ModalView,
  },
  data() {
    return {
      modal: false,
    };
  },
  methods: {
    hideModal() {
      this.modal = !this.modal;
    },
    openModal() {
      this.modal = true;
    },
  },
});
</script>

<style scoped lang="postcss">
h2 {
  color: white;
}
</style>
