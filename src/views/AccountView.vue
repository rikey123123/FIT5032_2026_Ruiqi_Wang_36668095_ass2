<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { currentUser, logout } = useAuth()

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

      <button class="primary-button" type="button" @click="handleLogout">Log out</button>
    </div>

    <div v-else class="empty-state">
      <p>You need to log in before viewing account details.</p>
      <RouterLink class="primary-link" :to="{ name: 'login' }">Log in</RouterLink>
    </div>
  </section>
</template>
