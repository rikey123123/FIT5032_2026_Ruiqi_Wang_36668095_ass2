<script setup>
const navigationLinks = [
  { to: '/', label: 'Home' },
  { to: '/support', label: 'Find Support' },
  { to: '/resources', label: 'Health Resources' },
  { to: '/help', label: 'Help' },
  { to: '/login', label: 'Login' },
  { to: '/register', label: 'Register' },
  { to: '/account', label: 'My Account' },
  { to: '/admin', label: 'Admin Area' },
]
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
      </nav>
    </div>
  </header>
</template>
