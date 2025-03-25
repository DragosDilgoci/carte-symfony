<template>
  <div>
    <h1>📚 Gestionare Cărți</h1>

    <div style="margin-bottom: 1rem;">
      <button v-if="!isLoggedIn()" @click="showLogin = true">Login</button>
      <button v-else @click="logout">Logout</button>
    </div>

    <LoginModal :show="showLogin" @close="showLogin = false" @success="onLoginSuccess" />

    <router-view />
  </div>
</template>

<script>
import { isLoggedIn } from './utils/auth'
import LoginModal from './components/LoginModal.vue'

export default {
  name: 'App',
  components: { LoginModal },
  data() {
    return {
      showLogin: false
    }
  },
  methods: {
    isLoggedIn,
    logout() {
      localStorage.removeItem('token')
      location.reload()
    },
    onLoginSuccess() {
      location.reload() // sau poți face refetch fără reload
    }
  }
}
</script>
