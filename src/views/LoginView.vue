<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { login } = useAuth()
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const form = reactive({
  email: '',
  password: '',
})

const errors = reactive({
  email: '',
  password: '',
  form: '',
})

function clearError(field) {
  errors[field] = ''
  errors.form = ''
}

function validateForm() {
  errors.email = ''
  errors.password = ''
  errors.form = ''

  const email = form.email.trim()

  if (!email) {
    errors.email = 'Enter your email address.'
  } else if (!emailPattern.test(email)) {
    errors.email = 'Enter an email address in a valid format.'
  }

  if (!form.password) {
    errors.password = 'Enter your password.'
  }

  return !errors.email && !errors.password
}

function submitLogin() {
  if (!validateForm()) {
    return
  }

  const result = login(form.email, form.password)

  if (!result.success) {
    errors.form = result.message
    return
  }

  router.push({ name: 'account' })
}
</script>

<template>
  <section class="login-page">
    <div class="page-introduction">
      <h1>Log in</h1>
      <p>Access your CareBridge account.</p>
    </div>

    <form class="auth-form" novalidate @submit.prevent="submitLogin">
      <div class="form-field">
        <label for="login-email">Email address</label>
        <input
          id="login-email"
          v-model="form.email"
          :aria-describedby="errors.email ? 'login-email-error' : undefined"
          :aria-invalid="Boolean(errors.email)"
          autocomplete="email"
          inputmode="email"
          type="email"
          @input="clearError('email')"
        />
        <p v-if="errors.email" id="login-email-error" class="field-error" role="alert">
          {{ errors.email }}
        </p>
      </div>

      <div class="form-field">
        <label for="login-password">Password</label>
        <input
          id="login-password"
          v-model="form.password"
          :aria-describedby="errors.password ? 'login-password-error' : undefined"
          :aria-invalid="Boolean(errors.password)"
          autocomplete="current-password"
          type="password"
          @input="clearError('password')"
        />
        <p v-if="errors.password" id="login-password-error" class="field-error" role="alert">
          {{ errors.password }}
        </p>
      </div>

      <p v-if="errors.form" class="form-message form-message--error" role="alert">
        {{ errors.form }}
      </p>

      <button class="primary-button" type="submit">Log in</button>
    </form>
  </section>
</template>
