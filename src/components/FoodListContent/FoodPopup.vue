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
    <IngredientsTable :selected-food="selectedFood" />
    <p v-if="selectedFood.strYoutube">
      <strong><a :href="selectedFood.strYoutube" target="_blank">Watch on youtube</a></strong>
    </p>
  </div>
</template>

<script>
import { computed, onMounted, onUpdated } from 'vue'
import { useStore } from 'vuex'
import IngredientsTable from './IngredientsTable.vue'

export default {
  components: {
    IngredientsTable,
  },
  setup() {
    const store = useStore()
    const selectedFood = computed(() => store.state.selectedFood)

    const closePopup = () => {
      store.dispatch('clearSelectedFood')
    }

    return { selectedFood, closePopup }
  },
}
</script>

<style scoped>
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
.popup img {
  width: 100%;
  max-width: 300px;
}
.popup-close {
  background: #ff5200;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
  border: none;
}
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
@media only screen and (max-width: 768px) {
  .first-cntn-box {
    display: block;
  }
  .popup-cntns {
    padding: 0;
  }
  .popupimgbox {
    width: 100%;
    padding: 0;
  }
  .popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    width: 90%; /* Use 90% instead of 100% to prevent overflow */
    max-width: 400px; /* Adjust max-width for better responsiveness */
    max-height: 90vh; /* Prevent it from exceeding the viewport height */
    overflow-y: auto;
  }
}
</style>
