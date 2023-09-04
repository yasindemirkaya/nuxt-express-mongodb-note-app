<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card" v-if="!showForgotPassword">
          <div class="card-header">
            <h2 class="card-title text-center">Giriş Yap</h2>
          </div>
          <div class="card-body">
            <form @submit.prevent="submitForm">
              <div class="mb-3">
                <label for="email" class="form-label">E-Posta</label>
                <input type="email" id="email" v-model="formData.email" class="form-control" required />
              </div>

              <div class="mb-3">
                <label for="password" class="form-label">Şifre</label>
                <input type="password" id="password" v-model="formData.password" class="form-control" required />
              </div>

              <button type="submit" class="btn btn-primary btn-block">Giriş Yap</button>
            </form>
            <p class="mt-3 text-center">
              <a @click="showForgotPasswordForm" class="forgot-password-link">Şifremi Unuttum?</a>
            </p>
          </div>
        </div>

        <div v-if="showForgotPassword" class="card mt-3">
          <div class="card-header">
            <h2 class="card-title text-center">Şifremi Unuttum</h2>
          </div>
          <div class="card-body">
            <form @submit.prevent="sendResetEmail">
              <div class="mb-3">
                <label for="forgot-email" class="form-label">E-Posta</label>
                <input type="email" id="forgot-email" v-model="forgotEmail" class="form-control" required />
              </div>

              <button type="submit" class="btn btn-primary btn-block">Şifre Sıfırlama Bağlantısı Gönder</button>
            </form>
            <p class="mt-3 text-center">
              <a @click="backToLogin" class="forgot-password-link">Giriş Ekranına Geri Dön</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
  import { mapActions } from 'vuex';

  export default {
    data() {
      return {
        formData: {
          email: '',
          password: ''
        },
        showForgotPassword: false,
        forgotEmail: ''
      };
    },
    methods: {
      ...mapActions('user', ['login']),
      async submitForm() {
        try {
          const userData = {
            email: this.formData.email,
            password: this.formData.password,
          }
          const response = await this.login(userData);

          if (response.data.user) {
            alert('Giriş başarılı. Notlarım ekranına yönlendiriliyorsunuz.');
            this.$router.push('/notes');
          } else {
            alert(response.message);
          }
        } catch (error) {
          alert('Kullanıcı Adı veya Şifre yanlış. Lütfen tekrar deneyiniz.');
        }
      },
      showForgotPasswordForm() {
        this.showForgotPassword = true;
      },
      sendResetEmail() {
      },
      backToLogin() {
        this.showForgotPassword = false;
      }
    },
  };
</script>

  <style scoped>
  .forgot-password-link {
    cursor: pointer;
    text-decoration: underline;
  }
</style>
  