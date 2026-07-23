const USERS_KEY = 'carebridge-users'

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
