<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="card w-50">
      <div class="card-header">
        <h2 class="card-title text-center">Üye Ol</h2>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitForm">
          <div class="mb-3">
            <label for="name" class="form-label">Ad</label>
            <input type="text" id="name" v-model="formData.name" class="form-control" required />
          </div>

          <div class="mb-3">
            <label for="surname" class="form-label">Soyad</label>
            <input type="text" id="surname" v-model="formData.surname" class="form-control" required />
          </div>

          <div class="mb-3">
            <label for="email" class="form-label">E-Posta</label>
            <input type="email" id="email" v-model="formData.email" class="form-control" required />
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Şifre (En az 8 karakter)</label>
            <input type="password" id="password" v-model="formData.password" class="form-control" minlength="8" required />
          </div>

          <div class="mb-3">
            <label for="phone" class="form-label">Telefon</label>
            <input type="text" id="phone" v-model="formData.phone" class="form-control" minlength="10" maxlength="15" />
          </div>

          <button type="submit" class="btn btn-primary">Üye Ol</button>
        </form>
        <div class="mt-3 text-center">
          <p>Üyeliğin mi var? Hemen Giriş Yap</p>
          <nuxt-link to="/login" class="btn btn-outline-primary">Giriş Yap</nuxt-link>
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
          name: '',
          surname: '',
          email: '',
          password: '',
          phone: ''
        }
      };
    },
    methods: {
      ...mapActions('user', ['signup']),
      async submitForm() {
        try {
          const response = await this.signup(this.formData);
          if (!response.user) {
            alert(response.message)
          } else {
            alert(response.message + ' ' + 'Giriş yap sayfasına yönlendiriliyorsunuz...')
            this.$router.push('/login');
          }
        } catch (error) {
          alert('Kayıt sırasında bir sorun oluştu. Bilgilerinizi lütfen kontrol edin.')
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .vh-100 {
    min-height: 100vh;
  }
</style>
  