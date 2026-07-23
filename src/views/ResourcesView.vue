<script setup>
import { computed, ref } from 'vue'
import ResourceCard from '../components/ResourceCard.vue'
import { healthResources, resourceCategories } from '../data/resources'

const searchTerm = ref('')
const selectedCategory = ref('All')

const filteredResources = computed(() => {
  const query = searchTerm.value.trim().toLowerCase()

  return healthResources.filter((resource) => {
    const matchesCategory =
      selectedCategory.value === 'All' || resource.category === selectedCategory.value
    const searchableText = `${resource.title} ${resource.category} ${resource.summary}`.toLowerCase()
    const matchesSearch = searchableText.includes(query)

    return matchesCategory && matchesSearch
  })
})

const hasActiveFilters = computed(() => {
  return searchTerm.value !== '' || selectedCategory.value !== 'All'
})

function clearFilters() {
  searchTerm.value = ''
  selectedCategory.value = 'All'
}
</script>

<template>
  <section class="resources-page">
    <div class="page-introduction">
      <h1>Health resources</h1>
      <p>Read practical information for healthy ageing and caring.</p>
    </div>

    <form class="content-filters" @submit.prevent>
      <label class="filter-field" for="resource-search">
        Search resources
        <input
          id="resource-search"
          v-model="searchTerm"
          type="search"
          placeholder="Try wellbeing or caring"
        />
      </label>

      <label class="filter-field" for="resource-category">
        Resource category
        <select id="resource-category" v-model="selectedCategory">
          <option v-for="category in resourceCategories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </label>

      <button
        v-if="hasActiveFilters"
        class="filter-clear-button"
        type="button"
        @click="clearFilters"
      >
        Clear filters
      </button>
    </form>

    <p class="results-count" aria-live="polite">
      {{ filteredResources.length }} resource{{ filteredResources.length === 1 ? '' : 's' }} found
    </p>

    <div v-if="filteredResources.length" class="resource-grid">
      <ResourceCard
        v-for="resource in filteredResources"
        :key="resource.id"
        :resource="resource"
      />
    </div>

    <p v-else class="empty-state" role="status">
      No health resources match those filters. Try a different search or clear the filters.
    </p>
  </section>
</template>
