<template>
  <div>
    <h2>Lista Cărților</h2>

    <router-link v-if="isAdmin()" to="/books/new">➕ Adaugă carte</router-link>

    <ul v-if="books.length">
      <li v-for="book in books" :key="book.id">
        <strong>{{ book.title }}</strong> de {{ book.author }}
        |
        <router-link :to="`/books/${book.id}`">Detalii</router-link>
        <template v-if="isAdmin()">
          | <router-link :to="`/books/${book.id}/edit`">Editează</router-link>
          | <button @click="deleteBook(book.id)">🗑️</button>
        </template>
      </li>
    </ul>

    <p v-else>Nu există cărți.</p>
  </div>
</template>

<script>
import { isAdmin } from '../utils/auth'

export default {
  name: 'BookList',
  data() {
    return {
      books: []
    }
  },
  mounted() {
    fetch('/api/books')
        .then(res => res.json())
        .then(data => {
          this.books = data
        })
        .catch(err => console.error('Eroare la încărcare:', err))
  },
  methods: {
    deleteBook(id) {
      if (!confirm('Sigur dorești să ștergi această carte?')) return

      fetch(`/api/books/${id}`, {
        method: 'DELETE',
        headers:{
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      })
          .then(() => {
            this.books = this.books.filter(book => book.id !== id)
          })
          .catch(err => console.error('Eroare la ștergere:', err))
    },
    isAdmin
  }
}
</script>
