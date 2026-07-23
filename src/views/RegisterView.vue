<script setup>
import { reactive, ref } from 'vue'
import { getStoredUsers, saveUsers } from '../utils/storage'
import { containsHtml, INPUT_LIMITS } from '../utils/validation'

const form = reactive({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const errors = reactive({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  form: '',
})

const successMessage = ref('')
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function clearError(field) {
  errors[field] = ''
  errors.form = ''
  successMessage.value = ''
}

function validateForm() {
  errors.fullName = ''
  errors.email = ''
  errors.password = ''
  errors.confirmPassword = ''
  errors.form = ''

  const fullName = form.fullName.trim()
  const email = form.email.trim().toLowerCase()

  if (!fullName) {
    errors.fullName = 'Enter your full name.'
  } else if (fullName.length > INPUT_LIMITS.fullName) {
    errors.fullName = `Use no more than ${INPUT_LIMITS.fullName} characters.`
  } else if (containsHtml(fullName)) {
    errors.fullName = 'HTML tags are not allowed in your name.'
  }

  if (!email) {
    errors.email = 'Enter your email address.'
  } else if (email.length > INPUT_LIMITS.email) {
    errors.email = `Use no more than ${INPUT_LIMITS.email} characters.`
  } else if (!emailPattern.test(email)) {
    errors.email = 'Enter an email address in a valid format.'
  } else if (getStoredUsers().some((user) => user.email === email)) {
    errors.email = 'An account with this email address already exists.'
  }

  if (!form.password) {
    errors.password = 'Enter a password.'
  } else if (form.password.length < 8) {
    errors.password = 'Use a password with at least 8 characters.'
  } else if (form.password.length > INPUT_LIMITS.password) {
    errors.password = `Use no more than ${INPUT_LIMITS.password} characters.`
  }

  if (!form.confirmPassword) {
    errors.confirmPassword = 'Confirm your password.'
  } else if (form.confirmPassword !== form.password) {
    errors.confirmPassword = 'Passwords do not match.'
  }

  return !Object.values(errors).some((error) => error)
}

function resetForm() {
  form.fullName = ''
  form.email = ''
  form.password = ''
  form.confirmPassword = ''
}

function submitRegistration() {
  successMessage.value = ''

  if (!validateForm()) {
    return
  }

  const users = getStoredUsers()
  const newUser = {
    id: `user-${Date.now()}`,
    fullName: form.fullName.trim(),
    email: form.email.trim().toLowerCase(),
    password: form.password,
    role: 'user',
    savedResourceIds: [],
    createdAt: new Date().toISOString(),
  }

  if (!saveUsers([...users, newUser])) {
    errors.form = 'Your account could not be saved. Please try again.'
    return
  }

  resetForm()
  successMessage.value = 'Your account has been created. You can now log in.'
}
</script>

<template>
  <section class="register-page">
    <div class="page-introduction">
      <h1>Create an account</h1>
      <p>Register to save resources and share helpful ratings.</p>
    </div>

    <form class="auth-form" novalidate @submit.prevent="submitRegistration">
      <div class="form-field">
        <label for="full-name">Full name</label>
        <input
          id="full-name"
          v-model="form.fullName"
          :aria-describedby="errors.fullName ? 'full-name-error' : undefined"
          :aria-invalid="Boolean(errors.fullName)"
          autocomplete="name"
          :maxlength="INPUT_LIMITS.fullName"
          type="text"
          @input="clearError('fullName')"
        />
        <p v-if="errors.fullName" id="full-name-error" class="field-error" role="alert">
          {{ errors.fullName }}
        </p>
      </div>

      <div class="form-field">
        <label for="email">Email address</label>
        <input
          id="email"
          v-model="form.email"
          :aria-describedby="errors.email ? 'email-error' : undefined"
          :aria-invalid="Boolean(errors.email)"
          autocomplete="email"
          inputmode="email"
          :maxlength="INPUT_LIMITS.email"
          type="email"
          @input="clearError('email')"
        />
        <p v-if="errors.email" id="email-error" class="field-error" role="alert">
          {{ errors.email }}
        </p>
      </div>

      <div class="form-field">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="form.password"
          :aria-describedby="errors.password ? 'password-error' : undefined"
          :aria-invalid="Boolean(errors.password)"
          autocomplete="new-password"
          :maxlength="INPUT_LIMITS.password"
          type="password"
          @input="clearError('password')"
        />
        <p v-if="errors.password" id="password-error" class="field-error" role="alert">
          {{ errors.password }}
        </p>
      </div>

      <div class="form-field">
        <label for="confirm-password">Confirm password</label>
        <input
          id="confirm-password"
          v-model="form.confirmPassword"
          :aria-describedby="errors.confirmPassword ? 'confirm-password-error' : undefined"
          :aria-invalid="Boolean(errors.confirmPassword)"
          autocomplete="new-password"
          :maxlength="INPUT_LIMITS.password"
          type="password"
          @input="clearError('confirmPassword')"
        />
        <p
          v-if="errors.confirmPassword"
          id="confirm-password-error"
          class="field-error"
          role="alert"
        >
          {{ errors.confirmPassword }}
        </p>
      </div>

      <p v-if="errors.form" class="form-message form-message--error" role="alert">
        {{ errors.form }}
      </p>
      <p v-if="successMessage" class="form-message form-message--success" role="status">
        {{ successMessage }}
      </p>

      <button class="primary-button" type="submit">Create account</button>
    </form>
  </section>
</template>
