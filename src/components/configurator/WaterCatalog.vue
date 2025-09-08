<template>
  <div class="flex items-center justify-center w-screen font-inter">
    <div class="flex WaterCatalogueContainer">
      <div class="grid items-center justify-center grid-cols-4 text-black gap-x-5 gap-y-6">
        <div
          v-for="product in waterStore.products"
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

            <!-- Quantité / Boutons Jumia adapté -->
            <div class="-phxs">
              <div class="-phxs -pvs">
                <form
                  class="flex items-center justify-between relative w-[298px] h-[40px] bg-[#f3f4f6] rounded-full px-1.5 min-h-[48px]"
                >
                  <!-- Bouton 'J'achète' si qty = 0 -->
                  <button 
                    v-if="product.qty === 0"
                    type="button"
                    class="flex items-center justify-between w-full gap-2 px-8 py-2 mt-8 text-base font-bold leading-tight text-white transition bg-red-600 rounded-full hover:cursor-pointer hover:bg-red-700"
                    @click="onIncrement(product)"
                    aria-label="Ajouter au panier"
                  >
                    <img src="../../assets/bag_Icon.gif" class="w-7" alt="" />
                    <span>J'achète</span>
                  </button>

                  <!-- Contrôle qty quand > 0 -->
                  <template v-else>
                    <div class="flex justify-between w-full mt-8">
                      <!-- bouton - -->
                      <button
                        type="button"
                        @click="onDecrement(product)"
                        :disabled="product.qty === 0"
                        :class="[
                          'flex  items-center justify-center w-8 h-8  font-bold rounded-full select-none border',
                          product.qty === 0
                            ? 'bg-gray-200 border-none text-gray-300 cursor-not-allowed'
                            : 'bg-white border-black hover:bg-red-700 hover:text-white cursor-pointer',
                        ]"
                        aria-label="Diminuer la quantité"
                      >
                        <svg
                          width="20"
                          height="20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
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
                      <span
                        class="min-w-[20px] font-bold text-sm text-black text-center select-none px-3"
                      >
                        {{ product.qty }}
                      </span>

                      <!-- bouton + -->
                      <button
                        type="button"
                        @click="onIncrement(product)"
                        class="flex items-center justify-center w-8 h-8 font-bold text-white bg-red-600 rounded-full select-none hover:bg-red-700 hover:cursor-pointer"
                        aria-label="Augmenter la quantité"
                      >
                        <svg
                          width="21"
                          height="20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 21 20"
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
                  </template>


                </form>
              </div>
            </div>
            <!-- Fin Quantité / Boutons -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWaterStore } from '@/stores/waterStore'
import { usePanierStoreOfPacks } from '@/stores/PanierStores'

const waterStore = useWaterStore()
const panierStore = usePanierStoreOfPacks()



// eslint-disable-next-line @typescript-eslint/no-explicit-any
function onIncrement(product: any) {
  waterStore.increment(product) // incrémente qty dans waterStore
  panierStore.ajouterWaterPack(product) // ajoute ou met à jour dans panier
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function onDecrement(product: any) {
  if (product.qty > 0) {
    waterStore.decrement(product) // décrémente qty dans waterStore

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

<style scoped>
.add.btn._prim {
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

/* Ajout classes correspondantes à jumia */
.-df {
  display: flex;
}
.-i-ctr {
  align-items: center;
}
.-pr {
  position: relative;
}
.-j-bet {
  justify-content: space-between;
}
.-mh-48px {
  min-height: 48px;
}
</style>
