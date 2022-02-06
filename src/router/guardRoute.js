export function guard(to, from, next) {
  const state = this.$store.getters.statusLogin;
  if (state) {
    next();
  } else {
    next('/login');
  }
}
