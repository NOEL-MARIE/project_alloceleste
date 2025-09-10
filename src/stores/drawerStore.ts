// stores/drawerStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDrawerStore = defineStore('drawer', () => {
  const isOpen = ref(false)
  const selectedCommande = ref(null)

  function openDrawer(commande = null) {
    selectedCommande.value = commande
    isOpen.value = true
  }
  function closeDrawer() {
    isOpen.value = false
  }

  return { isOpen, selectedCommande, openDrawer, closeDrawer }
})
