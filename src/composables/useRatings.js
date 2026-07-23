import { ref } from 'vue'
import { getStoredRatings, saveRatings } from '../utils/storage'

const ratings = ref(getStoredRatings())

function persistRatings(nextRatings) {
  if (!saveRatings(nextRatings)) {
    return false
  }

  ratings.value = nextRatings
  return true
}

export function useRatings() {
  function getResourceRatingStats(resourceId) {
    const resourceRatings = ratings.value.filter((rating) => rating.resourceId === resourceId)
    const total = resourceRatings.reduce((sum, rating) => sum + rating.score, 0)

    return {
      count: resourceRatings.length,
      average: resourceRatings.length ? total / resourceRatings.length : 0,
    }
  }

  function getUserResourceRating(userId, resourceId) {
    return ratings.value.find(
      (rating) => rating.userId === userId && rating.resourceId === resourceId,
    )
  }

  function saveUserRating({ userId, resourceId, score }) {
    if (!Number.isInteger(score) || score < 1 || score > 5) {
      return { success: false }
    }

    const existingRatingIndex = ratings.value.findIndex(
      (rating) => rating.userId === userId && rating.resourceId === resourceId,
    )
    const now = new Date().toISOString()

    if (existingRatingIndex === -1) {
      const newRating = { userId, resourceId, score, createdAt: now, updatedAt: now }
      return { success: persistRatings([...ratings.value, newRating]), updated: false }
    }

    const nextRatings = [...ratings.value]
    nextRatings[existingRatingIndex] = {
      ...nextRatings[existingRatingIndex],
      score,
      updatedAt: now,
    }

    return { success: persistRatings(nextRatings), updated: true }
  }

  function removeRatingsForResource(resourceId) {
    return persistRatings(ratings.value.filter((rating) => rating.resourceId !== resourceId))
  }

  return {
    ratings,
    getResourceRatingStats,
    getUserResourceRating,
    saveUserRating,
    removeRatingsForResource,
  }
}
