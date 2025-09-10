<template>
  <NavBar />
  <div class="flex flex-col items-center justify-center min-h-screen px-4 text-black bg-white font-inter sm:px-6 md:px-0">
    <main class="flex flex-col items-center w-full max-w-md mt-10 md:max-w-lg lg:max-w-xl">
      <div
        class="flex flex-col items-center w-full p-6 text-center bg-white rounded-lg shadow md:p-8"
      >
        <img
          src="@/assets/img_success-coca.png"
          alt="Coca Cola"
          class="h-20 mx-auto mb-3 md:h-24"
        />
        <h2 class="mb-1 text-lg font-semibold md:text-xl">
          🎉 Commande validée avec succès !
        </h2>
        <p class="mb-4 text-sm md:text-base text-gray-600 max-w-[320px] md:max-w-full">
          Ton casier est en route. Tu recevras un SMS dans quelques instants pour confirmer la livraison.
        </p>
        <div class="w-full p-4 mb-4 rounded bg-gray-50">
          <div class="flex justify-between text-sm md:text-base">
            <span class="font-medium text-gray-800">Numéro de commande</span>
            <span class="font-bold text-gray-700">#AC-2030</span>
          </div>
          <div class="flex justify-between mt-2 text-sm md:text-base">
            <span class="font-medium text-gray-800">Contenu résumé</span>
            <span class="font-bold text-gray-700">1 casier / 2 packs</span>
          </div>
          <div class="flex justify-between mt-2 text-sm md:text-base">
            <span class="font-medium text-gray-800">Montant total</span>
            <span class="font-bold text-gray-700">9 600 FCFA</span>
          </div>
          <div class="mt-3 text-xs text-left text-gray-400 md:text-sm">
            Paiement à la livraison
          </div>
        </div>
        <button
          class="w-full mt-2 bg-[#EF2D34] text-white rounded-full py-3 font-semibold transition-colors hover:bg-red-600"
        >
          Commander à nouveau
        </button>
        <button
          class="w-full mt-2 text-sm text-gray-700 underline hover:text-red-500"
        >
          Voir mon historique
        </button>
      </div>
      <p class="max-w-xs mt-4 text-xs text-center text-gray-600 md:text-sm md:max-w-md">
        Tu n’as pas reçu ton SMS ?
        <a href="#" class="ml-1 text-black underline">
          Clique ici pour recevoir un nouveau récapitulatif.
        </a>
      </p>
    </main>
  </div>
</template>

<script setup lang="ts">
import NavBar from "@/components/configurator/ConfigNavbar.vue"
// Logique script si besoin (redirections, etc.)
</script>
