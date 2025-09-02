import { ref, computed, watch, onMounted } from 'vue'
import { defineStore } from 'pinia'

export type WaterProduct = {
  id: string
  label: string
  img: string
  volume: string
  price: number
  qty: number
  type: 'water'
}

const DEFAULT_WATERS: WaterProduct[] = [
  {
    id: 'celeste-15',
    label: 'Céleste Naturelle 1.5L',
    img: new URL('../assets/EauMinerales/cel 1.5L.png', import.meta.url).href,
    volume: '1.5L',
    price: 275,
    qty: 0,
    type: 'water',
  },
  {
    id: 'celeste-1',
    label: 'Céleste Naturelle 1L',
    img: new URL('../assets/EauMinerales/cel 1L.png', import.meta.url).href,
    volume: '1L',
    price: 175,
    qty: 0,
    type: 'water',
  },
  {
    id: 'celeste-05',
    label: 'Céleste Naturelle 0.5L',
    img: new URL('../assets/EauMinerales/cel 0.5L.png', import.meta.url).href,
    volume: '0.5L',
    price: 110,
    qty: 0,
    type: 'water',
  },
  {
    id: 'celeste-17',
    label: 'Céleste 17L',
    img: new URL('../assets/EauMinerales/cel 17L.png', import.meta.url).href,
    volume: '17L',
    price: 1750,
    qty: 0,
    type: 'water',
  },
  {
    id: 'cristaline-15',
    label: 'Cristaline 1.5L',
    img: new URL('../assets/EauMinerales/cel 1.5L.png', import.meta.url).href,
    volume: '1.5L',
    price: 250,
    qty: 0,
    type: 'water',
  },
]

export const useWaterStore = defineStore('water', () => {
  const products = ref<WaterProduct[]>([...DEFAULT_WATERS])

  // 🔹 Hydratation depuis localStorage
  onMounted(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('waterProducts')
      if (saved) {
        try {
          products.value = JSON.parse(saved)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
          products.value = [...DEFAULT_WATERS]
        }
      }
    }
  })

  // 🔹 Persistance automatique
  watch(
    products,
    (newProducts) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('waterProducts', JSON.stringify(newProducts))
      }
    },
    { deep: true }
  )

  // --- Getters ---
  const selectedProducts = computed(() => products.value.filter(w => w.qty > 0))
  const countWaters = computed(() => products.value.reduce((sum, w) => sum + w.qty, 0))
  const subtotal = computed(() => products.value.reduce((sum, w) => sum + w.qty * w.price, 0))

  // --- Actions ---
  function increment(product: WaterProduct) {
    product.qty++
    save()
  }

  function decrement(product: WaterProduct) {
    if (product.qty > 0) {
      product.qty--
      save()
    }
  }

  function reset() {
    products.value.forEach(p => (p.qty = 0))
    save()
  }

  function save() {
    localStorage.setItem('waterProducts', JSON.stringify(products.value))
  }

  return {
    products,
    selectedProducts,
    countWaters,
    subtotal,
    increment,
    decrement,
    reset,
    save,
  }
})
