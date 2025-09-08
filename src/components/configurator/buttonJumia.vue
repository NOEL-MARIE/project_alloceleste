<template>
  <div class="-phxs">
    <form
      @submit.prevent="handleAddToCart"
      class="-df -i-ctr -pr -j-bet -mh-48px"
      id="add-to-cart"
      :data-sku="sku"
      :data-svar="svar"
      data-xhr="true"
      data-track-providers="gtm|ga4|moengage"
      :data-gtm-id="sku"
      :data-gtm-name="productName"
      :data-gtm-price="price"
      :data-gtm-brand="brand"
      :data-gtm-category="category"
    >
      <button
        type="button"
        v-if="!added"
        @click="handleAddToCart"
        class="add btn _prim -pea _i -fw flex items-center gap-2 bg-[#ff6600] hover:bg-[#e55b00] text-white px-4 py-2 rounded"
        aria-label="Ajouter au panier"
      >
        <svg
          viewBox="0 0 24 24"
          class="ic"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <use xlink:href="https://www.jumia.ci/assets_he/images/i-icons.85419111.svg#add-cart" />
        </svg>
        <span>J'achète</span>
      </button>

      <div
        v-else
        class="flex items-center gap-2 bg-[#ff6600] text-white px-4 py-2 rounded -pavs"
      >
        <button
          type="button"
          @click="decrementQuantity"
          aria-label="Diminuer la quantité"
          class="btn _prim _qty -paxs flex items-center justify-center hover:bg-[#e55b00]"
        >
          <svg
            viewBox="0 0 24 24"
            class="ic"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <use xlink:href="https://www.jumia.ci/assets_he/images/i-icons.85419111.svg#remove" />
          </svg>
        </button>
        <span class="-w-32 -mas -m -fs14 -tac -lh-1">{{ quantity }}</span>
        <button
          type="button"
          @click="incrementQuantity"
          aria-label="Augmenter la quantité"
          class="btn _prim _qty -paxs flex items-center justify-center hover:bg-[#e55b00]"
        >
          <svg
            viewBox="0 0 24 24"
            class="ic"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <use xlink:href="https://www.jumia.ci/assets_he/images/i-icons.85419111.svg#add" />
          </svg>
        </button>
        <p class="-phm -f1">(1 Produit ajouté)</p>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const added = ref(false)
const quantity = ref(1)

// Simuler les props du produit Jumia
const sku = 'SM350EL0UU7B3NAFAMZ'
const svar = 'SM350EL0UU7B3NAFAMZ-18713086'
const productName = 'Congélateur Horizontal STCC-102 - 80 L - Gris - 12 Mois De Garantie'
const price = 106.56
const brand = 'SMART TECHNOLOGY'
const category = 'Electronics/Home Appliances/Kitchen Appliances/Refrigerators & Freezers/Freezers'

function handleAddToCart() {
  added.value = true
  quantity.value = 1
  // Ici on ferait l'appel API ou autre traitement
}

function incrementQuantity() {
  quantity.value++
  // ici ajouter gestion API de quantité
}

function decrementQuantity() {
  if (quantity.value > 1) {
    quantity.value--
    // ici ajouter gestion API de quantité
  } else {
    // Si quantité va à 0, on peut remettre le bouton "J'achète"
    added.value = false
  }
}
</script>

<style scoped>
/* Si besoin ajuster ici des styles spécifiques */

/* Reprend la couleur orange Jumia #ff6600 */
.add.btn._prim {
  background-color: #ff6600;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
}

.add.btn._prim:hover {
  background-color: #e55b00;
}

/* Styles pour boutons + et - */
.btn._prim._qty {
  background-color: #ff6600;
  color: white;
  border-radius: 4px;
  width: 36px;
  height: 36px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 0;
}

.btn._prim._qty:hover {
  background-color: #e55b00;
}

/* Texte quantité centré */
.-w-32 {
  width: 80px;
  text-align: center;
  font-weight: 600;
}
</style>
