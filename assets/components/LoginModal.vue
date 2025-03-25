<template>
  <div class="modal" v-if="show">
    <div class="modal-content">
      <h3>🔐 Autentificare</h3>
      <form @submit.prevent="login">
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Parolă" required />
        <button type="submit">Login</button>
        <button @click="close" type="button">Renunță</button>
      </form>
      <p v-if="error" style="color: red;">{{ error }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginModal',
  props: ['show'],
  emits: ['close', 'success'],
  data() {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    async login() {
      this.error = null
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.email, password: this.password })
        })

        const data = await response.json()
        if (response.ok) {
          localStorage.setItem('token', data.token)
          this.$emit('success')
          this.close()
        } else {
          this.error = data.error || 'Eroare necunoscută'
        }
      } catch (err) {
        this.error = 'Eroare la conectare'
      }
    }
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  min-width: 300px;
}
</style>
