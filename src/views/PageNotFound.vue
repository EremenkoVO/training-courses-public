<template>
  <div class="page-not-found">
    <div class="error">
      <p>Ошибка 404</p>
      <p>Извините, но мы не знаем как вы сюда попали</p>
      <button href="#" @click="goBack" class="link">Вернуться назад</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.push('/');
    },
  },
};
</script>

<style scoped lang="postcss">
.page-not-found {
  @apply flex items-center absolute justify-center text-center h-full w-full;
}

.error {
  @apply rounded p-8 bg-red-600 text-white;
}

.link {
  @apply text-white underline;
}

.link:hover {
  @apply text-gray-200 no-underline;
}
</style>
