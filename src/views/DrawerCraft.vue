<!-- <template>
  <Drawer v-model:visible="drawerOpen" class="fixed inset-0 z-30 flex justify-end bg-black/25">
    <div class="bg-white h-full w-full sm:w-[450px] md:w-[600px] shadow-lg pt-10 px-6 flex flex-col overflow-y-auto hide-scrollbar">
      <div class="flex items-center mb-6">
        <h2 class="mb-6 text-xl font-bold">Mon panier</h2>
        <button @click="close" class="mb-6 ml-auto text-2xl transition-all duration-300 hover:cursor-pointer hover:rotate-90">
          &times;
        </button>
      </div>

      <section v-if="commande.casierItems?.length" class="p-6 mb-6 bg-white border rounded-lg shadow-sm">
        <h3 class="mb-3 text-lg font-bold">Casier</h3>
        <ul class="text-gray-700 list-disc list-inside">
          <li v-for="(item, index) in commande.casierItems" :key="item.id || index">
            {{ item.label }} : {{ item.qty }} bouteilles
          </li>
        </ul>
        <div class="mt-3 font-semibold text-right">Total Casier: {{ commande.casierTotal }} FCFA</div>
      </section>

      <section v-if="commande.waterItems?.length" class="p-6 mb-6 bg-white border rounded-lg shadow-sm">
        <h3 class="mb-3 text-lg font-bold">Packs d'eau</h3>
        <ul class="text-gray-700 list-disc list-inside">
          <li v-for="(item, index) in commande.waterItems" :key="item.id || index">
            {{ item.label }} : {{ item.qty }} packs
          </li>
        </ul>
        <div class="mt-3 font-semibold text-right">Total Packs d'eau: {{ commande.waterTotal }} FCFA</div>
        <div class="flex gap-3 mt-6">
          <button @click="$emit('modifier-packs', commande.id)" class="px-5 py-2 font-bold text-black bg-white border-2 border-black rounded-full">Modifier mon pack</button>
          <button @click="$emit('supprimer-packs', commande.id)" class="flex items-center justify-center px-3 py-2 font-bold text-black bg-white border-2 border-black rounded-full hover:cursor-pointer" title="Supprimer mon pack">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="17" y2="6"/><path d="M8 6V4h8v2"/><path d="M18 6l-1 14H7L6 6"/></svg>
          </button>
        </div>
      </section>

      <section class="p-6 mt-auto border-t border-gray-300">
        <h3 class="mb-3 text-lg font-bold">Résumé de ma commande</h3>
        <div class="flex justify-between mb-2">
          <span>Sous-total</span>
          <span>{{ commande.subTotal }} FCFA</span>
        </div>
        <div class="flex justify-between mb-2">
          <span>Consignation</span>
          <span>{{ commande.consignation || 2000 }} FCFA</span>
        </div>
        <div class="flex items-center gap-2 mb-4">
          <input type="checkbox" id="consigne" v-model="commande.hasOwnCasier" />
          <label for="consigne" class="text-sm text-gray-700">Je possède déjà mes casiers (retirer la consigne)</label>
        </div>
        <div class="flex justify-between pt-3 text-lg font-bold border-t border-gray-300">
          <span>Total</span>
          <span>{{ totalAvecConsigne }} FCFA</span>
        </div>
      </section>

      <RouterLink to="DeliveryInformation">
        <button :class="{'bg-red-600 text-white cursor-pointer': totalAvecConsigne >= 5000, 'bg-gray-200 text-gray-400 cursor-not-allowed': totalAvecConsigne < 5000}" :disabled="totalAvecConsigne < 5000" class="w-full py-3 mt-4 text-lg font-bold rounded">
          Finaliser ma commande
        </button>
      </RouterLink>
      <p v-if="totalAvecConsigne < 5000" class="mt-2 text-sm text-red-600">
        *Votre commande doit être supérieure à 5 000 FCFA pour finaliser
      </p>
    </div>
  </Drawer>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  isOpen: Boolean,
  commande: Object
})
const emits = defineEmits(['update:isOpen', 'modifier-packs', 'supprimer-packs'])

function close() {
  emits('update:isOpen', false)
}

const totalAvecConsigne = computed(() => {
  if (!props.commande?.subTotal) return 0
  return props.commande.hasOwnCasier
    ? props.commande.subTotal
    : props.commande.subTotal + 2000
})
</script> -->
