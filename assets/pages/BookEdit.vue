<template>
  <div>
    <h2>🖊️ Editează carte</h2>

    <form v-if="loaded" @submit.prevent="updateBook">
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

      <button type="submit">💾 Salvează modificările</button>
    </form>

    <p v-else>Se încarcă datele cărții...</p>
  </div>
</template>

<script>
import { isAdmin } from '../utils/auth'

export default {
  name: 'BookEdit',
  data() {
    return {
      book: {
        title: '',
        author: '',
        description: '',
        publish_date: '',
        price: 0
      },
      loaded: false
    }
  },
  mounted() {
    const id = this.$route.params.id
    fetch(`/api/books/${id}`)
        .then(res => res.json())
        .then(data => {
          this.book = data
          this.loaded = true
        })
        .catch(err => console.error('Eroare la încărcare carte:', err))
  },
  methods: {
    updateBook() {
      if (!isAdmin()) {
        alert('Doar adminii pot edita cărți.')
        return
      }

      const id = this.$route.params.id

      fetch(`/api/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(this.book)
      })
          .then(res => {
            if (res.ok) {
              alert('Modificările au fost salvate.')
              this.$router.push('/')
            } else {
              alert('Eroare la salvare.')
            }
          })
          .catch(err => console.error('Eroare la salvare:', err))
    }
  }
}
</script>
