<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useResources } from '../composables/useResources'

const route = useRoute()
const { resources } = useResources()

const resource = computed(() => {
  return resources.value.find((item) => item.id === route.params.id)
})
</script>

<template>
  <section class="resource-detail">
    <RouterLink class="back-link" :to="{ name: 'resources' }">
      Back to health resources
    </RouterLink>

    <template v-if="resource">
      <div class="resource-detail__heading">
        <p class="resource-detail__category">{{ resource.category }}</p>
        <h1>{{ resource.title }}</h1>
        <p class="resource-detail__summary">{{ resource.summary }}</p>
        <p class="resource-detail__date">Updated {{ resource.publishedDate }}</p>
      </div>

      <div class="resource-detail__content">
        <p v-for="paragraph in resource.content" :key="paragraph">
          {{ paragraph }}
        </p>
      </div>
    </template>

    <div v-else class="empty-state" role="status">
      This health resource is not available.
    </div>
  </section>
</template>
