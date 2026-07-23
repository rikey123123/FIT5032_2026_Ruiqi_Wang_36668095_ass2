const USERS_KEY = 'carebridge-users'
const CURRENT_USER_KEY = 'carebridge-current-user'

export function getStoredUsers() {
  try {
    const savedUsers = localStorage.getItem(USERS_KEY)

    if (!savedUsers) {
      return []
    }

    const users = JSON.parse(savedUsers)
    return Array.isArray(users) ? users : []
  } catch {
    return []
  }
}

export function saveUsers(users) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
    return true
  } catch {
    return false
  }
}

export function getStoredCurrentUserId() {
  try {
    return localStorage.getItem(CURRENT_USER_KEY)
  } catch {
    return null
  }
}

export function saveCurrentUserId(userId) {
  try {
    localStorage.setItem(CURRENT_USER_KEY, userId)
    return true
  } catch {
    return false
  }
}

export function clearStoredCurrentUser() {
  try {
    localStorage.removeItem(CURRENT_USER_KEY)
  } catch {
    // Nothing else is needed when browser storage is unavailable.
  }
}
