<script setup>
import careBridgeSupportImage from '../assets/carebridge-support.jpg'
</script>

<template>
  <section class="home-page">
    <div class="home-hero">
      <div class="home-hero__copy">
        <h1>Support for healthier ageing</h1>
        <p>CareBridge connects older adults and carers with clear health support.</p>
        <div class="home-hero__actions">
          <RouterLink class="primary-link" :to="{ name: 'support' }">Find support</RouterLink>
          <RouterLink class="text-link" :to="{ name: 'resources' }">
            Explore health resources
          </RouterLink>
        </div>
      </div>

      <img
        class="home-hero__image"
        :src="careBridgeSupportImage"
        alt="Health professional using a mobile phone"
      />
    </div>
  </section>
</template>
