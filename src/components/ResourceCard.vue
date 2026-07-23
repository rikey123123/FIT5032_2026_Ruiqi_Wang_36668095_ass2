<script setup>
import { computed } from 'vue'
import { useRatings } from '../composables/useRatings'

const props = defineProps({
  resource: {
    type: Object,
    required: true,
  },
})

const { getResourceRatingStats } = useRatings()
const ratingStats = computed(() => getResourceRatingStats(props.resource.id))
</script>

<template>
  <article class="resource-card">
    <p class="resource-card__category">{{ resource.category }}</p>
    <h2>{{ resource.title }}</h2>
    <p>{{ resource.summary }}</p>
    <p class="resource-card__date">Updated {{ resource.publishedDate }}</p>
    <p class="resource-card__rating">
      <template v-if="ratingStats.count">
        {{ ratingStats.average.toFixed(1) }} out of 5 from {{ ratingStats.count }}
        rating{{ ratingStats.count === 1 ? '' : 's' }}
      </template>
      <template v-else>Not rated yet</template>
    </p>
    <RouterLink
      class="resource-card__link"
      :to="{ name: 'resource-detail', params: { id: resource.id } }"
    >
      Read resource
    </RouterLink>
  </article>
</template>
