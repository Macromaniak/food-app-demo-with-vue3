<template>
  <div class="card" @click="showFoodDetails(food.idMeal)">
    <img :src="food.strMealThumb" :alt="food.strMeal + ' image'" />
    <h3>{{ food.strMeal }}</h3>
    <p>Rating: <span v-for="star of getRandomStars()">⭐</span></p>
  </div>
</template>

<script>
import { getRandomStars } from '@/helpers/general'
import { useStore } from 'vuex'
export default {
  props: ['data'],
  setup(props) {
    const store = useStore()

    const showFoodDetails = (foodId) => {
      // alert(foodId)
      store.dispatch('getFoodDetails', foodId)
    }

    return { food: props.data, getRandomStars, showFoodDetails }
  },
}
</script>
