<script setup>
import { reactive, ref } from 'vue'
import { resourceCategories } from '../data/resources'
import { useResources } from '../composables/useResources'

const { addResource, removeResource, resources } = useResources()
const categories = resourceCategories.filter((category) => category !== 'All')

const form = reactive({
  title: '',
  category: categories[0],
  summary: '',
  content: '',
})

const errors = reactive({
  title: '',
  summary: '',
  content: '',
  form: '',
})

const feedback = ref('')

function clearError(field) {
  errors[field] = ''
  errors.form = ''
  feedback.value = ''
}

function validateForm() {
  errors.title = ''
  errors.summary = ''
  errors.content = ''
  errors.form = ''

  if (!form.title.trim()) {
    errors.title = 'Enter a resource title.'
  }

  if (!form.summary.trim()) {
    errors.summary = 'Enter a short summary.'
  }

  if (!form.content.trim()) {
    errors.content = 'Enter the resource content.'
  }

  return !errors.title && !errors.summary && !errors.content
}

function resetForm() {
  form.title = ''
  form.category = categories[0]
  form.summary = ''
  form.content = ''
}

function createResource() {
  feedback.value = ''

  if (!validateForm()) {
    return
  }

  const newResource = {
    id: `resource-${Date.now()}`,
    title: form.title.trim(),
    category: form.category,
    summary: form.summary.trim(),
    publishedDate: new Date().toLocaleDateString('en-AU'),
    content: [form.content.trim()],
  }

  if (!addResource(newResource)) {
    errors.form = 'The health resource could not be saved. Please try again.'
    return
  }

  resetForm()
  feedback.value = 'Health resource added.'
}

function deleteResource(resourceId) {
  feedback.value = ''

  if (!removeResource(resourceId)) {
    errors.form = 'The health resource could not be removed. Please try again.'
    return
  }

  feedback.value = 'Health resource removed.'
}
</script>

<template>
  <section class="admin-page">
    <div class="page-introduction">
      <h1>Admin area</h1>
      <p>Add or remove health resources for CareBridge visitors.</p>
    </div>

    <form class="admin-form" novalidate @submit.prevent="createResource">
      <h2>Add a health resource</h2>

      <div class="form-field">
        <label for="resource-title">Resource title</label>
        <input
          id="resource-title"
          v-model="form.title"
          :aria-describedby="errors.title ? 'resource-title-error' : undefined"
          :aria-invalid="Boolean(errors.title)"
          type="text"
          @input="clearError('title')"
        />
        <p v-if="errors.title" id="resource-title-error" class="field-error" role="alert">
          {{ errors.title }}
        </p>
      </div>

      <div class="form-field">
        <label for="admin-resource-category">Resource category</label>
        <select id="admin-resource-category" v-model="form.category">
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>

      <div class="form-field">
        <label for="resource-summary">Short summary</label>
        <textarea
          id="resource-summary"
          v-model="form.summary"
          :aria-describedby="errors.summary ? 'resource-summary-error' : undefined"
          :aria-invalid="Boolean(errors.summary)"
          @input="clearError('summary')"
        />
        <p v-if="errors.summary" id="resource-summary-error" class="field-error" role="alert">
          {{ errors.summary }}
        </p>
      </div>

      <div class="form-field">
        <label for="resource-content">Resource content</label>
        <textarea
          id="resource-content"
          v-model="form.content"
          :aria-describedby="errors.content ? 'resource-content-error' : undefined"
          :aria-invalid="Boolean(errors.content)"
          @input="clearError('content')"
        />
        <p v-if="errors.content" id="resource-content-error" class="field-error" role="alert">
          {{ errors.content }}
        </p>
      </div>

      <p v-if="errors.form" class="form-message form-message--error" role="alert">
        {{ errors.form }}
      </p>
      <p v-if="feedback" class="form-message form-message--success" role="status">
        {{ feedback }}
      </p>

      <button class="primary-button" type="submit">Add resource</button>
    </form>

    <div class="admin-resources">
      <h2>Current health resources</h2>
      <ul class="admin-resource-list">
        <li v-for="resource in resources" :key="resource.id">
          <div>
            <p class="admin-resource-list__category">{{ resource.category }}</p>
            <h3>{{ resource.title }}</h3>
          </div>
          <button class="secondary-button" type="button" @click="deleteResource(resource.id)">
            Delete
          </button>
        </li>
      </ul>
    </div>
  </section>
</template>
