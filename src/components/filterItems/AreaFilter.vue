<template>
  <div class="filter-btn">
    <select id="area-select" v-model="selectedArea" @change="updateSelectedArea">
      <option v-for="area in areas" :key="area.strArea" :value="area.strArea">
        {{ area.strArea }}
      </option>
    </select>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()

    // Fetch areas on mount
    onMounted(() => {
      store.dispatch('getAreas')
    })

    // Computed properties
    const areas = computed(() => store.getters.getAreas)
    const selectedArea = computed({
      get: () => store.getters.getSelectedArea,
      set: (value) => store.dispatch('selectArea', value),
    })

    const updateSelectedArea = () => {
      store.dispatch('selectArea', selectedArea.value)
    }

    return { areas, selectedArea, updateSelectedArea }
  },
}
</script>

<style scoped>
select {
  padding: 0px;
  border: none;
  outline: 0px;
}
select:hover {
  cursor: pointer;
}
</style>
