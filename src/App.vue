<template>
  <Header />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from './layouts/Header.vue';

export default defineComponent({
  components: {
    Header,
  },
});
</script>
