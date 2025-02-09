<template>
  <div class="grid" id="food-list" v-if="paginatedFoodItems && paginatedFoodItems.length > 0">
    <FoodCard v-for="(food, index) in paginatedFoodItems" :key="food.idMeal" :data="food" />
  </div>
  <p v-else>{{ altMessage }}</p>
  <Pagination />
  <FoodPopup />
</template>

<script>
import FoodCard from './FoodListContent/FoodCard.vue'
import { computed, onMounted, onUpdated } from 'vue'
import { useStore } from 'vuex'
import Pagination from './FoodListContent/Pagination.vue'
import FoodPopup from './FoodListContent/FoodPopup.vue'

export default {
  components: {
    FoodCard,
    Pagination,
    FoodPopup,
  },
  setup() {
    const store = useStore()
    let altMessage = 'Loading Data'

    const foodItems = computed(() => store.state.foodItems)
    const selectedArea = computed(() => store.state.selectedArea)
    const paginatedFoodItems = computed(() => store.getters.paginatedFoodItems)

    onMounted(() => {
      if (foodItems.value.length === 0) {
        store.dispatch('getFoodItems', 'indian') // Ensure default area is fetched
      }
    })

    onUpdated(() => {
      altMessage = foodItems.length === 0 ? "Can't find any items in this area!" : 'Loading Data...'
    })

    return {
      foodItems,
      selectedArea,
      altMessage,
      paginatedFoodItems,
    }
  },
}
</script>
