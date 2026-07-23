const USERS_KEY = 'carebridge-users'
const CURRENT_USER_KEY = 'carebridge-current-user'
const RESOURCES_KEY = 'carebridge-resources'

function getStoredArray(key) {
  try {
    const savedItems = localStorage.getItem(key)

    if (!savedItems) {
      return null
    }

    const items = JSON.parse(savedItems)
    return Array.isArray(items) ? items : null
  } catch {
    return null
  }
}

function saveStoredArray(key, items) {
  try {
    localStorage.setItem(key, JSON.stringify(items))
    return true
  } catch {
    return false
  }
}

export function getStoredUsers() {
  return getStoredArray(USERS_KEY) ?? []
}

export function saveUsers(users) {
  return saveStoredArray(USERS_KEY, users)
}

export function ensureDemoAdminUser() {
  const users = getStoredUsers()
  const adminIndex = users.findIndex((user) => user.email === 'admin@carebridge.test')
  const demoAdmin = {
    id: 'carebridge-admin',
    fullName: 'CareBridge Administrator',
    email: 'admin@carebridge.test',
    password: 'CareBridgeDemo2026!',
    role: 'admin',
    savedResourceIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
  }

  if (adminIndex === -1) {
    return saveUsers([...users, demoAdmin])
  }

  if (users[adminIndex].role === 'admin') {
    return true
  }

  const updatedUsers = [...users]
  updatedUsers[adminIndex] = demoAdmin
  return saveUsers(updatedUsers)
}

export function getStoredResources() {
  return getStoredArray(RESOURCES_KEY)
}

export function saveResources(resources) {
  return saveStoredArray(RESOURCES_KEY, resources)
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
  } catch {}
}
