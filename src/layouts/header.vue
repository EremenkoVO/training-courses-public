<template>
  <header class="flex justify-between px-9 py-3">
    <div class="logo">Лого</div>
    <div class="flex justify-between">
      <ul class="menu-list">
        <li v-for="(menu, index) in menus" :key="index">
          <router-link
            class="mx-2 text-blue-500 hover:text-blue-800"
            :to="menu.url"
            >{{ menu.label }}</router-link
          >
        </li>
        <li>
          <button
            type="button"
            class="text-blue-500 hover:text-blue-800 ml-5 cursor-pointer"
            @click="logout"
          >
            Выйти
          </button>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import menus from '@/common/menus';

export default {
  name: 'Header',
  data: () => ({
    menus: menus,
  }),
  computed: {},
  methods: {
    logout() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped lang="postcss">
.menu-list {
  @apply list-none flex flex-row;
}
</style>
