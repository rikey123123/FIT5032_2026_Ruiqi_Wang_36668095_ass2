import { computed, ref } from 'vue'
import {
  clearStoredCurrentUser,
  getStoredCurrentUserId,
  getStoredUsers,
  saveCurrentUserId,
} from '../utils/storage'

function findCurrentUser() {
  const currentUserId = getStoredCurrentUserId()

  return getStoredUsers().find((user) => user.id === currentUserId) ?? null
}

const currentUser = ref(findCurrentUser())
const isLoggedIn = computed(() => currentUser.value !== null)

export function useAuth() {
  function login(email, password) {
    const normalizedEmail = email.trim().toLowerCase()
    const user = getStoredUsers().find((item) => item.email === normalizedEmail)

    if (!user || user.password !== password) {
      return { success: false, message: 'Email or password is incorrect.' }
    }

    if (!saveCurrentUserId(user.id)) {
      return { success: false, message: 'Your session could not be saved. Please try again.' }
    }

    currentUser.value = user
    return { success: true }
  }

  function logout() {
    clearStoredCurrentUser()
    currentUser.value = null
  }

  return {
    currentUser,
    isLoggedIn,
    login,
    logout,
  }
}
