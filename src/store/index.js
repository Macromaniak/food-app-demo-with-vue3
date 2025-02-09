import { createStore } from 'vuex'
import api from '@/api/FoodApi'

export default createStore({
  state: {
    areas: [], // List of areas (countries)
    selectedArea: 'Indian', // Selected area
    foodItems: [], // store food items
    selectedFood: null, // current selected food
    currentPage: 1, // Track current page
    itemsPerPage: 12, // Items per page
    sortOrder: 'asc', // Default sorting order
  },
  mutations: {
    SET_AREAS(state, areas) {
      state.areas = areas
    },
    SET_SELECTED_AREA(state, area) {
      state.selectedArea = area
    },
    SET_FOOD_ITEMS(state, foodItems) {
      state.foodItems = foodItems
    },
    SET_SELECTED_FOOD(state, food) {
      state.selectedFood = food
    },
    SET_CURRENT_PAGE(state, page) {
      state.currentPage = page
    },
    SET_SORT_ORDER(state, order) {
      state.sortOrder = order
    },
  },
  actions: {
    async getAreas({ commit }) {
      try {
        const areas = await api.getAreas()
        commit('SET_AREAS', areas)
      } catch (error) {
        console.error('Error fetching areas:', error)
      }
    },
    selectArea({ commit, dispatch }, area) {
      commit('SET_SELECTED_AREA', area)
      dispatch('getFoodItems', area) // Fetch food items when an area is selected
    },
    async initializeApp({ dispatch, commit }) {
      await dispatch('getAreas')
      commit('SET_SELECTED_AREA', 'Indian')
      await dispatch('getFoodItems', 'Indian') // Fetch default area food items
    },
    async getFoodItems({ commit }, area) {
      try {
        commit('SET_FOOD_ITEMS', [])
        const foodItems = await api.getFoodsByArea(area)
        commit('SET_FOOD_ITEMS', foodItems)
        commit('SET_CURRENT_PAGE', 1) // Reset page on new fetch
      } catch (error) {
        console.error(`Error fetching food items for ${area}:`, error)
      }
    },
    async getFoodDetails({ commit }, foodId) {
      try {
        const food = await api.getFoodDetails(foodId)
        commit('SET_SELECTED_FOOD', food)
      } catch (error) {
        console.error(`Error fetching food details:`, error)
      }
    },
    clearSelectedFood({ commit }) {
      commit('SET_SELECTED_FOOD', null)
    },
  },
  getters: {
    getAreas: (state) => state.areas,
    getSelectedArea: (state) => state.selectedArea,
    getFoodItems: (state) => state.foodItems,
    getSelectedFood: (state) => state.selectedFood,
    paginatedFoodItems: (state) => {
      const start = (state.currentPage - 1) * state.itemsPerPage
      let sortedItems = [...state.foodItems]

      sortedItems.sort((a, b) => {
        if (state.sortOrder === 'asc') {
          return a.strMeal.localeCompare(b.strMeal)
        } else {
          return b.strMeal.localeCompare(a.strMeal)
        }
      })

      //   return state.foodItems.slice(start, start + state.itemsPerPage)
      return sortedItems.slice(start, start + state.itemsPerPage)
    },

    totalPages: (state) => Math.ceil(state.foodItems.length / state.itemsPerPage),
    getCurrentPage: (state) => state.currentPage,
    getSortOrder: (state) => state.sortOrder,
  },
})
