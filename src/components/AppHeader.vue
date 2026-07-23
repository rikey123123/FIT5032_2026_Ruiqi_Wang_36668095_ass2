<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { isLoggedIn, logout } = useAuth()

const navigationLinks = [
  { to: '/', label: 'Home' },
  { to: '/support', label: 'Find Support' },
  { to: '/resources', label: 'Health Resources' },
  { to: '/help', label: 'Help' },
]

const guestNavigationLinks = [
  { to: '/login', label: 'Login' },
  { to: '/register', label: 'Register' },
]

function handleLogout() {
  logout()
  router.push({ name: 'home' })
}
</script>

<template>
  <header class="site-header">
    <div class="site-header__content">
      <RouterLink class="site-name" to="/">CareBridge</RouterLink>

      <nav class="site-navigation" aria-label="Main navigation">
        <RouterLink
          v-for="link in navigationLinks"
          :key="link.to"
          :to="link.to"
          class="site-navigation__link"
        >
          {{ link.label }}
        </RouterLink>

        <template v-if="isLoggedIn">
          <RouterLink class="site-navigation__link" to="/account">
            My Account
          </RouterLink>
          <button class="site-navigation__button" type="button" @click="handleLogout">
            Log out
          </button>
        </template>

        <RouterLink
          v-for="link in guestNavigationLinks"
          v-else
          :key="link.to"
          :to="link.to"
          class="site-navigation__link"
        >
          {{ link.label }}
        </RouterLink>
      </nav>
    </div>
  </header>
</template>
