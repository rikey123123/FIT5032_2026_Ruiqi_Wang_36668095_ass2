<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { useRatings } from '../composables/useRatings'
import { useResources } from '../composables/useResources'

const route = useRoute()
const { resources } = useResources()
const { currentUser } = useAuth()
const { getResourceRatingStats, getUserResourceRating, saveUserRating } = useRatings()
const ratingOptions = [1, 2, 3, 4, 5]
const selectedRating = ref(null)
const ratingError = ref('')
const ratingFeedback = ref('')

const resource = computed(() => {
  return resources.value.find((item) => item.id === route.params.id)
})

const ratingStats = computed(() => {
  return resource.value ? getResourceRatingStats(resource.value.id) : { count: 0, average: 0 }
})

const currentUserRating = computed(() => {
  if (!currentUser.value || !resource.value) {
    return undefined
  }

  return getUserResourceRating(currentUser.value.id, resource.value.id)
})

watch(
  [resource, currentUser],
  () => {
    selectedRating.value = currentUserRating.value?.score ?? null
    ratingError.value = ''
    ratingFeedback.value = ''
  },
  { immediate: true },
)

function submitRating() {
  ratingError.value = ''
  ratingFeedback.value = ''

  if (!currentUser.value || !resource.value) {
    return
  }

  if (!selectedRating.value) {
    ratingError.value = 'Choose a rating from 1 to 5.'
    return
  }

  const result = saveUserRating({
    userId: currentUser.value.id,
    resourceId: resource.value.id,
    score: selectedRating.value,
  })

  if (!result.success) {
    ratingError.value = 'Your rating could not be saved. Please try again.'
    return
  }

  ratingFeedback.value = result.updated
    ? 'Your rating has been updated.'
    : 'Your rating has been saved.'
}
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
        <p class="rating-summary">
          <template v-if="ratingStats.count">
            {{ ratingStats.average.toFixed(1) }} out of 5 from {{ ratingStats.count }}
            rating{{ ratingStats.count === 1 ? '' : 's' }}
          </template>
          <template v-else>Not rated yet</template>
        </p>
      </div>

      <div class="resource-detail__content">
        <p v-for="paragraph in resource.content" :key="paragraph">
          {{ paragraph }}
        </p>
      </div>

      <div v-if="currentUser" class="rating-section">
        <form class="rating-form" @submit.prevent="submitRating">
          <fieldset>
            <legend>How helpful was this resource?</legend>
            <div class="rating-options">
              <label v-for="score in ratingOptions" :key="score">
                <input v-model.number="selectedRating" type="radio" :value="score" />
                {{ score }}
              </label>
            </div>
          </fieldset>

          <p v-if="currentUserRating" class="rating-current">
            Your current rating is {{ currentUserRating.score }} out of 5.
          </p>
          <p v-if="ratingError" class="form-message form-message--error" role="alert">
            {{ ratingError }}
          </p>
          <p v-if="ratingFeedback" class="form-message form-message--success" role="status">
            {{ ratingFeedback }}
          </p>

          <button class="primary-button" type="submit">
            {{ currentUserRating ? 'Update rating' : 'Submit rating' }}
          </button>
        </form>
      </div>

      <div v-else class="rating-section empty-state">
        <p>Log in to rate this health resource.</p>
        <RouterLink class="primary-link" :to="{ name: 'login' }">Log in</RouterLink>
      </div>
    </template>

    <div v-else class="empty-state" role="status">
      This health resource is not available.
    </div>
  </section>
</template>
