import { createRouter, createWebHistory } from 'vue-router'

import BookList from './pages/BookList.vue'
import BookCreate from './pages/BookCreate.vue'
import BookDetail from './pages/BookDetail.vue'
import BookEdit from './pages/BookEdit.vue'

const routes = [
    {
        path: '/',
        name: 'BookList',
        component: BookList
    },
    {
        path: '/books/new',
        name: 'BookCreate',
        component: BookCreate
    },
    {
        path: '/books/:id',
        name: 'BookDetail',
        component: BookDetail
    },
    {
        path: '/books/:id/edit',
        name: 'BookEdit',
        component: BookEdit
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 }
    }
})

export default router
