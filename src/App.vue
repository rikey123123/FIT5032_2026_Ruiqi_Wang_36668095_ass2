<template>
  <div class="app-shell">
    <a class="skip-link" href="#main-content">Skip to main content</a>
    <AppHeader />

    <main id="main-content" class="page-content" tabindex="-1">
      <RouterView />
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import AppFooter from './components/AppFooter.vue'
import AppHeader from './components/AppHeader.vue'
</script>
