<template>
  <div></div>
</template>

<script>
import axios from '../helpers/axios';
export default {
  name: 'Profile',
  data: () => ({
    email: '',
    firstName: '',
    lastName: '',
    age: '',
  }),
  mounted() {
    this.loadProfile();
  },
  methods: {
    loadProfile() {},
  },
};
</script>

<style></style>
