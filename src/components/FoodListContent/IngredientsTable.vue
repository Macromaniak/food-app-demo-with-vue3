<template>
  <div class="food-item-ingredients">
    <p><strong>Ingredients:</strong></p>
    <table id="popup-ingredients">
      <thead>
        <tr>
          <th>Item</th>
          <th>Qty</th>
        </tr>
      </thead>
      <tr v-for="ing in 20" :key="selectedFood.idMeal">
        <td v-if="selectedFood[`strIngredient${ing}`]?.trim()">
          {{ selectedFood[`strIngredient${ing}`] }}
        </td>
        <td v-if="selectedFood[`strMeasure${ing}`]?.trim()">
          {{ selectedFood[`strMeasure${ing}`] }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ['selectedFood'],
  setup(props) {
    console.log(props.selectedFood)
    return { selectedFood: props.selectedFood }
  },
}
</script>

<style scoped>
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
