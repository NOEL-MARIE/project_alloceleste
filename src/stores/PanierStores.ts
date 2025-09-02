import { defineStore } from 'pinia'
import { ref, computed, watch, onMounted } from 'vue'
import { v4 as uuidv4 } from 'uuid'

// Importer le type CasierProduct si besoin
import type { CasierProduct } from './casierStore'
import type { WaterProduct } from './waterStore'
export type CasierProduit = {
  id: string
  products: CasierProduct[]
  qty: number
  label: string
}

export const usePanierStore = defineStore('panier', () => {
  const casiers = ref<CasierProduit[]>([])

  // Hydratation depuis localStorage au montage
  onMounted(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('panierCasiers')
      if (saved) {
        try {
          casiers.value = JSON.parse(saved) as CasierProduit[]
        } catch {
          casiers.value = []
        }
      }
}
  })

  // Persistance automatique dans localStorage lors de toute modification
  watch(
    casiers,
    (newVal) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('panierCasiers', JSON.stringify(newVal))
      }
    },
    { deep: true }
  )

  const totalCasiers = computed(() =>
    casiers.value.reduce((sum, casier) => sum + casier.qty, 0)
  )

  const totalBouteilles = computed(() =>
    casiers.value.reduce(
      (sum, casier) =>
        sum + casier.products.reduce((sumP, p) => sumP + p.qty * casier.qty, 0),
      0
    )
  )

  function ajouterCasier(products: CasierProduct[], qty: number, label: string) {
    if (qty <= 0) return
    casiers.value.push({
      id: uuidv4(),
      products: products.map((p) => ({ ...p })), // copie des produits
      qty,
      label,
    })
  }

  function supprimerCasier(id: string) {
    casiers.value = casiers.value.filter((c) => c.id !== id)
  }

  function viderPanier() {
    casiers.value = []
  }

  return {
    casiers,
    totalCasiers,
    totalBouteilles,
    ajouterCasier,
    supprimerCasier,
    viderPanier,
  }
})

export const usePanierStoreOfPacks = defineStore('panier_waters', () => {
  const casiers = ref<CasierProduit[]>([])
  const waterPacks = ref<WaterProduct[]>([]) // Nouveaux packs eau dans panier

  // Hydratation depuis localStorage, ajoutez la récupération waterPacks
  onMounted(() => {
    if (typeof window !== 'undefined') {
      const savedCasier = localStorage.getItem('panierCasiers')
      if (savedCasier) {
        try {
          casiers.value = JSON.parse(savedCasier)
        } catch {
          casiers.value = []
        }
      }
      const savedWater = localStorage.getItem('panierWaterPacks')
      if (savedWater) {
        try {
          waterPacks.value = JSON.parse(savedWater)
        } catch {
          waterPacks.value = []
        }
      }
    }
  })

  // Persistance automatique dans localStorage
  watch(
    casiers,
    (newVal) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('panierCasiers', JSON.stringify(newVal))
      }
    },
    { deep: true }
  )
  watch(
    waterPacks,
    (newVal) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('panierWaterPacks', JSON.stringify(newVal))
      }
    },
    { deep: true }
  )

  // --- Fonctions existantes pour casiers ---

  // --- Nouveautés pour packs d'eau ---

  function ajouterWaterPack(product: WaterProduct) {
    // Cherche si le produit est déjà dans le panier
    const index = waterPacks.value.findIndex(p => p.id === product.id)
    if (index !== -1) {
      // incrémente la quantité existante
      waterPacks.value[index].qty += 1
    } else {
      // ajoute un nouveau pack avec qty=1
      waterPacks.value.push({ ...product, qty: 1 })
    }
  }

  function modifierWaterPackQty(productId: string, newQty: number) {
    const index = waterPacks.value.findIndex(p => p.id === productId)
    if (index !== -1) {
      if (newQty <= 0) {
        waterPacks.value.splice(index, 1)
      } else {
        waterPacks.value[index].qty = newQty
      }
    }
  }

  function supprimerWaterPack(productId: string) {
    waterPacks.value = waterPacks.value.filter(p => p.id !== productId)
  }

  function viderWaterPacks() {
    waterPacks.value = []
  }

  // --- Computed totals des packs d'eau ---

  const totalWaterPacks = computed(() =>
    waterPacks.value.reduce((sum, p) => sum + p.qty, 0)
  )

  const subtotalWater = computed(() =>
    waterPacks.value.reduce((sum, p) => sum + p.qty * p.price, 0)
  )

  // Retour des données et fonctions ajoutées
  return {
    // casiers existants
    casiers,
    totalCasiers: computed(() => casiers.value.reduce((sum, c) => sum + c.qty, 0)),
    totalBouteilles: computed(() =>
      casiers.value.reduce((sum, c) => sum + c.products.reduce((s, p) => s + p.qty * c.qty, 0), 0)
    ),


    // ajout packs d'eau
    waterPacks,
    ajouterWaterPack,
    modifierWaterPackQty,
    supprimerWaterPack,
    viderWaterPacks,
    totalWaterPacks,
    subtotalWater,
  }
})