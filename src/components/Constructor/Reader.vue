<template>
    <iframe :src="pdfFile(id)" width="100%" height="100%"></iframe>
</template>

<script>

export default {
  props: ['id'],
  data () {
    return {
      pdf: null
    }
  },
  computed: {
    articles () {
        return this.$store.getters.articles
    }
  },
  methods: {
    pdfFile(id) {
        var articles = this.articles;
        var length = articles.length;

        for(var i=0; i < length; i++) {
            if (articles[i].id == id) {
                return this.pdf = articles[i].pdfFile;
            }
        }
    }
  }
}
</script>

<style scoped>

</style>