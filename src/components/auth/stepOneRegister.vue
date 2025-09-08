<template>
  <div class="w-full max-w-md text-black">
    <h1 class="mb-2 text-3xl font-bold text-center font-TCCCUnityHeadline">Créer un compte</h1>
    <p class="mb-6 text-sm text-center text-gray-500 font-inter">
      Remplissez les informations ci-dessous pour finaliser votre commande.
    </p>

    <div class="space-y-4">
      <!-- Nom -->
      <div>
        <label class="block text-sm font-medium">Votre nom et prénom</label>
        <input
          v-model="name"
          type="text"
          placeholder="Entrez votre nom"
          class="w-full px-3 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-red-500"
          :class="{ 'border-red-500': nameError }"
        />
        <p v-if="nameError" class="mt-1 text-sm text-red-500">{{ nameError }}</p>
      </div>

      <!-- Téléphone -->
      <div>
        <label class="block text-sm font-medium font-inter">Numéro de téléphone</label>
        <div class="flex">
          <span class="px-3 py-2 font-bold border rounded-l-md">+225</span>
          <input
            v-model="phone"
            type="text"
            maxlength="10"
            @input="limitPhone"
            placeholder="00 00 000 000"
            class="w-full px-3 py-2 border rounded-r-md focus:ring-2 focus:ring-red-500"
            :class="{ 'border-red-500': phoneError }"
          />
        </div>
        <p class="mt-1 text-xs text-gray-500">Un code de vérification vous sera envoyé</p>
        <p v-if="phoneError" class="mt-1 text-sm text-red-500">{{ phoneError }}</p>
      </div>
      <!-- Email -->
      <div>
        <label class="block text-sm font-medium">Adresse email</label>
        <input
          v-model="email"
          type="email"
          placeholder="exemple@email.com"
          class="w-full px-3 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-red-500"
          :class="{ 'border-red-500': emailError }"
        />
        <p v-if="emailError" class="mt-1 text-sm text-red-500">{{ emailError }}</p>
      </div>
    </div>

    <div class="mt-6 space-y-3">
      <button
        @click="handleNext"
        :disabled="loading"
        class="w-full py-2 text-white bg-red-600 rounded-full hover:bg-red-700 disabled:opacity-50"
      >
        {{ loading ? 'Traitement...' : 'Rejoindre la famille' }}
      </button>

      <button @click="$emit('nextStep')" class="w-full py-2 border border-black rounded-full">
        J'ai déjà un compte
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { registerUser } from '@/services/AuthService'
import type { User } from '@/types/Api'

const name = ref('')
const phone = ref('')
const email = ref('')
const password = ref('') 
const loading = ref(false)

const nameError = ref('')
const phoneError = ref('')
const emailError = ref('')
const passwordError = ref('')

const emit = defineEmits(['nextStep'])

const limitPhone = () => {
  if (phone.value.length > 10) phone.value = phone.value.slice(0, 10)
}

const handleNext = async () => {
  nameError.value = ''
  phoneError.value = ''
  emailError.value = ''
  passwordError.value = ''

  if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]{3,}$/.test(name.value)) {
    nameError.value = 'Veuillez entrer un nom valide (au moins 2 mots)'
    return
  }
  if (phone.value.length !== 10) {
    phoneError.value = 'Le numéro doit contenir exactement 10 chiffres'
    return
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    emailError.value = 'Veuillez entrer un email valide'
    return
  }
  if (password.value.length < 6) {
    passwordError.value = 'Le mot de passe doit contenir au moins 6 caractères'
    return
  }

  loading.value = true

  try {
    // ✅ Créer un objet `User`
    const payload: User = {
      name: name.value,
      email: email.value,
      phone: phone.value,
      password: password.value,
    }

    const res = await registerUser(payload)

    console.log('Utilisateur enregistré :', res.data)

    emit('nextStep')
  } catch (err) {
    console.error('Erreur API', err)
  } finally {
    loading.value = false
  }
}
</script>
