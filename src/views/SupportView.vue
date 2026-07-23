<script setup>
import { computed, ref } from 'vue'
import ServiceCard from '../components/ServiceCard.vue'
import { serviceCategories, supportServices } from '../data/services'

const searchTerm = ref('')
const selectedCategory = ref('All')

const filteredServices = computed(() => {
  const query = searchTerm.value.trim().toLowerCase()

  return supportServices.filter((service) => {
    const matchesCategory =
      selectedCategory.value === 'All' || service.category === selectedCategory.value
    const searchableText = `${service.name} ${service.category} ${service.suburb}`.toLowerCase()
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
  <section class="support-page">
    <div class="page-introduction">
      <h1>Find support</h1>
      <p>Browse local services for older adults and carers.</p>
    </div>

    <form class="content-filters" @submit.prevent>
      <label class="filter-field" for="service-search">
        Search services
        <input
          id="service-search"
          v-model="searchTerm"
          type="search"
          placeholder="Try transport or Clayton"
        />
      </label>

      <label class="filter-field" for="service-category">
        Service category
        <select id="service-category" v-model="selectedCategory">
          <option v-for="category in serviceCategories" :key="category" :value="category">
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
      {{ filteredServices.length }} service{{ filteredServices.length === 1 ? '' : 's' }} found
    </p>

    <div v-if="filteredServices.length" class="service-grid">
      <ServiceCard
        v-for="service in filteredServices"
        :key="service.id"
        :service="service"
      />
    </div>

    <p v-else class="empty-state" role="status">
      No services match those filters. Try a different search or clear the filters.
    </p>
  </section>
</template>
