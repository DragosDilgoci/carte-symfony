<template>
  <div>
    <h2>➕ Adaugă carte nouă</h2>

    <form @submit.prevent="submitForm">
      <label>Titlu:</label>
      <input v-model="book.title" required />

      <label>Autor:</label>
      <input v-model="book.author" required />

      <label>Descriere:</label>
      <textarea v-model="book.description"></textarea>

      <label>Data publicării:</label>
      <input type="date" v-model="book.publish_date" required />

      <label>Preț:</label>
      <input type="number" v-model="book.price" step="0.01" required />

      <button type="submit">✅ Salvează</button>
    </form>
  </div>
</template>

<script>
import { isAdmin } from '../utils/auth'
import { useRouter } from 'vue-router'

export default {
  name: 'BookCreate',
  data() {
    return {
      book: {
        title: '',
        author: '',
        description: '',
        publish_date: '',
        price: 0
      }
    }
  },
  setup() {
    const router = useRouter()
    return { router }
  },
  methods: {
    async submitForm() {
      if (!isAdmin()) {
        alert('Acces interzis.')
        return
      }

      const response = await fetch('/api/books/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' ,
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(this.book)
      })

      if (response.ok) {
        alert('Carte adăugată!')
        this.$router.push('/')
      } else {
        alert('Eroare la salvare.')
      }
    }
  }
}
</script>
