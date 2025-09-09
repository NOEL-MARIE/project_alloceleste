<template>
  <header
    class="flex items-center justify-between w-full px-6 py-4 text-black bg-white shadow-xl/10 sm:px-10 md:px-16"
  >
    <!-- Logo -->
    <router-link to="/">
      <div class="text-xl font-extrabold cursor-pointer select-none">
        <div class="flex gap-2 mt-1">
          <img src="../../assets/config_Home.gif" alt="Logo" class="h-8 md:h-10 bg-noi" />
          <img src="../../assets/Logo Allo Cola.png" alt="Logo" class="h-8 md:h-10 bg-noi" />
        </div>
      </div>
    </router-link>
    <!-- Menu desktop -->
    <nav class="hidden space-x-8 tracking-wide font-inter font-xssemibold text- md:flex">
      <router-link to="/" class="text-xl hover:underline">
        <p class="text-lg hover:underline">Accueil</p>
      </router-link>
      <router-link to="/Orders" class="text-xl hover:underline">
        <p class="text-lg hover:underline">Mes commandes</p>
      </router-link>
      <router-link to="/configurator" class="text-xl hover:underline">
        <p class="text-lg hover:underline">Contactez-nous</p>
      </router-link>
    </nav>

    <button
      @click="openDrawerCommande()"
      aria-label="Panier"
      class="relative p-2 ml-4 transition-colors border rounded-full cursor-pointer border-[#F11123] bg-[#F11123] hover:text-[#7C6E65]"
    >
      <!-- Icône Panier -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FFFFFF"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-6 h-6"
      >
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a1 1 0 0 0 .99.61h9.72a1 1 0 0 0 .98-.79l1.38-7.45H6"></path>
      </svg>

      <!-- Badge du nombre d’articles -->
      <span
        v-if="totalArticles > 0"
        class="absolute px-2 py-0.5 text-xs font-bold text-[#F11123] border bg-white rounded-lg -top-1 -right-2 border-[#F11123]"
      >
        {{ totalArticles }}
      </span>
    </button>

    <!-- <router-link to="/Authentification">
      <button
        aria-label="Panier"
        class="p-2 rounded-full border cursor-pointer border-[#F11123] bg-[#F11123] hover:text-[#7C6E65] transition-colors ml-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="#FFFFFF"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="w-6 h-6"
          viewBox="0 0 24 24"
        >
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a1 1 0 0 0 .99.61h9.72a1 1 0 0 0 .98-.79l1.38-7.45H6"></path>
        </svg>
      </button>
    </router-link> -->

    <!-- Icone panier -->
  </header>

  <!-- Menu mobile déroulant -->
  <nav
    v-if="isMenuOpen"
    class="fixed left-0 right-0 z-40 flex flex-col px-6 py-6 space-y-4 text-white bg-black font-inter top-16 bg-opacity-70 backdrop-blur-md md:hidden"
  >
    <router-link to="/Orders" class="text-xl hover:underline">
      <p class="text-lg hover:underline">Mes commandes</p>
    </router-link>
    <router-link to="/configurator" class="text-xl hover:underline">
      <p class="text-lg hover:underline">Contactez-nous</p>
    </router-link>
  </nav>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { usePanierStore, usePanierStoreOfPacks } from '../../stores/PanierStores'

const panierStore = usePanierStore()
const waterStore = usePanierStoreOfPacks()

// On calcule le total global (casiers + packs d'eau)
const totalArticles = computed(() => panierStore.totalCasiers + waterStore.totalWaterPacks)

// for drawer
const drawerOpen = ref(false)
const selectedCommande = ref({})

function openDrawerCommande() {
  // Si vous avez une commande par défaut ou panier, initialisez là ici
  selectedCommande.value = {
    // vos données à afficher dans le drawer
  }
  drawerOpen.value = true
}

const isMenuOpen = ref(false)

console.log('Contenu du panier Casier:', panierStore.casiers)
console.log("Contenu du panier Packs d'eau:", waterStore.waterPacks)

// Vous pouvez aussi afficher le total
console.log('Total articles:', totalArticles.value)

// function computed(arg0: () => any) {
//   throw new Error('Function not implemented.')
// }

// function computed(arg0: () => number) {
//   throw new Error('Function not implemented.')
// }
</script>

<style scoped>
/* Rien de spécial ici, tout est géré via Tailwind */
</style>
