<template>
  <div class="d-flex flex-column min-vh-100">
    <Header />
    <nuxt />
    <Footer class="mt-auto" />
  </div>
</template>
  
  <script>
  import Header from '~/components/Header.vue'
  import Footer from '~/components/Footer.vue'

  export default {
    components: {
      Header,
      Footer
    }
  }
  </script>
  