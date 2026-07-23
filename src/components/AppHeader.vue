<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { currentUser, isLoggedIn, logout } = useAuth()

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
          <RouterLink
            v-if="currentUser?.role === 'admin'"
            class="site-navigation__link"
            to="/admin"
          >
            Admin Area
          </RouterLink>
          <button class="site-navigation__button" type="button" @click="handleLogout">
            Log out
          </button>
        </template>

        <template v-else>
          <RouterLink
            v-for="link in guestNavigationLinks"
            :key="link.to"
            :to="link.to"
            class="site-navigation__link"
          >
            {{ link.label }}
          </RouterLink>
        </template>
      </nav>
    </div>
  </header>
</template>
