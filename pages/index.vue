<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 mb-4">
        <!-- Giriş Yap Kartı -->
        <div class="card">
          <div class="card-header">
            <h2 class="card-title text-center">Giriş Yap</h2>
          </div>
          <div class="card-body">
            <p class="card-text text-center">Zaten bir üyeliğin var mı? Giriş yap ve hemen başla.</p>
            <!-- Giriş Yap düğmesi, /login sayfasına yönlendirir -->
            <router-link to="/login" class="btn btn-primary btn-block">Giriş Yap</router-link>
          </div>
        </div>
      </div>
      <div class="col-md-6 mb-4">
        <!-- Hesap Aç Kartı -->
        <div class="card">
          <div class="card-header">
            <h2 class="card-title text-center">Üye Ol</h2>
          </div>
          <div class="card-body">
            <p class="card-text text-center">Bir hesabın yok mu? Hemen oluştur ve notlarını düzenleme başla!</p>
            <!-- Hesap Aç düğmesi, /signup sayfasına yönlendirir -->
            <router-link to="/signup" class="btn btn-primary btn-block">Hesap Oluştur</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    // Sayfa bileşeniyle ilgili diğer kodlar
  };
</script>

<style scoped>
  /* İhtiyacınıza göre ek stillemeler yapabilirsiniz */
</style>
