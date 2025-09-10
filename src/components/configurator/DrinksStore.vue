<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="app flex flex-col min-h-screen bg-[#fafafa] font-inter">
    <Navbar />

    <NavigationTabs
      :active="activeTab"
      @change="activeTab = $event"
      class="px-4 mt-4 md:px-8"
    />

    <div class="container flex-grow px-4 pb-8 md:px-8 md:pb-12">
      <component :is="tabComponent" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import Navbar from "./ConfigNavbar.vue";
import NavigationTabs from "../configurator/NavigationTabs.vue";
import ComposeCrate from "../configurator/ComposeCrate.vue";
import FullCrates from "../configurator/FullCrates.vue";
import WaterCatalog from "../configurator/WaterCatalog.vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// onglet actif (par défaut "Casiers complets")
const activeTab = ref<string>(
  (route.query.tab as string) || "Casiers complets"
);

// garde la query synchro si on change d’onglet depuis la nav
watch(activeTab, (newTab) => {
  router.replace({ query: { ...route.query, tab: newTab } });
});

const tabComponent = computed(() => {
  switch (activeTab.value) {
    case "Casiers complets":
      return FullCrates;
    case "Eau Minérale":
      return WaterCatalog;
    default:
      return ComposeCrate;
  }
});
</script>

<style scoped>
/* Corps et police */
.app {
  /* Utilisé flex pour col layout et full height */
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  background-color: #fafafa;
}

/* Container responsive avec padding et margin */
.container {
  margin-top: 1.5rem; /* 24px */
  padding: 1.5rem;
  flex-grow: 1;
}

/* Responsive : sur petits écrans padding horizontal réduit pour éviter débordement */
@media (max-width: 767px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
    margin-top: 1rem;
  }
}

/* Pour la NavigationTabs, ajouter marge et padding responsive */
</style>
