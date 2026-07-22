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
    <RouterLink class="site-name" to="/">CareBridge</RouterLink>

    <nav aria-label="Main navigation">
      <RouterLink
        v-for="link in navigationLinks"
        :key="link.to"
        :to="link.to"
      >
        {{ link.label }}
      </RouterLink>
    </nav>
  </header>
</template>
