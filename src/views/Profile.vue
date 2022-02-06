<template>
  <div></div>
</template>

<script>
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
    console.log(this.$store);
  },
  methods: {
    loadProfile() {},
  },
};
</script>

<style></style>
