import axios from 'axios'

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1'

const api = {
  // Get list of available areas (countries)
  getAreas: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/list.php?a=list`)
      return response.data.meals
    } catch (error) {
      console.error('Error fetching areas:', error)
      return []
    }
  },

  // Get list of food items for a specific area
  getFoodsByArea: async (area) => {
    try {
      const response = await axios.get(`${BASE_URL}/filter.php?a=${area}`)
      return response.data.meals
    } catch (error) {
      console.error(`Error fetching foods for area ${area}:`, error)
      return []
    }
  },

  // Get food details by ID
  getFoodDetails: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/lookup.php?i=${id}`)
      return response.data.meals[0] // Returns a single meal object
    } catch (error) {
      console.error(`Error fetching food details for ID ${id}:`, error)
      return null
    }
  },
}

export default api
