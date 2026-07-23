<script setup>
defineProps({
  resource: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <article class="resource-card">
    <p class="resource-card__category">{{ resource.category }}</p>
    <h2>{{ resource.title }}</h2>
    <p>{{ resource.summary }}</p>
    <p class="resource-card__date">Updated {{ resource.publishedDate }}</p>
    <RouterLink
      class="resource-card__link"
      :to="{ name: 'resource-detail', params: { id: resource.id } }"
    >
      Read resource
    </RouterLink>
  </article>
</template>
