<script setup>
defineProps({
  service: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <article class="service-card">
    <p class="service-card__category">{{ service.category }}</p>
    <h2>{{ service.name }}</h2>
    <p>{{ service.summary }}</p>

    <ul class="service-card__details">
      <li><strong>Location:</strong> {{ service.suburb }}</li>
      <li><strong>Hours:</strong> {{ service.hours }}</li>
    </ul>

    <a class="service-card__phone" :href="`tel:${service.phone}`">
      Call {{ service.phone }}
    </a>
  </article>
</template>
