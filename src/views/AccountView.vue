<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { useRatings } from '../composables/useRatings'
import { useResources } from '../composables/useResources'

const router = useRouter()
const { currentUser, logout } = useAuth()
const { ratings } = useRatings()
const { resources } = useResources()

const personalRatings = computed(() => {
  if (!currentUser.value) {
    return []
  }

  return ratings.value
    .filter((rating) => rating.userId === currentUser.value.id)
    .map((rating) => ({
      ...rating,
      resource: resources.value.find((resource) => resource.id === rating.resourceId),
    }))
    .filter((rating) => rating.resource)
})

function handleLogout() {
  logout()
  router.push({ name: 'home' })
}
</script>

<template>
  <section class="account-page">
    <div class="page-introduction">
      <h1>My account</h1>
      <p>View your CareBridge account details.</p>
    </div>

    <div v-if="currentUser">
      <dl class="account-details">
        <div>
          <dt>Name</dt>
          <dd>{{ currentUser.fullName }}</dd>
        </div>
        <div>
          <dt>Email</dt>
          <dd>{{ currentUser.email }}</dd>
        </div>
        <div>
          <dt>Role</dt>
          <dd>{{ currentUser.role }}</dd>
        </div>
      </dl>

      <div class="account-ratings">
        <h2>Your resource ratings</h2>
        <ul v-if="personalRatings.length" class="account-ratings__list">
          <li v-for="rating in personalRatings" :key="rating.resourceId">
            <RouterLink :to="{ name: 'resource-detail', params: { id: rating.resourceId } }">
              {{ rating.resource.title }}
            </RouterLink>
            <span>{{ rating.score }} out of 5</span>
          </li>
        </ul>
        <p v-else>You have not rated any health resources yet.</p>
      </div>

      <button class="primary-button" type="button" @click="handleLogout">Log out</button>
    </div>

    <div v-else class="empty-state">
      <p>You need to log in before viewing account details.</p>
      <RouterLink class="primary-link" :to="{ name: 'login' }">Log in</RouterLink>
    </div>
  </section>
</template>
