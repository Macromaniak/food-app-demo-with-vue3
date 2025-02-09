import { createStore } from 'vuex'
import api from '@/api/FoodApi'

export default createStore({
  state: {
    areas: [], // List of areas (countries)
    selectedArea: 'indian', // Selected area
    foodItems: [], // store food items
    selectedFood: null,
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
  },
  actions: {
    async getAreas({ commit }) {
      console.log('calling')
      try {
        const areas = await api.getAreas()
        console.log(areas)
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
        const foodItems = await api.getFoodsByArea(area)
        commit('SET_FOOD_ITEMS', foodItems)
        console.log(foodItems)
      } catch (error) {
        console.error(`Error fetching food items for ${area}:`, error)
      }
    },
    async getFoodDetails({ commit }, foodId) {
      try {
        const food = await api.getFoodDetails(foodId)
        commit('SET_SELECTED_FOOD', food)
        console.log(food)
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
  },
})
