<template>
  <div class="popup" id="popup" v-if="selectedFood">
    <button class="popup-close" @click="closePopup()">Close</button>
    <h2 id="popup-title">{{ selectedFood.strMeal }}</h2>
    <div class="first-cntn-box">
      <div class="popupimgbox"><img id="popup-img" :src="selectedFood.strMealThumb" alt="" /></div>
      <div class="popup-cntns">
        <p>
          <strong>Category:</strong> <span id="popup-category">{{ selectedFood.strCategory }}</span>
        </p>
        <p>
          <strong>Area:</strong> <span id="popup-area">{{ selectedFood.strArea }}</span>
        </p>
        <p v-if="selectedFood.strDrinkAlternate">
          <strong>Drink:</strong> <span id="popup-drink">{{ selectedFood.strDrinkAlternate }}</span>
        </p>
        <p>
          <strong>Instructions:</strong><br />
          <span id="popup-instructions">{{ selectedFood.strInstructions }}</span>
        </p>
      </div>
    </div>
    <div>
      <p><strong>Ingredients:</strong></p>
      <table id="popup-ingredients">
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
          </tr>
        </thead>
        <tr v-for="ing in 20">
          <td v-if="selectedFood[`strIngredient${ing}`]">
            {{ selectedFood[`strIngredient${ing}`] }}
          </td>
          <td v-if="selectedFood[`strMeasure${ing}`]">{{ selectedFood[`strMeasure${ing}`] }}</td>
        </tr>
      </table>
    </div>

    <p>
      <strong><a :href="selectedFood.strYoutube">Watch on youtube</a></strong>
    </p>
  </div>
</template>

<script>
import { computed, onMounted, onUpdated } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const selectedFood = computed(() => store.state.selectedFood)

    onMounted(() => {
      console.log('popup mounted', selectedFood)
    })

    const closePopup = () => {
      console.log('closed')
      store.dispatch('clearSelectedFood')
    }

    onUpdated(() => {
      console.log('food detail updated', selectedFood)
    })

    return { selectedFood, closePopup }
  },
}
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.popup-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  text-align: center;
  position: relative;
}
.first-cntn-box {
  display: inline-flex;
}
.popupimgbox {
  width: 50%;
  padding: 1rem;
}
#popup-img {
  max-width: 100%;
}
.popup-cntns {
  width: 100%;
  padding: 0 1rem;
}
.popup-content img {
  width: 100%;
  border-radius: 8px;
}
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}
#popup-instructions {
  font-size: 13px;
}
#popup-ingredients {
  width: 100%;
}

#popup-ingredients {
  border: 1px solid #f0f0f5;
  border-collapse: collapse;
}

#popup-ingredients td {
  padding: 3px;
  font-size: 13px;
}
#popup-ingredients tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>
