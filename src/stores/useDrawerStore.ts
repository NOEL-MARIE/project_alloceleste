import { ref } from 'vue'

const isDrawerOpen = ref(false)
const selectedCommande = ref(null)

export function useDrawerStore() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function openDrawer(commande: any) {
    selectedCommande.value = commande
    isDrawerOpen.value = true
  }
  function closeDrawer() {
    isDrawerOpen.value = false
    selectedCommande.value = null
  }
  return { isDrawerOpen, selectedCommande, openDrawer, closeDrawer }
}
