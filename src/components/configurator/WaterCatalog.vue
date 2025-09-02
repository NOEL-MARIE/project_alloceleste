<!-- eslint-disable vue/no-unused-vars -->
<template>
  <div class="flex items-center justify-center w-screen font-inter">
    <div class="flex WaterCatalogueContainer">
      <div class="grid items-center justify-center grid-cols-4 text-black gap-x-5 gap-y-6">
        <div
          v-for="(product, index) in waterStore.products"
          :key="product.id"
          class="relative flex flex-col items-center p-2 text-center bg-[#F6F6F6] rounded-lg"
        >
          <!-- Image du produit -->
          <img :src="product.img" :alt="product.label" class="h-[220px] mb-2 object-contain" />

          <!-- Infos produit -->
          <div class="w-full text-xs text-start">
            <p class="m-0 text-[#888888]">Pack de {{ product.volume }}</p>
            <p class="font-semibold mb-1 min-h-[38px] break-words">{{ product.label }}</p>
            <p class="m-0">
              <span class="text-[#888888]">{{ product.volume }}</span> |
              {{ product.price.toLocaleString() }} FCFA
            </p>

            <!-- Quantité / Boutons -->
            <div class="mt-4">
              <div
                class="flex items-center justify-between gap-2 w-[278px] px-1.5 h-[40px] bg-gray-100 rounded-4xl"
              >
                <!-- bouton - -->
                <button
                  @click="onDecrement(product)"
                  class="flex items-center justify-center w-8 h-8 font-bold border border-black rounded-full select-none hover:cursor-pointer"
                  :disabled="product.qty === 0"
                  :class="{
                    'bg-gray-200 border-none text-gray-100 cursor-not-allowed': product.qty === 0,
                    'bg-white border border-black hover:bg-red-700': product.qty > 0,
                  }"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.1665 9.99121H15.8332"
                      stroke="#888888"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>

                <!-- compteur -->
                <span class="min-w-[20px] font-bold text-sm">{{ product.qty }}</span>

                <!-- bouton + -->
                <button
                  @click="onIncrement(product)"
                  class="flex items-center justify-center w-8 h-8 font-bold text-white bg-red-600 rounded-full select-none hover:bg-red-700 hover:cursor-pointer"
                >
                  <svg
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.6665 9.99154H16.3332M10.4998 4.1582V15.8249"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWaterStore } from '@/stores/waterStore'
import { usePanierStoreOfPacks } from '@/stores/PanierStores' // adapter chemin exact

const waterStore = useWaterStore()
const panierStore = usePanierStoreOfPacks()

function onIncrement(product) {
  waterStore.increment(product) // Incrémente qty dans waterStore
  panierStore.ajouterWaterPack(product) // Ajoute ou met à jour dans panierStoreOfPacks
}

function onDecrement(product) {
  if (product.qty > 0) {
    waterStore.decrement(product) // Décrémente qty dans waterStore

    // Met à jour sinon supprime du panier d'eau si qty <= 0
    const packInPanier = panierStore.waterPacks.find((p) => p.id === product.id)
    if (packInPanier) {
      const newQty = packInPanier.qty - 1
      if (newQty <= 0) {
        panierStore.supprimerWaterPack(product.id)
      } else {
        panierStore.modifierWaterPackQty(product.id, newQty)
      }
    }
  }
}
</script>
