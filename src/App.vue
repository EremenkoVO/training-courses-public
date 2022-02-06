<template>
  <div>
    <Header />
    <div>
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from './layouts/Header.vue';

export default {
  components: {
    Header,
  },
};
</script>

<style></style>
