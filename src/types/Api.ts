
// Types pour les données de l'utilisateur
export interface User {
  id?: number
  name: string
  email: string
  phone: string   
  password: string
}

// Type pour la réponse API d’enregistrement
export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}
