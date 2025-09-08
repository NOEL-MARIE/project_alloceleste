<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'

// Stores produits
import { useCasierStore, type CasierProduct } from '@/stores/casierStore'
import { useWaterStore, type WaterProduct } from '@/stores/waterStore'

// Stores panier
import { usePanierStore } from '@/stores/PanierStores'               // celui avec ajouterCasier(...)
import { usePanierStoreOfPacks } from '@/stores/PanierStores'        // celui avec ajouterWaterPack(...)

// Onglets
const tabs = [
  { name: 'Boissons gazeuse', key: 'gazeuse' as const },
  { name: 'Eaux minérales', key: 'eaux' as const },
]
const activeTab = ref<typeof tabs[number]['key']>('gazeuse')

// Instances stores
const casierStore = useCasierStore()
const waterStore  = useWaterStore()
const panierCasier = usePanierStore()
const panierPacks  = usePanierStoreOfPacks()
 
// Données produits depuis les stores
const { products: gazeuses } = storeToRefs(casierStore) // CasierProduct[]
const { products: waters }   = storeToRefs(waterStore)  // WaterProduct[]

// Liste selon l’onglet actif
const products = computed<ReadonlyArray<CasierProduct | WaterProduct>>(() => {
  const list = activeTab.value === 'gazeuse' ? gazeuses.value : waters.value
  return list.slice(0, 4)
})


// Ajout au panier selon le type d’onglet
function addToCart(product: CasierProduct | WaterProduct) {
  if (activeTab.value === 'gazeuse') {
    // Casier d'un seul parfum: 24 bouteilles
    const p = { ...(product as CasierProduct), qty: 24 }
    const volume = (product as CasierProduct).volume ?? '30cl'
    panierCasier.ajouterCasier([p], 1, `Casier ${p.label} 24×${volume}`)
  } else {
    // Pack d'eau: +1
    panierPacks.ajouterWaterPack(product as WaterProduct)
  }
}

// Pour le RouterLink
function getTabDestination() {
  return activeTab.value === 'gazeuse' ? 'Casiers à composer' : 'Eau Minérale'
}
</script>

<template>
  <section class="w-full px-4 py-16 bg-white">
    <div class="flex flex-col h-full maxContainer">
      <!-- Header + Description -->
      <div class="flex flex-col items-start justify-between pt-12 md:flex-row">
        <h1 class="w-full mb-6 text-2xl font-bold text-black font-TCCCUnityHeadline md:text-4xl md:mb-0 md:w-2/5">
          Nos produits disponibles
        </h1>
        <div class="w-full text-base text-black md:w-2/4 md:ml-auto md:text-xl">
          <span class="font-inter">
            Composez votre casier comme vous voulez ou choisissez directement
            un pack prêt à livrer. Des bouteilles fraîches, des prix fixes,
            et la livraison offerte chez vous en 24h&nbsp;!
          </span>
          <div class="font-inter mt-2 flex gap-2.5 items-center">
            <a href="#" class="font-semibold text-black underline transition hover:text-gray-800">
              Configurer mon casier
            </a>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4.16675 9.99105H15.8334M15.8334 9.99105L10.0001 4.15771M15.8334 9.99105L10.0001 15.8244"
                stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Onglets -->
      <div class="flex mt-12 space-x-6 overflow-x-auto md:space-x-10 no-scrollbar whitespace-nowrap">
        <button
          v-for="tab in tabs" :key="tab.key" @click="activeTab = tab.key"
          :class="[
            'pb-2 text-lg font-medium font-inter duration-200 outline-none whitespace-nowrap',
            activeTab === tab.key ? 'border-b-2 border-black text-black' : 'text-gray-500',
          ]">
          {{ tab.name }}
        </button>
      </div>

      <!-- Grille produits -->
      <div class="flex-1 mt-8">
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div
            v-for="product in products" :key="product.id"
            class="relative flex flex-col p-6 rounded-lg shadow-sm bg-gray-50"
          >
            <!-- Badge nouveauté (optionnel : à ajouter côté stores si besoin) -->
            <!-- <span v-if="product.isNew" class="absolute px-3 py-1 text-xs font-semibold text-white bg-red-500 rounded-full font-inter top-4 left-4">Nouveauté</span> -->

            <img :src="product.img" :alt="product.label" class="object-contain h-48 mb-5 sm:h-72" />

            <div class="w-full text-left font-inter">
              <div v-if="activeTab === 'gazeuse'" class="mb-1 text-xl text-gray-500">Casier de 24 bouteilles</div>
              <div class="mb-1 font-bold text-left text-black">{{ product.label }}</div>
              <span class="block mb-1 text-xl text-gray-600">
                {{ product.volume || '30cl' }} | {{ product.price }} FCFA
              </span>
            </div>

            <!-- Bouton Ajouter -->
            <button
              class="mt-4 w-[110px] group flex items-center text-black justify-center py-2 px-4 bg-white border border-black rounded-full font-semibold hover:bg-black hover:text-white transition"
              @click="addToCart(product)"
            >
              <span class="mr-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12.5001 9.15755L11.6667 16.6576M15.8334 9.15755L12.5001 3.32422M1.66675 9.15755H18.3334M2.91675 9.15755L4.25008 15.3242C4.328 15.7063 4.53745 16.049 4.84199 16.2927C5.14652 16.5363 5.52684 16.6654 5.91675 16.6576H14.0834C14.4733 16.6654 14.8536 16.5363 15.1582 16.2927C15.4627 16.049 15.6722 15.7063 15.7501 15.3242L17.1667 9.15755M3.75008 12.9076H16.2501M4.16675 9.15755L7.50008 3.32422M7.50008 9.15755L8.33342 16.6576"
                    class="transition duration-300 stroke-black group-hover:stroke-white"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
              {{ activeTab === 'gazeuse' ? 'Casier' : 'Pack' }}
            </button>

            <!-- Lien Voir plus -->
            <RouterLink
              :to="{ path: '/configurator', query: { tab: getTabDestination(), productId: product.id } }"
              class="absolute p-2 transition border border-black rounded-full bottom-6 right-6 hover:bg-gray-200 hover:cursor-pointer"
              aria-label="Voir plus"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4.16675 9.99105H15.8334M15.8334 9.99105L10.0001 4.15771M15.8334 9.99105L10.0001 15.8244"
                  stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
