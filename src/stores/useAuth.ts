// src/stores/auth.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

interface User {
  name: string
  phone?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  orders: any[]
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)

  // Charger utilisateur depuis sessionStorage au démarrage
  function loadUser() {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('user')
      if (saved) user.value = JSON.parse(saved)
    }
  }

  function login(name: string, phone?: string) {
    user.value = { name, phone, orders: [] }
    sessionStorage.setItem('user', JSON.stringify(user.value))
  }

  function logout() {
    user.value = null
    sessionStorage.removeItem('user')
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function addOrder(order: any) {
    if (!user.value) return
    user.value.orders.push(order)
    sessionStorage.setItem('user', JSON.stringify(user.value))
  }

  const isAuthenticated = () => user.value !== null

  // Charger l'utilisateur automatiquement (peut être appelé dans un setup global)
  loadUser()

  return { user, login, logout, loadUser, addOrder, isAuthenticated }
})
