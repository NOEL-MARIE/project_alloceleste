<template>
  <header
    class="flex items-center justify-between w-full px-4 py-4 text-black bg-white shadow-xl/10 sm:px-6 md:px-16"
  >
    <!-- Logo -->
    <router-link to="/" class="flex items-center gap-2 cursor-pointer select-none">
      <img src="../../assets/config_Home.gif" alt="Logo" class="h-8 md:h-10" />
      <img src="../../assets/Logo Allo Cola.png" alt="Logo" class="h-8 md:h-10" />
    </router-link>

    <!-- Menu desktop -->
    <nav class="hidden space-x-8 font-semibold tracking-wide md:flex font-inter text-md">
      <router-link to="/" class="text-lg hover:underline">Accueil</router-link>
      <router-link to="/Orders" class="text-lg hover:underline">Mes commandes</router-link>
      <router-link to="/configurator" class="text-lg hover:underline">Contactez-nous</router-link>
    </nav>

    <!-- Mobile menu button -->
    <button
      @click="isMenuOpen = !isMenuOpen"
      aria-label="Ouvrir le menu"
      class="md:hidden p-2 rounded-md border border-[#F11123] bg-[#F11123] hover:bg-white hover:text-[#F11123] text-white transition-colors "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        viewBox="0 0 24 24"
      >
        <path v-if="!isMenuOpen" d="M4 6h16M4 12h16M4 18h16" />
        <path v-else d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <!-- Bouton panier (toujours visible) -->
    <button
      @click="openDrawerCommande()"
      aria-label="Panier"
      class="relative p-2 ml-4 transition-colors border rounded-full cursor-pointer border-[#F11123] bg-[#F11123] hover:text-[#7C6E65] text-white"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-6 h-6"
      >
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a1 1 0 0 0 .99.61h9.72a1 1 0 0 0 .98-.79l1.38-7.45H6"></path>
      </svg>

      <span
        v-if="totalArticles > 0"
        class="absolute px-2 py-0.5 text-xs font-bold text-[#F11123] border bg-white rounded-lg -top-1 -right-2 border-[#F11123]"
      >
        {{ totalArticles }}
      </span>
    </button>
  </header>

  <!-- Menu mobile déroulant -->
  <nav
    v-if="isMenuOpen"
    class="fixed left-0 right-0 z-40 flex flex-col h-screen px-6 py-6 space-y-4 text-[#F11123] bg-white top-16 font-inter bg-opacity-70 backdrop-blur-md md:hidden"
  >
    <router-link @click="isMenuOpen = false" to="/" class="text-xl hover:underline">
      Accueil
    </router-link>
    <router-link @click="isMenuOpen = false" to="/Orders" class="text-xl hover:underline">
      Mes commandes
    </router-link>
    <router-link @click="isMenuOpen = false" to="/configurator" class="text-xl hover:underline">
      Contactez-nous
    </router-link>
  </nav>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { usePanierStore, usePanierStoreOfPacks } from '../../stores/PanierStores'

const panierStore = usePanierStore()
const waterStore = usePanierStoreOfPacks()

const totalArticles = computed(() => panierStore.totalCasiers + waterStore.totalWaterPacks)

const isMenuOpen = ref(false)

const drawerOpen = ref(false)
const selectedCommande = ref({})

function openDrawerCommande() {
  // Initialise selectedCommande si besoin
  selectedCommande.value = {
    // données affichées dans le drawer
  }
  drawerOpen.value = true
}
</script>

<style scoped>
/* Toute la responsivité est gérée via Tailwind */
/* Si besoin d'ajustements spécifiques, ajouter ici */
</style>
