<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <div class="ml-3 mr-3">
          <nuxt-link to="/" class="navbar-brand">Uygulama Adı</nuxt-link>
        </div>
        <div class="d-lg-flex">
          <ul class="navbar-nav ml-auto">
            <li v-if="!isLoggedIn" class="nav-item">
              <nuxt-link to="/login" class="nav-link">Giriş Yap</nuxt-link>
            </li>
            <li v-if="!isLoggedIn" class="nav-item">
              <nuxt-link to="/signup" class="nav-link">Üye Ol</nuxt-link>
            </li>
            <li v-if="isLoggedIn" class="nav-item">
              <nuxt-link to="/notes" class="nav-link">Notlarım</nuxt-link>
            </li>
            <li v-if="isLoggedIn" class="nav-item">
              <nuxt-link to="/login">
                <button @click="logoutUser" class="nav-link">Çıkış Yap</button>
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    computed: {
      ...mapGetters({
        isLoggedIn: 'user/isLoggedIn',
      }),
    },
    methods: {
      ...mapActions('user', ['logout']),
      async logoutUser() {
        await this.logout();
      }
    },
  };
</script>
