<template>
  <div id="nav"></div>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface User {
  login: string;
  password: string;
}

export default defineComponent({
  setup() {
    var user: User;
  },
  data: () => ({}),
});
</script>
