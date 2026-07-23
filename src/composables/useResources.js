import { ref } from 'vue'
import { initialHealthResources } from '../data/resources'
import { getStoredResources, saveResources } from '../utils/storage'

function loadResources() {
  const storedResources = getStoredResources()

  if (storedResources !== null) {
    return storedResources
  }

  saveResources(initialHealthResources)
  return initialHealthResources
}

const resources = ref(loadResources())

function persistResources(nextResources) {
  if (!saveResources(nextResources)) {
    return false
  }

  resources.value = nextResources
  return true
}

export function useResources() {
  function addResource(resource) {
    return persistResources([...resources.value, resource])
  }

  function removeResource(resourceId) {
    return persistResources(resources.value.filter((resource) => resource.id !== resourceId))
  }

  return {
    resources,
    addResource,
    removeResource,
  }
}
