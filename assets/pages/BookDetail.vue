<template>
  <div v-if="book">
    <h2>📖 {{ book.title }}</h2>
    <p><strong>Autor:</strong> {{ book.author }}</p>
    <p><strong>Descriere:</strong> {{ book.description }}</p>
    <p><strong>Data publicării:</strong> {{ book.publish_date }}</p>
    <p><strong>Preț:</strong> {{ book.price }} RON</p>

    <router-link to="/">⏪ Înapoi la listă</router-link>
  </div>
  <p v-else>Se încarcă detaliile...</p>
</template>

<script>
export default {
  name: 'BookDetail',
  data() {
    return {
      book: null
    }
  },
  mounted() {
    const id = this.$route.params.id
    fetch(`/api/books/${id}`)
        .then(res => res.json())
        .then(data => {
          this.book = data
        })
        .catch(err => console.error('Eroare la detalii:', err))
  }
}
</script>
