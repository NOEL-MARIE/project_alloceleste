// src/services/AuthService.ts
import type { User, ApiResponse } from '@/types/Api'

export async function registerUser(user: User): Promise<ApiResponse<User>> {
  const response = await fetch('https://votre-api.com/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })

  if (!response.ok) {
    throw new Error('Erreur API lors de l’inscription')
  }

  const data: ApiResponse<User> = await response.json()
  return data
}
